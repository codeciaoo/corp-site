// 各ページのスクリーンショットを撮る（見た目の確認用）。
// 使い方: node scripts/shots.mjs [--base http://localhost:4321] [--out design/shots] [--widths 1440,375] [--browser chrome|webkit|firefox] /path ...
//   --at ".step"  … セレクタに合う要素を 1 つずつ画面の中央に出して、その画面を撮る（追従する図など、ページ全体の画像では分からない所の確認用）
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium, firefox, webkit } from "playwright";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  const [, value] = args.splice(index, 2);
  return value;
};

const base = option("base", "http://localhost:4321");
const outDir = option("out", "design/shots");
const widths = option("widths", "1440,375").split(",").map(Number);
const browserName = option("browser", "chrome");
const atSelector = option("at", "");
const firstViewOnly = args.includes("--first-view");
const paths = args.filter(arg => arg.startsWith("/"));
if (paths.length === 0) paths.push("/");

const HEIGHTS = { 1440: 900, 1280: 720, 768: 1024, 375: 812 };
const suffix = browserName === "chrome" ? "" : `-${browserName}`;
const slug = path =>
  (path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "_")) + suffix;

await mkdir(outDir, { recursive: true });
const browser =
  browserName === "webkit"
    ? await webkit.launch()
    : browserName === "firefox"
      ? await firefox.launch()
      : await chromium.launch({ channel: "chrome" });

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: HEIGHTS[width] ?? 900 },
    // 2 倍の密度は先頭の画面だけ。縦に長いページ全体を 2 倍で撮ると上限（16384px）を超えて崩れる
    deviceScaleFactor: width <= 768 && firstViewOnly ? 2 : 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", error => errors.push(String(error)));

  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    await page.screenshot({ path: join(outDir, `${slug(path)}-${width}-first.png`) });

    if (atSelector) {
      const count = await page.locator(atSelector).count();
      for (let index = 0; index < count; index += 1) {
        await page
          .locator(atSelector)
          .nth(index)
          .evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
        await page.waitForTimeout(1600);
        await page.screenshot({
          path: join(outDir, `${slug(path)}-${width}-at-${String(index + 1).padStart(2, "0")}.png`),
        });
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    }

    if (!firstViewOnly) {
      // 画面に入ったときの動きを全部済ませてから、ページ全体を撮る
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 500) {
        await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), y);
        await page.waitForTimeout(180);
      }
      await page.waitForTimeout(1400);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(900);
      await page.screenshot({ path: join(outDir, `${slug(path)}-${width}-full.png`), fullPage: true });
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    console.log(
      `${path} @${width}: 横あふれ ${overflow}px, コンソールエラー ${errors.length}件${errors.length ? ` → ${errors.slice(0, 3).join(" | ")}` : ""}`,
    );
    errors.length = 0;
  }
  await context.close();
}

await browser.close();
