# マークダウンからプロジェクト詳細ページへの変換ロジック

## 基本構造

1. **コンテンツコレクション設定**
   - `/src/content/config.ts` でプロジェクトのコレクションを定義
   - スキーマで必須フィールド（title, summary, publishedDate）と任意フィールド（cover, coverAlt, tags）を定義

2. **動的ルーティング**
   - `/src/pages/projects/[...slug].astro` が動的ルートを処理
   - `getStaticPaths` 関数でプロジェクトコレクションを取得し、各プロジェクトごとにルートを生成
   - Astroの `render` 関数でマークダウンコンテンツをレンダリング

3. **コンテンツレンダリング**
   - `ProjectRenderer` コンポーネントがマークダウンを処理
   - セクション分割はマークダウン内の `<h2>` タグに基づいて行われる

## セクション分類ロジック

マークダウンは以下のように各セクションに分類され、それぞれ異なるスタイルで表示されます：

1. **基本情報 (basicInfo)**
   - 対象セクション: 「お客様の情報」「プロジェクト概要」「CodeCiaoの役割」
   - スタイル: 青系グラデーション背景、丸いバッヂ、FileTextアイコン

2. **背景 (background)**
   - 対象セクション: 「ご相談の背景」
   - スタイル: 赤系グラデーション背景、AlertCircleアイコン、カスタムリストスタイル

3. **結果 (result)**
   - 対象セクション: 「取り組みの結果」
   - スタイル: ティール系グラデーション背景、CheckCircle2アイコン、カスタムリストスタイル

4. **その他 (others)**
   - 上記以外のすべてのセクション
   - スタイル: スレート系グラデーション背景、標準的なスタイリング

## 処理フロー

1. マークダウンファイルのフロントマターからメタデータ（タイトル、タグなど）を抽出
2. マークダウンのHTML変換後、`<h2>` タグで本文を分割
3. セクションタイトルに基づいて分類（basicInfo, background, result, others）
4. 各セクションにカスタムスタイルとアイコンを適用
5. リスト要素（`<li>`）にカスタムマーカーやアイコンを追加
6. 各セクションを適切なレイアウト位置に配置

## 特記事項

- グリッドレイアウトで背景と結果セクションを配置（中間に矢印あり）
- リスト要素にはカスタムアイコンとアニメーション効果が適用
- テーブル要素は自動的にラッパーで囲まれて横スクロール対応
- スタイルは主にTailwind CSSクラスで定義され、グラデーション背景やホバーエフェクトを多用

## コードポイント

- **セクション分割と判別**: `ProjectRenderer.tsx` の `React.useMemo` 内でHTMLを `<h2>` タグで分割
- **条件判定**: `if (sectionTitle === 'お客様の情報' || ...)` でセクションタイプを決定
- **スタイル適用**: 各セクションタイプごとに異なるTailwindクラスとアイコンを適用
- **リスト変換**: `.replace(/<li>/g, ...)` でリスト要素にカスタムアイコンを追加

## 実装上の注意点

- セクション名は厳格に一致する必要がある（「お客様の情報」など）
- HTML要素とReactコンポーネントで属性の使い分けが必要（`class` vs `className`）
- アイコンコンポーネントは Lucide から取得している
- アニメーションにはTailwindの `animate-in` クラスを使用
