import React from 'react';
import { ArrowRight } from 'lucide-react';

const ContactFlow = () => {
  const steps = [
    {
      number: 1,
      title: "お問い合わせ",
      description: "まずはフォームよりお問い合わせください。入力項目は4つのみで、おおむね3-5分程度で完了します。"
    },
    {
      number: 2,
      title: "ヒアリング・無料相談",
      description: "オンライン会議で御社の課題を伺い、その場で改善方法をアドバイスしつつ、弊社でどのようなサービス提供が可能かをご説明します。"
    },
    {
      number: 3,
      title: "ご提案・お見積もり",
      description: "ヒアリングから数日後に、取り組みの具体的なご提案とお見積もりをご提示します。"
    },
    {
      number: 4,
      title: "ご契約",
      description: "クラウドサイン（ご要望があれば他のツールや紙も可）にて契約を締結します。契約は最短で即日での対応が可能です。"
    },
    {
      number: 5,
      title: "お取り組み開始",
      description: "成果改善に向けて取り組みを開始します。お急ぎの場合は、お問い合わせから1-2週間でのスタートも可能です。"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">お問い合わせから開始までの流れ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-start p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold ml-3">{step.title}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFlow; 