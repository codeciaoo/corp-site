// 実際に表示された文字の書体・太さ・大きさを数える。型（site.css の段階）から外れた値が無いかを確かめる。
// 使い方: node scripts/type-audit.mjs [--base http://localhost:4321] /path ...
import { chromium } from "playwright";

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const base = baseIndex === -1 ? "http://localhost:4321" : args.splice(baseIndex, 2)[1];
const paths = args.filter(arg => arg.startsWith("/"));

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const total = new Map();
for (const path of paths) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  const rows = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent.trim();
      const el = node.parentElement;
      if (!text || !el || el.closest("script, style, noscript, svg, [data-legacy]")) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      out.push({
        family: style.fontFamily.split(",")[0].replace(/"/g, "").trim(),
        weight: style.fontWeight,
        size: Math.round(parseFloat(style.fontSize) * 10) / 10,
        sample: text.slice(0, 14),
      });
    }
    return out;
  });
  for (const row of rows) {
    const key = `${row.family} | ${row.weight} | ${row.size}px`;
    const entry = total.get(key) ?? { count: 0, pages: new Set(), sample: row.sample };
    entry.count += 1;
    entry.pages.add(path);
    total.set(key, entry);
  }
}
await browser.close();
const sorted = [...total.entries()].sort((a, b) => {
  const [fa, wa, sa] = a[0].split(" | ");
  const [fb, wb, sb] = b[0].split(" | ");
  return fa.localeCompare(fb) || parseFloat(sb) - parseFloat(sa) || wa.localeCompare(wb);
});
for (const [key, entry] of sorted) {
  console.log(`${key.padEnd(34)} ${String(entry.count).padStart(5)}  ${[...entry.pages].length}p  ${entry.sample}`);
}
