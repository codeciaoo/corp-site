// 行の折り返しの検査（幅 375px）。Chrome と WebKit（iPhone の Safari に近い）の両方で、ビルド結果を測る。
//   node scripts/wrap-check.mjs [--base http://localhost:4398] [--engine chrome|webkit|both]
// 文字ごとの位置から行を割り出し、次を数える。
//   カタカナ語の途中／複合語の途中／複合動詞の途中／接尾語・機能語の途中／欧文・数字の途中／
//   文末の 1 字が行頭／助詞が行頭／最終行が 2 字以下
//   複合語の途中: カタカナ・漢字・欧文が続く語の境目で折れている（技術／コンサルティング、AI／チャット、
//                 サブスクリプション／型）
//   複合動詞の途中: 「漢字＋連用形のかな」の次の行が「漢字＋送り仮名」で始まる（切り／替えます）
//   接尾語・機能語の途中: 行頭が「型」「向け」「ための」「として」など（プロになる／ための）か、
//                 「として」「について」などが行をまたいで割れている（合格と／して）
// 合格の条件: 見出し、段落、箇条書き、表、図の説明（本文を含む）で、
//             「カタカナ語の途中」「複合語の途中」「複合動詞の途中」「接尾語・機能語の途中」「最終行が 2 字以下」が 0 件。
//             どちらのブラウザでも横あふれが 0px。
// 測り方は、審査（design/qa/jury-r2-mobile/check.mjs）と同じ。結果は design/qa/wrap-<engine>.json。
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, webkit } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};
const engineArg = option("engine", "both");
const ENGINES = engineArg === "both" ? ["chrome", "webkit"] : [engineArg];
let base = option("base", "");

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
const STRICT_TAGS = new Set(["h1", "h2", "h3", "h4", "p", "li", "dd", "dt", "figcaption"]);
const STRICT_KINDS = new Set([
  "カタカナ語の途中",
  "複合語の途中",
  "複合動詞の途中",
  "接尾語・機能語の途中",
  "最終行が2字以下",
]);

let server;
if (!base) {
  const port = 4396;
  server = spawn("node", [join(root, "scripts/qa.mjs"), "--serve", `--port=${port}`], { stdio: "ignore" });
  await new Promise(done => setTimeout(done, 1200));
  base = `http://localhost:${port}`;
}

const measure = page =>
  page.evaluate(() => {
    const visible = el => {
      const r = el.getBoundingClientRect();
      if (r.width <= 1 || r.height <= 1) return false;
      const s = getComputedStyle(el);
      return s.visibility !== "hidden" && s.display !== "none" && !el.closest(".sr, [hidden], noscript");
    };
    const HIRA = /[ぁ-ゖ]/;
    const KATA = /[ァ-ヺー]/;
    const LATIN = /[A-Za-z0-9]/;
    const PUNCT = /[、。，．）」』〕】・：；！？]/;
    const PARTICLES = "はがをにのでともへや";
    const KANJI = /[一-龥々]/;
    // 複合語の字（カタカナ、漢字、欧文と数字）
    const kindOf = ch => (KATA.test(ch) ? "kata" : KANJI.test(ch) ? "kanji" : LATIN.test(ch) ? "latin" : "");
    // 複合動詞の前半（漢字＋連用形のかな）と、後半（漢字＋助詞でないかな）
    const VERB_HEAD = /[一-龥々][りきしちいみびぎえけげせめれね]$/;
    const VERB_TAIL = /^[一-龥々][ぁ-ゖ]/;
    const NOT_VERB = "はがをにのでともへやか";
    // 行頭に来てはいけない接尾語と機能語
    const SUFFIX_HEAD = /^(型|向け|向き|ための|ように|ような|として|について|によって|による|において|にとって)/;
    // 行をまたいで割れてはいけない機能語
    const FUNCTION_WORDS = ["として", "ための", "について", "によって", "による", "において", "にとって", "に対して", "ように", "ような"];
    const splitsWord = (tail, head) => {
      const joined = tail + head;
      return FUNCTION_WORDS.some(word => {
        for (let at = joined.indexOf(word); at !== -1; at = joined.indexOf(word, at + 1)) {
          if (at < tail.length && at + word.length > tail.length) return true;
        }
        return false;
      });
    };
    const blocks = [...document.querySelectorAll("h1, h2, h3, h4, p, li, dd, dt, figcaption, label")].filter(
      el => visible(el) && !el.closest("[data-menu]") && !el.querySelector("p, li, h1, h2, h3, h4, dd, dt"),
    );
    const flags = [];
    const range = document.createRange();
    for (const el of blocks) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const chars = [];
      let node;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || parent.closest(".sr, [hidden]")) continue;
        const style = getComputedStyle(parent);
        if (style.visibility === "hidden" || style.display === "none") continue;
        const text = node.textContent;
        for (let i = 0; i < text.length; i += 1) {
          if (/[\s\u200B]/.test(text[i])) continue;
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const rect = range.getClientRects()[0];
          if (!rect || rect.width === 0) continue;
          // owner: この字が入っている、いちばん近い「インラインでない」要素（積んで置いた部品の境目を見分けるため）
          let owner = parent;
          while (owner !== el && getComputedStyle(owner).display === "inline") owner = owner.parentElement;
          chars.push({ ch: text[i], top: rect.top, bottom: rect.bottom, left: rect.left, owner });
        }
      }
      if (chars.length < 2) continue;
      const lines = [[chars[0]]];
      for (let i = 1; i < chars.length; i += 1) {
        const prev = chars[i - 1];
        const c = chars[i];
        const sameLine = c.top < prev.bottom - (prev.bottom - prev.top) * 0.5 && c.left > prev.left - 1;
        if (sameLine) lines[lines.length - 1].push(c);
        else lines.push([c]);
      }
      if (lines.length < 2) continue;
      const strs = lines.map(line => line.map(c => c.ch).join(""));
      const tag = el.tagName.toLowerCase();
      // 行の境目が、別々の子要素（ブロックや inline-block の部品）の境目なら、意図した改行
      const structural = i => lines[i - 1][lines[i - 1].length - 1].owner !== lines[i][0].owner;
      for (let i = 1; i < strs.length; i += 1) {
        if (structural(i)) continue;
        const prevLast = strs[i - 1].slice(-1);
        const first = strs[i][0];
        const second = strs[i][1] ?? "";
        const sample = `${strs[i - 1].slice(-8)}／${strs[i].slice(0, 8)}`;
        let kind = "";
        const left = kindOf(prevLast);
        const right = kindOf(first);
        if (KATA.test(prevLast) && KATA.test(first)) kind = "カタカナ語の途中";
        else if (LATIN.test(prevLast) && LATIN.test(first)) kind = "欧文・数字の途中";
        else if (left && right && left !== right) kind = "複合語の途中";
        else if (VERB_HEAD.test(strs[i - 1]) && VERB_TAIL.test(strs[i]) && !NOT_VERB.includes(second)) kind = "複合動詞の途中";
        else if (!PUNCT.test(prevLast) && (SUFFIX_HEAD.test(strs[i]) || splitsWord(strs[i - 1].slice(-4), strs[i].slice(0, 4))))
          kind = "接尾語・機能語の途中";
        else if (HIRA.test(first) && PUNCT.test(second)) kind = "文末の1字が行頭";
        else if (PARTICLES.includes(first) && !HIRA.test(prevLast)) kind = "助詞が行頭";
        if (kind) flags.push({ kind, tag, sample });
      }
      const last = strs[strs.length - 1];
      if (!structural(strs.length - 1) && last.replace(/[、。）」』]/g, "").length <= 2) {
        flags.push({ kind: "最終行が2字以下", tag, sample: `${strs[strs.length - 2].slice(-8)}／${last}` });
      }
    }
    return flags;
  });

let failed = 0;
for (const engine of ENGINES) {
  const browser = engine === "webkit" ? await webkit.launch() : await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: engine !== "webkit" ? true : undefined });
  await context.route("**/api/**", route => route.abort());
  const page = await context.newPage();
  const out = { date: new Date().toISOString(), engine, pages: {} };
  const totals = {};
  let strict = 0;
  console.log(`\n■ 折り返し（${engine}、幅 375px）`);
  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.evaluate(top => window.scrollTo(0, top), y);
      await page.waitForTimeout(40);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);
    const flags = await measure(page);
    // 横あふれも、両方のブラウザで見る（WebKit だけで起きることがある）
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) {
      strict += 1;
      console.log(`  ✗ ${route} 横あふれ ${overflow}px`);
    }
    out.pages[route] = flags;
    const counts = {};
    for (const flag of flags) {
      counts[flag.kind] = (counts[flag.kind] ?? 0) + 1;
      totals[flag.kind] = (totals[flag.kind] ?? 0) + 1;
      if (STRICT_TAGS.has(flag.tag) && STRICT_KINDS.has(flag.kind)) {
        strict += 1;
        console.log(`  ✗ ${route} <${flag.tag}> ${flag.kind}: ${flag.sample}`);
      }
    }
    console.log(`  ${route.padEnd(22)} ${flags.length} 件 ${JSON.stringify(counts)}`);
  }
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  console.log(`  合計 ${sum} 件 ${JSON.stringify(totals)} ／ 見出し・本文・箇条書きの不合格 ${strict} 件`);
  out.totals = totals;
  out.strict = strict;
  failed += strict;
  await writeFile(join(root, "design", "qa", `wrap-${engine}.json`), JSON.stringify(out, null, 2));
  await browser.close();
}
server?.kill();
process.exit(failed === 0 ? 0 : 1);
