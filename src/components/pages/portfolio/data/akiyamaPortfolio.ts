import type { MemberPortfolio } from "../portfolioTypes";

/**
 * 穐山悠太のポートフォリオデータ
 */
export const akiyamaPortfolio: MemberPortfolio = {
  // 基本情報
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

  contactInfo: {},

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
};