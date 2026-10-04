// 「つくり方」ページの文章（design/CONTENT.md の /approach のとおり）。
// 社名、金額、承認されていない数値は書かない。`|` は「ここで折り返してよい」の印。
import { STEPS } from "./home";

export interface PageSection {
  no: string;
  id: string;
  en: string;
  title: string;
}

export const SECTIONS = {
  lineFill: { no: "01", id: "line-fill", en: "Line & Fill", title: "線と塗り" },
  flow: { no: "02", id: "flow", en: "Flow", title: "5つの工程" },
  ai: {
    no: "03",
    id: "ai",
    en: "AI",
    title: "AIに任せること 任せないこと",
  },
  judgment: { no: "04", id: "judgment", en: "Judgment", title: "判断の基準" },
  handOver: { no: "05", id: "hand-over", en: "Hand over", title: "渡す" },
} satisfies Record<string, PageSection>;

/** 目次の並び。`title` の `|` は折り返してよい位置 */
export const SECTION_LIST: PageSection[] = [
  SECTIONS.lineFill,
  SECTIONS.flow,
  { ...SECTIONS.ai, title: "AIに任せること |任せないこと" },
  SECTIONS.judgment,
  SECTIONS.handOver,
];

export const HERO = {
  en: "Approach",
  label: "つくり方",
  title: "塗るのは 確かめた|ものだけ",
  lead: "CodeCiaoはAIエージェントを使って開発しています。コードを速く書けるようになった分、確かめる作業に時間を使います。",
};

/* ───────── 大きい言い切り（既定は墨の太字。線と塗りは、その意味を持つ言葉にだけ使う） ───────── */

export interface SayRun {
  text: string;
  /** ink: 墨の文字（既定）／hello: 線→塗り（確かめた事実）／goodbye: 塗り→線（まだ確かめていない設計） */
  as?: "ink" | "hello" | "goodbye";
  /** 動き出しの遅れ（ミリ秒） */
  delay?: number;
}

export interface SayPhrase {
  /** 途中で折り返さない 1 句 */
  runs: SayRun[];
  /** この句の前で必ず改行する */
  br?: boolean;
}

/* ───────── 塗りの量 ───────── */

/** 塗りの量（0〜1）を `--b`／`--to` に渡す値にする。範囲の外は丸める */
export const glyphLevel = (ratio: number): number =>
  Math.min(1, Math.max(0, ratio));

/* ───────── 01 線と塗り ───────── */

export const LINE_FILL_BODY =
  "このサイトの文字と図形には、線と塗りの2つの状態があります。線はこれからつくるものの設計を表します。塗りは動くことを確かめたものを表します。設計しただけのものと、書いただけのコードは線のままです。確かめる工程を1つ通るたびに塗りが増え、人が確かめた時点で全体を塗ります。";

/* ───────── 02 5 つの工程 ───────── */

export interface FlowStep {
  verb: string;
  title: string;
  body: string;
  /** 図のラベル */
  stage: string;
  /** 塗りの量（%） */
  percent: number;
  /** 箇条書き */
  points: string[];
  /** 箇条書きの種類。notes: 「具体的には」／holds: 人が握る 5 つ */
  kind: "notes" | "holds";
}

const FLOW_DETAILS: Pick<FlowStep, "body" | "stage" | "points" | "kind">[] = [
  {
    stage: "設計",
    body: "実装の前に設計書を読み、不明点を質問し、テストの計画を書きます。実装の途中で仕様が変わったら設計書も直します。",
    kind: "notes",
    points: [
      "設計書はMarkdownで書き、実装とは別に管理します",
      "実装の変更と設計書の変更を、同時に出します",
      "判断の理由を記録に残します",
    ],
  },
  {
    stage: "実装とテスト",
    body: "実装はAIエージェントが担当します。書いたAIエージェントが、先に決めたテストを通すところまでを実装とします。AIに任せる範囲と、人に確認を取る条件も先に決めておきます。",
    kind: "notes",
    points: [
      "AIへの依頼は、数字と検証できる完了条件で書きます",
      "大きな作業は工程ごとに分け、成果物をファイルで受け渡します",
    ],
  },
  {
    stage: "別のAI",
    body: "書いたAIとは会話を共有しない別のAIが、変更の内容を判定します。この手順は人の注意力に頼らず、仕組みで強制しています。",
    kind: "notes",
    points: [
      "書く役と評価する役を分けます",
      "評価役は、コードを書いた経緯を知らない状態で評価します",
    ],
  },
  {
    stage: "自動のチェック",
    body: "一度起きた失敗は、ルールとテストに変えます。同じ失敗が起きると、次からは自動のチェックが変更を止めます。",
    kind: "notes",
    points: [
      "仕様とのずれ、データの分離、SQLの書き方を独自のチェックで検査します",
      "失敗したテストと実行していないテストを、合格として扱いません",
    ],
  },
  {
    stage: "人の確認",
    body: "次の5つは人が決めます。",
    kind: "holds",
    points: [
      "金額",
      "納品物の最終確認",
      "アーキテクチャの大きな変更",
      "セキュリティ",
      "人に関わる判断",
    ],
  },
];

/** 工程の名前（動詞と見出し）はトップページと同じ `STEPS` を使う */
export const FLOW_STEPS: FlowStep[] = STEPS.map((step, index) => ({
  verb: step.verb,
  title: step.title,
  percent: (index / (STEPS.length - 1)) * 100,
  ...FLOW_DETAILS[index],
}));

/* ───────── 03 AI に任せること 任せないこと ───────── */

export interface Rule {
  title: string;
  body: string;
}

export const AI_RULES: Rule[] = [
  {
    title: "数える作業は|スクリプトに任せる",
    body: "決まった手順で動くスクリプトが、全件の抽出・件数の集計・帳票の出力を担当します。AIには判断と文章の作成を任せます。",
  },
  {
    title: "3段階で|確かめる",
    body: "スクリプトが全件と件数を、検証役のAIが内容を、担当者が業務への影響を確かめます。",
  },
  {
    title: "確信度を分けて|根拠を示す",
    body: "AIが出した結果は、どこまで確かなのかを分けて示し、そう判断した理由を記録します。分からないものは「分からない」と書きます。",
  },
];

/* ───────── 04 判断の基準（「できていないことも書く」と「長く保つほうを選ぶ」の 2 つ） ───────── */

export const SIMPLE_BODY =
  "CodeCiaoは機能を足す前に、その機能が本当に必要かを確かめます。要望を断るときは、「次の段階で対応する」「運用で対応する」という代わりの案を示します。技術は流行しているかどうかではなく、長く使い続けられるかどうかで選びます。使われないシステムをつくっても、顧客の役に立たないからです。";

export const HONEST_BODY =
  "CodeCiaoはAIの品質を実際より良く見せません。まだ保証できていない点と、原因が分かっていない点は、そのまま文書に残します。試行版をつくるときも、本番に移す計画と元に戻す手順を用意します。";

/* ───────── 05 渡す ───────── */

export interface Handover {
  en: string;
  title: string;
  body: string;
}

export const HANDOVER: Handover[] = [
  {
    en: "Design doc",
    title: "設計書",
    body: "Markdownで書いた設計書を、仕様の基準にします。",
  },
  {
    en: "Runbook",
    title: "手順書と|引き継ぎの資料",
    body: "ほかの人が同じ作業を続けられるように書きます。",
  },
  {
    en: "Video",
    title: "解説動画",
    body: "システムの仕組みと決定の経緯を、動画で説明します。新しく入るメンバーと顧客の両方に見せます。",
  },
  {
    en: "Training",
    title: "研修",
    body: "実務と同じ形式の課題で進めます。AIは自由に使えます。ただし、提出したコードを自分ですべて説明できることを条件にしています。",
  },
];
