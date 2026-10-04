// 品質ゲート。ビルド済みの dist/ を配信し、全ページを機械で検査する。
//   node scripts/qa.mjs            … 全部（禁止語・ページ検査・Lighthouse）
//   node scripts/qa.mjs --no-lh    … Lighthouse を省く（速い）
//   node scripts/qa.mjs --words    … 禁止語だけ
//   node scripts/qa.mjs --lh-only [--routes=/,/about] … Lighthouse だけ（ページを絞れる）
//   node scripts/qa.mjs --serve [--port=4398] … dist/ を配信するだけ（スクリーンショットをビルド結果で撮るとき）
// 結果は design/qa/latest.json に保存し、1 つでも落ちたら終了コード 1。
import { spawn } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createBrotliCompress, createGzip } from "node:zlib";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");
const OUT = join(root, "design", "qa");
const portArg = process.argv.find(arg => arg.startsWith("--port="));
const PORT = portArg ? Number(portArg.slice("--port=".length)) : 4399;
const BASE = `http://localhost:${PORT}`;
const flags = new Set(process.argv.slice(2));
const routesArg = process.argv.find(arg => arg.startsWith("--routes="));

const ROUTES = [
  "/",
  "/approach",
  "/projects",
  "/projects/core-saas",
  "/projects/safety-ai",
  // java-migration-tools は draft（代表の確認待ち）なので、ページが無い
  "/projects/aws-account-platform",
  "/projects/ec2-to-ecs",
  "/about",
  "/members",
  "/members/tahara",
  "/members/ichinose",
  "/members/akiyama",
  "/careers",
  "/careers/fullstack",
  "/careers/intern",
  "/contact",
  "/privacy-policy",
  "/404.html",
];
// Lighthouse は時間がかかるので、型の違う主要ページに絞る
const LH_ROUTES = routesArg
  ? routesArg.slice("--routes=".length).split(",")
  : ["/", "/approach", "/projects", "/projects/core-saas", "/about", "/members", "/careers", "/contact"];
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];
const GATES = { lighthouse: 90, lcpMs: 2500, cls: 0.1, longTaskMs: 50 };

const failures = [];
const fail = message => {
  failures.push(message);
  console.log(`  ✗ ${message}`);
};

/* ───────── 1. 禁止語 ───────── */

const PUBLIC_WORDS = ["弊社", "御社", "させていただ", "最先端", "革新的", "圧倒的", "ソリューション"];
const TEXT_EXT = new Set([".astro", ".ts", ".tsx", ".md", ".json", ".css", ".svg", ".html", ".mjs", ".toml", ".txt"]);
const SCAN_DIRS = ["src", "public", "design", "tasks", "scripts"];
const SCAN_FILES = ["README.md", "CLAUDE.md", "astro.config.mjs", "package.json"];
const SKIP = [
  join(root, "tasks", "private"),
  join(root, "design", "qa"),
  // ビルド結果から書き出したファイル（中身はサイトの文章と同じ。元の src/ を検査している）
  join(root, "design", "CONTENT.md"),
  join(root, "scripts", "qa.mjs"),
];

async function walk(dir, out = []) {
  if (SKIP.includes(dir) || !existsSync(dir)) return out;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (SKIP.includes(path)) continue;
    if (entry.isDirectory()) await walk(path, out);
    else if (TEXT_EXT.has(extname(entry.name))) out.push(path);
  }
  return out;
}

async function checkWords() {
  console.log("\n■ 禁止語");
  const privateFile = join(root, "tasks", "private", "forbidden-words.txt");
  const privateWords = existsSync(privateFile)
    ? (await readFile(privateFile, "utf8"))
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#"))
    : [];
  if (privateWords.length === 0) console.log("  （手元の禁止語リストなし。一般的な語だけ検査）");
  const pattern = new RegExp([...PUBLIC_WORDS, ...privateWords, "[0-9０-９] ?万円"].join("|"));
  const files = [];
  for (const dir of SCAN_DIRS) await walk(join(root, dir), files);
  for (const file of SCAN_FILES) if (existsSync(join(root, file))) files.push(join(root, file));
  let hits = 0;
  for (const file of files) {
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, index) => {
      const match = line.match(pattern);
      if (!match) return;
      // 資本金と、採用の報酬、メンバー個人の実績の金額は許可。文体ルールの説明（例示）も許可
      if (/資本金|capital|月額|時給|報酬|売上/.test(line)) return;
      // 非公開の語が、別のカタカナ語の一部として出ているだけのとき（前後がカタカナ）は数えない。
      // 例外にしたい語そのものは、このファイルに書かない（このファイルは公開される）
      const KATAKANA = /[ァ-ヺー]/;
      const before = line[match.index - 1] ?? "";
      const after = line[match.index + match[0].length] ?? "";
      if (privateWords.includes(match[0]) && /^[ァ-ヺー]+$/.test(match[0]) && (KATAKANA.test(before) || KATAKANA.test(after))) return;
      if (/使わない|使いません|付けません|置きません|禁止|書かない|NG|避け|やめ|消す/.test(line)) return;
      hits += 1;
      fail(`${relative(root, file)}:${index + 1} 「${match[0]}」 ${line.trim().slice(0, 80)}`);
    });
  }
  console.log(`  ${files.length} ファイルを検査、${hits} 件`);
  return { files: files.length, hits };
}

/* ───────── 文字の指定（書体・太さ・大きさは site.css の型だけを使う） ───────── */

const TYPE_SKIP = [
  join(root, "src", "components", "pages"),
  join(root, "src", "components", "ui"),
  join(root, "src", "components", "shared"),
  join(root, "src", "components", "projects"),
  join(root, "src", "layouts", "StandaloneLayout.astro"),
  join(root, "src", "styles", "globals.css"),
  join(root, "src", "styles", "fonts.generated.css"),
  join(root, "src", "styles", "fonts.rest.generated.css"),
];
const TYPE_RULES = [
  [/font-size:\s*([^;]+);/, /^(var\(--fs-[a-z0-9]+\)|var\(--wk-h2\)|[\d.]+em|inherit)$/],
  [/font-weight:\s*([^;]+);/, /^(var\(--fw-(regular|bold)\)|inherit)$/],
  [/font-family:\s*([^;]+);/, /^(var\(--f-(sans|mono)\)|inherit)$/],
];

async function checkTypeTokens() {
  console.log("\n■ 文字の指定（型の外の値が無いこと）");
  const files = (await walk(join(root, "src"))).filter(
    file => [".astro", ".css"].includes(extname(file)) && !TYPE_SKIP.some(skip => file.startsWith(skip)),
  );
  let hits = 0;
  for (const file of files) {
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, index) => {
      // 理由を書いた例外（「型の外: …」）は、その行と次の行を許可
      if (line.includes("型の外") || (lines[index - 1] ?? "").includes("型の外")) return;
      for (const [pattern, allowed] of TYPE_RULES) {
        const match = line.match(pattern);
        if (!match || allowed.test(match[1].trim())) continue;
        hits += 1;
        fail(`${relative(root, file)}:${index + 1} ${line.trim()}`);
      }
    });
  }
  console.log(`  ${files.length} ファイルを検査、${hits} 件`);
  return { files: files.length, hits };
}

/* ───────── 2. dist の配信 ───────── */

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".mjs", ".json", ".svg", ".xml", ".txt"]);

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const candidates = [join(DIST, clean), join(DIST, clean, "index.html"), join(DIST, `${clean}.html`)];
  for (const candidate of candidates) {
    if (!candidate.startsWith(DIST)) continue;
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      /* 次の候補へ */
    }
  }
  return null;
}

function startServer() {
  const server = createServer(async (request, response) => {
    let file = await resolveFile(request.url ?? "/");
    let status = 200;
    if (!file) {
      file = join(DIST, "404.html");
      status = 404;
    }
    const ext = extname(file);
    const headers = {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      // 本番（Cloudflare Pages）と同じく、ハッシュ付きの資産は長くキャッシュする
      "Cache-Control": /\/(_astro|fonts)\//.test(file) ? "public, max-age=31536000, immutable" : "no-cache",
    };
    const accept = request.headers["accept-encoding"] ?? "";
    const stream = createReadStream(file);
    if (COMPRESSIBLE.has(ext) && accept.includes("br")) {
      response.writeHead(status, { ...headers, "Content-Encoding": "br" });
      stream.pipe(createBrotliCompress()).pipe(response);
    } else if (COMPRESSIBLE.has(ext) && accept.includes("gzip")) {
      response.writeHead(status, { ...headers, "Content-Encoding": "gzip" });
      stream.pipe(createGzip()).pipe(response);
    } else {
      response.writeHead(status, headers);
      stream.pipe(response);
    }
  });
  return new Promise((done, fail) => {
    server.once("error", error => {
      if (error.code !== "EADDRINUSE") return fail(error);
      // 同じポートで、すでに配信している（前に起動したものが残っている）
      console.error(`ポート ${PORT} は使用中です。すでに ${BASE} で配信しているなら、そのまま開けます。`);
      console.error(`止めるとき: lsof -ti tcp:${PORT} | xargs kill`);
      process.exit(1);
    });
    server.listen(PORT, () => done(server));
  });
}

/* ───────── 文章の検査（表示される文を、yomiyasu の規則で機械的に見る） ─────────
   規則の出どころ: https://github.com/nanaism/yomiyasu （SKILL.md と references/slop-catalog.md）。
   同梱のリンターは実行せず、必要な検査をここに書き直している。 */

const SLOP_WORDS = [
  "手触り", "肌感", "温度感", "熱量", "血の通った", "泥臭",
  "解像度", "腹落ち", "メンタルモデル", "本質的", "地に足のついた", "等身大",
  "営み", "意思決定OS", "土台", "羅針盤", "起爆剤", "触媒",
  "真理", "虚飾", "境地", "美学", "深淵", "極致", "宿命",
  "正本", "落とし穴", "桁違い", "別物",
];
const PROSE_PATTERNS = [
  [/(地味に|じわじわ)効[かきくけい]/, "比喩の動詞「効く」"],
  [/静かに(壊れ|落ち|失敗)/, "直訳調「静かに壊れる」"],
  [/黙って(無視|捨て|スキップ|破棄)/, "直訳調「黙って無視される」"],
  [/側に倒[すしせ]/, "比喩の動詞「倒す」"],
  [/時間[をに]溶か/, "比喩の動詞「溶かす」"],
  [/(1つずつ|一つずつ)潰/, "比喩の動詞「潰す」"],
  [/(に|まで|へ)踏み込[んむみま]/, "比喩の動詞「踏み込む」"],
  [/添え(ます|る|て)/, "比喩の動詞「添える」"],
  [/握り?(ます|る|って)/, "比喩の動詞「握る」"],
  [/した瞬間/, "直訳調「〜した瞬間」"],
  [/重要なのは|結論から言うと|正直に言うと/, "前置き"],
  [/いかがでした|ぜひ(参考|試し|活用)|参考になれば幸い/, "決まり文句の締め"],
  [/に他なりません|と言えるでしょう/, "後置きのラベル"],
];
const JP = "ぁ-んァ-ヶ一-龥々ー";
const SPACE_BETWEEN = new RegExp(`[${JP}][ \u00a0]+[A-Za-z0-9]|[A-Za-z0-9%][ \u00a0]+[${JP}]`);
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}-\u{2B55}]/u;
// 文の長さと読点は、法務の文（個人情報保護方針）では見ない
const SENTENCE_EXEMPT = new Set(["/privacy-policy"]);
const SENTENCE_FAIL = { length: 75, commas: 4 };
const SENTENCE_WARN = { length: 60, commas: 3 };

async function checkProse(page, route) {
  const data = await page.evaluate(() => {
    const skip = el => el.closest("script, style, noscript, [aria-hidden='true'], .sr, svg");
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent.replace(/\u200B/g, "").replace(/\s+/g, " ").trim();
      if (!text || !node.parentElement || skip(node.parentElement)) continue;
      nodes.push(text);
    }
    // 見出しと、線と塗りで組んだ大きい言葉（.fx）は、句読点を使わない
    const headings = [...document.querySelectorAll("h1, h2, h3, h4, .fx > .sr, .btn, nav a")]
      .filter(el => !el.closest("[aria-hidden='true']") && !el.closest(".prose"))
      .map(el => el.textContent.replace(/\u200B/g, "").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    const blocks = [...document.querySelectorAll("main p, main li, main dd, main blockquote")]
      .filter(el => !el.closest("[aria-hidden='true'], .sr") && !el.querySelector("p, li, dd"))
      .map(el => el.innerText.replace(/\u200B/g, "").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    return { nodes, blocks, headings };
  });

  const errors = [];
  const warnings = [];
  for (const text of data.nodes) {
    // 見出しは句の区切りに空白を使うので、空白の検査は文（「。」で終わるもの）だけにする
    if (/。/.test(text) && SPACE_BETWEEN.test(text)) errors.push(`和文と英数字の間の空白「${text.slice(0, 40)}」`);
    if (/[—―]/.test(text)) errors.push(`ダッシュ「${text.slice(0, 40)}」`);
    if (EMOJI.test(text)) errors.push(`絵文字「${text.slice(0, 40)}」`);
    for (const word of SLOP_WORDS) if (text.includes(word)) errors.push(`避ける語「${word}」: ${text.slice(0, 40)}`);
    for (const [pattern, name] of PROSE_PATTERNS) if (pattern.test(text)) errors.push(`${name}: ${text.slice(0, 40)}`);
  }
  if (!SENTENCE_EXEMPT.has(route)) {
    for (const heading of data.headings) {
      if (/[、。]/.test(heading)) errors.push(`見出しの句読点「${heading.slice(0, 40)}」`);
    }
  }
  let sentences = 0;
  let characters = 0;
  for (const block of data.blocks) {
    if (/[：:]$/.test(block)) errors.push(`文末のコロン「${block.slice(-30)}」`);
    if (SENTENCE_EXEMPT.has(route)) continue;
    for (const sentence of block.split(/(?<=[。！？])/).map(part => part.trim()).filter(Boolean)) {
      if (!/[。！？]$/.test(sentence)) continue;
      sentences += 1;
      characters += sentence.length;
      const commas = (sentence.match(/、/g) ?? []).length;
      if (sentence.length > SENTENCE_FAIL.length) errors.push(`長い文（${sentence.length}字）: ${sentence.slice(0, 44)}…`);
      else if (sentence.length > SENTENCE_WARN.length) warnings.push(`やや長い文（${sentence.length}字）: ${sentence.slice(0, 44)}…`);
      if (commas >= SENTENCE_FAIL.commas) errors.push(`読点 ${commas} 個: ${sentence.slice(0, 44)}…`);
      else if (commas >= SENTENCE_WARN.commas) warnings.push(`読点 ${commas} 個: ${sentence.slice(0, 44)}…`);
    }
  }
  return {
    errors: [...new Set(errors)],
    warnings: [...new Set(warnings)],
    sentences,
    averageLength: sentences ? Number((characters / sentences).toFixed(1)) : 0,
  };
}

/* ───────── 3. ページ検査（Playwright + axe） ───────── */

async function checkPages(browser) {
  console.log("\n■ ページ検査（横あふれ・コンソール・axe・見出し・キーボード）");
  const axeSource = await readFile(join(root, "node_modules", "axe-core", "axe.min.js"), "utf8");
  const results = [];

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();
    const errors = [];
    page.on("console", message => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", error => errors.push(String(error)));

    for (const route of ROUTES) {
      errors.length = 0;
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      // 画面に入ったときの動きを済ませてから検査する
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 600) {
        await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), y);
        await page.waitForTimeout(80);
      }
      await page.waitForTimeout(1200);

      const info = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll("h1").length,
        imagesWithoutAlt: [...document.querySelectorAll("img")].filter(img => !img.hasAttribute("alt")).length,
        title: document.title,
        lang: document.documentElement.lang,
        // 枠からはみ出して切れている文字（overflow: hidden / clip の中で幅が足りない要素）
        clipped: [...document.querySelectorAll("body *")]
          .filter(element => {
            if (element.closest(".sr") || !element.textContent.trim()) return false;
            // 画面に出さない要素（読み上げ専用、迷惑送信よけの欄）は対象外
            if (element.clientWidth <= 1 || element.clientHeight <= 1) return false;
            if (!/hidden|clip/.test(getComputedStyle(element).overflowX)) return false;
            return element.scrollWidth > element.clientWidth + 1;
          })
          .map(element => `${element.tagName.toLowerCase()}.${String(element.className).split(" ")[0]}`)
          .slice(0, 5),
        // 24px 未満の「線と塗り」の文字に、明るいほうのティール（紙の上で 3.06:1）を使っていないか。
        // 塗りは擬似要素なので、axe のコントラスト検査では拾えない
        smallTeal: [
          ...new Set(
            [...document.querySelectorAll(".fx .ch")]
              .filter(char => {
                if (parseFloat(getComputedStyle(char).fontSize) >= 24) return false;
                return getComputedStyle(char, "::after").color === "rgb(0, 154, 154)";
              })
              .map(char => char.closest(".fx").textContent.trim().slice(0, 14)),
          ),
        ].slice(0, 5),
      }));

      await page.evaluate(axeSource);
      const axe = await page.evaluate(async () => {
        const result = await window.axe.run(document, { resultTypes: ["violations"] });
        return result.violations.map(violation => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.length,
          sample: violation.nodes[0]?.target?.join(" "),
        }));
      });
      const serious = axe.filter(violation => violation.impact === "critical" || violation.impact === "serious");

      const label = `${route} @${viewport.name}`;
      // /404.html は静的サーバーが 404 を返すので、その 1 件のコンソールエラーは除く
      const realErrors = errors.filter(text => !(route === "/404.html" && /404/.test(text)));
      if (info.overflow > 0) fail(`${label}: 横あふれ ${info.overflow}px`);
      if (realErrors.length) fail(`${label}: コンソールエラー ${realErrors.length} 件 — ${realErrors[0]}`);
      if (info.h1 !== 1) fail(`${label}: h1 が ${info.h1} 個`);
      if (info.clipped.length) fail(`${label}: 文字が枠で切れている — ${info.clipped.join(", ")}`);
      if (info.smallTeal.length) fail(`${label}: 24px 未満の字に明るいティール — ${info.smallTeal.join(", ")}`);
      if (info.imagesWithoutAlt) fail(`${label}: alt のない画像 ${info.imagesWithoutAlt} 個`);
      if (info.lang !== "ja") fail(`${label}: html の lang が ${info.lang}`);
      for (const violation of serious) {
        fail(`${label}: axe ${violation.impact} ${violation.id} ×${violation.nodes} — ${violation.sample}`);
      }
      let prose;
      if (viewport.name === "1440") {
        prose = await checkProse(page, route);
        for (const message of prose.errors) fail(`${route}: 文章 — ${message}`);
      }
      results.push({ route, viewport: viewport.name, ...info, consoleErrors: realErrors.length, axe, prose });
    }
    await context.close();
  }
  console.log(`  ${ROUTES.length} ページ × ${VIEWPORTS.length} 幅 を検査`);
  const proseRows = results.filter(row => row.prose);
  const warningCount = proseRows.reduce((sum, row) => sum + row.prose.warnings.length, 0);
  console.log("\n■ 文章（平均の文長は 30〜45 字が目安）");
  for (const row of proseRows) {
    console.log(`  ${row.route.padEnd(22)} ${String(row.prose.sentences).padStart(3)} 文  平均 ${row.prose.averageLength} 字  注意 ${row.prose.warnings.length}`);
  }
  console.log(`  注意（不合格にはしない）: ${warningCount} 件`);
  return results;
}

async function checkKeyboard(browser) {
  console.log("\n■ キーボード操作（Tab で主要な導線に届くか、フォーカスの枠が見えるか）");
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const results = [];
  for (const route of ["/", "/projects", "/contact", "/careers"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    const seen = [];
    let invisible = 0;
    for (let index = 0; index < 60; index += 1) {
      await page.keyboard.press("Tab");
      const item = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.textContent ?? "").trim().slice(0, 24) || el.getAttribute("aria-label") || el.getAttribute("name") || "",
          href: el.getAttribute("href"),
          outlined: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0,
          visible: rect.width > 0 && rect.height > 0,
        };
      });
      if (!item) continue;
      seen.push(item);
      if (!item.outlined || !item.visible) invisible += 1;
    }
    const hrefs = new Set(seen.map(item => item.href).filter(Boolean));
    const label = `${route}`;
    if (!hrefs.has("/contact") && route !== "/contact") fail(`${label}: Tab でお問い合わせに届かない`);
    if (invisible > 0) fail(`${label}: フォーカスの枠が見えない要素 ${invisible} 個`);
    results.push({ route, focusable: seen.length, withoutOutline: invisible });
    console.log(`  ${label}: ${seen.length} 回の Tab、枠なし ${invisible}`);
  }
  await context.close();
  return results;
}

async function checkMotion(browser) {
  console.log("\n■ 動き（ヒーローのスクロール中の長いタスク、フレーム間隔、reduced-motion）");
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  const probe = await page.evaluate(async () => {
    const longTasks = [];
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) longTasks.push(Math.round(entry.duration));
    });
    observer.observe({ entryTypes: ["longtask"] });
    const gaps = [];
    let last = performance.now();
    let running = true;
    const tick = now => {
      gaps.push(now - last);
      last = now;
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const total = Math.min(2400, document.documentElement.scrollHeight - innerHeight);
    const started = performance.now();
    await new Promise(done => {
      const step = () => {
        const progress = Math.min(1, (performance.now() - started) / 2400);
        window.scrollTo(0, total * progress);
        if (progress < 1) requestAnimationFrame(step);
        else done();
      };
      requestAnimationFrame(step);
    });
    await new Promise(done => setTimeout(done, 600));
    running = false;
    observer.disconnect();
    gaps.shift();
    gaps.sort((a, b) => a - b);
    return {
      longTasks,
      frames: gaps.length,
      medianGapMs: Number(gaps[Math.floor(gaps.length / 2)].toFixed(1)),
      p95GapMs: Number(gaps[Math.floor(gaps.length * 0.95)].toFixed(1)),
      maxGapMs: Number(gaps[gaps.length - 1].toFixed(1)),
    };
  });
  await context.close();
  const worst = Math.max(0, ...probe.longTasks);
  if (worst > GATES.longTaskMs) fail(`/: スクロール中の長いタスク ${worst}ms（${probe.longTasks.length} 回）`);
  if (probe.p95GapMs > 20) fail(`/: フレーム間隔の 95 パーセンタイルが ${probe.p95GapMs}ms（60fps は 16.7ms）`);
  console.log(`  長いタスク ${probe.longTasks.length} 回、フレーム間隔 中央値 ${probe.medianGapMs}ms / 95% ${probe.p95GapMs}ms / 最大 ${probe.maxGapMs}ms`);

  // reduced-motion: アニメーションと遷移が止まっていること、エラーが出ないこと
  const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  const errors = [];
  reducedPage.on("pageerror", error => errors.push(String(error)));
  await reducedPage.goto(BASE + "/", { waitUntil: "networkidle" });
  await reducedPage.waitForTimeout(1500);
  const moving = await reducedPage.evaluate(
    () => document.getAnimations().filter(animation => animation.playState === "running").length,
  );
  const hasClass = await reducedPage.evaluate(() => document.documentElement.classList.contains("rm"));
  await reducedPage.screenshot({ path: join(OUT, "home-reduced-motion.png") });
  await reduced.close();
  if (!hasClass) fail("/: reduced-motion の印（html.rm）が付いていない");
  if (moving > 0) fail(`/: reduced-motion で動いているアニメーション ${moving} 個`);
  if (errors.length) fail(`/: reduced-motion でエラー — ${errors[0]}`);
  console.log(`  reduced-motion: 動いているアニメーション ${moving} 個`);
  return { ...probe, reducedMotionRunning: moving };
}

/* ───────── 4. Lighthouse（モバイル） ───────── */

function runLighthouse(url) {
  return new Promise((done, reject) => {
    const bin = join(root, "node_modules", ".bin", "lighthouse");
    const child = spawn(
      bin,
      [
        url,
        "--quiet",
        "--output=json",
        "--output-path=stdout",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--form-factor=mobile",
        '--chrome-flags=--headless=new --no-sandbox',
      ],
      { cwd: root },
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => (stdout += chunk));
    child.stderr.on("data", chunk => (stderr += chunk));
    child.on("close", code => {
      if (code !== 0) return reject(new Error(stderr.slice(-400)));
      try {
        done(JSON.parse(stdout));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

async function checkLighthouse() {
  const runsArg = process.argv.find(arg => arg.startsWith("--lh-runs="));
  const runs = runsArg ? Number(runsArg.split("=")[1]) : 3;
  console.log(`\n■ Lighthouse（モバイル。${runs} 回の中央値。4 項目すべて 90 以上、LCP < 2.5s、CLS < 0.1）`);
  const results = [];
  for (const route of LH_ROUTES) {
    const samples = [];
    for (let index = 0; index < runs; index += 1) {
      const report = await runLighthouse(BASE + route);
      const score = key => Math.round((report.categories[key]?.score ?? 0) * 100);
      samples.push({
        performance: score("performance"),
        accessibility: score("accessibility"),
        bestPractices: score("best-practices"),
        seo: score("seo"),
        lcpMs: Math.round(report.audits["largest-contentful-paint"].numericValue),
        cls: Number(report.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
        tbtMs: Math.round(report.audits["total-blocking-time"].numericValue),
        bytes: Math.round(report.audits["total-byte-weight"].numericValue / 1024),
      });
    }
    const pick = key => median(samples.map(sample => sample[key]));
    const row = {
      route,
      performance: pick("performance"),
      accessibility: pick("accessibility"),
      bestPractices: pick("bestPractices"),
      seo: pick("seo"),
      lcpMs: pick("lcpMs"),
      cls: pick("cls"),
      tbtMs: pick("tbtMs"),
      bytes: pick("bytes"),
      samples,
    };
    results.push(row);
    console.log(
      `  ${route.padEnd(22)} P${row.performance} A${row.accessibility} B${row.bestPractices} S${row.seo}  LCP ${row.lcpMs}ms  CLS ${row.cls}  TBT ${row.tbtMs}ms  ${row.bytes}KB`,
    );
    for (const [key, value] of Object.entries({ performance: row.performance, accessibility: row.accessibility, "best-practices": row.bestPractices, seo: row.seo })) {
      if (value < GATES.lighthouse) fail(`${route}: Lighthouse ${key} ${value}`);
    }
    if (row.lcpMs >= GATES.lcpMs) fail(`${route}: LCP ${row.lcpMs}ms`);
    if (row.cls >= GATES.cls) fail(`${route}: CLS ${row.cls}`);
  }
  return results;
}

/* ───────── 実行 ───────── */

await mkdir(OUT, { recursive: true });
const report = { date: new Date().toISOString(), gates: GATES };

if (flags.has("--serve")) {
  await startServer();
  console.log(`dist/ を ${BASE} で配信中（Ctrl+C で終了）`);
  await new Promise(() => {});
}

if (flags.has("--lh-only")) {
  const server = await startServer();
  report.lighthouse = await checkLighthouse();
  server.close();
  await writeFile(join(OUT, "lighthouse-only.json"), JSON.stringify(report, null, 2));
  process.exit(failures.length === 0 ? 0 : 1);
}

report.words = await checkWords();
report.typeTokens = await checkTypeTokens();

if (!flags.has("--words")) {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("\ndist/ がありません。先に pnpm build を実行してください。");
    process.exit(2);
  }
  const server = await startServer();
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    report.pages = await checkPages(browser);
    report.keyboard = await checkKeyboard(browser);
    report.motion = await checkMotion(browser);
  } finally {
    await browser.close();
  }
  if (!flags.has("--no-lh")) report.lighthouse = await checkLighthouse();
  server.close();
}

report.failures = failures;
await writeFile(join(OUT, "latest.json"), JSON.stringify(report, null, 2));
console.log(`\n${failures.length === 0 ? "✓ すべて合格" : `✗ ${failures.length} 件の不合格`}（design/qa/latest.json）`);
process.exit(failures.length === 0 ? 0 : 1);
