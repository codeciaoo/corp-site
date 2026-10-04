// 「線と塗り」の文字を 1 字ずつの要素に分ける。サーバー（Fx.astro）とブラウザ（ticker）の両方で使う。

const YAKU_RIGHT = "、。，．」』）";
const YAKU_LEFT = "「『（";
const YAKU_CENTER = "・";

const LATIN = /[A-Za-z0-9%]/;
const JAPANESE = /[ぁ-んァ-ヶ一-龥々ー]/;

type Script = "latin" | "japanese" | "other";

const scriptOf = (ch: string): Script => {
  if (LATIN.test(ch)) return "latin";
  if (JAPANESE.test(ch)) return "japanese";
  return "other";
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const yakuClass = (ch: string): string => {
  if (YAKU_RIGHT.includes(ch)) return " ykr";
  if (YAKU_LEFT.includes(ch)) return " ykl";
  if (YAKU_CENTER.includes(ch)) return " ykc";
  return "";
};

/** `|` は「ここで折り返してよい」の印。表示と読み上げからは取り除く。 */
export const plainText = (text: string): string =>
  text.replace(/\|/g, "").replace(/\s+/g, " ").trim();

/**
 * 句（折り返しの単位）ごとに nowrap の箱へ入れ、1 字ずつ span にした HTML を返す。
 * 句は「、」「。」の直後と、空白、`|` で区切る。
 * 文章には和文と英数字の間の空白を書かないので、その境目には字間のアキ（.aq）を付ける。
 */
export const splitFxHtml = (text: string): string => {
  const source = text.replace(/\s+/g, " ").trim();
  const tokens = source.match(/ |\||[^ |、。]+[、。]?|[、。]/g) ?? [];
  const letters = [...source.replace(/[ |]/g, "")];
  let index = 0;
  let html = "";
  for (const [position, token] of tokens.entries()) {
    if (token === " ") {
      html += " ";
      continue;
    }
    if (token === "|") {
      html += "<wbr>";
      continue;
    }
    const chars = [...token];
    // 句の終わりのあとが空白なら、空白が区切りになる。和欧の境目のアキは足さない。
    // その句には印（.sp）を付けて、空きを少し広げる
    const spaceFollows = tokens[position + 1] === " ";
    html += spaceFollows ? '<span class="ph sp">' : '<span class="ph">';
    for (const [offset, ch] of chars.entries()) {
      const safe = escapeHtml(ch);
      const next = letters[index + 1];
      const here = scriptOf(ch);
      const there = next ? scriptOf(next) : "other";
      const last = offset === chars.length - 1;
      const gap =
        here !== "other" &&
        there !== "other" &&
        here !== there &&
        !(last && spaceFollows)
          ? " aq"
          : "";
      html += `<span class="ch${yakuClass(ch)}${gap}" data-c="${safe}" style="--i:${index}">${safe}</span>`;
      index += 1;
    }
    html += "</span>";
  }
  return html;
};
