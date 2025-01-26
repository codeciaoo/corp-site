import React from 'react';
import { Zap, Lightbulb, Target, CheckCircle2, Rocket, Shield, Coins } from 'lucide-react';

const ServiceComparisonTable = () => {
  const plans = [
    {
      title: "最速確実納品プラン",
      subtitle: "期限内の確実な納品をお約束",
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      bgColor: "bg-white",
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
      bgColor: "bg-white",
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
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ご支援イメージ</h2>
          <p className="text-xl text-gray-600">プロジェクトの特性に合わせて最適なプランをご提案します</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`${plan.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group`}
            >
              {/* 装飾的な背景要素 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent opacity-50 rounded-full -mr-32 -mt-32 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative">
                {/* ヘッダーセクション */}
                <div className="flex items-start space-x-4 mb-10">
                  <div className={`p-3 rounded-xl ${idx === 0 ? 'bg-blue-50' : 'bg-green-50'} transition-transform duration-300 group-hover:scale-110`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h2>
                    <p className={`${idx === 0 ? "text-blue-600" : "text-green-600"} font-medium`}>{plan.subtitle}</p>
                  </div>
                </div>

                {/* セクション */}
                {plan.sections.map((section, sIdx) => (
                  <div key={sIdx} className="mb-10 last:mb-0">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>
                        {section.icon}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">{section.title}</h3>
                    </div>
                    
                    <div className="space-y-6">
                      {section.points.map((point, pIdx) => (
                        <div 
                          key={pIdx} 
                          className={`pl-6 border-l-2 hover:border-l-2 transition-colors duration-300 ${
                            idx === 0 
                              ? 'border-gray-100 hover:border-blue-500' 
                              : 'border-gray-100 hover:border-green-500'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <CheckCircle2 className={`w-5 h-5 ${idx === 0 ? "text-blue-500" : "text-green-500"}`} />
                            <h4 className="font-semibold text-gray-800">{point.title}</h4>
                          </div>
                          <p className="text-gray-600 ml-8 leading-relaxed">{point.description}</p>
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
