import React from "react";
import {
  Zap,
  Lightbulb,
  Target,
  CheckCircle2,
  Rocket,
  Shield,
  Coins,
} from "lucide-react";

const ServiceComparisonTable = () => {
  const plans = [
    {
      title: "最速確実納品プラン",
      subtitle: "期限内の確実な納品をお約束",
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      bgColor: "bg-white",
      iconColor: "text-blue-500",
      sections: [
        {
          title: "このようなニーズにお応えします",
          icon: <Target className="h-6 w-6" />,
          points: [
            {
              title: "要件が明確で確実な納品が必要",
              description:
                "仕様が固まっており、期日までの納品が求められるプロジェクトに最適です。計画通りの遂行をお約束します。",
            },
            {
              title: "予算の超過は避けたい",
              description:
                "事前に確定した要件に基づき、予算内での確実な開発完了をお約束します。",
            },
          ],
        },
        {
          title: "契約形態とメリット",
          icon: <Shield className="h-6 w-6" />,
          points: [
            {
              title: "成果物単位の一括請負契約",
              description:
                "明確な成果物と納期を定め、確実な完遂をお約束。追加要件は別途見積りで柔軟に対応します。",
            },
            {
              title: "徹底した品質管理体制",
              description:
                "専任の品質管理チームによる検証で、安心して運用できるシステムを提供します。",
            },
          ],
        },
      ],
    },
    {
      title: "デジタル共創ラボプラン",
      subtitle: "事業成長の技術パートナー",
      icon: <Lightbulb className="h-12 w-12 text-green-600" />,
      bgColor: "bg-white",
      iconColor: "text-green-500",
      sections: [
        {
          title: "このようなニーズにお応えします",
          icon: <Rocket className="h-6 w-6" />,
          points: [
            {
              title: "アジャイルな開発で事業を推進",
              description:
                "要件が流動的で、市場の反応を見ながら柔軟に改善を重ねていきたいプロジェクトに最適です。",
            },
            {
              title: "新規事業・サービスの立ち上げ",
              description:
                "技術選定から開発、運用まで、事業の成長に合わせて柔軟にサポートします。",
            },
          ],
        },
        {
          title: "契約形態とメリット",
          icon: <Coins className="h-6 w-6" />,
          points: [
            {
              title: "3ヶ月〜の継続的パートナーシップ",
              description:
                "準委任契約で柔軟な開発体制を構築。事業の成長に合わせて継続的に改善を進めます。",
            },
            {
              title: "技術ナレッジの蓄積",
              description:
                "お客様の開発チームと協働し、技術ナレッジを社内に蓄積していきます。",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-center text-3xl font-bold text-teal-800 sm:mb-4 sm:text-4xl">
            ご支援イメージ
          </h2>
          <p className="text-sm text-gray-600 md:text-lg">
            ご要望に合わせて最適なプランをご提案します
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`${plan.bgColor} group relative overflow-hidden rounded-2xl border border-gray-100 p-4 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8`}
            >
              {/* 装飾的な背景要素 */}
              <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-gradient-to-br from-gray-50 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* ヘッダーセクション */}
                <div className="mb-8 flex items-start space-x-4 md:mb-10">
                  <div
                    className={`rounded-xl p-2 md:p-3 ${idx === 0 ? "bg-blue-50" : "bg-green-50"} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {React.cloneElement(plan.icon, {
                      className: "w-8 h-8 md:w-12 md:h-12",
                    })}
                  </div>
                  <div>
                    <h2 className="mb-1 text-xl font-bold text-gray-800 md:mb-2 md:text-2xl">
                      {plan.title}
                    </h2>
                    <p
                      className={`${idx === 0 ? "text-blue-600" : "text-green-600"} text-sm font-medium md:text-base`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                {/* セクション */}
                {plan.sections.map((section, sIdx) => (
                  <div key={sIdx} className="mb-8 last:mb-0 md:mb-10">
                    <div className="mb-4 flex items-center space-x-3 md:mb-6">
                      <div
                        className={`rounded-lg p-1.5 md:p-2 ${idx === 0 ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"}`}
                      >
                        {React.cloneElement(section.icon, {
                          className: "w-5 h-5 md:w-6 md:h-6",
                        })}
                      </div>
                      <h3 className="text-base font-bold text-gray-800 md:text-lg">
                        {section.title}
                      </h3>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {section.points.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className={`border-l-2 pl-4 transition-colors duration-300 hover:border-l-2 md:pl-6 ${
                            idx === 0
                              ? "border-gray-100 hover:border-blue-500"
                              : "border-gray-100 hover:border-green-500"
                          }`}
                        >
                          <div className="mb-1 flex items-center space-x-2 md:mb-2 md:space-x-3">
                            <CheckCircle2
                              className={`h-4 w-4 md:h-5 md:w-5 ${idx === 0 ? "text-blue-500" : "text-green-500"}`}
                            />
                            <h4 className="text-left text-sm font-semibold text-gray-800 md:text-base">
                              {point.title}
                            </h4>
                          </div>
                          <p className="ml-6 text-left text-sm leading-relaxed text-gray-600 md:ml-8 md:text-base">
                            {point.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
