import { getCollection, type CollectionEntry } from "astro:content";

/**
 * 公開する実績だけを、一覧の並び順（order の小さい順）で返す。
 * frontmatter に `draft: true` がある実績は、一覧・詳細・トップ・サイトマップのどこにも出さない。
 * 代表の確認が済んだら、その実績の `draft: true` を消すと元どおりに出る。
 */
export const getPublishedProjects = async (): Promise<
  CollectionEntry<"projects">[]
> =>
  (await getCollection("projects", ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order
  );
