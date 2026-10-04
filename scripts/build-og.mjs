// SNS 共有用の画像（public/og.png、1200×630）を、サイトと同じ書体・字形で描いて保存する。
// 文言やロゴを変えたときに手で実行する: node scripts/build-og.mjs
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fontCss = (await readFile(join(root, "src/styles/fonts.generated.css"), "utf8")).replace(
  /url\("\.\.\/assets\/fonts\//g,
  `url("${pathToFileURL(join(root, "src/assets/fonts")).href}/`,
);
const logo = (await readFile(join(root, "src/assets/logo-paths.svg"), "utf8"))
  .replace(/^<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");

const GLYPHS = {
  c: { w: 172, d: "M80 0H145A27 27 0 0 1 145 54H80A26 26 0 0 0 54 80V120A26 26 0 0 0 80 146H145A27 27 0 0 1 145 200H80A80 80 0 0 1 0 120V80A80 80 0 0 1 80 0Z" },
  i: { w: 54, d: "M27 0A27 27 0 0 1 54 27V173A27 27 0 0 1 27 200A27 27 0 0 1 0 173V27A27 27 0 0 1 27 0Z" },
  a: { w: 212, d: "M87.87 11.55A20 20 0 0 1 124.13 11.55L202.71 180.08A14 14 0 0 1 190.02 200L21.98 200A14 14 0 0 1 9.29 180.08Z M102.37 87.77A4 4 0 0 1 109.63 87.77L136.92 146.31A4 4 0 0 1 133.29 152L78.71 152A4 4 0 0 1 75.08 146.31Z" },
  o: { w: 200, d: "M100 0A100 100 0 1 1 100 200A100 100 0 1 1 100 0Z M100 52A48 48 0 1 0 100 148A48 48 0 1 0 100 52Z" },
};

// CIAO を横に並べ、左から右へ塗りの量を減らす（線から塗りへ満ちていく途中）
const fills = { c: 1, i: 0.72, a: 0.44, o: 0.16 };
let x = 0;
let ciao = "";
for (const key of ["c", "i", "a", "o"]) {
  const glyph = GLYPHS[key];
  const fillTop = 200 - 200 * fills[key];
  ciao += `
    <g transform="translate(${x} 0)">
      <clipPath id="clip-${key}"><rect x="-10" y="${fillTop}" width="${glyph.w + 20}" height="${210 - fillTop}"/></clipPath>
      <path d="${glyph.d}" fill="none" stroke="#009a9a" stroke-width="2.2" fill-rule="evenodd"/>
      <path d="${glyph.d}" fill="#009a9a" fill-rule="evenodd" clip-path="url(#clip-${key})"/>
    </g>`;
  x += glyph.w + (key === "i" ? 14 : key === "a" ? 12 : 20);
}
const ciaoWidth = x - 20;

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#f5f1e8;color:#11201f;font-family:"Inter","Noto Sans JP",sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0 56px;display:grid;grid-template-columns:repeat(12,1fr)}
.grid i{border-left:1px solid rgba(17,32,31,.07)}
.grid i:last-child{border-right:1px solid rgba(17,32,31,.07)}
.logo{position:absolute;left:56px;top:48px;height:26px;color:#009a9a}
.logo svg{height:26px;width:auto;display:block}
.lab{position:absolute;right:56px;top:54px;font:500 13px/1 "Inter",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#4e5b59}
h1{position:absolute;left:56px;top:106px;font-weight:700;font-size:56px;line-height:1.3;letter-spacing:0;font-feature-settings:"palt";word-spacing:.22em}
.hi{color:#009a9a}
.bye{color:#f5f1e8;-webkit-text-stroke:3.2px #0b6b6b;paint-order:stroke fill}
.ciao{position:absolute;left:56px;width:1000px;bottom:44px}
.ciao svg{display:block;width:100%;height:auto;overflow:visible}
</style></head><body>
<div class="grid">${"<i></i>".repeat(12)}</div>
<div class="logo"><svg viewBox="0 0 2917 389" fill="currentColor">${logo}</svg></div>
<p class="lab">Ciao = Hello / Goodbye</p>
<h1><span class="hi">こんにちは 新しい仕組み</span><br><span class="bye">さよなら これまでのやり方</span></h1>
<div class="ciao"><svg viewBox="-4 -4 ${ciaoWidth + 8} 208">${ciao}</svg></div>
</body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: join(root, "public/og.png") });
await browser.close();
console.log("public/og.png を書き出しました");
