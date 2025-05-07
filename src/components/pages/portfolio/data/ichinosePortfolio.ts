import type { MemberPortfolio } from "../portfolioTypes";

/**
 * 一ノ瀬英太のポートフォリオデータ
 */
export const ichinosePortfolio: MemberPortfolio = {
  // 基本情報
  name: "一ノ瀬 英太",
  role: "フロント & ネイティブアプリエンジニア",
  image: "/ichinose.jpg?height=400&width=400",
  career: [
    "専門学校卒業後、中島産業株式会社に入社",
    "製造ラインの工程管理・安全衛生活動を行いつつ、社内の業務システムの要件定義から開発・運用に従事",
    "2021年に株式会社トライビートに参画し、テックリードとして技術選定や設計を主導",
    "大手人材マッチングサービスのプラットフォーム開発や大手飲食店の予約アプリの開発に従事",
  ],
  skills: [
    "React, TypeScript, Next.jsを用いたモダンなフロントエンド開発",
    "パフォーマンス最適化とアクセシビリティを考慮したUIの実装",
    "Storybook/Testingライブラリを活用したコンポーネント駆動開発",
    "Flutterを用いたクロスプラットフォームアプリ開発",
  ],
  projects: [
    "建設人材の派遣管理システム",
    "メンテナンス点検管理システム",
    "工場向けデータ可視化ダッシュボード及びホワイトボードの構築",
  ],
  media: [],

  // 拡張情報
  slug: "ichinose",
  fullBio: "専門学校卒業後、製造業での現場経験を活かしながらWebシステム開発に従事。現場の課題を解決するためのシステム開発経験を積み、多くのWebアプリケーションやモバイルアプリの開発プロジェクトに携わる。フロントエンド技術に精通し、特にReactとTypeScriptを用いたモダンな開発手法に強みを持つ。",

  contactInfo: {},

  detailedSkills: [
    {
      category: "フロントエンド開発",
      skills: [
        { name: "React", level: 5, years: 4 },
        { name: "TypeScript", level: 5, years: 4 },
        { name: "Next.js", level: 4, years: 3 },
        { name: "HTML/CSS", level: 5, years: 6 },
        { name: "Tailwind CSS", level: 4, years: 3 },
      ]
    },
    {
      category: "モバイルアプリ開発",
      skills: [
        { name: "Flutter", level: 4, years: 2 },
        { name: "React Native", level: 3, years: 1 },
        { name: "iOS/Swift", level: 2, years: 1 },
      ]
    },
    {
      category: "テスト/品質管理",
      skills: [
        { name: "Jest", level: 4, years: 3 },
        { name: "React Testing Library", level: 4, years: 3 },
        { name: "Storybook", level: 5, years: 3 },
        { name: "Cypress", level: 3, years: 2 },
      ]
    },
    {
      category: "その他",
      skills: [
        { name: "Git/GitHub", level: 4, years: 5 },
        { name: "CI/CD", level: 3, years: 3 },
        { name: "Firebase", level: 4, years: 3 },
        { name: "GraphQL", level: 3, years: 2 },
      ]
    },
  ],

  detailedCareer: [
    {
      company: "CodeCiao株式会社",
      position: "フロントエンドエンジニア",
      period: "2024年2月〜現在",
      description: "企業向けのUIデザイン設計及びフロントエンド開発を担当"
    },
    {
      company: "株式会社トライビート",
      position: "テックリード",
      period: "2021年6月〜2024年1月",
      description: "複数のプロジェクトでテックリードとして技術選定や設計を主導。大手人材マッチングサービスのプラットフォーム開発や飲食店の予約システム構築などを担当"
    },
    {
      company: "中島産業株式会社",
      position: "システムエンジニア",
      period: "2018年4月〜2021年5月",
      description: "製造ラインの工程管理・安全衛生活動を行いつつ、社内の業務システムの要件定義から開発・運用に従事"
    },
  ],

  education: [
    {
      institution: "日本工学院専門学校",
      degree: "ITスペシャリスト科 卒業",
      period: "2016年4月〜2018年3月"
    }
  ],

  certifications: [
    {
      name: "応用情報技術者試験",
      issuedBy: "IPA",
      year: 2019
    },
    {
      name: "AWS SAA (Solutions Architect Associate)",
      issuedBy: "Amazon Web Services",
      year: 2021
    },
  ],

  projectsTable: [
    {
      id: "project1",
      period: "2023年7月～2023年12月",
      projectContent: "建設人材の派遣管理システムの開発",
      role: {
        position: "フロントエンドリード",
        details: [
          "Next.jsとTypeScriptを使用したフロントエンド開発",
          "React Query/SWRによるデータフェッチングの最適化",
          "Tailwind CSSを使用したレスポンシブデザインの実装",
          "クライアントとの要件定義・設計会議の進行",
          "コンポーネントライブラリの構築とStorybookでのドキュメント化"
        ]
      },
      industry: "業界：建設",
      scale: "開発チーム3名、全体5名",
      technologies: [
        "Next.js", "TypeScript", "Tailwind CSS", "React Query",
        "Storybook", "Jest", "React Testing Library", "GitHub Actions", "Vercel"
      ]
    },
    {
      id: "project2",
      period: "2022年10月～2023年3月",
      projectContent: "製造業向けメンテナンス点検管理システムの開発",
      role: {
        position: "フルスタックエンジニア",
        details: [
          "Flutterを使用したクロスプラットフォームアプリ開発",
          "Firebase Firestoreを使用したデータ管理",
          "オフライン機能の実装（データの同期）",
          "QRコードスキャン機能の実装",
          "バーコードリーダーとの連携機能の実装"
        ]
      },
      industry: "業界：製造",
      scale: "開発チーム2名、全体4名",
      technologies: [
        "Flutter", "Dart", "Firebase", "Firestore", "Authentication",
        "Cloud Functions", "GitHub"
      ]
    },
    {
      id: "project3",
      period: "2022年4月～2022年9月",
      projectContent: "飲食店の予約・順番管理アプリケーションの開発",
      role: {
        position: "フロントエンド開発者",
        details: [
          "React Nativeを使用したクロスプラットフォームアプリ開発",
          "予約システムのUI/UX設計",
          "Push通知システムの実装",
          "GraphQLを使用したAPIとの連携",
          "アプリケーションのパフォーマンス最適化"
        ]
      },
      industry: "業界：飲食",
      scale: "開発チーム5名、全体8名",
      technologies: [
        "React Native", "TypeScript", "GraphQL", "Apollo Client",
        "Redux", "Jest", "GitHub"
      ]
    }
  ],

  selfPr: "私は製造業での現場経験とIT開発経験の両方を持つことで、実際の業務課題を理解した上での開発が得意です。特にフロントエンド技術に精通しており、ユーザー体験を重視したUI/UX設計と実装に強みがあります。また、コンポーネント駆動開発やテスト駆動開発を取り入れることで、保守性と拡張性の高いコードベースの構築を心がけています。"
};