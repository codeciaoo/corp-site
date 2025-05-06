import type { TeamMember } from "../members/Members";

/**
 * プロジェクト実績エントリ
 */
export interface ProjectEntry {
  id: string;                   // 一意のID
  period: string;               // 期間（例："2023年11月～2024年6月"）
  projectContent: string;       // プロジェクト内容
  role: {
    position: string;           // 役職
    details: string[];          // 詳細業務内容
  };
  industry: string;             // 業界
  scale: string;                // 規模（例："開発チーム4名、全体6名"）
  technologies: string[];       // 利用技術
}

/**
 * 拡張されたメンバーポートフォリオのインターフェース
 */
export interface MemberPortfolio extends TeamMember {
  // 基本情報の拡張
  slug: string;                 // URLスラッグ
  fullBio: string;              // 詳細な自己紹介文
  contactInfo?: {               // 連絡先情報（オプション）
    email?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };

  // スキル情報の拡張
  detailedSkills: {
    category: string;           // スキルカテゴリ（言語、フレームワーク、ツールなど）
    skills: {
      name: string;             // スキル名（TechStackIcon に対応する技術名）
      level?: number;           // 習熟度（1-5）（オプション）
      years?: number;           // 経験年数（オプション）
    }[];
  }[];

  // 経歴情報の拡張
  detailedCareer: {
    company: string;            // 会社・組織名
    position: string;           // 役職
    period: string;             // 期間
    description: string;        // 詳細
  }[];

  // 教育・資格
  education: {
    institution: string;        // 学校名
    degree: string;             // 学位
    period: string;             // 期間
  }[];

  certifications: {
    name: string;               // 資格名
    issuedBy: string;           // 発行組織
    year: number;               // 取得年
  }[];
  /**
   * 所属組織のロゴ配列
   */
  organizationLogos?: { src: string; alt: string }[];

  // プロジェクト実績（表形式データ）
  projectsTable: ProjectEntry[];

  // 自己PR
  selfPr: string;               // 自己PR文
}

/**
 * メンバーポートフォリオデータ
 */
export const memberPortfolios: MemberPortfolio[] = [
  {
    // 基本情報（既存）
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
    fullBio: "慶應義塾大学を卒業後、コンサルティング会社でプロジェクトマネジメントとバックエンド開発を経験。\nAWS、Azure等のクラウドインフラ設計から、マイクロサービスアーキテクチャの実装、AIを活用したシステム開発まで幅広く手がける。\n特にAIを活用した業務効率化や、レガシーシステムの刷新プロジェクトの経験が豊富。",

    contactInfo: {
      linkedin: "https://linkedin.com/in/tsubasa-tahara",
      github: "https://github.com/tsubasa-tahara",
    },
    // 所属組織ロゴ
    organizationLogos: [
      { src: "/keio.png", alt: "慶應義塾大学" },
      { src: "/baycurrent.png", alt: "ベイカレントコンサルティング" },
      { src: "/livepass.png", alt: "livepass株式会社" },
      { src: "/corp_logo.png", alt: "CodeCiao株式会社" },
    ],

    detailedSkills: [
      {
        category: "プロジェクトマネジメント",
        skills: [
          { name: "ウォーターフォール開発", level: 5, years: 7 },
          { name: "アジャイル/スクラム", level: 4, years: 5 },
          { name: "要件定義", level: 5, years: 7 },
          { name: "セキュリティ管理", level: 4, years: 4 },
        ]
      },
      {
        category: "クラウド/インフラ",
        skills: [
          { name: "AWS", level: 5, years: 6 },
          { name: "AWS CDK", level: 4, years: 4 },
          { name: "GCP", level: 3, years: 2 },
          { name: "Azure", level: 3, years: 2 },
          { name: "Terraform", level: 4, years: 4 },
          { name: "Docker", level: 4, years: 5 },
          { name: "Kubernetes", level: 3, years: 3 },
        ]
      },
      {
        category: "フロントエンド開発",
        skills: [
          { name: "JavaScript", level: 4, years: 5 },
          { name: "TypeScript", level: 4, years: 4 },
          { name: "React", level: 3, years: 3 },
          { name: "Next.js", level: 3, years: 3 },
          { name: "Vue.js", level: 3, years: 2 },
          { name: "Svelte", level: 3, years: 1 },
          { name: "Remix", level: 2, years: 1 },
        ]
      },
      {
        category: "AIシステム開発",
        skills: [
          { name: "LangChain", level: 4, years: 2 },
          { name: "OpenAI", level: 5, years: 2 },
          { name: "Gemini", level: 4, years: 1 },
          { name: "Hugging Face", level: 3, years: 1 },
          { name: "RAGシステム構築", level: 4, years: 2 },
        ]
      },
      {
        category: "バックエンド開発",
        skills: [
          { name: "Python", level: 5, years: 5 },
          { name: "Django", level: 5, years: 5 },
          { name: "FastAPI", level: 5, years: 5 },
          { name: "Node.js", level: 4, years: 4 },
          { name: "Express", level: 4, years: 4 },
          { name: "TypeScript", level: 4, years: 4 },
          { name: "MySQL", level: 4, years: 5 },
          { name: "PostgreSQL", level: 4, years: 6 },
          { name: "DynamoDB", level: 4, years: 3 },
        ]
      },
    ],

    detailedCareer: [
      {
        company: "CodeCiao株式会社",
        position: "代表取締役",
        period: "2024年2月〜現在",
        description: "企業向けにAIソリューション開発及び、コンサルティングサービスを提供"
      },
      {
        company: "livepass株式会社",
        position: "プロジェクトマネージャー",
        period: "2021年4月〜2024年1月",
        description: "自社SaaSの開発及び、上場企業向けに受託開発や技術コンサルティングを担当"
      },
      {
        company: "株式会社ベイカレントコンサルティング",
        position: "ITコンサルタント",
        period: "2018年4月〜2021年3月",
        description: "官公庁や大手企業向けにITコンサルティングや要件定義、PMOを担当"
      },
    ],

    education: [
      {
        institution: "慶應義塾大学",
        degree: "商学部 卒業",
        period: "2014年4月〜2018年3月"
      }
    ],

    certifications: [
      {
        name: "AWS SAP (Solutions Architect Professional)",
        issuedBy: "Amazon Web Services",
        year: 2022
      },
      {
        name: "情報処理安全確保支援士",
        issuedBy: "IPA",
        year: 2021
      },
      {
        name: "PMP",
        issuedBy: "Project Management Institute",
        year: 2020
      }
    ],

    // 添付画像のテーブルデータを構造化
    projectsTable: [
      {
        id: "project1",
        period: "2024年1月～2024年5月",
        projectContent: "RAG・生成AI活用による製造現場の安全管理システム開発",
        role: {
          position: "PM兼エンジニア",
          details: [
            "製造業のお客様向けにRAGと生成AIを活用した安全管理システムのPOC開発",
            "ハイブリッド検索（ベクトル＋キーワード）による検索精度の向上",
            "クロスエンコーダーとLLMリランキングを組み合わせた高精度な情報抽出システムの実装",
            "生成AIによる現場状況に応じた安全アドバイスの提供",
            "プロジェクト全体の進捗管理とクライアントコミュニケーション"
          ]
        },
        industry: "業界：製造",
        scale: "開発チーム2名、全体2名",
        technologies: [
          "Gemini", "GCP", "Cloud Run", "Pinecone", "Python", "Langchain", 
          "Hugging Face", "PyTorch"
        ]
      },
      {
        id: "project2",
        period: "2024年5月～2024年8月",
        projectContent: "建設現場DXプラットフォームの開発",
        role: {
          position: "PM兼エンジニア",
          details: [
            "建設現場向け統合管理システムの開発",
            "Remix/Nest.jsによる管理者向けWebアプリケーションの設計・開発",
            "Service Worker活用のPWAアプリによるオフライン対応機能の実現",
            "AWS Amplifyでの展開とCI/CD基盤の整備",
            "自動テスト基盤の構築と運用効率化の実現",
            "クライアントとのコミュニケーションとプロジェクト推進"
          ]
        },
        industry: "業界：建設",
        scale: "開発チーム5名、全体5名",
        technologies: [
          "Next.js", "Nest.js", "React", "TypeScript", "PWA", "AWS Amplify", 
          "DynamoDB", "Lambda", "GitHub Actions", "Jest", "Playwright"
        ]
      },
      {
        id: "project3",
        period: "2023年9月～2023年12月",
        projectContent: "EC2からECSへの移行プロジェクト",
        role: {
          position: "PM兼エンジニア",
          details: [
            "不動産ポータルサイトのEC2からECSへのインフラ基盤移行",
            "CI/CDパイプラインの自動化による運用効率化",
            "ブルーグリーンデプロイの導入でダウンタイムを最小化",
            "コンテナセキュリティ強化と自動脆弱性スキャンの導入",
            "プロジェクト全体のスケジュール管理とクライアント折衝",
            "移行計画の立案から実装、運用改善までを担当"
          ]
        },
        industry: "業界：不動産",
        scale: "開発チーム2名、全体2名",
        technologies: [
          "AWS", "ECS", "EC2", "Docker", "CodePipeline", "CodeBuild", 
          "CodeDeploy", "Route53", "ECR", "CloudWatch", "IAM", "ALB"
        ]
      },
      {
        id: "project4",
        period: "2023年8月～2023年11月",
        projectContent: "AWS環境の統合管理基盤構築プロジェクト",
        role: {
          position: "PM兼エンジニア",
          details: [
            "Account Factory for Terraform（AFT）を活用した複数事業部のAWS環境統合管理",
            "アカウント作成の自動化と環境分離によるリスク低減",
            "不正リソース作成防止とコスト最適化の仕組み構築",
            "SSOによる認証統合とセキュリティ強化の実現",
            "自動脆弱性スキャンやCI/CD内のセキュリティ検証体制の整備"
          ]
        },
        industry: "業界：通信",
        scale: "開発チーム2名、全体2名",
        technologies: [
          "AWS", "Terraform", "IaC", "AWS Organizations", "SSO", 
          "GitHub Actions", "CI/CD", "CloudWatch", "S3", "Lambda"
        ]
      },
      {
        id: "project5",
        period: "2023年11月～2024年6月",
        projectContent: "不動産会社/金融機関向け登記情報システムの開発",
        role: {
          position: "PM兼エンジニア",
          details: [
            "ユーザーストーリーの作成",
            "メンバー向け開発issueの作成と進捗管理",
            "AWS CDKを用いたインフラ構築/管理",
            "個人事業用のOA環境をIaaCプシンで自動生成できる仕組みを構築",
            "Djangoマイグレーション",
            "プランチ運用の改善及びメンバーへの定着支援",
            "AIを活用したデータモデルを複数人が同時に改修することによるコンフリクトを解消するために",
            "複数バッチのバグ改修",
            "ローカルで実行していたバッチをFargateで実行できるように改修"
          ]
        },
        industry: "業界：不動産",
        scale: "開発チーム4名、全体6名",
        technologies: [
          "React", "TypeScript", "Python", "Django", "PostgreSQL",
          "AWS", "GitHub", "Notion", "Slack"
        ]
      },
      {
        id: "project2",
        period: "2024年1月～2024年4月",
        projectContent: "自然言語で入力→動画をレコメンドしてくれるシステムの開発",
        role: {
          position: "エンジニア",
          details: [
            "Pinconeの設定及び、Pinconeへのデータ格納",
            "ユーザーからの質問をEmbeddings APIに送信し、Vectorを受け取り処理",
            "WebアプリケーションのVercelへのホスティング"
          ]
        },
        industry: "業界：通信",
        scale: "開発チーム2名、全体4名",
        technologies: [
          "Svelte Kit", "TypeScript", "Python", "PostgreSQL", "Prisma",
          "Pinecone", "OpenAI API", "OpenAI TTS", "langchain", "Vercel",
          "GitHub", "Notion"
        ]
      },
      {
        id: "project3",
        period: "2023年6月～2023年9月",
        projectContent: "Kintone上のCRMからSMS送信するためのプラグイン開発",
        role: {
          position: "エンジニア",
          details: [
            "クライアント調整/MTGの進行",
            "要件定義から実装、テスト、リリースまでを実施",
            "アプリ/プラグインのインストールや利用マニュアルを作成"
          ]
        },
        industry: "業界：通信",
        scale: "開発チーム1名、全体3名",
        technologies: [
          "Kintone", "React", "TypeScript"
        ]
      },
      {
        id: "project4",
        period: "2023年7月～2023年10月",
        projectContent: "建設現場向け進捗管理アプリのPoC開発",
        role: {
          position: "PM兼エンジニア",
          details: [
            "クライアント調整/全体MTGの進行",
            "要件定義書の作成(業務一覧/業務フロー/機能一覧)",
            "設計書の作成(採用技術の選定/ER図/テーブル定義)",
            "ブランチ運用やAWS運用方法などをまとめた開発プロセスドキュメントを作成し、先方社員へ教育支援を実施",
            "Vue/Nuxt.js/MUIを使って、ユーザー作成、作業現場作成、日報入力フォームの画面を作成",
            "Node.js/TypeSctiptを使って各種APIを作成",
            "AWS CDKを使ってインフラを構築"
          ]
        },
        industry: "業界：建設",
        scale: "開発チーム4名、全体6名",
        technologies: [
          "Vue.js", "Nuxt.js", "TypeScript", "Node.js", "MySQL", "Prisma",
          "AWS", "GitHub", "Notion", "Teams"
        ]
      },
      {
        id: "project5",
        period: "2022年9月～2023年8月",
        projectContent: "ビデオプレゼンサービスの立ち上げ",
        role: {
          position: "PM兼エンジニア",
          details: [
            "インサイドセールス経験者へのヒアリング",
            "コンセプト立案/ペルソナ設計/カスタマージャーニー作成",
            "ユーザーストーリー作成及び開発issueの発行",
            "ユーザーヒアリングとプロダクト改善",
            "デザインへのフィードバック",
            "開発の進捗管理",
            "AWS SAMを用いたインフラ構築",
            "Ruby on Railsを使って視聴レポートを確認できる管理画面を作成"
          ]
        },
        industry: "業界：通信",
        scale: "開発チーム5名、全体10名",
        technologies: [
          "React", "TypeScript", "Ruby on Rails", "MySQL",
          "AWS", "GitHub", "Figma", "Notion", "Slack"
        ]
      },
      {
        id: "project6",
        period: "2022年9月～2023年8月",
        projectContent: "動画サービスシステムのリプレイス支援及びweb開発における開発フローを教育支援",
        role: {
          position: "PM兼エンジニア",
          details: [
            "As-is/To-beのインフラ構成図作成",
            "スケジュール作成及び進捗管理",
            "git/githubの利用方法の教育及び、ブランチ運用やAWS運用の各種ガイドラインを作成",
            "開発issueの発行/アサイン/進捗管理",
            "IaC GeneratorやAWS Consoleから既存リソースの詳細設定を把握",
            "AWS CDKを使ってECS/Fargateベースの新環境の構築及びCICDパイプラインを構築",
            "Sentryの導入及びslack/githubへの通知設定の自動化や、活用方法をコンサルティング"
          ]
        },
        industry: "業界：通信",
        scale: "開発チーム4名、全体6名",
        technologies: [
          "JavaScript", "PHP", "Laravel", "MySQL",
          "AWS", "GitHub", "Notion", "Slack"
        ]
      },
      {
        id: "project7",
        period: "2022年4月～2024年3月",
        projectContent: "RCS（SMSの次世代技術）を用いたB2C配信システムの開発/保守",
        role: {
          position: "PM兼エンジニア",
          details: [
            "既存ライセンス保守及び新機能の検討/開発",
            "ユーザー企業との週次MTG及び課題や開発要望の取りまとめ",
            "見積もり/契約締結",
            "開発issueの発行/アサイン/進捗管理",
            "CloudFormationを用いたインフラ構築",
            "Cloudwatch, Datadogを用いてメトリクス/ログの監視や、アラート発生時の対応マニュアル、週次の棚卸会など運用の定着まで実現",
            "K6, JMeter, ZAPを用いてAPIの負荷試験や脆弱性試験を実施し、結果を分析して開発エンジニアへフィードバック",
            "Python/Django/PostgreSQLのEOL対応及びリリースを実施"
          ]
        },
        industry: "業界：通信",
        scale: "開発チーム10名、全体50名",
        technologies: [
          "Python", "Django", "Java", "Spring Boot", "Nginx", "Tomcat",
          "PostgreSQL", "Redis", "AWS", "GitHub", "Circle CI",
          "Figma", "Notion", "Slack"
        ]
      },
      {
        id: "project8",
        period: "2017年4月～2022年3月",
        projectContent: "会社員時代の経歴（ベイカレントコンサルティングに所属）",
        role: {
          position: "コンサルタント/PMO/ITアーキテクト",
          details: [
            "XX payの立ち上げPJのPMO支援やBPR支援",
            "クレジットカード基幹システムリプレイスのPMO支援",
            "保険代理店の営業DX支援",
            "経済産業省主導の診断システムAI化と、医療情報を秘匿化して管理する技術の検討WGのPMO支援",
            "社内コミュニケーションアプリの事業立案及び開発支援",
            "PM/PMO業務",
            "業務一覧/業務フロー/機能一覧/ER図/システム構成図など各種プロジェクト資料の作成",
            "ベンダーコントロール",
            "コンセプト立案/ペルソナ設計/カスタマージャーニー作成",
            "ユーザーストーリー作成",
            "バックエンド及びインフラ開発/監視の導入"
          ]
        },
        industry: "業界：金融/医療/通信",
        scale: "チーム3-10名、全体1000名",
        technologies: [
          "Word", "Excel", "PowerPoint", "Outlook", "Slack",
          "Java", "Spring Boot", "Nginx", "Tomcat",
          "PostgreSQL", "Redis", "AWS"
        ]
      }
    ],

    selfPr: "私はこれまでの経験からビジネスと技術の橋渡しとして、要素を効果的にシステムに落とし込む力を持っています。\n開発者としてのスキルもあり、具体的な実装や課題がスムーズに行えます。プロジェクトの成功を第一に重要な仕事と位置づけており、最善の手法を選択して取り組んでいます。"
  },
  {
    // 一ノ瀬氏のデータ
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

    contactInfo: {
      github: "https://github.com/eita-ichinose",
    },

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
  },
  {
    // 穐山氏のデータ
    name: "穐山 悠太",
    role: "バックエンド & AIエンジニア",
    image: "/akiyama.jpg?height=400&width=400",
    career: [
      "大学卒業後、システム開発会社に入社",
      "公共機関向けシステムや不動産データ分析サービスの開発を担当",
      "個人開発のサブスクリプションWebアプリで顧客450人、売上1,000万円を達成",
    ],
    skills: [
      "Python/FastAPIを用いたバックエンド開発",
      "機械学習/生成AIを活用したシステム開発",
      "要件定義から運用までの一貫した開発支援",
    ],
    projects: [
      "機械学習を活用した画像識別システムの開発",
      "越境EC向け自動化ツールの開発",
      "企業向け生成AI活用のコンサルティング",
    ],
    media: [
      {
        title: "ABEMA Prime アベプラ",
        url: "https://youtu.be/QvWevDJEDIM?si=j6eNEAzGLUKlxcRs",
        description:
          "【AIカバー】声の無断生成にNO！声優やアーティストの想いは？悪用も？",
      },
    ],

    // 拡張情報
    slug: "akiyama",
    fullBio: "大学卒業後、システム開発会社でバックエンド開発のキャリアをスタート。公共機関向けシステムや不動産データ分析サービスの開発を経験後、個人でのサブスクリプションWebアプリ開発に成功。Python/FastAPIを用いたバックエンド開発と機械学習/AIを活用したシステム開発が専門。特に近年は生成AIを活用したシステム開発に注力している。",

    contactInfo: {
      linkedin: "https://linkedin.com/in/yuta-akiyama",
      github: "https://github.com/yuta-akiyama",
      twitter: "https://twitter.com/yuta_akiyama_dev",
    },

    detailedSkills: [
      {
        category: "バックエンド開発",
        skills: [
          { name: "Python", level: 5, years: 6 },
          { name: "FastAPI", level: 5, years: 3 },
          { name: "Django", level: 4, years: 5 },
          { name: "Node.js", level: 3, years: 2 },
          { name: "Go", level: 3, years: 1 },
        ]
      },
      {
        category: "データベース",
        skills: [
          { name: "PostgreSQL", level: 4, years: 5 },
          { name: "MongoDB", level: 4, years: 3 },
          { name: "Redis", level: 4, years: 3 },
          { name: "Elasticsearch", level: 3, years: 2 },
        ]
      },
      {
        category: "AI/機械学習",
        skills: [
          { name: "scikit-learn", level: 4, years: 4 },
          { name: "TensorFlow", level: 3, years: 3 },
          { name: "OpenAI API", level: 5, years: 2 },
          { name: "langchain", level: 4, years: 2 },
          { name: "Hugging Face", level: 4, years: 2 },
        ]
      },
      {
        category: "インフラ/DevOps",
        skills: [
          { name: "Docker", level: 4, years: 4 },
          { name: "Kubernetes", level: 3, years: 2 },
          { name: "AWS", level: 4, years: 4 },
          { name: "GCP", level: 3, years: 2 },
          { name: "CI/CD", level: 3, years: 3 },
        ]
      },
    ],

    detailedCareer: [
      {
        company: "CodeCiao株式会社",
        position: "バックエンド & AIエンジニア",
        period: "2024年2月〜現在",
        description: "企業向けのAI活用システム開発とバックエンド開発を担当"
      },
      {
        company: "個人事業主",
        position: "Webアプリ開発者",
        period: "2021年1月〜2024年1月",
        description: "サブスクリプションWebアプリの開発・運営。顧客450人、売上1,000万円を達成"
      },
      {
        company: "株式会社テックソリューションズ",
        position: "バックエンドエンジニア",
        period: "2018年4月〜2020年12月",
        description: "公共機関向けシステムや不動産データ分析サービスの開発を担当"
      },
    ],

    education: [
      {
        institution: "東京大学",
        degree: "工学部 情報工学科 卒業",
        period: "2014年4月〜2018年3月"
      }
    ],

    certifications: [
      {
        name: "データベーススペシャリスト",
        issuedBy: "IPA",
        year: 2020
      },
      {
        name: "AWS SAP (Solutions Architect Professional)",
        issuedBy: "Amazon Web Services",
        year: 2022
      },
      {
        name: "TensorFlow Developer Certificate",
        issuedBy: "Google",
        year: 2021
      }
    ],

    projectsTable: [
      {
        id: "project1",
        period: "2023年9月～2024年2月",
        projectContent: "機械学習を活用した画像識別システムの開発",
        role: {
          position: "リードエンジニア",
          details: [
            "TensorFlowを使用した画像認識モデルの開発",
            "FastAPIを使用したバックエンドAPIの構築",
            "AWSでのインフラ設計と構築（ECS, S3, Lambda）",
            "CI/CDパイプラインの構築（GitHub Actions）",
            "クライアントとのコミュニケーションと要件定義"
          ]
        },
        industry: "業界：製造",
        scale: "開発チーム3名、全体5名",
        technologies: [
          "Python", "FastAPI", "TensorFlow", "AWS (ECS, S3, Lambda)",
          "Docker", "PostgreSQL", "GitHub Actions"
        ]
      },
      {
        id: "project2",
        period: "2023年3月～2023年8月",
        projectContent: "越境EC向け自動化ツールの開発",
        role: {
          position: "バックエンドエンジニア",
          details: [
            "Pythonを使用したデータ処理システムの開発",
            "複数の外部APIとの連携（物流、決済、マーケットプレイスAPI等）",
            "自動化処理のスケジューリングシステム構築",
            "パフォーマンス最適化とスケーラビリティ対応",
            "モニタリングと障害対応システムの構築"
          ]
        },
        industry: "業界：EC",
        scale: "開発チーム4名、全体7名",
        technologies: [
          "Python", "Django", "Celery", "Redis", "PostgreSQL",
          "AWS (EC2, RDS, SQS)", "Docker", "Prometheus", "Grafana"
        ]
      },
      {
        id: "project3",
        period: "2022年6月～2022年12月",
        projectContent: "企業向け生成AI活用システムの開発",
        role: {
          position: "AIエンジニア",
          details: [
            "OpenAI APIを活用した社内ナレッジベース検索システムの開発",
            "ドキュメント解析と自然言語処理パイプラインの構築",
            "langchainを使用したプロンプトエンジニアリング",
            "ベクトルデータベースの設計と実装",
            "UI/UXコンサルティングとプロトタイプ開発"
          ]
        },
        industry: "業界：IT",
        scale: "開発チーム2名、全体4名",
        technologies: [
          "Python", "FastAPI", "OpenAI API", "langchain",
          "Pinecone", "React", "TypeScript", "AWS (Lambda, API Gateway)"
        ]
      }
    ],

    selfPr: "私はバックエンド開発とAI技術の両方に精通しており、特に最新の生成AIを活用したシステム開発に強みを持っています。個人開発での成功経験から、ユーザーのニーズを的確に捉え、技術的な課題を解決する能力を培いました。常に新しい技術にキャッチアップしながら、実用的なシステム開発を心がけています。また、チームでの開発経験も豊富で、技術的なリードだけでなく、プロジェクト全体の成功に貢献できることが強みです。"
  }
];

// メンバーslugからポートフォリオデータを取得する関数
export function getPortfolioBySlug(slug: string): MemberPortfolio | undefined {
  return memberPortfolios.find(member => member.slug === slug);
}