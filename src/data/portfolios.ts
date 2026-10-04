// メンバーのポートフォリオ（/members/<slug>）の内容。
// 氏名、役割、写真は src/data/members.ts から引く。ここには持たない。
// 前職や顧客の会社名、金額は書かない（design/BRIEF-company.md の「書いてよいこと、いけないこと」）。
// 所属は業種で書く。大学名、資格名、技術名はそのまま書く。

/** 熟練度（1〜5）。表示するときは skillStage() で 4 段階の言葉に直す */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  /** 経験年数 */
  years: number;
  level: SkillLevel;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface SkillStage {
  label: string;
  description: string;
}

export interface CareerEntry {
  period: string;
  position: string;
  /** 所属。CodeCiao以外は業種で書く */
  organization: string;
  description: string;
}

export interface EducationEntry {
  period: string;
  school: string;
  degree: string;
}

export interface Certification {
  name: string;
  issuer: string;
  /** 取得した年 */
  year: number;
}

export interface PortfolioProject {
  period: string;
  /** 見出しになるので「、」「。」を付けない。`|` は折り返してよい位置（表示からは取り除く） */
  title: string;
  industry: string;
  scale: string;
  role: string;
  /** 担当したこと */
  tasks: string[];
  tech: string[];
}

export interface Portfolio {
  /** src/data/members.ts の slug と同じ値 */
  slug: string;
  lead: string;
  skills: SkillGroup[];
  career: CareerEntry[];
  education: EducationEntry[];
  certifications: Certification[];
  /** 新しい順 */
  projects: PortfolioProject[];
  /** 自己PR。1 要素が 1 段落 */
  pr: string[];
}

// 水準の 4 段階。高い順
export const SKILL_STAGES: SkillStage[] = [
  {
    label: "主導できる",
    description: "ほかの人に教えながら主導できます。",
  },
  {
    label: "一人で進められる",
    description: "自分の判断で業務を進められます。",
  },
  {
    label: "基本の業務ができる",
    description: "基本の業務を担当できます。",
  },
  {
    label: "基礎の経験がある",
    description: "基礎の知識と経験があります。",
  },
];

/** 熟練度の数値を、水準の段階（SKILL_STAGES の位置）に直す。4 と 5 は同じ段階 */
export const skillStageIndex = (level: SkillLevel): number => {
  if (level >= 4) return 0;
  if (level === 3) return 1;
  if (level === 2) return 2;
  return 3;
};

export const skillStage = (level: SkillLevel): SkillStage =>
  SKILL_STAGES[skillStageIndex(level)];

const tahara: Portfolio = {
  slug: "tahara",
  lead: "田原はコンサルティングファームでPMOとアーキテクトを経験しました。得意な分野はクラウド基盤の設計と自動化、生成AIとRAGを使ったシステムの開発です。",
  skills: [
    {
      category: "プロジェクトマネジメント",
      skills: [
        { name: "ウォーターフォール開発", level: 4, years: 7 },
        { name: "アジャイル / スクラム", level: 4, years: 5 },
        { name: "要件定義・設計", level: 5, years: 7 },
      ],
    },
    {
      category: "クラウド / インフラ",
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
      ],
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
      ],
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
      ],
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
      ],
    },
  ],
  career: [
    {
      period: "2024年6月〜現在",
      position: "代表取締役",
      organization: "CodeCiao株式会社",
      description:
        "CodeCiaoは企業向けに、AIを使ったシステムの開発とコンサルティングを提供しています。",
    },
    {
      period: "2022年4月〜2024年5月",
      position: "プロジェクトマネージャー",
      organization: "SaaS企業",
      description:
        "田原は自社SaaSの開発と、上場企業向けの受託開発や技術コンサルティングを担当しました。",
    },
    {
      period: "2016年4月〜2022年3月",
      position: "ITコンサルタント",
      organization: "コンサルティングファーム",
      description:
        "田原は官公庁や大手企業向けに、ITコンサルティングと要件定義、PMOを担当しました。",
    },
  ],
  education: [
    {
      period: "2012年4月〜2016年3月",
      school: "慶應義塾大学",
      degree: "商学部 卒業",
    },
  ],
  certifications: [
    {
      name: "AWS SAP（Solutions Architect Professional）",
      issuer: "Amazon Web Services",
      year: 2022,
    },
    { name: "応用情報技術者試験", issuer: "IPA", year: 2019 },
  ],
  projects: [
    {
      period: "2025年1月〜2025年5月",
      title: "AIを搭載したコールセンター向けCRMプラットフォームの開発",
      industry: "ITサービス",
      scale: "開発チーム6名 / 全体10名",
      role: "エンジニア",
      tasks: [
        "NestJS、GraphQL、Prismaを使ったサービスの設計と実装",
        "音声認識、自動文字起こし、AIによる要約とVOC生成をつなぐパイプラインへのカスタムプロンプト管理の導入",
        "Next.jsとTypeScriptによる要約画面とAIチャットサイドバーの開発",
        "Apollo ClientとZustandによる状態管理",
        "zodとi18nに対応した共通ライブラリの作成と、OpenAIへプロンプトを送る処理の抽象化",
      ],
      tech: [
        "NestJS",
        "GraphQL",
        "Prisma",
        "Next.js",
        "TypeScript",
        "OpenAI",
        "Apollo Client",
        "Zustand",
        "zod",
        "Docker",
        "AWS",
      ],
    },
    {
      period: "2024年7月〜2024年12月",
      title: "業務管理システムのアプリケーションとインフラの構築",
      industry: "金融",
      scale: "開発チーム5名 / 全体8名",
      role: "PM / エンジニア",
      tasks: [
        "PHPとLaravelを使った会計・請求・料金管理APIの設計と実装",
        "ArtisanコマンドによるCSVの一括インポートとトランケート処理の開発",
        "ExcelとPDFの帳票出力機能の実装（Maatwebsite Excel、PhpSpreadsheet、TCPDF、FPDI）",
        "Docker環境の構築（nginx、PHP-FPM、MySQL、Fluent Bit）",
        "TerraformによるAWSリソースのモジュール化（ALB、ECS、Aurora、API Gateway、Lambda）",
        "PythonとShellのスクリプトによるDBのダンプとリストアの自動化と、移行と運用の手順の改善",
        "CodeBuildとCodePipelineによるCI/CDパイプラインの構築",
        "開発・ステージング・本番の各環境への継続的デプロイと、クロスアカウントでの運用",
      ],
      tech: [
        "Laravel",
        "PHP",
        "MySQL",
        "Docker",
        "Terraform",
        "AWS",
        "ECS",
        "Aurora",
        "API Gateway",
        "Lambda",
        "Python",
        "CodeBuild",
        "CodePipeline",
      ],
    },
    {
      period: "2024年7月〜2024年12月",
      title: "RAGと生成AIを使った製造現場の安全管理システムの開発",
      industry: "製造",
      scale: "開発チーム2名 / 全体2名",
      role: "PM / エンジニア",
      tasks: [
        "RAGと生成AIを使った安全管理システムのPoC開発",
        "ベクトル検索とキーワード検索を組み合わせたハイブリッド検索による検索精度の向上",
        "クロスエンコーダーとLLMリランキングを組み合わせた情報抽出システムの実装",
        "生成AIによる、現場の状況に応じた安全アドバイスの提供",
        "プロジェクト全体の進捗管理と顧客との連絡",
      ],
      tech: [
        "Gemini",
        "GCP",
        "Cloud Run",
        "Pinecone",
        "Python",
        "LangChain",
        "Hugging Face",
      ],
    },
    {
      period: "2024年5月〜2024年8月",
      title: "建設現場向け|統合管理システムの開発",
      industry: "建設",
      scale: "開発チーム5名 / 全体5名",
      role: "PM / エンジニア",
      tasks: [
        "RemixとNestJSによる管理者向けWebアプリケーションの設計と開発",
        "Service Workerを使ったPWAによるオフライン対応",
        "AWS AmplifyへのデプロイとCI/CD基盤の整備",
        "自動テスト基盤の構築と運用の効率化",
        "顧客との連絡とプロジェクトの推進",
      ],
      tech: [
        "Remix",
        "NestJS",
        "React",
        "TypeScript",
        "PWA",
        "AWS Amplify",
        "DynamoDB",
        "Lambda",
        "GitHub Actions",
        "Jest",
        "Playwright",
      ],
    },
    {
      period: "2024年1月〜2024年5月",
      title: "Kubernetesを使ったマルチテナントのクラウドネイティブ基盤の構築",
      industry: "ITサービス / SaaS",
      scale: "開発チーム5名 / 全体10名",
      role: "クラウドエンジニア",
      tasks: [
        "Terraformのモジュール設計と、GCPとAWSのマルチクラウド環境でのIaCの実装",
        "マルチテナントと複数環境（開発・ステージング・本番）を一元管理する体制の確立",
        "GKEとEKSでのKubernetesクラスタの設計と運用",
        "ArgoCDとGitHub Actionsを組み合わせたGitOpsのデプロイパイプラインの構築",
        "EKS環境での分散ログ収集基盤の整備（Elasticsearch、Kibana、Fluentd）",
        "PrometheusとGrafanaによる監視体制の整備",
      ],
      tech: [
        "Kubernetes",
        "GKE",
        "EKS",
        "Terraform",
        "Istio",
        "ArgoCD",
        "Sealed Secrets",
        "Elasticsearch",
        "Kibana",
        "Fluentd",
        "Prometheus",
        "Grafana",
        "GitOps",
        "Docker",
        "AWS",
        "GCP",
        "GitHub Actions",
      ],
    },
    {
      period: "2024年1月〜2024年4月",
      title: "自然言語の入力から動画を薦めるシステムの開発",
      industry: "通信",
      scale: "開発チーム2名 / 全体4名",
      role: "エンジニア",
      tasks: [
        "PineconeとOpenAI Embeddings APIを組み合わせたベクトル検索の設計と実装",
        "SvelteKitとTypeScriptによるフロントエンドの実装",
        "OpenAI TTSを使った、検索結果を音声で返す機能の実装",
        "VercelでのCI/CDパイプラインの構築と、Serverless Functionsによるバックエンド処理の最適化",
      ],
      tech: [
        "SvelteKit",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "Prisma",
        "Pinecone",
        "OpenAI",
        "LangChain",
        "Vercel",
        "GitHub",
        "Notion",
      ],
    },
    {
      period: "2023年11月〜2025年5月",
      title: "不動産会社と金融機関向け|登記情報システムの開発",
      industry: "不動産",
      scale: "開発チーム4名 / 全体6名",
      role: "PM / エンジニア",
      tasks: [
        "ユーザーストーリーの作成と、メンバー向けの開発issueの作成、進捗管理",
        "AWS CDKによるインフラの構築と管理",
        "バックエンドAPIの開発",
        "pandasを使った登記簿情報の投入スクリプトの作成",
        "ローカルで実行していたバッチをFargateで実行できるようにする改修",
      ],
      tech: [
        "React",
        "TypeScript",
        "Python",
        "Django",
        "PostgreSQL",
        "AWS",
        "GitHub",
        "Notion",
        "Slack",
      ],
    },
    {
      period: "2023年9月〜2023年12月",
      title: "EC2からECSへの移行",
      industry: "不動産",
      scale: "開発チーム2名 / 全体2名",
      role: "PM / エンジニア",
      tasks: [
        "不動産ポータルサイトの基盤をEC2（m5.largeが4台）からECS Fargateへ移行",
        "CloudFormationとCDKを組み合わせたIaCによる環境構築の自動化",
        "CodePipeline、CodeBuild、CodeDeployによるCI/CDパイプラインの構築",
        "ALBとRoute 53を使ったブルーグリーンデプロイの導入",
        "ECRとAqua Securityによるコンテナイメージの脆弱性スキャンの自動化と、対策の手順の確立",
        "CloudWatchとDatadogによるメトリクスの監視とアラート体制の構築",
      ],
      tech: [
        "AWS",
        "ECS",
        "Fargate",
        "EC2",
        "Docker",
        "CDK",
        "CodePipeline",
        "CodeBuild",
        "CodeDeploy",
        "Route 53",
        "ECR",
        "CloudWatch",
        "Datadog",
        "IAM",
        "ALB",
      ],
    },
    {
      period: "2023年8月〜2023年11月",
      title: "AWS環境を統合管理する基盤の構築",
      industry: "通信",
      scale: "開発チーム2名 / 全体2名",
      role: "PM / エンジニア",
      tasks: [
        "Account Factory for Terraform（AFT）による複数事業部のAWS環境の統合管理",
        "アカウント作成の自動化と、環境の分離によるリスクの低減",
        "不正なリソース作成の防止とコスト最適化の仕組みの構築",
        "SSOによる認証の統合とセキュリティの強化",
        "脆弱性の自動スキャンと、CI/CDの中でのセキュリティ検証の整備",
      ],
      tech: [
        "AWS",
        "Terraform",
        "IaC",
        "AWS Organizations",
        "SSO",
        "GitHub Actions",
        "CI/CD",
        "CloudWatch",
        "S3",
        "Lambda",
      ],
    },
    {
      period: "2023年7月〜2023年10月",
      title: "建設現場向け進捗管理アプリのPoC開発",
      industry: "建設",
      scale: "開発チーム4名 / 全体6名",
      role: "PM / エンジニア",
      tasks: [
        "顧客との調整と全体ミーティングの進行",
        "要件定義書の作成（業務一覧、業務フロー、機能一覧）",
        "設計書の作成（採用技術の選定、ER図、テーブル定義）",
        "ブランチ運用とAWSの運用方法をまとめた開発プロセスの文書の作成と、顧客の社員への教育支援",
        "Vue.js、Nuxt.js、MUIを使った画面の作成（ユーザー作成、作業現場作成、日報入力フォーム）",
        "Node.jsとTypeScriptによるAPIの作成",
        "AWS CDKによるインフラの構築",
      ],
      tech: [
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "Node.js",
        "MySQL",
        "Prisma",
        "AWS",
        "GitHub",
        "Notion",
        "Teams",
      ],
    },
    {
      period: "2023年6月〜2023年9月",
      title: "Kintone上のCRMからSMSを送るプラグインの開発",
      industry: "通信",
      scale: "開発チーム1名 / 全体3名",
      role: "エンジニア",
      tasks: [
        "ReactとTypeScriptを使ったKintoneプラグインの設計と実装",
        "SMS APIとの連携による顧客向けメッセージ送信機能の開発",
        "Kintone REST API Client、Webpack、Babelを使ったモジュール構成とビルドパイプラインの構築",
        "Kintoneのレコード情報の取得と加工、SMS APIのエラー処理、送信履歴の自動保存の実装",
        "利用者の操作性を考えたUIの設計と、ステータス管理機能の実装",
        "顧客の環境でのE2Eテストの実施と、プラグイン導入マニュアル、管理者向け設定ガイドの作成",
      ],
      tech: ["Kintone", "React", "TypeScript", "Webpack"],
    },
    {
      period: "2022年9月〜2023年8月",
      title: "ビデオプレゼンサービスの立ち上げ",
      industry: "通信",
      scale: "開発チーム5名 / 全体10名",
      role: "PM / エンジニア",
      tasks: [
        "インサイドセールス経験者へのヒアリング",
        "コンセプトの立案、ペルソナの設計、カスタマージャーニーの作成",
        "ユーザーストーリーの作成と開発issueの発行",
        "ユーザーへのヒアリングとプロダクトの改善",
        "デザインへのフィードバック",
        "開発の進捗管理",
        "AWS SAMによるインフラの構築",
        "Ruby on Railsによる、視聴レポートを確認できる管理画面の作成",
      ],
      tech: [
        "React",
        "TypeScript",
        "Ruby on Rails",
        "MySQL",
        "AWS",
        "GitHub",
        "Figma",
        "Notion",
        "Slack",
      ],
    },
    {
      period: "2022年9月〜2023年8月",
      title: "動画サービスのシステム刷新の支援とWeb開発の進め方の教育支援",
      industry: "通信",
      scale: "開発チーム4名 / 全体6名",
      role: "PM / エンジニア",
      tasks: [
        "現状と移行後のインフラ構成図の作成",
        "スケジュールの作成と進捗管理",
        "GitとGitHubの使い方の教育と、ブランチ運用とAWS運用のガイドラインの作成",
        "開発issueの発行、割り当て、進捗管理",
        "IaC GeneratorとAWSコンソールを使った既存リソースの設定の調査",
        "AWS CDKによるECSとFargateの新環境とCI/CDパイプラインの構築",
        "Sentryの導入と、SlackとGitHubへの通知設定の自動化、活用方法の助言",
      ],
      tech: [
        "JavaScript",
        "PHP",
        "Laravel",
        "MySQL",
        "AWS",
        "GitHub",
        "Notion",
        "Slack",
      ],
    },
    {
      period: "2022年4月〜2024年3月",
      title: "RCS（SMSの次世代技術）を使ったB2C配信システムの開発と保守",
      industry: "通信",
      scale: "開発チーム10名 / 全体50名",
      role: "PM / エンジニア",
      tasks: [
        "既存ライセンスの保守と、新機能の検討と開発",
        "ユーザー企業との週次ミーティングと、課題と開発要望の取りまとめ",
        "見積もりと契約の締結",
        "開発issueの発行、割り当て、進捗管理",
        "CloudFormationによるインフラの構築",
        "CloudWatchとDatadogによるメトリクスとログの監視",
        "アラート対応マニュアルの作成と、週次の棚卸し会による運用の定着",
        "k6、JMeter、ZAPによるAPIの負荷試験と脆弱性試験の実施と、分析結果の開発エンジニアへの共有",
        "Python、Django、PostgreSQLのEOL対応とリリース",
      ],
      tech: [
        "Python",
        "Django",
        "Java",
        "Spring Boot",
        "Nginx",
        "Tomcat",
        "PostgreSQL",
        "Redis",
        "AWS",
        "GitHub",
        "CircleCI",
        "Figma",
        "Notion",
        "Slack",
      ],
    },
    {
      period: "2017年4月〜2022年3月",
      title: "コンサルティングファーム|在籍時の案件",
      industry: "金融 / 医療 / 通信",
      scale: "チーム3〜10名 / 全体1000名",
      role: "コンサルタント / PMO / ITアーキテクト",
      tasks: [
        "決済サービスの立ち上げプロジェクトのPMO支援とBPR支援",
        "クレジットカードの基幹システム刷新のPMO支援",
        "保険代理店の営業のデジタル化の支援",
        "官公庁が主導する、診断システムのAI化と医療情報を秘匿化して管理する技術を検討するワーキンググループのPMO支援",
        "社内コミュニケーションアプリの事業立案と開発支援",
        "PMとPMOの業務",
        "プロジェクト資料の作成（業務一覧、業務フロー、機能一覧、ER図、システム構成図）",
        "ベンダーの管理",
        "コンセプトの立案、ペルソナの設計、カスタマージャーニーの作成",
        "ユーザーストーリーの作成",
        "バックエンドとインフラの開発、監視の導入",
      ],
      tech: [
        "Word",
        "Excel",
        "PowerPoint",
        "Outlook",
        "Slack",
        "Java",
        "Spring Boot",
        "Nginx",
        "Tomcat",
        "PostgreSQL",
        "Redis",
        "AWS",
      ],
    },
  ],
  pr: [
    "私には業務の要件を技術で解決するコンサルタントの経験と、自分で実装するエンジニアの経験があります。プロジェクトマネジメント（ウォーターフォール、アジャイル）とクラウドアーキテクチャの設計も担当できます。そのため、要件定義から実装までを一人で続けて引き受けられます。",
    "私は企業向けの大規模なシステム開発の経験と、AI技術の知見を組み合わせて、企業のデジタル化を支援します。提案するときは顧客の事業の成果を最優先に考え、費用と価値のつり合いを重視します。",
  ],
};

const ichinose: Portfolio = {
  slug: "ichinose",
  lead: "一ノ瀬は製造業の現場で働きながら、社内の業務システムを開発してきました。得意な分野はReactとTypeScriptを使ったフロントエンド開発と、モバイルアプリの開発です。",
  skills: [
    {
      category: "フロントエンド開発",
      skills: [
        { name: "React", level: 5, years: 4 },
        { name: "TypeScript", level: 5, years: 4 },
        { name: "Next.js", level: 4, years: 3 },
        { name: "HTML / CSS", level: 5, years: 6 },
        { name: "Tailwind CSS", level: 4, years: 3 },
      ],
    },
    {
      category: "モバイルアプリ開発",
      skills: [
        { name: "Flutter", level: 4, years: 2 },
        { name: "React Native", level: 3, years: 1 },
        { name: "iOS / Swift", level: 2, years: 1 },
      ],
    },
    {
      category: "テスト / 品質管理",
      skills: [
        { name: "Jest", level: 4, years: 3 },
        { name: "React Testing Library", level: 4, years: 3 },
        { name: "Storybook", level: 5, years: 3 },
        { name: "Cypress", level: 3, years: 2 },
      ],
    },
    {
      category: "その他",
      skills: [
        { name: "Git / GitHub", level: 4, years: 5 },
        { name: "CI/CD", level: 3, years: 3 },
        { name: "Firebase", level: 4, years: 3 },
        { name: "GraphQL", level: 3, years: 2 },
      ],
    },
  ],
  career: [
    {
      period: "2024年2月〜現在",
      position: "フロントエンドエンジニア",
      organization: "CodeCiao株式会社",
      description:
        "一ノ瀬は企業向けのシステムで、UIの設計とフロントエンド開発を担当しています。",
    },
    {
      period: "2021年6月〜2024年1月",
      position: "テックリード",
      organization: "システム開発会社",
      description:
        "一ノ瀬は複数のプロジェクトで、テックリードとして技術選定と設計を主導しました。大手人材マッチングサービスのプラットフォーム開発と、飲食店の予約システムの構築も担当しました。",
    },
    {
      period: "2018年4月〜2021年5月",
      position: "システムエンジニア",
      organization: "製造業の会社",
      description:
        "一ノ瀬は製造ラインの工程管理と安全衛生活動を担当しました。あわせて、社内の業務システムを要件定義から開発、運用まで担当しました。",
    },
  ],
  education: [
    {
      period: "2016年4月〜2018年3月",
      school: "日本工学院専門学校",
      degree: "ITスペシャリスト科 卒業",
    },
  ],
  certifications: [
    {
      name: "AWS SAA（Solutions Architect Associate）",
      issuer: "Amazon Web Services",
      year: 2021,
    },
    { name: "応用情報技術者試験", issuer: "IPA", year: 2019 },
  ],
  projects: [
    {
      period: "2023年7月〜2023年12月",
      title: "建設人材の|派遣管理システムの開発",
      industry: "建設",
      scale: "開発チーム3名 / 全体5名",
      role: "フロントエンドリード",
      tasks: [
        "Next.jsとTypeScriptを使ったフロントエンド開発",
        "React QueryとSWRによるデータ取得の最適化",
        "Tailwind CSSを使ったレスポンシブデザインの実装",
        "顧客との要件定義と設計の会議の進行",
        "コンポーネントライブラリの構築と、Storybookによる文書化",
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Query",
        "Storybook",
        "Jest",
        "React Testing Library",
        "GitHub Actions",
        "Vercel",
      ],
    },
    {
      period: "2022年10月〜2023年3月",
      title: "製造業向け|メンテナンス|点検管理システムの開発",
      industry: "製造",
      scale: "開発チーム2名 / 全体4名",
      role: "フルスタックエンジニア",
      tasks: [
        "Flutterを使ったクロスプラットフォームアプリの開発",
        "Firebase Firestoreを使ったデータ管理",
        "オフライン機能の実装（データの同期）",
        "QRコードのスキャン機能の実装",
        "バーコードリーダーとの連携機能の実装",
      ],
      tech: [
        "Flutter",
        "Dart",
        "Firebase",
        "Firestore",
        "Firebase Authentication",
        "Cloud Functions",
        "GitHub",
      ],
    },
    {
      period: "2022年4月〜2022年9月",
      title: "飲食店の予約と順番管理のアプリケーションの開発",
      industry: "飲食",
      scale: "開発チーム5名 / 全体8名",
      role: "フロントエンド開発者",
      tasks: [
        "React Nativeを使ったクロスプラットフォームアプリの開発",
        "予約システムのUIとUXの設計",
        "プッシュ通知の実装",
        "GraphQLを使ったAPIとの連携",
        "アプリケーションのパフォーマンスの最適化",
      ],
      tech: [
        "React Native",
        "TypeScript",
        "GraphQL",
        "Apollo Client",
        "Redux",
        "Jest",
        "GitHub",
      ],
    },
  ],
  pr: [
    "私は製造業の現場とシステム開発の両方を経験しています。そのため、実際の業務の課題を理解したうえで開発できます。",
    "得意な分野はフロントエンドです。私は使う人の体験を重視して、UIとUXの設計と実装を進めます。コンポーネント駆動開発とテスト駆動開発を取り入れ、保守と拡張がしやすいコードを書くようにしています。",
  ],
};

const akiyama: Portfolio = {
  slug: "akiyama",
  lead: "穐山はシステム開発会社で、公共機関向けのシステムと不動産データ分析サービスを開発してきました。専門はPythonとFastAPIを使ったバックエンド開発と、機械学習と生成AIを使ったシステムの開発です。",
  skills: [
    {
      category: "バックエンド開発",
      skills: [
        { name: "Python", level: 5, years: 6 },
        { name: "FastAPI", level: 5, years: 3 },
        { name: "Django", level: 4, years: 5 },
        { name: "Node.js", level: 3, years: 2 },
        { name: "Go", level: 3, years: 1 },
      ],
    },
    {
      category: "データベース",
      skills: [
        { name: "PostgreSQL", level: 4, years: 5 },
        { name: "MongoDB", level: 4, years: 3 },
        { name: "Redis", level: 4, years: 3 },
        { name: "Elasticsearch", level: 3, years: 2 },
      ],
    },
    {
      category: "AI / 機械学習",
      skills: [
        { name: "scikit-learn", level: 4, years: 4 },
        { name: "TensorFlow", level: 3, years: 3 },
        { name: "OpenAI API", level: 5, years: 2 },
        { name: "LangChain", level: 4, years: 2 },
        { name: "Hugging Face", level: 4, years: 2 },
      ],
    },
    {
      category: "インフラ / DevOps",
      skills: [
        { name: "Docker", level: 4, years: 4 },
        { name: "Kubernetes", level: 3, years: 2 },
        { name: "AWS", level: 4, years: 4 },
        { name: "GCP", level: 3, years: 2 },
        { name: "CI/CD", level: 3, years: 3 },
      ],
    },
  ],
  career: [
    {
      period: "2024年2月〜現在",
      position: "バックエンド / AIエンジニア",
      organization: "CodeCiao株式会社",
      description:
        "穐山は企業向けに、AIを使ったシステムの開発とバックエンド開発を担当しています。",
    },
    {
      period: "2021年1月〜2024年1月",
      position: "Webアプリ開発者",
      organization: "個人事業主",
      description:
        "穐山は個人で、サブスクリプション型のWebアプリを開発して運営しました。",
    },
    {
      period: "2018年4月〜2020年12月",
      position: "バックエンドエンジニア",
      organization: "システム開発会社",
      description:
        "穐山は公共機関向けのシステムと、不動産データ分析サービスの開発を担当しました。",
    },
  ],
  education: [
    {
      period: "2014年4月〜2018年3月",
      school: "東京大学",
      degree: "工学部 情報工学科 卒業",
    },
  ],
  certifications: [
    {
      name: "AWS SAP（Solutions Architect Professional）",
      issuer: "Amazon Web Services",
      year: 2022,
    },
    { name: "TensorFlow Developer Certificate", issuer: "Google", year: 2021 },
    { name: "データベーススペシャリスト", issuer: "IPA", year: 2020 },
  ],
  projects: [
    {
      period: "2023年9月〜2024年2月",
      title: "機械学習を使った|画像識別システムの開発",
      industry: "製造",
      scale: "開発チーム3名 / 全体5名",
      role: "リードエンジニア",
      tasks: [
        "TensorFlowを使った画像認識モデルの開発",
        "FastAPIを使ったバックエンドAPIの構築",
        "AWSでのインフラの設計と構築（ECS、S3、Lambda）",
        "GitHub ActionsによるCI/CDパイプラインの構築",
        "顧客との連絡と要件定義",
      ],
      tech: [
        "Python",
        "FastAPI",
        "TensorFlow",
        "AWS",
        "ECS",
        "S3",
        "Lambda",
        "Docker",
        "PostgreSQL",
        "GitHub Actions",
      ],
    },
    {
      period: "2023年3月〜2023年8月",
      title: "越境EC向け|自動化ツールの開発",
      industry: "EC",
      scale: "開発チーム4名 / 全体7名",
      role: "バックエンドエンジニア",
      tasks: [
        "Pythonを使ったデータ処理システムの開発",
        "複数の外部APIとの連携（物流、決済、マーケットプレイス）",
        "自動化処理のスケジューリングシステムの構築",
        "パフォーマンスの最適化とスケーラビリティへの対応",
        "モニタリングと障害対応の仕組みの構築",
      ],
      tech: [
        "Python",
        "Django",
        "Celery",
        "Redis",
        "PostgreSQL",
        "AWS",
        "EC2",
        "RDS",
        "SQS",
        "Docker",
        "Prometheus",
        "Grafana",
      ],
    },
    {
      period: "2022年6月〜2022年12月",
      title: "企業向けの|生成AIを使ったシステムの開発",
      industry: "IT",
      scale: "開発チーム2名 / 全体4名",
      role: "AIエンジニア",
      tasks: [
        "OpenAI APIを使った社内ナレッジベース検索システムの開発",
        "ドキュメント解析と自然言語処理のパイプラインの構築",
        "LangChainを使ったプロンプトエンジニアリング",
        "ベクトルデータベースの設計と実装",
        "UIとUXのコンサルティングとプロトタイプの開発",
      ],
      tech: [
        "Python",
        "FastAPI",
        "OpenAI API",
        "LangChain",
        "Pinecone",
        "React",
        "TypeScript",
        "AWS",
        "Lambda",
        "API Gateway",
      ],
    },
  ],
  pr: [
    "私はバックエンド開発とAI技術の両方を得意としています。なかでも生成AIを使ったシステムの開発が強みです。個人開発の経験から、利用者が求めることを捉えて技術的な課題を解決する力を身につけました。",
    "私は新しい技術を学び続けながら、実際に使えるシステムをつくるようにしています。チームでの開発経験も豊富です。技術面のリードに加えて、プロジェクト全体の成功に貢献できます。",
  ],
};

export const PORTFOLIOS: Portfolio[] = [tahara, ichinose, akiyama];
