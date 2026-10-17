# すくすく備忘録のお問い合わせフォーム（2026-10-17）

## 目的
アプリ「すくすく備忘録」の利用者（親）が、会社名に「個人」と書かずに問い合わせできるようにする。

## 方針（ユーザー確認済み）
- 専用のページ `/apps/sukusuku-biboroku/contact/` を作る。項目は お名前・メールアドレス・お問い合わせの内容 の 3 つ（すべて必須）
- 業務向けのフォーム（`/contact`、`ContactForm.astro`）は変えない
- `/api/contact` に 3 種類目（`type: "app"`、`app: "sukusuku-biboroku"`）を足す。会社名と相談したいことは受け取らない。Slack の 1 行目でアプリの問い合わせと分かるようにする
- サポートのページの案内（「個人」「その他」「最初にすくすく備忘録と書く」）を消し、新しいページへリンクする

## 手順
- [ ] API と `scripts/test-contact.mjs`
- [ ] フォームの部品とページ
- [ ] サポートのページの案内、検査のルート（qa / wrap-check / review-pack）
- [ ] `pnpm test:api`、`pnpm qa`、画面の確認（1440 Chrome、375 WebKit）
- [ ] コミット、PR

## 確かめてもらうこと
- Cloudflare Pages の secret `SLACK_WEBHOOK_URL` が設定済みか（試しには送らない）
