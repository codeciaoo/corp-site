// ビルド結果（dist/）の HTML に、文節の切れ目を入れる。`astro build` の直後に実行する（package.json の build）。
//
// なぜ: 句で折り返す指定 `word-break: auto-phrase` は Chrome でしか働かない。Safari では語の途中で折れる。
// どうする: 文節の切れ目に、幅のない空白（U+200B）を入れ、CSS で `word-break: keep-all` を指定する
//           （site.css の [data-bx]）。これはどのブラウザでも同じ位置で折り返す。文節の判定は BudouX。
//           <wbr> は使わない。要素を足すと、文字を直接持つ flex や grid の入れ物で、文字が別々の箱に分かれてしまう。
//
// 規則は 1 つ: 見出し、段落、箇条書き、表のすべてを、文節で折り返す。
//   - 最後の行に 1〜3 字だけ残らないよう、末尾の句は前の句とまとめる
//   - 1 つの句が長すぎる（10 字を超える）ときは、語の境目でさらに分ける（行の右の空きを小さくする）。
//     分ける単位は「カタカナ・漢字・欧文が続く語（複合語）＋後ろのかな」。複合語の中では分けない
//   - 語の途中では切らない（scripts/wrap-check.mjs が同じ種類を検査する）:
//     複合語（技術コンサルティング、AIチャットサイドバー、サブスクリプション型）、
//     複合動詞（切り替える、受け渡す）、接尾語と機能語（〜向け、〜ための、〜として、〜による）
// 以前は「長い段落は字で折る」方式も試したが、折らない箱を入れると段落の途中の行が大きく空き、
// 入れないと語の途中で折れる。審査でどちらも減点されたので、やめた。
//
// 字の並びは変えない。足すのは、幅のない空白と、処理した要素と html の data-bx だけ。
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadDefaultJapaneseParser } from "budoux";
import { parseDocument } from "htmlparser2";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");
const parser = loadDefaultJapaneseParser();

/** 折り返しを整える要素 */
const BLOCKS = new Set(["p", "li", "dd", "dt", "td", "th", "h1", "h2", "h3", "h4", "figcaption", "label", "legend", "summary"]);
/** 中の文字を触らない要素 */
const SKIP_TAGS = new Set(["script", "style", "svg", "code", "pre", "textarea", "select", "button", "noscript", "title"]);
/** 中の文字を触らないクラス（読み上げ専用、等幅ラベル、タグ、ボタン）。
 *  線と塗りの文字（1 字ずつの span）は、クラス名ではなく data-c 属性で見分ける。
 *  クラス名 ch、ph は、ページの部品（CaseHead、PageHero）の名前と重なるため */
const SKIP_CLASSES = new Set(["sr", "mono", "tags", "btn", "nb"]);
/** 文節の切れ目（幅のない空白） */
const BREAK = "\u200B";
const JAPANESE = /[ぁ-んァ-ヶ一-龥々ー]/;

const classesOf = node => (node.attribs?.class ?? "").split(/\s+/).filter(Boolean);

async function htmlFiles(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await htmlFiles(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** 1 つの句がこれより長いと、狭い画面で 1 行に入らない。語の境目でさらに分ける */
const MAX_PHRASE = 10;
/** 折らないかたまりの上限。これより長いと、狭い画面の見出しで 1 行に入らない */
const MAX_UNIT = 16;
/** 語の種類（カタカナ／欧文と数字／漢字）の境目で分ける。複合語が長すぎるときだけ使う */
const byScript = text =>
  text.match(/[ァ-ヺー]+[ぁ-ん、。）」』]*|[A-Za-z0-9.,+#/%〜~-]+[ぁ-ん、。）」』]*|[一-龥々]+[ぁ-ん、。）」』]*|./g) ?? [text];
/** 長い句を「複合語＋後ろのかな」の単位に分ける。「・」の後ろでも分ける。複合語が長すぎるときは、語の種類の境目で分ける */
const splitLong = phrase =>
  phrase.length <= MAX_PHRASE
    ? [phrase]
    : (phrase.match(/[ァ-ヺー一-龥々A-Za-z0-9.,+#/%〜~-]+・?[ぁ-ん、。）」』]*|[ぁ-ん]+[、。）」』]*|./g) ?? [phrase]).flatMap(unit =>
        unit.length <= MAX_UNIT ? [unit] : byScript(unit),
      );

/* ── 語の途中で切らない ── */
const KATA = /[ァ-ヺー]/;
const KANJI = /[一-龥々]/;
const ALNUM = /[A-Za-z0-9]/;
const scriptOf = ch => (KATA.test(ch) ? "kata" : KANJI.test(ch) ? "kanji" : ALNUM.test(ch) ? "latin" : "");
// 複合動詞: 前の句が「漢字＋連用形のかな」で終わり、次の句が「漢字＋助詞でないかな」で始まる（切り｜替えます）
const VERB_HEAD = /[一-龥々][りきしちいみびぎえけげせめれね]$/;
const VERB_TAIL = /^[一-龥々][ぁ-ゖ]*[、。）」』]*/;
const NOT_VERB = "はがをにのでともへやか";
// 行頭に来てはいけない接尾語と機能語（〜型、〜向け、〜ための、〜として、〜による）
const SUFFIX = /^(?:型|向け|向き|ための|ように|ような|として|について|によって|による|において|にとって)[ぁ-ゖ]*[、。）」』]*/;
// 句の境目をまたいではいけない機能語（合格と｜して → 合格として）
const FUNCTION_WORDS = ["として", "ための", "について", "によって", "による", "において", "にとって", "に対して", "ように", "ような"];
const COMPOUND_HEAD = /^(?:[ァ-ヺー]+|[一-龥々]+|[A-Za-z0-9.,+#/%〜~-]+)[ぁ-ゖ]*[、。）」』]*/;
const ENDS_OPEN = /[、。，．）」』・\s]$/;

/** 句の境目をまたいでいる機能語の、前の句の側の字数。またいでいなければ 0 */
const spannedWord = (previous, next) => {
  const tail = previous.slice(-4);
  const joined = tail + next.slice(0, 4);
  for (const word of FUNCTION_WORDS) {
    for (let at = joined.indexOf(word); at !== -1; at = joined.indexOf(word, at + 1)) {
      if (at < tail.length && at + word.length > tail.length) return tail.length - at;
    }
  }
  return 0;
};

/** 次の句の頭のうち、前の句に付けるべき部分。付けなくてよいときは "" */
const stickHead = (previous, next) => {
  if (ENDS_OPEN.test(previous)) return "";
  if (VERB_HEAD.test(previous) && !NOT_VERB.includes(next[1] ?? "") && /^[一-龥々][ぁ-ゖ]/.test(next)) {
    return next.match(VERB_TAIL)[0];
  }
  const suffix = next.match(SUFFIX);
  if (suffix) return suffix[0];
  if (spannedWord(previous, next)) return next.match(/^[ぁ-ゖ]+[、。）」』]*/)?.[0] ?? "";
  const left = scriptOf(previous.slice(-1));
  const right = scriptOf(next[0]);
  if (left && right && left !== right) return next.match(COMPOUND_HEAD)?.[0] ?? "";
  return "";
};

/** 句の列を見直して、語の途中にある境目を消す（次の句の頭を、前の句へ移す） */
const keepWords = phrases => {
  const out = [];
  for (const phrase of phrases) {
    let piece = phrase;
    while (out.length > 0 && piece) {
      const previous = out[out.length - 1];
      const head = stickHead(previous, piece);
      if (!head) break;
      if (previous.length + head.length > MAX_UNIT) {
        // 前の句が長くて付けられないときは、またいでいる機能語の前半を次の句へ送る（CloudFormationに｜よる → CloudFormation｜による）
        const back = ENDS_OPEN.test(previous) ? 0 : spannedWord(previous, piece);
        if (back > 0 && back < previous.length) {
          out[out.length - 1] = previous.slice(0, -back);
          piece = previous.slice(-back) + piece;
        }
        break;
      }
      out[out.length - 1] = previous + head;
      piece = piece.slice(head.length);
    }
    if (piece) out.push(piece);
  }
  return out;
};

/** 文字列を句に分ける。前後の空白はそのまま残す */
function phrasesOf(text) {
  const lead = text.match(/^\s*/)[0];
  const tail = text.match(/\s*$/)[0];
  const core = text.slice(lead.length, text.length - tail.length);
  // 文字参照を含む文字列は触らない（参照の途中で区切らないため）
  if (!core || !JAPANESE.test(core) || core.includes("&")) return null;
  // 開きかっこで終わる句は、かっこを次の句の先頭へ送る（行の終わりに「（」が残らない）
  const phrases = [];
  let carry = "";
  for (const piece of parser.parse(core).flatMap(splitLong)) {
    const open = piece.match(/[（「『［〔【(]+$/)?.[0] ?? "";
    const body = carry + piece.slice(0, piece.length - open.length);
    carry = open;
    if (body) phrases.push(body);
  }
  if (carry) phrases.push(carry);
  // 折り返さない空白（U+00A0）の前後では切らない（製品名の途中で折れないように）。
  // 和文と英数字の境目にも切れ目を入れない。Safari は、境目に幅のない空白があると、
  // 和欧の間のアキ（text-autospace）を付けないので、アキが不ぞろいになる
  const LATIN = /[A-Za-z0-9]/;
  const mixed = (left, right) =>
    (LATIN.test(left) && JAPANESE.test(right)) || (JAPANESE.test(left) && LATIN.test(right));
  const joined = [];
  for (const piece of phrases) {
    const previous = joined[joined.length - 1];
    // 和欧の境目をつなぐのは、つないだ結果が 1 行に収まる長さ（14 字まで）のときだけ。
    // 長いかたまりを作ると、狭い画面で行からはみ出す
    const glue =
      previous !== undefined &&
      (previous.endsWith("\u00A0") ||
        piece.startsWith("\u00A0") ||
        (mixed(previous.slice(-1), piece[0]) && previous.length + piece.length <= 14));
    if (glue) {
      joined[joined.length - 1] = previous + piece;
    } else {
      joined.push(piece);
    }
  }
  return { lead, tail, phrases: keepWords(joined) };
}

function wrapHtml(html) {
  if (!/<html[^>]*\blang="ja"/.test(html) || /<html[^>]*\bdata-bx\b/.test(html)) return null;
  // 文字参照（&amp; など）は解かずに、元の書き方のまま扱う
  const document = parseDocument(html, { withStartIndices: true, withEndIndices: true, decodeEntities: false });
  const edits = [];
  let count = 0;

  const visit = (node, block, skip) => {
    if (node.type === "text") {
      if (block && !skip) block.texts.push(node);
      return;
    }
    if (node.type !== "tag" && node.type !== "root") return;
    let nextBlock = block;
    let nextSkip = skip;
    if (node.type === "tag") {
      if (
        SKIP_TAGS.has(node.name) ||
        node.attribs?.["data-c"] !== undefined ||
        classesOf(node).some(name => SKIP_CLASSES.has(name))
      ) {
        nextSkip = true;
      }
      if (BLOCKS.has(node.name)) {
        nextBlock = { node, texts: [] };
        blocks.push(nextBlock);
      }
    }
    for (const child of node.children ?? []) visit(child, nextBlock, nextSkip);
  };
  const blocks = [];
  visit(document, null, false);

  for (const block of blocks) {
    // 入れ子の対象（li の中の p など）は、内側の要素のほうで処理する
    // 空白だけの文字列（タグの間の改行など）は数えない。数えると「最後の文字列」を取り違える
    const texts = block.texts.filter(node => node.data.trim() !== "");
    if (texts.length === 0) continue;
    let touched = false;
    texts.forEach((node, position) => {
      const parts = phrasesOf(node.data);
      if (!parts) return;
      const { lead, tail, phrases } = parts;
      const isLast = position === texts.length - 1;
      // 最後の行に 1〜3 字だけ残らないよう、末尾の句（合わせて 5 字以上になるまで）を 1 つにまとめる
      let keep = 0;
      if (isLast && phrases.length > 1) {
        keep = 1;
        let size = phrases[phrases.length - 1].length;
        // まとめた結果が長くなりすぎる（1 行に入らない）ときは、まとめない
        while (size < 5 && keep < phrases.length && size + phrases[phrases.length - keep - 1].length <= MAX_PHRASE + 6) {
          keep += 1;
          size += phrases[phrases.length - keep].length;
        }
      }
      const pieces = phrases.slice(0, phrases.length - keep);
      if (keep > 0) pieces.push(phrases.slice(phrases.length - keep).join(""));
      if (pieces.length < 2) return;
      count += pieces.length - 1;
      touched = true;
      edits.push({ start: node.startIndex, end: node.endIndex + 1, text: lead + pieces.join(BREAK) + tail });
    });
    // 処理した要素にだけ印を付ける（印のない要素は、ブラウザの既定の折り返しのまま）
    if (touched) {
      const at = block.node.startIndex + 1 + block.node.name.length;
      edits.push({ start: at, end: at, text: " data-bx" });
    }
  }

  const htmlTag = html.match(/<html\b/);
  edits.push({ start: htmlTag.index + 5, end: htmlTag.index + 5, text: " data-bx" });

  // 後ろから書き換える（前の位置がずれないように）
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  let result = html;
  for (const edit of edits) result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  return { result, count };
}

const files = await htmlFiles(DIST);
let total = 0;
let changed = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");
  const done = wrapHtml(html);
  if (!done) continue;
  // 字の並びが変わっていないことを確かめる（タグを除いた文字が同じ）
  const plain = value => value.replace(/<[^>]*>/g, "").replace(/[\s\u200B]+/g, "");
  if (plain(done.result) !== plain(html)) {
    console.error(`✗ ${file}: 文字が変わってしまうため、書き換えを中止しました。`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(file, done.result);
  total += done.count;
  changed += 1;
}
console.log(`phrase-wrap: ${changed} ページに文節の切れ目を ${total} か所入れました。`);
