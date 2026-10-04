# 実績ページの直し（審査 第2回の指摘、2026-10-04）

対象: `/projects` と詳細 5 件。編集するのは `src/pages/projects/*`、`src/components/work/*`、`src/content/projects/*.md`、`src/content/config.ts` だけ。

## 計画

### A. 図
- [x] 1 `src/components/work/Diagram.astro`（箱と矢印。データは frontmatter の `diagram`）
- [x] 2 5 件の図（本文にある事実だけ）。core-saas には約190画面の点の図（`Dots.astro`）
- [x] 3 一覧に縮小版

### B. 一覧
- [x] 4 5 件の順番をそろえる（番号と状況 → 題名 → 業界と役割 → これまで／これから → 本文 → タグ → 図）。数字 4 つを外す
- [x] 5 題名と右端の 44px の丸い矢印を 1 つのリンクに。`:active` で塗る
- [x] 6 `Shift.astro`: 48px 未満の「これまで」は細い字と `--ink-2`。矢印の線を山形につなぐ
- [x] 7 本文を 4〜8 列目に広げる
- [x] 8 状況は `StatusPill` だけ。業界と役割の示し方をそろえる
- [x] 9 役割の「/」区切り（`Roles.astro`）

### C. 詳細
- [x] 10 冒頭に字形 o（塗りの量 ＝ 状況）。リードの位置を題名の行数によらず同じにする
- [x] 11 墨の帯: 375px で `--fs-d2`
- [x] 12 節の見出しの大きさをそろえる。「進め方」は `NumberedRows`
- [x] 13 safety-ai の `after` の折り返し
- [x] 14 safety-ai の「有用性を確かめました」
- [x] 15 末尾: 次の案件 → `Cta`。「実績の一覧へ」
- [x] 16 `word-break` を消す。行送りは `--lh-body`、箇条書きは `.dots`

## 確認
- [x] `pnpm fonts`
- [x] 1440 / 768 / 375（Chrome）と 375（WebKit）のスクリーンショットを全部見る。2 回以上直す
- [x] 横あふれ 0、コンソールエラー 0
- [x] `grep -rn "word-break" src/components/work src/pages/projects` が 0 件
- [x] `node scripts/qa.mjs --words` が 0 件

## 判断したこと（最終報告に書く）
- 一覧の本文を 4〜8 列目にすると、図は 9〜12 列目（幅 432px）になる
- `--fs-d2` が 48px を下回る幅（899px 以下）では、墨の帯の「これまで」も線の文字にしない
- 一覧の h1 の 1 句目「これまでと」も、`--fs-d1` が 48px を下回る幅（648px 以下）では線の文字にしない
- safety-ai の図は「同期」の箱を置かない（本文に書いていないため）。線の箱は「本番向けの開発」
- 「進め方」の本文は frontmatter の `process` へ移した（`NumberedRows` に渡すため。文は変えていない）

## 確認の記録
- 開発サーバー（4321）は、ファイルの変更の検知が数分〜十数分遅れた（fseventsd の負荷）。Markdown の変更は `src/content/config.ts` を書き換えるまで反映されなかった
- そのため、作業ツリーの写しを手元の一時フォルダーに置き、別のポートで確認した（開発用と、ビルド結果の両方）。作業ツリーの `dist/` と `.astro/` には触れていない
- ビルド結果の写しで `scripts/qa.mjs --no-lh` と `scripts/wrap-check.mjs`（実績の 6 ページ、Chrome と WebKit）が合格
- 画像と確認用のスクリプトは `design/qa/fix3-projects/`
