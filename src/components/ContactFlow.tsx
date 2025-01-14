import React from "react";
import { ArrowRight } from "lucide-react";

const ContactFlow = () => {
  const steps = [
    {
      number: 1,
      title: "お問い合わせ",
      description:
        "まずはフォームよりお問い合わせください。入力項目は4つのみで、おおむね3-5分程度で完了します。",
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
        "ヒアリングから数日後に、取り組みの具体的なご提案とお見積もりをご提示します。",
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
        "成果改善に向けて取り組みを開始します。お急ぎの場合は、お問い合わせから1-2週間でのスタートも可能です。",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl bg-white px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        お問い合わせから開始までの流れ
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-start p-6">
            <div className="mb-4 flex items-center">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                {step.number}
              </div>
              <h3 className="ml-3 text-xl font-bold">{step.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {step.description}
            </p>
            {index < steps.length - 1 && (
              <div className="absolute right-0 top-10 hidden translate-x-1/2 transform md:block">
                <ArrowRight className="text-primary h-6 w-6" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFlow;
