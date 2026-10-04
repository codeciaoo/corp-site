// 状況の文言から、塗りの量（0〜1）を決める。塗るのは確かめたものだけ。
// 状況のピル（StatusPill）の輪と、実績の詳細の冒頭の字形 o が、同じ量になる。

const LEVELS: [RegExp, number][] = [
  [/開発中|リリース前/, 0.34],
  [/試行/, 0.67],
  [/完了|運用中|提供中/, 1],
];

/** どれにも当たらない文言は undefined（字形を出さない） */
export const statusLevel = (status: string): number | undefined =>
  LEVELS.find(([pattern]) => pattern.test(status))?.[1];
