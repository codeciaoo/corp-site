// 実績の図（Diagram と、形ごとの部品）で共通に使う型と関数。
import type { CollectionEntry } from "astro:content";

export type DiagramData = NonNullable<
  CollectionEntry<"projects">["data"]["diagram"]
>;

/** 図の中の番号（01, 02, …） */
export const pad = (value: number): string => String(value).padStart(2, "0");
