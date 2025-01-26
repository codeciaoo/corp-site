import React from 'react';
import { Zap, Lightbulb, Target, CheckCircle2, Rocket, Shield, Coins } from 'lucide-react';

const ServiceComparisonTable = () => {
  const plans = [
    {
      title: "最速確実納品プラン",
      subtitle: "期限内の確実な納品をお約束",
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      sections: [
        {
          title: "このようなニーズにお応えします",
          icon: <Target className="w-6 h-6" />,
          points: [
            {
              title: "要件が明確で確実な納品が必要",
              description: "仕様が固まっており、期日までの納品が求められるプロジェクトに最適です。計画通りの遂行をお約束します。"
            },
            {
              title: "品質と納期の保証が重要",
              description: "徹底した品質管理とプロジェクト管理により、高品質なシステムを納期通りにお届けします。"
            },
            {
              title: "予算の超過は避けたい",
              description: "事前に確定した要件に基づき、予算内での確実な開発完了をお約束します。"
            }
          ]
        },
        {
          title: "契約形態とメリット",
          icon: <Shield className="w-6 h-6" />,
          points: [
            {
              title: "成果物単位の一括請負契約",
              description: "明確な成果物と納期を定め、確実な完遂をお約束。追加要件は別途見積りで柔軟に対応します。"
            },
            {
              title: "徹底した品質管理体制",
              description: "専任の品質管理チームによる検証で、安心して運用できるシステムを提供します。"
            }
          ]
        }
      ]
    },
    {
      title: "デジタル共創ラボプラン",
      subtitle: "事業成長の技術パートナー",
      icon: <Lightbulb className="w-12 h-12 text-green-600" />,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      sections: [
        {
          title: "このようなニーズにお応えします",
          icon: <Rocket className="w-6 h-6" />,
          points: [
            {
              title: "アジャイルな開発で事業を推進",
              description: "要件が流動的で、市場の反応を見ながら柔軟に改善を重ねていきたいプロジェクトに最適です。"
            },
            {
              title: "新規事業・サービスの立ち上げ",
              description: "技術選定から開発、運用まで、事業の成長に合わせて柔軟にサポートします。"
            },
            {
              title: "継続的な改善と価値向上",
              description: "ユーザーフィードバックを活かしながら、サービスの価値を継続的に高めていきます。"
            }
          ]
        },
        {
          title: "契約形態とメリット",
          icon: <Coins className="w-6 h-6" />,
          points: [
            {
              title: "3ヶ月〜の継続的パートナーシップ",
              description: "準委任契約で柔軟な開発体制を構築。事業の成長に合わせて継続的に改善を進めます。"
            },
            {
              title: "技術ナレッジの蓄積",
              description: "お客様の開発チームと協働し、技術ナレッジを社内に蓄積していきます。"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan, idx) => (
          <div key={idx} className={`${plan.bgColor} rounded-lg p-6`}>
            <div className="flex items-center justify-center space-x-3 mb-8">
              {plan.icon}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{plan.title}</h2>
                <p className={`${idx === 0 ? "text-blue-600" : "text-green-600"} mt-1`}>{plan.subtitle}</p>
              </div>
            </div>

            {plan.sections.map((section, sIdx) => (
              <div key={sIdx} className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className={idx === 0 ? "text-blue-500" : "text-green-500"}>
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-700">{section.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {section.points.map((point, pIdx) => (
                    <div key={pIdx} className="pl-4 border-l-2 border-gray-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle2 className={`w-4 h-4 ${idx === 0 ? "text-blue-500" : "text-green-500"}`} />
                        <h4 className="font-semibold text-gray-700">{point.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm ml-6">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
