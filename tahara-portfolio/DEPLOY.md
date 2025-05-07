# Netlifyへのデプロイ手順

このドキュメントでは、田原翼のポートフォリオページをNetlifyにデプロイする手順を説明します。

## 方法1: Netlify CLIを使用する方法

1. まず、Netlify CLIをインストールします（初回のみ）:

```bash
npm install -g netlify-cli
```

2. Netlifyにログインします:

```bash
netlify login
```

3. ビルドを行います:

```bash
cd tahara-portfolio
pnpm install
pnpm build
```

4. デプロイします:

```bash
netlify deploy --prod
```

プロンプトが表示されたら以下の情報を入力します:
- チーム: 個人アカウントまたは適切なチーム
- サイト: 新しいサイトを作成
- 公開ディレクトリ: `dist`

デプロイが完了すると、サイトのURLが表示されます。

## 方法2: Netlify UIを使用する方法

1. GitHubにリポジトリをプッシュします:

```bash
# 新しいリポジトリを作成してプッシュする場合
cd tahara-portfolio
git init
git add .
git commit -m "Initial commit"
git remote add origin <GitHubリポジトリURL>
git push -u origin main
```

2. Netlify (https://app.netlify.com/) にログインします。

3. 「New site from Git」ボタンをクリックします。

4. GitHubを選択し、リポジトリを選択します。

5. ビルド設定を入力します:
   - ビルドコマンド: `pnpm build`
   - 公開ディレクトリ: `dist`

6. 「Deploy site」ボタンをクリックしてデプロイを開始します。

## デプロイ後の設定

1. カスタムドメインを設定する場合:
   - Netlify管理画面で「Domain settings」を開きます
   - 「Add custom domain」ボタンをクリックします
   - ドメイン名を入力して「Verify」をクリックします
   - DNSレコードの設定手順に従ってください

2. 環境変数の設定が必要な場合:
   - Netlify管理画面で「Site settings」→「Environment variables」を開きます
   - 「Add variable」ボタンをクリックして環境変数を追加します

## 更新のデプロイ

サイトを更新する場合は、変更をコミットしてプッシュするか、再度Netlify CLIでデプロイコマンドを実行します。Netlifyは自動的に新しいビルドをデプロイします。