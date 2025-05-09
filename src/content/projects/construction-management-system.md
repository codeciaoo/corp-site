---
title: "建設現場DXプラットフォームの開発"
summary: "建設現場向けの統合管理システムを開発。Remix/Nest.jsによる管理者向けWebアプリケーションと、Service Worker活用のPWAアプリで現場のDXを実現。AWS Amplifyでの展開とCI/CD基盤の整備により、効率的な開発・運用体制を確立。"
cover: "./mermaid.png"
coverAlt: "Mermaid diagram for system architecture"
publishedDate: 2024-09-26
tags: ["モバイルアプリ", "クラウドネイティブ", "オフライン対応"]
tech_stacks: ["Next.js", "Nest.js", "React", "TypeScript", "PWA", "AWS Amplify", "DynamoDB", "Lambda", "GitHub Actions", "Jest", "Playwright"]
---

# 建設現場DXプラットフォームの開発

## お客様の情報
- **業界：** 建設
- **企業規模：** 従業員数 200名以上
- **事業内容：** 建設現場作業
- **プロジェクト形態：** システム開発会社からの再委託案件

## プロジェクト概要
- **プロジェクト期間：** 4ヶ月
- **弊社側の体制：** PM 1名、フロントエンドエンジニア 2名、バックエンドエンジニア 2名
- **開発スタイル：** ウォーターフォール開発
- **予算規模：** 600万円
- **担当フェーズ：** 要件定義、設計、開発、展開
- **プロジェクト範囲：** 現場管理システム全体の刷新

## CodeCiaoの役割
弊社は、一次請けのシステム開発会社様のご要望に応え、以下の領域で技術支援を提供させていただきました：

- **フロントエンド開発：**
  - Remixによる管理者向けWebアプリケーション開発
  - Service Workerを用いたPWA機能の実装

- **バックエンド開発：**
  - Nest.jsを用いたAPI開発
  - TypeORMによるデータアクセス実装

- **インフラ構築：**
  - 各種インフラの設計とAWS Amplifyによる構築
  - CloudWatchによる監視基盤の整備

## ご相談の背景
お客様は、以下のような課題を抱えていました：

- **技術面での課題：**
  - 最新のフロントエンド技術への対応が必要
  - クラウドネイティブな開発経験の不足
  - モバイルアプリケーション開発の実績不足

- **体制面での課題：**
  - 開発メンバーの確保が困難
  - 特定技術領域の専門家が不在
  - プロジェクト管理工数の不足

- **プロジェクト推進面での課題：**
  - 顧客要件の把握に時間を要する
  - 品質管理の仕組みが未整備
  - 顧客とのコミュニケーション工数の確保が困難
    （進捗報告MTGの運営、報告資料作成など）

## 取り組みの結果
弊社の支援により、以下のような成果を実現しました：

- **開発基盤の確立：**
  - Remix/Nest.jsによる開発環境の整備
  - AWSを活用したクラウドインフラの構築
  - PWAの実装によるモバイル対応の実現

- **チーム体制の強化：**
  - 弊社メンバーの参画による即戦力の補強
  - 技術支援を通じた開発チームのスキル向上
  - プロジェクト推進体制の補完

- **開発プロセスの改善：**
  - 要件定義から参画しスムーズな要件調整を実現
  - テスト・レビュー体制の整備
  - プロジェクト報告業務の効率化
    （定例MTGの運営、進捗報告資料の作成、エンドユーザーとの調整など）

## プロジェクト詳細

### 1. アーキテクチャ設計フェーズ

#### 1.1 フロントエンド設計
- **Remixアプリケーション：**
  - TypeScriptによる型安全な開発
  - Remixのルーティングを活用した効率的な画面遷移
  - TailwindCSSによる一貫性のあるUI/UX設計

- **PWA機能：**
  - Service Workerによるオフラインファースト設計
  - IndexedDBによるローカルデータの永続化
  - Push通知による現場作業員とのリアルタイムコミュニケーション

#### 1.2 バックエンド設計
- **APIアーキテクチャ：**
  - Nest.jsによるモジュラーなAPI設計
  - TypeScriptの型システムを活用した堅牢な実装
  - WebSocketを用いたリアルタイム通信の実装

- **データベース設計：**
  - AWS RDSによる関係データベースの構築
  - TypeORMによる型安全なデータアクセス
  - Redis Clusterを用いたキャッシュ層の構築

### 2. 開発プロセスの確立

#### 2.1 品質管理体制
- **自動テスト基盤：**
  - Jest + React Testing Libraryによるユニットテスト
  - Cypressを用いたE2Eテストの自動化
  - Storybookによるコンポーネントカタログの整備

- **コードレビュープロセス：**
  - ESLint + Prettierによるコード品質の標準化
  - PRテンプレートの整備とレビューチェックリストの作成
  - SonarQubeによる静的解析の自動化

#### 2.2 CI/CD基盤の構築
- **ビルド・デプロイの自動化：**
  - AWS Amplifyによるデプロイパイプラインの構築
  - GitHub Actionsによる自動テストの実行

### 3. 運用体制の確立

#### 3.1 監視・アラート体制
- **統合監視基盤：**
  - CloudWatchによるメトリクス収集
  - DatadogによるAPMの実装
  - Slackとの連携によるアラート通知の自動化

#### 3.2 運用効率化
- **自動化スクリプトの整備：**
  - シェルスクリプトによる運用タスクの自動化
  - AWS CLIを活用した運用コマンドの整備

## まとめ

本プロジェクトでは、システム開発会社様と協力し、エンドユーザーである建設会社様のニーズに沿ったシステムを提供することができました。

以下の点について、システム開発会社様からご評価いただきました：

1. **技術面での取り組み：**
   - TypeScriptを活用した開発基盤の整備
   - RemixとNest.jsを組み合わせた効率的な開発
   - AWS Amplifyを用いたデプロイ環境の構築

2. **プロジェクトの進め方：**
   - 開発プロセスの整備
   - 品質管理体制の構築
   - 円滑なコミュニケーションの実現

3. **運用面での工夫：**
   - 効率的な運用体制の整備
   - 自動化による業務効率の改善
   - 将来の拡張性を考慮した設計
