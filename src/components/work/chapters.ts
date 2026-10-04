// 実績の詳細の章（目次の行）。本文（Markdown）の h2、確かめたこと、進め方の順。
// 目次は 2 か所に置く（広い画面は本文の左に追従、899px 以下は冒頭の表の直後）ので、計算をここにまとめる。
import type { MarkdownHeading } from "astro";
import type { CollectionEntry } from "astro:content";

export interface Chapter {
  slug: string;
  text: string;
}

export const CHECKED = "確かめたこと";
export const NOT_YET = "まだ確かめていないこと";
export const PROCESS = "進め方";

export const chaptersOf = (
  data: CollectionEntry<"projects">["data"],
  headings: MarkdownHeading[]
): Chapter[] => [
  ...headings
    .filter(heading => heading.depth === 2)
    .map(heading => ({ slug: heading.slug, text: heading.text })),
  ...(data.checked ? [{ slug: CHECKED, text: CHECKED }] : []),
  ...((data.process ?? []).length > 0
    ? [{ slug: PROCESS, text: PROCESS }]
    : []),
];
