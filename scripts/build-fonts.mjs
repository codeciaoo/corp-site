// サイトで実際に使う文字だけを抜き出した Web フォントを生成する。
// 和文フォントは全グリフだと 1 書体 600KB〜1MB あるため、src/ 配下の文字を走査して
// 必要な字だけのサブセットにし、src/assets/fonts/ とフォント定義の CSS を書き出す。
// （public/ ではなく src/assets/ に置く。ファイル名のハッシュ付けと配信は Vite に任せる）
//
// 和文の各書体は 2 つに分ける:
//   critical … 最初の画面（ヘッダー、各ページ冒頭の見出しとリード）で使う字
//   rest     … それ以外の字。必要になったときに読み込まれる
// こうすると、最初の画面の文字は小さなファイルだけで確定する。
// preload はしない。CSS を HTML に埋め込んでいるのでフォントの取得はすぐ始まり、
// preload すると最初の描画（FCP）を待たせるだけになる（Lighthouse で計測して外した）。
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(root, "src");
const OUT_DIR = join(root, "src", "assets", "fonts");
const CSS_OUT = join(root, "src", "styles", "fonts.generated.css");
// 最初の画面に出ない字のフォントは、別の CSS に分けて、あとから読み込む（Base.astro）。
// 全部を同時に読むと、遅い回線で帯域を取り合い、最初の画面の字が出るのが遅れる（LCP が 2.5 秒を超えた）
const CSS_REST_OUT = join(root, "src", "styles", "fonts.rest.generated.css");

const TEXT_EXT = new Set([".astro", ".ts", ".md", ".json"]);
// メンバーのポートフォリオは別の書体（システムフォント）で組むので、走査から外す
const SKIP_DIRS = [];

// 最初の画面に出る文字の出どころ
const CRITICAL_FILES = [
  "src/components/home/Hero.astro",
  "src/components/site/Header.astro",
  "src/data/site.ts",
];
const PAGE_HERO_TAG = /<PageHero\b[\s\S]*?>/g;
// 詳細ページの冒頭（PageHero を使わず、データから組むもの）に出る、大きい字の項目。
// リードや要約まで入れると、最初に読むフォントが大きくなりすぎるので、見出しになる項目だけにする
const CRITICAL_LINES = [
  // 実績: frontmatter の題名、状況、これまで、これから
  { dir: "src/content/projects", pattern: /^(title|status|before|after):.*$/gm },
  // 採用: 職種の見出しと区分
  { file: "src/data/careers.ts", pattern: /^\s*(heading|kind):.*$/gm },
  // メンバー: 氏名と役割
  { file: "src/data/members.ts", pattern: /^\s*(name|role):.*$/gm },
];

const ASCII =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const LATIN = `${ASCII} ©·×—–‘’“”…→←↑↓↗`;
const LATIN_RANGE = "U+0020-007E, U+00A0-00FF, U+2013-2014, U+2018-201D, U+2026";

const isAscii = ch => ch <= "\u007f";

async function walk(dir, out = []) {
  if (SKIP_DIRS.includes(dir)) return out;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, out);
    else if (TEXT_EXT.has(extname(entry.name)) && !entry.name.includes(".generated.")) out.push(path);
  }
  return out;
}

const nonAscii = text => [...text].filter(ch => !isAscii(ch) && ch !== "﻿");

async function collect() {
  const all = new Set();
  const critical = new Set();
  for (const file of await walk(SRC_DIR)) {
    const text = await readFile(file, "utf8");
    nonAscii(text).forEach(ch => all.add(ch));
    for (const tag of text.match(PAGE_HERO_TAG) ?? []) nonAscii(tag).forEach(ch => critical.add(ch));
  }
  for (const file of CRITICAL_FILES) {
    nonAscii(await readFile(join(root, file), "utf8")).forEach(ch => critical.add(ch));
  }
  for (const source of CRITICAL_LINES) {
    const files = source.file
      ? [join(root, source.file)]
      : (await readdir(join(root, source.dir))).map(name => join(root, source.dir, name));
    for (const file of files) {
      const text = await readFile(file, "utf8");
      for (const line of text.match(source.pattern) ?? []) nonAscii(line).forEach(ch => critical.add(ch));
    }
  }
  const rest = [...all].filter(ch => !critical.has(ch));
  return { critical: [...critical].sort(), rest: rest.sort() };
}

/** 文字の並びを unicode-range の表記（連続する符号位置はまとめる）にする */
function toUnicodeRange(chars) {
  const points = [...new Set(chars.map(ch => ch.codePointAt(0)))].sort((a, b) => a - b);
  const ranges = [];
  let start = points[0];
  let previous = points[0];
  for (const point of points.slice(1)) {
    if (point === previous + 1) {
      previous = point;
      continue;
    }
    ranges.push([start, previous]);
    start = point;
    previous = point;
  }
  ranges.push([start, previous]);
  const hex = value => value.toString(16).toUpperCase();
  return ranges.map(([from, to]) => (from === to ? `U+${hex(from)}` : `U+${hex(from)}-${hex(to)}`)).join(", ");
}

const { critical, rest } = await collect();

// 和文は Noto Sans JP の 2 つの太さだけ（本文 400、見出しと強調 700）。欧文は Inter が受け持つ
const JP_FONTS = [
  {
    family: "Noto Sans JP",
    weight: 400,
    file: "@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-400-normal.woff2",
    name: "noto-sans-jp-400",
  },
  {
    family: "Noto Sans JP",
    weight: 700,
    file: "@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff2",
    name: "noto-sans-jp-700",
  },
];

const LATIN_FONTS = [
  {
    family: "Inter",
    weight: "400 700",
    file: "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
    name: "inter",
    // 和文に欧文書体の字幅が混ざらないよう、欧文の範囲だけに当てる
    unicodeRange: LATIN_RANGE,
  },
  {
    family: "Geist Mono",
    weight: "400 500",
    file: "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
    name: "geist-mono",
    unicodeRange: LATIN_RANGE,
  },
];

await mkdir(OUT_DIR, { recursive: true });
const written = new Set();
const faces = [];
const restFaces = [];

async function emit({ family, weight, name, source, text, options = {}, unicodeRange, deferred = false }) {
  const subset = await subsetFont(source, text, { targetFormat: "woff2", ...options });
  const fileName = `${name}.woff2`;
  written.add(fileName);
  await writeFile(join(OUT_DIR, fileName), subset);
  (deferred ? restFaces : faces).push(
    [
      "@font-face {",
      `  font-family: "${family}";`,
      "  font-style: normal;",
      `  font-weight: ${weight};`,
      "  font-display: swap;",
      `  src: url("../assets/fonts/${fileName}") format("woff2");`,
      unicodeRange ? `  unicode-range: ${unicodeRange};` : null,
      "}",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  console.log(`${name.padEnd(28)} ${(subset.length / 1024).toFixed(1).padStart(7)} KB`);
}

for (const font of JP_FONTS) {
  const source = await readFile(join(root, "node_modules", font.file));
  await emit({
    ...font,
    name: `${font.name}-critical`,
    source,
    text: critical.join(""),
    unicodeRange: toUnicodeRange(critical),
  });
  if (rest.length > 0) {
    await emit({
      ...font,
      name: `${font.name}-rest`,
      source,
      text: rest.join(""),
      unicodeRange: toUnicodeRange(rest),
      deferred: true,
    });
  }
}

for (const font of LATIN_FONTS) {
  const [min, max] = String(font.weight).split(" ").map(Number);
  await emit({
    ...font,
    source: await readFile(join(root, "node_modules", font.file)),
    text: LATIN,
    options: { variationAxes: { wght: { min, max } } },
  });
}

for (const file of await readdir(OUT_DIR)) {
  if (!written.has(file)) await rm(join(OUT_DIR, file), { force: true });
}

const banner = "/* scripts/build-fonts.mjs が生成。手で編集しない。 */\n";
await writeFile(CSS_OUT, banner + faces.join("\n\n") + "\n");
await writeFile(CSS_REST_OUT, banner + restFaces.join("\n\n") + "\n");
console.log(`最初の画面 ${critical.length} 字 + それ以外 ${rest.length} 字`);
