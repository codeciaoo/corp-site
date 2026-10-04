// トップページの文章。文体は design/BRIEF-company.md の「3. 文体」に従う。
// 社名は書かない。数値は承認済みのものだけ。`|` は「ここで折り返してよい」の印。

export interface BeforeAfter {
  before: string;
  after: string;
  field: string;
  /** この対を詳しく書いているページ */
  href: string;
  /** true なら表示しない（代表の確認待ち。確認が済んだら、この行を消すと元どおりに出る） */
  draft?: boolean;
}

export const BEFORE_AFTER: BeforeAfter[] = [
  {
    before: "紙とExcelの日報",
    after: "オフラインで|入力できる|Webアプリ",
    field: "現場の安全管理",
    href: "/projects/safety-ai",
  },
  {
    before: "自分たちで|直せないパッケージ",
    after: "自分たちで|決められる|基幹SaaS",
    field: "店舗の業務",
    href: "/projects/core-saas",
  },
  {
    before: "人手のgrepと|Excelの影響調査",
    after: "AIが実行して|根拠を残す調査",
    field: "システムの移行",
    href: "/projects/java-migration-tools",
    draft: true,
  },
  {
    before: "古いJavaとStruts",
    after: "いまのJavaとJSTL",
    field: "フレームワークの移行",
    href: "/projects/java-migration-tools",
    draft: true,
  },
  {
    before: "人の目だけの|レビュー",
    after: "別のAIと|自動のチェック",
    field: "開発の進め方",
    href: "/approach",
  },
];

export interface Service {
  verb: string;
  en: string;
  title: string;
  /** トップでは最初の 1 文だけを出す */
  body: string;
  tags: string[];
  /**
   * 関係するページ。事実で対応するものだけを書く（対応が無ければ書かない）。
   * `/projects/<id>` なら、その実績の題名をリンクの文字にする。それ以外は label を使う
   */
  related?: { href: string; label?: string };
}

export const SERVICES: Service[] = [
  {
    verb: "つくる",
    en: "Build",
    title: "業務システム・SaaSの新規開発",
    body: "要件の整理から設計、実装、運用までを担当します。Web、iPad、LINEミニアプリを1つのチームでつくります。仕様は設計書を基準にし、実装とずれない状態を保ちます。",
    tags: ["Java / Spring Boot", "TypeScript / React", "Swift", "AWS", "Terraform"],
    related: { href: "/projects/core-saas" },
  },
  {
    verb: "組み込む",
    en: "Embed",
    title: "生成AIの組み込み",
    body: "過去の事例を探す検索機能（RAG）や、AIによる記入内容のレビューを業務システムに組み込みます。試行版をつくるときから、本番に移す計画と元に戻す手順を用意します。",
    tags: ["RAG", "Amazon Bedrock", "pgvector", "評価と試験"],
    related: { href: "/projects/safety-ai" },
  },
  {
    verb: "移す",
    en: "Migrate",
    title: "移行・刷新",
    // 代表の確認後に戻す候補（Java の移行の案件を公開に戻すとき）:
    //   body: "古いJavaやフレームワーク、サーバーを新しい基盤へ移します。影響の調査とテスト設計はAIが実行し、判断の根拠を記録します。その結果を担当者が確かめます。",
    //   tags: ["Java / Jakarta EE", "Struts → JSTL", "EC2 → ECS", "IaC"],
    //   related: { href: "/projects/java-migration-tools" },
    // 書いている事実の出どころ: src/content/projects/ec2-to-ecs.md と aws-account-platform.md
    body: "サーバーで動くサービスを、止めずにコンテナの基盤へ移します。複数の環境とアカウントは、承認と監視の仕組みと一緒に整えます。",
    tags: ["EC2 → ECS", "AWS", "IaC"],
    related: { href: "/projects/ec2-to-ecs" },
  },
  {
    verb: "渡す",
    en: "Hand over",
    title: "AI駆動開発の導入",
    body: "AIエージェントを使った開発の進め方を、顧客のチームに入って整えます。外部と切り離したネットワークへの導入から、手順書・解説動画・研修まで対応します。",
    tags: ["Claude Code", "スキル / プラグイン", "手順書", "解説動画", "研修"],
    related: {
      href: "/approach#hand-over",
      label: "つくったものは説明できる形で渡す",
    },
  },
];

export interface Step {
  verb: string;
  title: string;
  /** トップページ用の 1 文 */
  summary: string;
  /** つくり方のページ用の詳しい説明 */
  body: string;
}

export const STEPS: Step[] = [
  {
    verb: "線を引く",
    title: "設計書を基準にする",
    summary: "設計書を読み、テストの計画を先に書きます。",
    body: "実装の前に設計書を読み、不明点を質問し、テストの計画を書きます。実装の途中で仕様が変わったら設計書も直します。",
  },
  {
    verb: "書く",
    title: "AIエージェントが実装する",
    summary: "AIエージェントが実装し、テストを通します。",
    body: "実装はAIエージェントが担当します。書いたAIエージェントが、先に決めたテストを通すところまでを実装とします。AIに任せる範囲と、人に確認を取る条件も先に決めておきます。",
  },
  {
    verb: "確かめる",
    title: "別のAIが検証する",
    summary: "会話を共有しない別のAIが、変更を判定します。",
    body: "書いたAIとは会話を共有しない別のAIが、変更の内容を判定します。この手順は人の注意力に頼らず、仕組みで強制しています。",
  },
  {
    verb: "止める",
    title: "自動のチェックが止める",
    summary: "過去の失敗から作ったチェックが、変更を止めます。",
    body: "一度起きた失敗は、ルールとテストに変えます。同じ失敗が起きると、次からは自動のチェックが変更を止めます。",
  },
  {
    verb: "決める",
    title: "人が決める",
    summary: "金額やセキュリティに関わる判断は、人が決めます。",
    body: "金額・納品物の最終確認・アーキテクチャの大きな変更・セキュリティ・人に関わる判断の5つは、人が決めます。",
  },
];

export interface Figure {
  value: string;
  unit: string;
  label: string;
  /** おおよその数のとき、数字の前に「約」を付ける */
  approx?: boolean;
}

export interface Engagement {
  mark: string;
  title: string;
  contract: string;
  body: string;
  points: string[];
}

export const ENGAGEMENTS: Engagement[] = [
  {
    mark: "A",
    title: "一括でつくる",
    contract: "請負契約",
    body: "つくるものが決まっていて、期日までに確実に納めたい場合に選びます。",
    points: [
      "成果物と納期を決めて契約します",
      "追加の要望は別の見積として扱います",
      "試験の工程を見積に明記します",
    ],
  },
  {
    mark: "B",
    title: "チームに入る",
    contract: "準委任契約（3か月から）",
    body: "進めながら仕様を決めたい場合や、新しい事業を立ち上げる場合に選びます。",
    points: [
      "開発チームの一員として設計から運用まで担当します",
      "技術的な判断とその理由を文書に残します",
      "手順書と解説動画で知識をチームに引き継ぎます",
    ],
  },
];

export const FLOW: { title: string; body: string }[] = [
  {
    title: "相談",
    body: "フォームから送ってください。必須の入力は5項目です。",
  },
  {
    title: "ヒアリング",
    body: "オンラインで現在のやり方と困りごとを聞きます。その場で答えられることは、その場で答えます。",
  },
  {
    title: "提案と見積",
    body: "ヒアリングから2日以内に、進め方の提案と見積を出します。",
  },
  {
    title: "開始",
    body: "契約は電子契約で結びます。急ぐ場合は、相談から1週間で開始できます。",
  },
];
