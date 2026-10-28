// 育児記録アプリ「すくすく備忘録」（iOS）の紹介、プライバシーポリシー、サポート、お問い合わせの文面。
// App Store Connect の「プライバシーポリシー URL」「サポート URL」から開くページで、URL を変えない。
// 2026-10-28: 非公開の iOS リポジトリ docs/privacy-policy.md をこの環境から読めなかった。
// 広告（AdMob）と家族共有（Firebase）の文は、確認できた事実から書いた。アプリ内の文面との照合は残っている。

export interface DocLink {
  label: string;
  href: string;
}

export interface DocSection {
  /** 見出し。`|` は折り返してよい位置 */
  title: string;
  paragraphs?: string[];
  /** 丸の箇条書き */
  items?: string[];
  link?: DocLink;
}

export interface GuideLink {
  href: string;
  title: string;
  body: string;
}

export const APP_NAME = "すくすく備忘録";
export const APP_PATH = "/apps/sukusuku-biboroku";
export const PRIVACY_PATH = "/apps/sukusuku-biboroku/privacy";
export const SUPPORT_PATH = "/apps/sukusuku-biboroku/support";
export const CONTACT_PATH = "/apps/sukusuku-biboroku/contact";
/** /api/contact に送るアプリの名前（APP_OPTIONS の value） */
export const APP_KEY = "sukusuku-biboroku";

export const INTRO_LEAD =
  "すくすく備忘録は、赤ちゃんの記録をiPhoneに残すアプリです。作っているのはCodeCiaoです。";

export const RECORD_LEAD = "iPhoneの中に、次の記録を残せます。";

export const RECORD_ITEMS = [
  "授乳",
  "おむつ",
  "ねんね",
  "成長",
  "予防接種",
  "日記と写真",
] as const;

export const RECORD_NOTE = "日記には、選んだ写真を入れられます。";

export const VOICE_PARAGRAPHS = [
  "声で記録は、日本語の声をiPhoneの中で文字にします。",
  "声は外へ送らず、録音も残しません。",
  "「そろそろかも」のお知らせは、オンにしたときだけ届きます。",
];

export const FAMILY_PARAGRAPHS = [
  "家族と、同じ赤ちゃんの記録を共有できます。",
  "共有にはFirebaseの匿名認証を使い、記録はサーバーにも保存します。",
];

export const ADS_PARAGRAPHS = [
  "広告は、見た人に合わせないGoogle\u00A0AdMobの広告です。",
  "記録を書く画面と、22時から翌朝6時までは出しません。",
];

export const GUIDE_INTRO = "困ったときと、記録の扱いを読むページです。";

export const GUIDE_LINKS: GuideLink[] = [
  {
    href: `${PRIVACY_PATH}/`,
    title: "プライバシーポリシー",
    body: "集める情報と、広告と家族共有の扱いを書いてあります。",
  },
  {
    href: `${SUPPORT_PATH}/`,
    title: "サポート",
    body: "使い方で困ったときは、ここを読んでください。",
  },
  {
    href: `${CONTACT_PATH}/`,
    title: "お問い合わせ",
    body: "動かないときや分からないときは、フォームから送ってください。",
  },
];

export const PRIVACY_INTRO = "すくすく備忘録のプライバシーポリシーです。";

export const PRIVACY_SECTIONS: DocSection[] = [
  {
    title: "集める情報",
    paragraphs: [
      "このアプリは、広告の表示と家族での記録の共有に、外部のサービスを使います。",
      "名前とメールアドレスでの登録はありません。",
      "広告のための追跡はしません。",
    ],
  },
  {
    title: "記録の|保存場所",
    paragraphs: ["次の記録を、iPhoneの中に保存します。"],
    items: [...RECORD_ITEMS],
  },
  {
    title: "家族との|共有",
    paragraphs: [
      "家族共有をオンにすると、共有する記録をサーバーにも保存します。",
      "利用者の区別には、Firebaseの匿名認証を使います。",
      "メールアドレスは使いません。",
      "保存先は、GoogleのFirestoreです。",
      "共有した家族は、その赤ちゃんの記録を見たり足したりできます。",
    ],
  },
  {
    title: "広告",
    paragraphs: [
      "広告はGoogle\u00A0AdMobです。",
      "見た人に合わせない広告（npa=1）だけを出します。",
      "内容は、全年齢向け（maxAdContentRatingはgeneral）に限っています。",
      "アプリの追跡許可（ATT）は求めません。",
      "記録を書く画面には、広告を出しません。",
      "22時から翌朝6時までは、どの画面にも広告を出しません。",
    ],
  },
  {
    title: "使う権限",
    items: [
      "マイク・音声認識：「声で記録」のときだけ使います。声は端末の中で文字にし、外へ送りません。録音は残しません。",
      "写真：日記に写真をえらぶときだけ使います。えらんだ写真だけを読み込みます。",
      "通知：「そろそろかも」のお知らせをオンにしたときだけ使います。",
    ],
  },
  {
    title: "外への送信",
    paragraphs: [
      "iPhoneの中だけにある記録は、開発者のサーバーへ送りません。",
      "家族共有をオンにした記録は、Firestoreへ送ります。",
      "広告を出すとき、AdMobが広告の表示に必要な情報をGoogleへ送ります。",
      "記録の中身は、広告には渡しません。",
      "書き出しは、あなたが選んだ相手や場所にだけ渡ります。",
      "形式はPDFとCSVとバックアップです。",
    ],
  },
  {
    title: "記録を|消すには",
    items: [
      "iPhoneの中の記録は、アプリを削除すると消えます。",
      "家族共有でサーバーに保存した記録は、アプリを削除しても消えません。",
      "消すときは、サポートへ連絡してください。いまは、連絡を受けた開発者が消します。",
    ],
  },
  {
    title: "お問い合わせ",
    paragraphs: [
      "App Storeのこのアプリのページにある「Appサポート」からご連絡ください。",
    ],
    link: { label: "すくすく備忘録のサポート", href: `${SUPPORT_PATH}/` },
  },
  {
    title: "このポリシーを|変えるとき",
    paragraphs: [
      "内容を変えるときは、このページとアプリでお知らせします。",
      "2026年10月17日制定",
      "2026年10月28日改定",
    ],
  },
];

export const SUPPORT_INTRO =
  "すくすく備忘録をお使いいただき、ありがとうございます。使い方で困ったときは、下のよくある質問を読んでください。";

export const SUPPORT_SECTIONS: DocSection[] = [
  {
    title: "お問い合わせ",
    paragraphs: [
      "すくすく備忘録のお問い合わせフォームから送ってください。お名前とメールアドレスと内容だけで送れます。",
      "返事まで数日かかることがあります。赤ちゃんの名前や写真など、記録の中身は送らないでください。",
    ],
    link: {
      label: "すくすく備忘録のお問い合わせフォーム",
      href: `${CONTACT_PATH}/`,
    },
  },
  {
    title: "パートナーと|同じ記録を見たい",
    paragraphs: [
      "「きろく」の右上の歯車 →「ふたりで使う（iCloud）」をオンにして、アプリを開き直します。「パートナーを招待する」から、招待のリンクを送ってください。ふたりともiCloudにサインインしている必要があります。",
    ],
  },
  {
    title: "共有を|やめたい",
    paragraphs: [
      "「せってい」の「ふたりで使う（iCloud）」で「パートナーを招待する」を押します。「参加している人の管理・共有をやめる」からやめられます。",
    ],
  },
  {
    title: "機種変更の|とき",
    items: [
      "前のiPhoneで「ふたりで使う」をオンにしていた場合は、記録をiCloudから戻せます。新しいiPhoneでも同じApple IDでサインインし、「ふたりで使う」をオンにしてアプリを開き直してください。最初に赤ちゃんの名前を聞かれたら、「あとで」を押して少し待ってください。",
      "「せってい」→「きろくのデータ」→「バックアップ」で、ファイルにして残すこともできます。日記の写真は入りません。",
    ],
  },
  {
    title: "声で|記録できない",
    paragraphs: [
      "声で記録は日本語だけです。iPhoneの言語が日本語で、マイクと音声認識を許可しているかを確かめてください。うまくいかないときは、同じ欄に文字で「ミルク120」のように入れても記録できます。",
    ],
  },
  {
    title: "記録を|消したい",
    items: [
      "iPhoneの中の記録は、アプリを削除すると消えます。",
      "家族共有でサーバーに保存した記録は、アプリを削除しても消えません。消すときは、お問い合わせフォームから連絡してください。",
      "iCloudの記録は、iPhoneの「設定」→ 自分の名前 →「iCloud」→「ストレージを管理」→「すくすく備忘録」から消せます。",
    ],
  },
  {
    title: "プライバシー|ポリシー",
    paragraphs: [
      "広告と家族共有で、外部のサービスを使います。集める情報はプライバシーポリシーに書いてあります。",
    ],
    link: {
      label: "すくすく備忘録のプライバシーポリシー",
      href: `${PRIVACY_PATH}/`,
    },
  },
];

export const CONTACT_LEAD =
  "使い方で困ったときや、思うように動かないときに送ってください。";

/** お問い合わせのページの横に置く、送ったあとの流れ */
export const CONTACT_STEPS: { title: string; body: string }[] = [
  {
    title: "フォームで送る",
    body: "困っていることを書いて、送信してください。",
  },
  {
    title: "CodeCiaoが読む",
    body: "アプリをつくっているCodeCiaoの担当者が、内容を確かめます。",
  },
  {
    title: "メールで返事",
    body: "入力したメールアドレスへ返事を送ります。数日かかることがあります。",
  },
];
