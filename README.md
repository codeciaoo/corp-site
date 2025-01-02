# CodeCiao コーポレートサイト

## 概要
CodeCiaoのコーポレートサイトです。[Astro](https://astro.build)と[shadcn/ui](https://ui.shadcn.com/)を使用して構築されています。

## 技術スタック

- [Astro](https://astro.build) - 静的サイトジェネレーター
- [shadcn/ui](https://ui.shadcn.com/) - UIコンポーネントライブラリ
- [Tailwind CSS](https://tailwindcss.com) - CSSフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型付きJavaScript

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone <repository-url>

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

## ビルド

```bash
# 本番用ビルド
pnpm build

# ビルドのプレビュー
pnpm preview
```

## プロジェクト構造

```
src/
├── components/     # Reactコンポーネント
├── layouts/        # ページレイアウト
├── pages/          # Astroページ
└── styles/         # グローバルスタイル

public/            # 静的アセット
```

## デプロイ

mainブランチへのマージが完了すると、自動的に以下のURLに反映されます：
https://code-ciao.com/

本サイトはCloudflare Pagesでホストされています。デプロイの状況は以下のダッシュボードで確認できます：
https://dash.cloudflare.com/35e2481229239d9efd5019e3243436a6/pages/view/corp-site

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
