# 田原翼のポートフォリオサイト

このプロジェクトは田原翼のポートフォリオサイトをNetlifyにデプロイするためのサブプロジェクトです。

## 特徴

- ヘッダーとフッターがないシンプルなレイアウト
- 専用のAstroプロジェクトとして実装
- Netlifyへのデプロイに最適化
- スキルセクション（スキルカテゴリと習熟度表示）
- 経歴・資格セクション
- プロジェクト実績セクション
- 自己PRセクション
- スクロールアニメーション効果
- テクノロジースタック表示機能

## 技術スタック

- **Astro**: 静的サイト生成と部分的ハイドレーションのためのフレームワーク
- **React**: UIコンポーネント構築
- **TailwindCSS**: スタイリング
- **TypeScript**: 型安全なコード開発
- **Framer Motion**: アニメーション
- **Lucide React**: アイコン
- **React Icons**: 技術スタックアイコン表示

## 開発方法

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build
```

## デプロイ

このプロジェクトはNetlifyにデプロイするように設定されています。以下のいずれかの方法でデプロイできます：

1. Netlify CLIを使用：
   ```bash
   netlify deploy --prod
   ```

2. Netlify UI経由：
   - GitHubリポジトリに接続し、Netlifyからデプロイする

詳細なデプロイ手順は [DEPLOY.md](./DEPLOY.md) を参照してください。

## ディレクトリ構造

- `src/` - ソースコード
  - `components/` - Reactコンポーネント
    - `pages/portfolio/` - ポートフォリオページ専用コンポーネント
    - `projects/` - プロジェクト表示関連コンポーネント
    - `ui/` - UIコンポーネント（スクロールアニメーションなど）
  - `layouts/` - Astroレイアウト
  - `pages/` - Astroページ
  - `styles/` - グローバルCSS設定
- `public/` - 静的ファイル
  - `images/` - 画像ファイル