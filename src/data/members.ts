// メンバーの紹介。前職などの会社名は書かない（design/BRIEF-company.md の「書いてよいこと、いけないこと」）。

export interface MemberPhoto {
  src: string;
  /** 画像の大きさ（px） */
  width: number;
  height: number;
  /** 切り抜くときの中心（object-position） */
  position: string;
}

export interface Member {
  /** ポートフォリオ（/members/<slug>）と、ページ内の移動先（/members#<slug>）の識別子 */
  slug: string;
  no: string;
  name: string;
  role: string;
  photo: MemberPhoto;
  career: string[];
  skills: string[];
  projects: string[];
}

// 元の写真（public 直下）は大きいので、表示には public/members/ の縮小版（WebP）を使う
export const MEMBERS: Member[] = [
  {
    slug: "tahara",
    no: "01",
    name: "田原 翼",
    role: "プロジェクトマネージャー / バックエンドエンジニア",
    photo: {
      src: "/members/tahara.webp",
      width: 720,
      height: 660,
      position: "50% 22%",
    },
    career: [
      "慶應義塾大学を卒業後、コンサルティングファームに入社",
      "2021年にSaaS企業へプロジェクトマネージャーとして入社",
      "自社SaaSの開発と、上場企業向けの受託開発・技術コンサルティングを担当",
      "2024年2月にCodeCiao株式会社を設立",
    ],
    skills: [
      "プロジェクトマネジメント（ウォーターフォール、スクラム）",
      "生成AIとRAGを使った検索システム、チャットボットの構築",
      "クラウドインフラの設計と、IaCによる構築・運用",
      "マイクロサービスアーキテクチャの設計と実装",
    ],
    projects: [
      "レガシーシステムを刷新するプロジェクトのリード",
      "RAGとLLMを使った社内事例の検索システムの構築",
    ],
  },
  {
    slug: "ichinose",
    no: "02",
    name: "一ノ瀬 英太",
    role: "フロントエンド / ネイティブアプリエンジニア",
    photo: {
      src: "/members/ichinose.webp",
      width: 960,
      height: 937,
      position: "62% 30%",
    },
    career: [
      "専門学校を卒業後、製造業の会社に入社",
      "製造ラインの工程管理や安全衛生活動に従事しながら、社内業務システムの要件定義から運用までを手がける",
      "2021年にシステム開発会社に参画し、テックリードとして技術選定と設計を主導",
      "人材マッチングサービスのプラットフォームと、飲食店の予約アプリを開発",
    ],
    skills: [
      "React、TypeScript、Next.jsを使ったフロントエンド開発",
      "パフォーマンスの最適化とアクセシビリティを考慮したUIの実装",
      "Storybookとテストライブラリを使ったコンポーネント駆動開発",
      "Flutterを使ったクロスプラットフォームアプリの開発",
    ],
    projects: [
      "建設人材の派遣管理システム",
      "メンテナンス点検管理システム",
      "工場向けのデータ可視化ダッシュボードとホワイトボードの構築",
    ],
  },
  {
    slug: "akiyama",
    no: "03",
    name: "穐山 悠太",
    role: "バックエンド / AIエンジニア",
    photo: {
      src: "/members/akiyama.webp",
      width: 1440,
      height: 960,
      position: "66% 30%",
    },
    career: [
      "大学を卒業後、システム開発会社に入社",
      "公共機関向けのシステムと、不動産データ分析サービスの開発を担当",
      "個人でサブスクリプション型のWebアプリを開発・運営",
    ],
    skills: [
      "PythonとFastAPIを使ったバックエンド開発",
      "機械学習と生成AIを使ったシステム開発",
      "要件定義から運用までの一貫した開発支援",
    ],
    projects: [
      "機械学習を使った画像識別システムの開発",
      "越境EC向けの自動化ツールの開発",
      "企業向けの生成AI活用コンサルティング",
    ],
  },
];
