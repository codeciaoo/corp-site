# 田原翼 ポートフォリオサイト

このプロジェクトは田原翼のポートフォリオサイトをNetlifyにデプロイするためのサブプロジェクトです。

## 特徴

- ヘッダーとフッターがないシンプルなレイアウト
- 専用のAstroプロジェクトとして実装
- Netlifyへのデプロイに最適化

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

## ディレクトリ構造

- `src/` - ソースコード
  - `components/` - コンポーネント
  - `layouts/` - レイアウト
  - `pages/` - ページ
  - `data/` - ポートフォリオデータ
- `public/` - 静的ファイル
  - `images/` - 画像ファイル