import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "お問い合わせ",
    description:
      "まずはフォームよりお問い合わせください。おおむね3-5分程度で完了します。",
  },
  {
    number: 2,
    title: "ヒアリング・無料相談",
    description:
      "オンライン会議で御社の課題を伺い、その場で改善方法をアドバイスしつつ、弊社でどのようなサービス提供が可能かをご説明します。",
  },
  {
    number: 3,
    title: "ご提案・お見積もり",
    description:
      "ヒアリングから2日以内に、取り組みの具体的なご提案とお見積もりをご提示します。",
  },
  {
    number: 4,
    title: "ご契約",
    description:
      "クラウドサイン（ご要望があれば他のツールや紙も可）にて契約を締結します。契約は最短で即日での対応が可能です。",
  },
  {
    number: 5,
    title: "お取り組み開始",
    description:
      "成果改善に向けて取り組みを開始します。お急ぎの場合は、お問い合わせから1週間でのスタートも可能です。",
  },
];

function StepCard({
  number,
  title,
  description,
  showArrow,
}: {
  number: number;
  title: string;
  description: string;
  showArrow: boolean;
}) {
  return (
    <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110">
        {number}
      </div>
      <div className="mb-4 mt-6 flex items-center gap-3">
        <h3 className="text-lg font-bold text-teal-900">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      {showArrow && (
        <>
          {/* Desktop Arrow */}
          <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 md:block">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          {/* Mobile Arrow */}
          <div className="absolute -bottom-8 left-1/2 block -translate-x-1/2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
              <ArrowRight className="h-4 w-4 rotate-90" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ContactFlow() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
        お問い合わせから開始までの流れ
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            {...step}
            showArrow={index < steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
