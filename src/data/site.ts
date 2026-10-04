export interface NavItem {
  label: string;
  href: string;
  en: string;
}

export const SITE_NAME = "CodeCiao";
export const SITE_URL = "https://code-ciao.com";
export const CONTACT_EMAIL = "assistant@codeciao.com";

export const SITE_DESCRIPTION =
  "CodeCiaoは、紙やExcel、手作業で続けてきた業務を長く使えるシステムに置き換えるソフトウェア会社です。業務システムの新規開発、生成AIの組み込み、移行に対応します。";

export const NAV: NavItem[] = [
  { label: "つくり方", href: "/approach", en: "Approach" },
  { label: "実績", href: "/projects", en: "Work" },
  { label: "会社", href: "/about", en: "About" },
  { label: "採用", href: "/careers", en: "Careers" },
];

export const FOOTER_NAV: NavItem[] = [
  ...NAV,
  { label: "お問い合わせ", href: "/contact", en: "Contact" },
  { label: "個人情報保護方針", href: "/privacy-policy", en: "Privacy" },
];

export const COMPANY = {
  name: "CodeCiao株式会社",
  kana: "コードチャオ",
  postalCode: "〒141-0021",
  street: "東京都品川区上大崎3丁目14番34号",
  building: "プラスワン402",
  founded: "2024年2月19日",
  capital: "500万円",
  representative: "代表取締役社長 田原 翼",
  staff: "社員4名、業務委託5名",
};
