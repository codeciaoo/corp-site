import type { MemberPortfolio } from "../portfolioTypes";

/**
 * 田原翼のポートフォリオデータ
 */
export const taharaPortfolio: MemberPortfolio = {
  // 基本情報
  name: "田原 翼",
  role: "プロジェクトマネージャー & バックエンドエンジニア",
  image: "/president.png?height=400&width=800",
  career: [
    "慶應義塾大学卒業後、株式会社ベイカレントコンサルティングに入社",
    "2021年にlivepass株式会社にプロジェクトマネージャーとして入社",
    "自社SaaSの開発及び、上場企業向けに受託開発や技術コンサルティングを行う",
    "2024年2月にCodeCiao株式会社を設立",
  ],
  skills: [
    "プロジェクトマネジメント(ウォーターフォール、スクラム)",
    "生成AI/RAGを用いた検索システム/チャットボットの構築",
    "クラウドインフラストラクチャの設計とIaCによる構築・運用",
    "マイクロサービスアーキテクチャの設計と実装",
  ],
  projects: [
    "レガシーシステムの刷新プロジェクトのリード",
    "RAG × LLMを用いた社内事例検索システムの構築",
    "工場向けデータ可視化ダッシュボード及びホワイトボードの構築",
  ],
  media: [],

  // 拡張情報
  slug: "tahara",
  fullBio: "• 慶應義塾大学卒業後、ベイカレントコンサルティングでPMO・アーキテクト職を7年間経験\n• AWS/Terraform/CDKを使ったクラウドインフラ設計と自動化に精通（AWS SAP保有）\n• Docker/Kubernetesによるクラウドネイティブ基盤構築のエキスパート\n• 生成AI（OpenAI/Gemini）とRAGを活用した業務効率化システム開発が得意\n• FastAPI/Djangoを使ったPythonバックエンド開発\n• 金融・通信・製造業向けマイクロサービスの設計・実装を多数主導",

  contactInfo: {},

  // 所属組織ロゴ
  // organizationLogos: [
  //   { src: "/keio.png", alt: "慶應義塾大学" },
  //   { src: "/baycurrent.png", alt: "ベイカレントコンサルティング" },
  //   { src: "/livepass.png", alt: "livepass株式会社" },
  //   { src: "/codeciao.png", alt: "CodeCiao株式会社" },
  // ],

  detailedSkills: [
    {
      category: "プロジェクトマネジメント",
      skills: [
        { name: "ウォーターフォール開発", level: 4, years: 7 },
        { name: "アジャイル/スクラム", level: 4, years: 5 },
        { name: "要件定義・設計", level: 5, years: 7 },
      ]
    },
    {
      category: "クラウド/インフラ",
      skills: [
        { name: "AWS", level: 5, years: 7 },
        { name: "AWS CDK", level: 4, years: 3 },
        { name: "GCP", level: 2, years: 2 },
        { name: "Azure", level: 1, years: 1 },
        { name: "Terraform", level: 4, years: 4 },
        { name: "Docker", level: 4, years: 5 },
        { name: "Kubernetes", level: 3, years: 3 },
        { name: "ArgoCD", level: 2, years: 1 },
        { name: "Prometheus", level: 2, years: 1 },
        { name: "Grafana", level: 3, years: 3 },
      ]
    },
    {
      category: "フロントエンド開発",
      skills: [
        { name: "JavaScript", level: 2, years: 4 },
        { name: "TypeScript", level: 2, years: 4 },
        { name: "React", level: 2, years: 4 },
        { name: "Next.js", level: 2, years: 4 },
        { name: "Vue.js", level: 1, years: 2 },
        { name: "Remix", level: 1, years: 1 },
      ]
    },
    {
      category: "バックエンド開発",
      skills: [
        { name: "Python", level: 3, years: 7 },
        { name: "Django", level: 3, years: 7 },
        { name: "FastAPI", level: 3, years: 5 },
        { name: "Node.js", level: 2, years: 2 },
        { name: "Express", level: 2, years: 2 },
        { name: "Ruby on Rails", level: 1, years: 1 },
        { name: "Laravel", level: 2, years: 1 },
        { name: "TypeScript", level: 3, years: 3 },
        { name: "MySQL", level: 3, years: 3 },
        { name: "PostgreSQL", level: 3, years: 7 },
        { name: "DynamoDB", level: 3, years: 3 },
        { name: "Redis", level: 3, years: 7 },
        { name: "MongoDB", level: 2, years: 1 },
      ]
    },
    {
      category: "AIシステム開発",
      skills: [
        { name: "OpenAI", level: 3, years: 2 },
        { name: "Gemini", level: 3, years: 2 },
        { name: "LangChain", level: 3, years: 2 },
        { name: "Pinecone", level: 3, years: 2 },
        { name: "PyTorch", level: 2, years: 2 },
        { name: "Hugging Face", level: 3, years: 2 },
      ]
    },
  ],

  detailedCareer: [
    {
      company: "CodeCiao株式会社",
      position: "代表取締役",
      period: "2024年6月〜現在",
      description: "企業向けにAIソリューション開発及び、コンサルティングサービスを提供"
    },
    {
      company: "livepass株式会社",
      position: "プロジェクトマネージャー",
      period: "2022年4月〜2024年5月",
      description: "自社SaaSの開発、上場企業向けに受託開発や技術コンサルティングを提供"
    },
    {
      company: "株式会社ベイカレントコンサルティング",
      position: "ITコンサルタント",
      period: "2016年4月〜2022年3月",
      description: "官公庁や大手企業向けにITコンサルティングや要件定義、PMOを担当"
    },
  ],

  education: [
    {
      institution: "慶應義塾大学",
      degree: "商学部 卒業",
      period: "2012年4月〜2016年3月"
    }
  ],

  certifications: [
    {
      name: "AWS SAP (Solutions Architect Professional)",
      issuedBy: "Amazon Web Services",
      year: 2022
    },
    {
      name: "応用情報技術者試験",
      issuedBy: "IPA",
      year: 2019
    }
  ],

  // プロジェクト実績
  projectsTable: [
    {
      id: "project0",
      period: "2024年1月～2024年5月",
      projectContent: "Kubernetesベースのマルチテナントクラウドネイティブ基盤構築",
      role: {
        position: "クラウドエンジニア",
        details: [
          "Terraformモジュール設計によるマルチクラウド環境(GCP/AWS)でのIaC実装",
          "マルチテナント&複数環境(開発/ステージング/本番)の一元管理体制の確立",
          "GoogleのGKEとAWSのEKSにおけるKubernetesクラスタ設計・運用",
          "ArgoCDとGitHub Actionsを組み合わせたGitOpsデプロイパイプラインの構築",
          "EKS環境でのElasticsearch/Kibana/Fluentdによる分散ログ収集基盤とPrometheus/Grafanaによる監視体制の整備",
        ]
      },
      industry: "業界：ITサービス/SaaS",
      scale: "開発チーム5名、全体10名",
      technologies: [
        "Kubernetes", "GKE", "EKS", "Terraform", "Istio", "ArgoCD", "Sealed Secrets",
        "Elasticsearch", "Kibana", "Fluentd", "Prometheus", "Grafana", "GitOps",
        "Docker", "AWS", "GCP", "GitHub Actions"
      ]
    },
    {
      id: "project1",
      period: "2025年1月～2025年5月",
      projectContent: "AI搭載コールセンター向けCRMプラットフォームの開発",
      role: {
        position: "エンジニア",
        details: [
          "NestJS＋GraphQL＋Prismaを用いたサービスの設計・実装",
          "音声認識API連携→自動文字起こし→AI要約・VOC生成パイプラインにカスタムプロンプト管理を導入",
          "Next.js＋TypeScriptフロントエンドで要約UI/AIチャットサイドバーを開発、Apollo Client/Zustandで状態管理",
          "zod＋i18n対応の共通ライブラリを作成し、OpenAIへのプロンプト送信ロジックを抽象化",
        ]
      },
      industry: "業界：ITサービス",
      scale: "開発チーム6名、全体10名",
      technologies: [
        "NestJS", "GraphQL", "Prisma", "Next.js", "TypeScript", "OpenAI",
        "Apollo Client", "Zustand", "zod", "Docker", "AWS"
      ]
    },
    {
      id: "project2",
      period: "2024年7月～2024年12月",
      projectContent: "業務管理システムのアプリ・インフラ構築",
      role: {
        position: "PM兼エンジニア",
        details: [
          "PHP/Laravelを用いた会計・請求・料金管理APIの設計・実装",
          "ArtisanコマンドによるCSV一括インポート・トランケート処理の開発",
          "Maatwebsite Excel／PhpSpreadsheet／TCPDF／FPDIを組み合わせたExcel・PDF帳票出力機能の実装",
          "Docker（nginx、PHP-FPM、MySQL、Fluent Bit）環境の構築",
          "Terraformを活用し、ALB/ECS/Aurora/API Gateway/Lambda等のAWSリソースをモジュール化",
          "Python/ShellスクリプトでDBスキーマやデータのダンプ・リストアを自動化し、移行・運用フローを最適化",
          "AWS CodeBuild/CodePipelineによるCI/CDパイプラインを構築し、Dev/Stg/Prod各環境への継続的デプロイとクロスアカウント運用を実現"
        ]
      },
      industry: "業界：金融",
      scale: "開発チーム5名、全体8名",
      technologies: [
        "Laravel", "PHP", "MySQL", "Docker", "Terraform", "AWS", "ECS", "Aurora",
        "API Gateway", "Lambda", "Python", "CodeBuild", "CodePipeline"
      ]
    }
  ],

  selfPr: "• ビジネス要件を技術で解決するコンサルタント経験と、手を動かせるエンジニアとしての両面を持ち合わせています\n• プロジェクトマネジメントスキル（ウォーターフォール/アジャイル）とクラウドアーキテクチャ設計の知見を活かし、要件定義から実装までをワンストップで提供できます\n• 7年間培ったエンタープライズ向け大規模システム開発の経験と、最新のAI技術への知見を組み合わせ、企業のDX推進を支援します\n• お客様のビジネス成果を最優先に考え、コストと価値のバランスを重視した最適なソリューションを提案します"
};