// フォームの選択肢と、入力の上限。画面（Astro）と API（検証、通知の文面）の両方で使う。

export interface Option {
  value: string;
  label: string;
}

/** お問い合わせ: 相談したいこと */
export const SERVICE_OPTIONS: readonly Option[] = [
  { value: "build", label: "業務システム・SaaSの新規開発" },
  { value: "ai", label: "生成AIの組み込み" },
  { value: "migrate", label: "移行・刷新" },
  { value: "handover", label: "AI駆動開発の導入" },
  { value: "other", label: "その他" },
];

/** 採用: 希望職種。選択肢は短い名前で書く（375px の画面でも、選んだ値が欠けずに入る） */
export const POSITION_OPTIONS: readonly Option[] = [
  { value: "fullstack", label: "フルスタックエンジニア" },
  { value: "intern", label: "エンジニアインターン" },
  { value: "other", label: "その他" },
];

/** 採用: 経験年数 */
export const EXPERIENCE_OPTIONS: readonly Option[] = [
  { value: "0-2", label: "0〜2年" },
  { value: "3-5", label: "3〜5年" },
  { value: "6-9", label: "6〜9年" },
  { value: "10+", label: "10年以上" },
];

/** 入力できる字数の上限 */
export const LIMITS = {
  company: 100,
  name: 100,
  email: 254,
  url: 200,
  message: 5000,
} as const;

/** メールアドレスの形式。input の pattern 属性と、API の検証で同じものを使う */
export const EMAIL_PATTERN_SOURCE = "[^\\s@]+@[^\\s@]+\\.[^\\s@]+";
export const EMAIL_PATTERN = new RegExp(`^${EMAIL_PATTERN_SOURCE}$`);
