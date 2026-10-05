// 採用ページの文章。
// 条件、報酬、勤務形態、応募資格、選考の流れは、旧ページ（CareersPage.tsx、careers/fullstack.astro、
// careers/intern.astro）に書いてあった事実のまま。文体だけを design/BRIEF-company.md の規則に合わせている。
// インターンの「入社後の流れ」と「身につくこと」は、CodeCiaoの実際の進め方（design/BRIEF-company.md の
// 「1. どんな会社か」）で書いている。期間の区切りは旧ページのまま。
// 旧ページから変えた所（事実は足していない）:
//   - 選考は「応募 → 面接 → 内定」の 3 段階にそろえた。働き始めてからのことは「入社後の流れ」に書く
//   - 必須の条件と歓迎する経験は、職種の詳細ページだけに置く（採用ページの一覧は、冒頭の要点 facts だけ）
//   - 報酬（給与と待遇）は、募集要項の節の冒頭の帯（pay）で大きく出す。帯の文字は、募集要項の元の 1 項目のまま
//     （lead + value + tail をつなぐと元の文になる）。帯に出した項目は、同じ節の一覧からは外している
// 審査では「どの会社の募集にもある文」（協働のための能力、勤務時間の柔軟さ、能力向上の支援、職場の空気）を
// 具体的に書くか消すよう指摘された。募集の条件と待遇は代表が公開している内容なので、指示なしには変えない。
// 直すかどうかは代表が決める（最終報告の要決定）。

/** AIのツール名は、この書き方に統一する。製品名の中の空白は、折り返さない空白にする */
const AI_AGENTS = "AIエージェント（Claude\u00A0Code、Codex）";

const BOOK = "『［改訂新版］プロになるためのWeb技術入門』";

export interface Value {
  title: string;
  body: string;
}

// 「確かめてから言う」「足すより削る」は会社ページの「大事にしていること」に書いてある。
// 採用ページには、ここにしかない 2 つだけを置き、会社ページへリンクする。
export const VALUES: Value[] = [
  {
    title: "失敗をルールに変える",
    body: "同じ失敗をくり返さないように、失敗はチェックとテストに変えます。失敗した人を責める材料にはしません。",
  },
  {
    title: "説明できることを|理解と呼ぶ",
    body: "自分の言葉で説明できないコードを、理解したとはみなしません。",
  },
];

export interface SelectionStep {
  title: string;
  body: string;
}

/** 選考は「応募 → 面接 → 内定」の 3 段階。置くのは採用ページの応募フォームの横だけ（職種のページはリンク） */
export const SELECTION: SelectionStep[] = [
  { title: "応募", body: "フォームから送ってください。" },
  { title: "面接", body: "面接の中で、技術課題に取り組んでもらいます。" },
  { title: "内定", body: "合格した方には条件を示して、正式に依頼します。" },
];

/** 詳細ページの本文を組む部品 */
export type Block =
  | { type: "text"; paragraphs: string[] }
  /** 罫線で区切った行の一覧（見出しに塗りの丸） */
  | { type: "list"; title: string; items: string[] }
  /** 必須の条件（塗りの丸）と歓迎する経験（線の丸） */
  | { type: "conditions"; required: string[]; preferred: string[] }
  /** 条件の一覧。項目ごとに罫線の行の一覧（RuledList）にして、必須の条件・歓迎する経験と同じ 2 列に並べる */
  | { type: "terms"; rows: TermRow[] }
  /** 番号付きの行（NumberedRows）。title の `|` は折り返してよい位置 */
  | { type: "rows"; label: string; items: { title: string; body: string }[] }
  /** 入ってからの流れ。O の図つきの行で出す（塗りの量が時期ごとに増える） */
  | {
      type: "phases";
      title: string;
      items: { period: string; title: string; items: string[] }[];
    };

export interface TermRow {
  term: string;
  items: string[];
}

/**
 * 報酬の帯の 1 項目。lead + value + tail をつなぐと、募集要項の元の 1 項目（例: 月額60万円〜120万円（フルタイム換算））になる。
 * value の数字を大きく出す
 */
export interface PayFigure {
  lead: string;
  value: string;
  tail?: string;
}

/** 報酬の帯。募集要項の節の冒頭に、12 列を使って置く */
export interface Pay {
  term: string;
  figures: PayFigure[];
  /** 帯の下に添える、残りの項目（元の文のまま） */
  notes: string[];
}

export interface DetailSection {
  id: string;
  en: string;
  title: string;
  /** 節の冒頭に置く報酬の帯 */
  pay?: Pay;
  blocks: Block[];
}

export interface Position {
  slug: "fullstack" | "intern";
  /** 職種の名前。契約の種類は kind に書く（名前にかっこで足さない） */
  title: string;
  /** 見出し用。`|` は折り返してよい位置 */
  heading: string;
  /** 見出しに付ける区分。契約の種類で書く */
  kind: string;
  /** 一覧に出すひとこと */
  summary: string;
  /** 詳細ページのリード */
  lead: string;
  /** 冒頭に出す要点（詳細ページの冒頭と、採用ページの一覧）。body の「 / 」と「（」は、狭い画面で折り返す位置 */
  facts: { term: string; body: string }[];
  /** 詳細ページの末尾（応募する）の見出し。その職種の条件を 1 行で示す。`|` は折り返してよい位置 */
  apply: string;
  sections: DetailSection[];
}

const FULLSTACK_REQUIRED = [
  "Web開発の経験3年以上",
  "TypeScript、Reactでの開発経験",
  "クラウドサービス（AWS、GCP）の利用経験",
];

const FULLSTACK_PREFERRED = [
  "生成AIに関わる開発経験",
  "バックエンドの開発経験（Node.js、Python）",
  "アジャイル開発の経験",
];

const INTERN_REQUIRED = [
  `${BOOK}の内容をおおよそ理解していること`,
  `${AI_AGENTS}の使用経験`,
  "開発ツール（Git、VS\u00A0Code）の使用経験",
];

const INTERN_PREFERRED = [
  "Web開発やAI開発の基礎知識",
  "プロジェクトを進めた経験",
];

export const POSITIONS: Position[] = [
  {
    slug: "fullstack",
    title: "フルスタックエンジニア",
    heading: "フルスタック|エンジニア",
    kind: "業務委託",
    summary:
      "フロントエンドからバックエンドまで、Web開発に幅広く携わりたいエンジニアに適したポジションです。",
    lead: "フルスタックエンジニアはWeb開発チームの中心として、フロントエンドからバックエンドまでを担当します。",
    facts: [
      { term: "契約形態", body: "業務委託契約" },
      { term: "働き方", body: "リモートワーク中心" },
      { term: "稼働", body: "週3日〜5日（応相談）" },
    ],
    apply: "週3日から|業務委託で|参加する",
    sections: [
      {
        id: "role",
        en: "Role",
        title: "仕事の内容",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "CodeCiaoは生成AIとクラウドとWebの技術を使って、業務システムとSaaSを開発しています。",
              "フルスタックエンジニアはWebアプリケーションの設計から開発、運用までに携わります。担当する範囲はフロントエンドからバックエンドまでです。",
            ],
          },
          {
            type: "list",
            title: "主な業務",
            items: [
              "Webアプリケーションのフロントエンドとバックエンドの開発",
              "生成AIを組み込んだシステムの開発",
              "クラウド基盤（AWS、GCP）の構築と運用",
              "既存システムの改善と最適化",
              "技術の選定とアーキテクチャの設計",
            ],
          },
        ],
      },
      {
        id: "requirements",
        en: "Requirements",
        title: "募集要項",
        pay: {
          term: "報酬",
          figures: [
            { lead: "月額", value: "60万円〜120万円", tail: "（フルタイム換算）" },
            { lead: "時間単価", value: "7,000円〜15,000円" },
          ],
          notes: ["スキルと経験に応じて決めます"],
        },
        blocks: [
          {
            type: "conditions",
            required: [
              ...FULLSTACK_REQUIRED,
              "バージョン管理ツール（Git）の使用経験",
              "リモートワークで協働するためのコミュニケーション能力",
            ],
            preferred: [
              ...FULLSTACK_PREFERRED,
              "CI/CDパイプラインの構築経験",
              "セキュリティに関する知識と経験",
            ],
          },
          {
            type: "terms",
            rows: [
              {
                term: "契約形態",
                items: [
                  "業務委託契約",
                  "プロジェクト単位、または時間単価制",
                  "リモートワーク中心（オンラインのミーティングが月1回程度）",
                ],
              },
              {
                term: "稼働時間",
                items: [
                  "週3日〜5日（応相談）",
                  "1日4時間〜8時間（応相談）",
                  "勤務時間は柔軟に決められます",
                ],
              },
              {
                term: "そのほか",
                items: [
                  "CodeCiaoは長期の協力関係を希望しています",
                  "副業と複業を歓迎します",
                  "スキルアップの支援があります",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "intern",
    title: "エンジニアインターン",
    heading: "エンジニア|インターン",
    kind: "インターン",
    summary:
      "Web開発やAI技術を実務を通じて学びたい学生に適したインターンです。",
    lead: "インターンは受託開発の実案件に参加して、AIとWeb開発の経験を積みます。",
    facts: [
      { term: "給与", body: "時給2,000円〜" },
      { term: "勤務", body: "週2日以上 / 1日4時間以上" },
      { term: "対象", body: "全学年（大学1年生〜大学院生）" },
    ],
    apply: "週2日 1日4時間から|参加する",
    sections: [
      {
        id: "overview",
        en: "Overview",
        title: "インターンの概要",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "CodeCiaoの主業務は現在、受託開発が中心です。Web開発とAIを組み合わせたシステムを企業向けに開発しています。",
              "インターンの募集は今回が初めてですが、参加後は早い段階から実案件の開発に携わっていただきます。",
              "配属先は代表の田原がプロジェクトマネージャーを務める案件に限定し、環境構築や業務理解のためのサポート期間もしっかり確保します。",
            ],
          },
          {
            type: "list",
            title: "こんな方に向いています",
            items: [
              "Web開発やAIの知識を実務で使ってみたい方",
              "受託開発の現場で経験を積みたい方",
              "リーダーとして、自分からプロジェクトを進めたい方",
              `${AI_AGENTS}をすでに使っている方`,
            ],
          },
          {
            type: "list",
            title: "このインターンで得られる経験",
            items: [
              "実際の業務課題を解決する中で、実務に直結する開発スキルが身につきます",
              "AIエージェントを活用した実践的なWeb・AI開発スキルを習得できます",
              "意見を言いやすく、心理的にも相談しやすい環境で開発に取り組めます",
            ],
          },
        ],
      },
      {
        id: "role",
        en: "Role",
        title: "仕事の内容",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "インターンはWeb開発とAIを組み合わせたシステムの開発を担当します。具体的な仕事は次の4つです。",
            ],
          },
          {
            type: "rows",
            label: "仕事の内容",
            items: [
              {
                title: "Webアプリの開発",
                body: "Webフレームワークを使って、フロントエンドとAPIを開発します。",
              },
              {
                title: "AI機能の実装",
                body: "WebアプリケーションにAI機能を組み込み、チャットボットを開発します。",
              },
              {
                title: "AIエージェントの活用",
                body: `${AI_AGENTS}を使って、開発プロセスを改善します。`,
              },
              {
                title: "プロジェクトの推進",
                body: "開発プロジェクトを企画し、計画を立てて実行します。",
              },
            ],
          },
          {
            type: "phases",
            title: "入社後の流れ（スケジュールの例）",
            items: [
              {
                period: "初日〜1週間",
                title: "既存のシステムを調べる",
                items: [
                  "業務で使う開発環境（Git、VS\u00A0Code）を整えます",
                  "最初の課題ではコードを変えずに、既存のシステムを調べます",
                  "調べて分かったことを、自分の言葉で説明します",
                ],
              },
              {
                period: "2週目〜1か月",
                title: "設計書を読んでから実装する",
                items: [
                  "設計書を読み、質問を出し、テストの計画を書いてから実装します",
                  `実装は${AI_AGENTS}と一緒に進めます。AIは自由に使えます`,
                  "別のAIと自動のチェックが、書いたコードを検証します",
                ],
              },
              {
                period: "2〜3か月",
                title: "実際の案件の作業を担当する",
                items: [
                  "代表と一緒に、実際の案件の作業を担当します",
                  "提出したコードを、自分の言葉ですべて説明します",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "requirements",
        en: "Requirements",
        title: "募集要項",
        pay: {
          term: "給与と待遇",
          figures: [{ lead: "時給", value: "2,000円〜" }],
          notes: [
            "交通費を支給します（CodeCiaoの規定によります）",
            "試用期間3か月（給与の変更なし）",
          ],
        },
        blocks: [
          {
            type: "conditions",
            required: INTERN_REQUIRED,
            preferred: INTERN_PREFERRED,
          },
          {
            type: "terms",
            rows: [
              {
                term: "勤務条件",
                items: [
                  "勤務日数は週2日以上です",
                  "勤務時間は9時00分〜17時30分の間で、1日4時間以上です",
                  "勤務曜日は月〜金です（応相談）",
                ],
              },
              {
                term: "対象学年",
                items: ["大学1年生から大学院生まで、全学年が対象です。"],
              },
            ],
          },
        ],
      },
      {
        id: "skills",
        en: "Skills",
        title: "身につくこと",
        blocks: [
          {
            type: "rows",
            label: "身につくこと",
            items: [
              {
                title: "設計書を読んでから|書く進め方",
                body: "CodeCiaoは設計書を読み、質問を出し、テストの計画を書いてから実装します。インターンも同じ順番で進めます。",
              },
              {
                title: "AIエージェントを使った|実装と検証",
                body: `インターンは${AI_AGENTS}と一緒に実装します。書いたコードを、別のAIと自動のチェックが検証します。`,
              },
              {
                title: "自分のコードを|説明する力",
                body: "提出したコードは、自分の言葉ですべて説明していただきます。AIは自由に使えますが、説明できないコードは理解したとはみなしません。",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const positionOf = (slug: Position["slug"]): Position => {
  const position = POSITIONS.find(item => item.slug === slug);
  if (!position) throw new Error(`職種が見つかりません: ${slug}`);
  return position;
};
