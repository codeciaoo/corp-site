# Taharaポートフォリオページの単体エクスポート手順

このドキュメントでは、Taharaのポートフォリオページをヘッダー/フッターなしでHTMLエクスポートする手順を説明します。

## 1. スタンドアロンモードでビルドする

以下のコマンドを実行して、STANDALONEモードでビルドを行います：

```bash
# 環境変数を設定してビルド
STANDALONE=true pnpm build
```

これにより、`dist/members/tahara/index.html`がヘッダー/フッターなしの状態で生成されます。

## 2. 必要なアセットを抽出する

ビルド後、以下のファイルやディレクトリを抽出します：

1. HTMLファイル: `dist/members/tahara/index.html`
2. CSSファイル: `dist/_astro/`ディレクトリ内の全CSSファイル
3. JSファイル: `dist/_astro/`ディレクトリ内の全JSファイル
4. 画像ファイル: 
   - `dist/president.png`
   - `dist/keio.png`
   - `dist/baycurrent.png`
   - `dist/livepass.png`
   - `dist/codeciao_new.png`
   - `dist/ipa.jpg`
   - `dist/sap.jpg`
   - その他必要な画像ファイル

## 3. ファイル構造を再編成する

抽出したファイルを以下のような構造で新しいディレクトリに配置します：

```
standalone-portfolio/
├── index.html         # Taharaのポートフォリオページ
├── assets/            # CSSとJSファイル
│   ├── css/           # CSSファイル
│   └── js/            # JSファイル
└── images/            # 画像ファイル
    └── ...
```

## 4. HTMLファイルのパスを修正する

`index.html`内のパスを修正します：

1. CSSファイルのパス: `/_astro/` → `./assets/css/`
2. JSファイルのパス: `/_astro/` → `./assets/js/`
3. 画像ファイルのパス: `/` → `./images/`

## 5. 確認と調整

1. ローカルで開いてレイアウトが正しく表示されるか確認
2. 必要に応じてスタイルやレイアウトを調整
3. リンクや機能が正常に動作するか確認

## 開発中に確認する方法

開発中にスタンドアロンモードを確認したい場合は、URLパラメータを使用します：

```
http://localhost:4321/members/tahara?standalone=true
```

これで、開発サーバー上でもヘッダー/フッターなしのバージョンを確認できます。

## 注意事項

- このエクスポート方法は、既存のサイトに影響を与えずに実行できます
- エクスポートしたHTMLは静的ファイルなので、動的機能は動作しません
- 定期的にメインサイトの更新に合わせて再エクスポートすることをお勧めします