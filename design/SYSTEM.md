# デザインシステムの使い方（ページを作る人向け）

品質の目標は Awwwards / FWA / Webby の受賞水準。トップページ（`src/pages/index.astro` と `src/components/home/*`）が見本です。先に読んでから書いてください。

## 技術の約束

- **Astro コンポーネント（`.astro`）だけで書く。** React、Tailwind のクラス、shadcn/ui は使わない（旧デザインの名残で、メンバーのポートフォリオだけが使う）
- スタイルはコンポーネントの `<style>`（スコープ付き）に書く。色・余白・書体は `src/styles/site.css` のトークンを使う
- 動きは既存の仕組み（下記）で作る。ライブラリは足さない。ページ固有の小さな `<script>`（フォーム送信など）は可
- ページは `export const prerender = true;` を付ける（API ルートを除く）
- レイアウトは `src/layouts/Base.astro`。`title` と `description` を渡す
- TypeScript は strict。関数の引数と戻り値に型を書く。import は外部 → 内部の順、アルファベット順
- Prettier: 2 スペース、80 桁、ダブルクォート、末尾カンマ

## トークン（`src/styles/site.css`）

| 用途 | 変数 |
|---|---|
| 地 | `--paper` #f5f1e8 ／ 面 `--paper-2` #ebe4d6 |
| 文字 | `--ink` #11201f ／ 補足 `--ink-2` #4e5b59 |
| ティール | `--teal` #009a9a（**24px 以上の太い見出しと図形だけ**。本文サイズの文字には使わない）／ 小さい文字用 `--teal-deep` #0b6b6b |
| 罫線 | `--rule`（区切り）／ `--rule-2`（グリッドの薄い線）／ 強い区切りは `1px solid var(--ink)` |
| 書体 | `--f-sans`（和文 Noto Sans JP、欧文 Inter）／ `--f-mono`（ラベル。Geist Mono） |
| 太さ | `--fw-regular`（400）／ `--fw-bold`（700）。この 2 つだけ |
| 大きさ | `--fs-mega`、`--fs-d1`〜`--fs-d3`、`--fs-h2`〜`--fs-h4`、`--fs-lead`、`--fs-body`、`--fs-small`、`--fs-caption`、`--fs-label`。値を直接書かない。型のクラス `.t-d1`〜`.t-caption` もある |
| グリッド | 12 列（767px 以下は 4 列）。余白 `--m`、溝 `--g`。ヘッダー高 `--hd` |
| 動き | `--ease`、`--dur`。塗りは**必ず下から上へ** |

ブレークポイントは `1023px`、`899px`、`767px`（`max-width`）。375px で横スクロールを出さない。

## 型

### セクション

```astro
<section class="sec grid" aria-labelledby="h-xxx">
  <SectionHead no="01" en="Label" title="和文タイトル" id="h-xxx" />
  <div class="body">…</div>
</section>
```

```css
.body { grid-column: 4 / -1; min-width: 0; }
@media (max-width: 899px) { .body { grid-column: 1 / -1; } }
```

- 背景を変える: `sec--tint`（紙 2）、`sec--ink`（墨。図形と線が映える。1 ページに 1 回まで）。その場合、セクションに `--sec-bg` を設定する（`Approach.astro` 参照）
- 本文の最大幅は 34〜40em。大きい言い切りは `.t-d3`（`--fs-d3`、700）
- 線と塗りの文字（`Fx`）は、地の色で中を塗って外側に線を付けています。紙以外の背景に置くときは、その要素かセクションに `--sec-bg` で地の色を指定してください（`.sec--tint`、`.sec--ink` は設定済み）

### 部品（`src/components/site/`）

| 部品 | 使いどころ |
|---|---|
| `PageHero` | 下層ページの冒頭（欧文ラベル、線→塗りの h1、リード） |
| `SectionHead` | セクションの番号・ラベル・h2 |
| `Fx` | 線と塗りの文字。`mode="hello"`（線→塗り）／`"goodbye"`（塗り→線）／`"line"`（線のまま）。`text` 中の `\|` は折り返してよい位置。`en` で欧文ディスプレイ |
| `Glyph` | ロゴの字形（c, i, a, o, d, e）。`fill`（0〜1）で塗りの量 |
| `BeforeAfterList` | 「これまで → これから」の一覧 |
| `Figures` | 規模の数字 |
| `Arrow` | ボタンの矢印 |
| `Cta` | ページ末尾の「まずは Ciaoから」。`size="mega"` はトップページだけ |
| `NumberedRows` | 番号付きの行（番号・見出し・本文）。番号付きの一覧は必ずこれを使う |
| `Phrases` | 長い見出しを句のかたまりで折り返す（`\|` が折り返してよい位置） |

グローバルのクラス: `.btn`（`.btn--lg`、`.btn--solid`）、`.link` + `.dot`、`.tags`、`.mono`、`.phrase`（句単位の折り返し）、`.prose`（長文）、`.sr`（読み上げ専用）。

### 動き

- 画面に入ったら動かす: 要素に `data-reveal`。`Fx` は既定で付く。行やカードのように**中の複数の `Fx` をまとめて動かす**ときは、親に `data-reveal` を付け、中の `Fx` は `reveal={false}`、ずらしは `delay`
- 線→塗りは「状態」。本文や見出しを透明にして待たせない（JS が動かなくても読める）
- `prefers-reduced-motion` は共通で止まる。独自のアニメーションを書くときは自分で止める

## そろえること

審査（`design/qa/jury-r2-desktop.md`、`jury-r2-mobile.md`）で、ページごとの違いを多く指摘されました。次の決まりで全ページをそろえます。

### 線と塗りの意味

- **線の文字は 2 つの意味にだけ使う**: 「これまで（役目を終えるもの）」と「まだ確かめていない設計」。否定する言葉、強調したい言葉、区別のためには使わない
- **線の文字は 48px 以上にだけ使う**（小さいと画数の多い字がつぶれる）。小さい「これまで」は、細い字（400）と `--ink-2` で書き、ラベルに線の丸（○）を添える。`BeforeAfterList` が見本
- 広い画面では 48px 以上でも、狭い画面で 48px を下回る語がある。画数の多い漢字を含む語には `class="fx--quiet-sm"` を付ける（767px 以下で、細い字と `--ink-2` に替わる）。かなだけの語は線のままでよい
- 線の色は、ロゴの字形と同じ `--teal`（共通で設定済み）。墨の面（`.sec--ink`）では `--teal-deep`（明るい色）に切り替わる。部品で `--line` を上書きしない
- 24px 未満の文字にティールを使うときは `--teal-deep`。`Fx` は `.fx` 自身が `--fill` を持つので、親ではなく `.fx` に指定する（例: `.row :global(.fx) { --fill: var(--teal-deep); }`）。`--fs-h2` は画面幅 1044px 未満で 24px を下回る。`pnpm qa` が検査する
- コンセプトの説明文（Ciao の意味、線と塗りの意味）は、置き場所を 1 つにする。Ciao の意味はトップと会社、線と塗りの意味は「つくり方」。ほかのページでは図と凡例だけで見せる

### 列と大きさ

- **列の位置**: 本文の箱は 12 列の 4 列目から（`grid-column: 4 / -1`）。右側に置くリード、値、説明は 8 列目から（`grid-column: 8 / -1`）。それ以外の位置から始めない。ヒーロー直下の帯（目次、要点）も 1・4・8 列目にそろえる
- **番号と見出しの距離**: 64px（番号の列 40px ＋ 溝）。`NumberedRows` と同じにする
- **リード**: `--fs-lead`、行送り `--lh-lead`。**本文**: `--fs-body`、行送り `--lh-body`。**箇条書き**: クラス `.dots`（丸 8px、字下げ 22px、`--fs-body`、行送り `--lh-list`。線の丸は `.dots--line`）。行送りの値を直接書かない
- **本文中の見出し**: 節の見出しは `SectionHead`。その下の小見出しは `--fs-h3`。番号つきの行の見出しは `NumberedRows`（`--fs-h2`）。説明つきの小さい行は `--fs-h4`
- **ラベル**: 等幅（`.mono`、12px）だけ。書いたとおりの大文字・小文字で出る（先頭だけ大文字: `Approach`、`Contents / 目次`）。左の列の `SectionHead` は欧文の下に和文、それ以外のラベルは「欧文 / 和文」の 1 行
- **写真**: 縦横比 4:5
- **余白**: 話題が変わる節は `.sec`。前の節の続きは `.sec sec--tight`（上の余白が小さく、罫線が出ない）

### 押す対象

- 高さ 44px 以上（`.btn`、`.link` は設定済み。自作のリンクには `min-height: 44px`）
- **詳細へ進むリンク**: 題名と、行の右端の 44px の丸い矢印を 1 つのリンクにする（`src/components/home/Work.astro` の `.flag__link` と `.case` が見本）。「詳細を読む」の文字のボタンは使わない
- **一覧や次の節へ進むリンク**: `.btn btn--lg`。一覧へ戻る言葉は「◯◯の一覧へ」
- **主ボタン**（相談する、送信する、応募する）: `.btn btn--lg btn--solid`
- 画面に追従するボタンは置かない（ほかのボタンに重なる）。狭い画面では、最初の画面を過ぎるとヘッダーに「相談する」が出る（共通で対応済み）
- 「A / B / C」と並べる値（役割など）は、1 つずつ折り返さない箱（`.nb`）に入れ、区切りの「/」は箱の終わりに付ける（行の先頭に「/」を置かない）
- **押したときの反応**: ホバーと同じ塗りを `:active` でも出す（`.btn` と `.dot` は共通で対応済み。自作の押す部品には `:active` を足す。ホバーのない端末でも「線に塗りが満ちる」が起きるようにする）
- **状況の表示**: `src/components/site/StatusPill.astro`。ほかの形を作らない
- **目次**: ラベル「Contents / 目次」と、罫線で区切った行

### 文章の置き方

- **折り返しは部品で指定しない**。ビルド後に `scripts/phrase-wrap.mjs` が文節の切れ目を入れ、どのブラウザでも、見出しも本文も句で折り返す。`word-break` を部品に書かない。見出しで折り返す位置を決めたいときは `Phrases` か `Fx` の `|`
- 英語の製品名の中の空白は、折り返さない空白にする（`Claude\u00A0Code`）
- ページ末尾の `Cta` は、`lead` にそのページの内容に合わせた 1〜2 文を書く。同じ文を全ページで繰り返さない
- 同じ内容を 2 ページ以上に置かない（数字、対の一覧、原則、流れ）。もう片方は、リンクにする

## フォントの読み込み

- `scripts/build-fonts.mjs` が、使う字だけのフォントを作る。和文は「最初の画面の字（critical）」と「それ以外（rest）」に分かれる
- critical に入るのは、トップの冒頭、ヘッダー、`<PageHero …>` の引数、実績の題名、職種の見出し、メンバーの氏名と役割
- rest のフォントは、最初の描画のあとで読み込む（`src/layouts/Base.astro`）。全部を同時に読むと、遅い回線で最初の画面の字が出るのが遅れる（LCP が 2.5 秒を超えた）
- 最初の画面に出ない写真は `fetchpriority="low"`（`Portrait` の既定）。最初の画面の写真には `priority` を付ける
- 先読み（`<link rel="preload">`）は足さない。実測で、最初の描画が遅くなった

## アクセシビリティ

- h1 は 1 ページに 1 つ。見出しの階層を飛ばさない
- 画像に `alt`。飾りは `aria-hidden="true"`
- フォームは `<label>` を結び付け、エラーは `aria-live` で知らせる。キーボードだけで送信まで行ける
- 文字のコントラスト: 本文は `--ink`、補足は `--ink-2`、リンクは `--teal-deep`
- `:focus-visible` の枠を消さない

## 確認のしかた

開発サーバーは `http://localhost:4321` で動いています。

```bash
pnpm fonts                               # 文章を足したら実行（使う字だけの Web フォントを作り直す）
node scripts/shots.mjs /about            # design/shots/ に 1440 と 375 の先頭とページ全体を保存
scripts/slice.sh design/shots/about-1440-full.png 1300 /tmp/about   # 縦長の画像を分割して目で見る
```

- `shots.mjs` は横あふれとコンソールエラーも出す。どちらも 0 にする
- iPhone の Safari に近い WebKit でも確かめる: `node scripts/shots.mjs --browser webkit --widths 375 /about`
- 折り返しの検査: `node scripts/wrap-check.mjs`（ビルド結果を、幅 375px の Chrome と WebKit で測る。見出しと箇条書きで「カタカナ語の途中」「最終行が 2 字以下」が 0 件なら合格）
- スクリーンショットは必ず自分の目で見て、審査員の目線（Design 40 / Usability 30 / Creativity 20 / Content 10）で 2 回以上直す
- 開発サーバーは、負荷が高いと編集の反映が数十秒遅れる（HTML は新しく、スコープ付きの CSS だけ古いことがある）。最終確認はビルド結果で行う: `pnpm build` のあと `scripts/review-pack.sh`
- 並行して作業しているあいだは `pnpm build` を実行しない（ほかの作業とぶつかる）
- 共通ファイル（`src/styles/site.css`、`src/layouts/Base.astro`、`src/scripts/site.ts`、`src/components/site/*`、`src/components/home/*`、`src/data/site.ts`、`src/data/home.ts`）は編集しない。足りないものがあれば、最終報告で伝える
- git commit はしない
