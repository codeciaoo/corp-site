# ポートフォリオデータ構造設計

## 現在のデータ構造

現在のメンバー情報は以下の構造で管理されています：

```typescript
// TeamMember (現在の構造)
interface TeamMember {
  name: string;         // 名前
  role: string;         // 役職
  image: string;        // 画像URL
  career: string[];     // 経歴
  skills: string[];     // スキル
  projects: string[];   // プロジェクト
  media: MediaItem[];   // メディア
}

interface MediaItem {
  title: string;        // タイトル
  url: string;          // URL
  description: string;  // 説明
}
```

## 拡張データ構造

ポートフォリオページ用に、以下のように拡張したデータ構造を提案します：

```typescript
// MemberPortfolio (拡張構造)
interface MemberPortfolio extends TeamMember {
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
      name: string;             // スキル名
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
  
  // プロジェクト実績（表形式データ）
  projectsTable: ProjectEntry[];
  
  // 自己PR
  selfPr: string;               // 自己PR文
}

// プロジェクト実績エントリ
interface ProjectEntry {
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
```

## サンプルデータ

以下は田原氏のポートフォリオデータ例です：

```typescript
const tahara: MemberPortfolio = {
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
        { name: "Azure", level: 3, years: 2 },
        { name: "Terraform", level: 4, years: 4 },
        { name: "Docker", level: 4, years: 5 },
        { name: "Kubernetes", level: 3, years: 3 },
      ]
    },
    {
      category: "AIシステム開発",
      skills: [
        { name: "LangChain", level: 4, years: 2 },
        { name: "LlamaIndex", level: 4, years: 1 },
        { name: "OpenAI API", level: 5, years: 2 },
        { name: "RAGシステム構築", level: 4, years: 2 },
      ]
    },
    {
      category: "バックエンド開発",
      skills: [
        { name: "Python/FastAPI", level: 5, years: 5 },
        { name: "Node.js", level: 4, years: 4 },
        { name: "TypeScript", level: 4, years: 4 },
        { name: "DynamoDB", level: 4, years: 3 },
        { name: "PostgreSQL", level: 4, years: 6 },
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
          "クライアント調整/MTGの運行",
          "要件定義から実装、テスト、リリースまでを実施",
          "アプリ/プラグインのインストールや利用マニュアルを作成"
        ]
      },
      industry: "業界：通信",
      scale: "開発チーム1名、全体3名",
      technologies: [
        "Kintone", "React", "TypeScript"
      ]
    }
  ],
  
  selfPr: "私はこれまでの経験からビジネスと技術の橋渡しとして、要素を効果的にシステムに落とし込む力を持っています。\n開発者としてのスキルもあり、具体的な実装や課題がスムーズに行えます。プロジェクトの成功を第一に重要な仕事と位置づけており、最善の手法を選択して取り組んでいます。"
};
```

## データ管理方法

1. **データソース**
   - `src/components/pages/members/membersPortfolioData.ts` にポートフォリオデータを格納
   - 各メンバーのデータを個別にエクスポート

2. **画像管理**
   - 画像ファイルは `/public/` ディレクトリに配置
   - 適切なサイズとフォーマットで最適化

3. **動的データ取得**
   - slug をもとに該当するメンバーデータを取得
   - 不正な slug の場合は404ページにリダイレクト

## データバリデーション

必須項目とオプション項目を明確に分け、以下のバリデーションルールを適用：

1. **必須項目**
   - `name`, `role`, `image`, `slug`, `projectsTable`

2. **推奨項目**
   - `fullBio`, `detailedSkills`, `detailedCareer`

3. **オプション項目**
   - `contactInfo`, `education`, `certifications`

## データ移行計画

1. 既存のメンバーデータを拡張形式に変換
2. プロジェクトテーブルデータを構造化して追加
3. 画像最適化とパス設定
4. テストデータでのページレンダリング確認