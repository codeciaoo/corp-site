// サイトの文章を 1 つのファイルに書き出す（文章の見直し用）。ビルド結果を読むので、先に pnpm build を実行する。
//   node scripts/dump-copy.mjs   → design/CONTENT.md
// 書き出すのは、画面に出る文字と読み上げ用の文字（title、description、見出し、本文、一覧、表、ボタン、入力欄の名前）。
import { spawn } from "node:child_process";
import { readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 4397;
const BASE = `http://localhost:${PORT}`;

const projectSlugs = (await readdir(join(root, "src/content/projects")))
  .filter(name => name.endsWith(".md"))
  .map(name => `/projects/${name.replace(/\.md$/, "")}`)
  .sort();
const memberSlugs = (await readdir(join(root, "dist/members"), { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => `/members/${entry.name}`)
  .sort();

const ROUTES = [
  "/",
  "/approach",
  "/projects",
  ...projectSlugs,
  "/about",
  "/members",
  ...memberSlugs,
  "/careers",
  "/careers/fullstack",
  "/careers/intern",
  "/contact",
  "/privacy-policy",
  "/404.html",
];

const server = spawn("node", [join(root, "scripts/qa.mjs"), "--serve", `--port=${PORT}`], { stdio: "ignore" });
await new Promise(done => setTimeout(done, 1200));

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = [
  "# サイトの文章（ビルド結果からの書き出し）",
  "",
  "このファイルは `node scripts/dump-copy.mjs` が作ります。手で直さないでください。文章を直すときは `src/data/`、`src/content/`、各コンポーネントを直して、作り直します。",
  "",
  "書き方の規則は `design/BRIEF-company.md` の §3 にあります。",
  "",
];

try {
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
    const data = await page.evaluate(() => {
      const SELECTOR = "h1,h2,h3,h4,p,li,dt,dd,th,td,label,legend,figcaption,summary,button,a.btn,option";
      const textOf = element => {
        const copy = element.cloneNode(true);
        copy.querySelectorAll("[aria-hidden='true'], script, style, svg").forEach(node => node.remove());
        return copy.textContent.replace(/\u200B/g, "").replace(/\s+/g, " ").trim();
      };
      const collect = scope => {
        const lines = [];
        for (const element of scope.querySelectorAll(SELECTOR)) {
          if (element.closest("[aria-hidden='true']")) continue;
          // 中に対象の要素を持つ入れ物は飛ばす（中身のほうで書き出す）
          if (element.querySelector(SELECTOR) && !/^(BUTTON|A|LABEL)$/.test(element.tagName)) continue;
          if (element.closest("button, a.btn, label") && !/^(BUTTON|A|LABEL)$/.test(element.tagName)) continue;
          const text = textOf(element);
          if (!text) continue;
          const tag = element.tagName.toLowerCase();
          lines.push({ tag, text });
        }
        return lines;
      };
      return {
        title: document.title,
        description: document.querySelector("meta[name='description']")?.content ?? "",
        main: collect(document.querySelector("main")),
        header: collect(document.querySelector("header") ?? document.createElement("div")),
        footer: collect(document.querySelector("footer") ?? document.createElement("div")),
      };
    });

    const format = lines =>
      lines.map(({ tag, text }) => {
        if (/^h[1-4]$/.test(tag)) return `\n${"#".repeat(Number(tag[1]) + 2)} ${text}\n`;
        if (tag === "li" || tag === "option") return `- ${text}`;
        if (tag === "dt" || tag === "th") return `**${text}**`;
        if (tag === "button" || tag === "a") return `［ボタン］${text}`;
        if (tag === "label" || tag === "legend") return `［入力欄］${text}`;
        return text;
      });

    out.push(`## ${route === "/404.html" ? "/404" : route}`, "", `- title: ${data.title}`, `- description: ${data.description}`, "");
    out.push(...format(data.main), "");
    if (route === "/") {
      out.push("## 共通（ヘッダーとフッター）", "", ...format(data.header), "", ...format(data.footer), "");
    }
  }
} finally {
  await browser.close();
  server.kill();
}

const text = out.join("\n").replace(/\n{3,}/g, "\n\n");
await writeFile(join(root, "design/CONTENT.md"), text);
console.log(`design/CONTENT.md に ${ROUTES.length} ページ分を書き出しました（${text.length} 字）`);
