export interface Service {
  id: string;
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
}

export const services: Service[] = [
  {
    id: "software-development",
    title: "ソフトウェア開発",
    description: "最新のテクノロジーを活用し、お客様のビジネスに最適なソフトウェアソリューションを提供します。",
    features: [
      {
        title: "Webアプリケーション開発",
        description: "モダンな技術スタックを使用し、スケーラブルで高性能なWebアプリケーションを開発します。"
      },
      {
        title: "モバイルアプリ開発",
        description: "iOSとAndroid向けのネイティブアプリケーション開発を提供します。"
      },
      {
        title: "クラウドソリューション",
        description: "AWSやGCP、Azureなど、主要なクラウドプラットフォームを活用したソリューションを提供します。"
      }
    ],
    process: [
      {
        step: 1,
        title: "要件定義",
        description: "お客様のニーズを詳細に理解し、プロジェクトの目標と要件を明確化します。"
      },
      {
        step: 2,
        title: "設計フェーズ",
        description: "システム設計、UI/UX設計を行い、最適なソリューションを提案します。"
      },
      {
        step: 3,
        title: "開発",
        description: "アジャイル開発手法を用いて、迅速かつ柔軟に開発を進めます。"
      },
      {
        step: 4,
        title: "テストと品質保証",
        description: "徹底的なテストを行い、高品質な成果物を提供します。"
      }
    ]
  },
  {
    id: "legacy-modernization",
    title: "レガシーシステムの刷新",
    description: "レガシーシステムの分析から、クラウド移行を含めた最適なシステム設計・開発まで提供します。",
    features: [
      {
        title: "システム分析",
        description: "既存システムの詳細な分析と課題の特定を行います。"
      },
      {
        title: "最適化設計",
        description: "モダンなアーキテクチャを採用し、保守性と拡張性を向上させます。"
      },
      {
        title: "段階的移行",
        description: "ビジネスへの影響を最小限に抑えた段階的なシステム移行を実現します。"
      }
    ],
    process: [
      {
        step: 1,
        title: "現状調査",
        description: "既存システムの構造と課題を詳細に分析します。"
      },
      {
        step: 2,
        title: "移行計画",
        description: "最適な技術選定と移行戦略を策定します。"
      },
      {
        step: 3,
        title: "段階的実装",
        description: "計画に基づいて段階的にシステムを刷新します。"
      },
      {
        step: 4,
        title: "検証と最適化",
        description: "新システムの性能検証と必要な最適化を行います。"
      }
    ]
  },
  {
    id: "cloud-solutions",
    title: "クラウドソリューション",
    description: "AWS、Azure、GCPなど、主要なクラウドプラットフォームを活用した最適なソリューションを提供します。",
    features: [
      {
        title: "クラウド移行",
        description: "オンプレミスシステムからクラウドへの最適な移行を支援します。"
      },
      {
        title: "クラウドネイティブ開発",
        description: "クラウドの特性を最大限に活かしたアプリケーション開発を行います。"
      },
      {
        title: "運用管理",
        description: "セキュリティと可用性を考慮したクラウド環境の運用管理を提供します。"
      }
    ],
    process: [
      {
        step: 1,
        title: "要件分析",
        description: "クラウド活用における要件と目標を明確化します。"
      },
      {
        step: 2,
        title: "アーキテクチャ設計",
        description: "最適なクラウドアーキテクチャを設計します。"
      },
      {
        step: 3,
        title: "環境構築",
        description: "セキュアで拡張性の高いクラウド環境を構築します。"
      },
      {
        step: 4,
        title: "運用体制確立",
        description: "効率的な運用体制と監視体制を確立します。"
      }
    ]
  },
  {
    id: "it-consulting",
    title: "ITコンサルティング",
    description: "お客様のビジネス課題をITの力で解決するための戦略立案と実行支援を提供します。",
    features: [
      {
        title: "IT戦略立案",
        description: "ビジネス目標達成のための最適なIT戦略を策定します。"
      },
      {
        title: "システム最適化",
        description: "既存システムの分析と改善提案を行い、効率化を実現します。"
      },
      {
        title: "デジタルトランスフォーメーション",
        description: "企業のDX推進をサポートし、競争力の強化を支援します。"
      }
    ],
    process: [
      {
        step: 1,
        title: "現状分析",
        description: "現在の課題とニーズを詳細に分析します。"
      },
      {
        step: 2,
        title: "戦略策定",
        description: "分析結果に基づき、最適な戦略を立案します。"
      },
      {
        step: 3,
        title: "ロードマップ作成",
        description: "具体的な実行計画を策定します。"
      },
      {
        step: 4,
        title: "実行支援",
        description: "戦略の実行をサポートし、成果を測定します。"
      }
    ]
  }
];
