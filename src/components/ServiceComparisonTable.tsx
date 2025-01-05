import React from 'react';
import { Zap, Lightbulb, ArrowRight } from 'lucide-react';

const ServiceComparisonTable = () => {
  const features = [
    {
      category: "特徴",
      project: "スピーディーな要件定義から確実な納品まで、プロジェクトの成功にフルコミット",
      innovation: "お客様専任のチームが技術パートナーとして事業成長をサポート"
    },
    {
      category: "契約形態",
      project: "成果物単位の一括請負契約\n※要件確定後の追加・変更は別途見積",
      innovation: "3ヶ月〜の期間契約\n※契約期間中の追加・変更は柔軟に対応可能"
    },
    {
      category: "適したプロジェクト",
      project: "・要件が明確で期限が決まっている\n・予算と機能のバランスが重要\n・品質と納期の確実性を重視",
      innovation: "・要件が流動的で継続的な改善が必要\n・新規事業/サービスの立ち上げ\n・既存サービスの成長"
    },
    {
      category: "チーム体制",
      project: "・プロジェクトマネージャー\n・開発チーム\n・品質管理チーム",
      innovation: "・お客様専任の開発チーム\n・テックリード\n・スクラムマスター"
    },
    {
      category: "メリット",
      project: "・明確な予算と納期\n・確実な品質保証\n・責任範囲が明確",
      innovation: "・柔軟な要件変更に対応可能\n・技術ナレッジの蓄積\n・継続的な改善と価値提供"
    },
    {
      category: "開発プロセス",
      project: "・要件定義→設計→開発→テスト→納品\n・マイルストーン単位での進捗管理",
      innovation: "・アジャイル開発\n・2週間単位のスプリント\n・継続的なフィードバック"
    }
  ];

  const recommendedCases = {
    project: [
      "基幹システムのリプレイス",
      "大規模なシステム統合",
      "パッケージシステムの導入・カスタマイズ",
      "レガシーシステムの刷新"
    ],
    innovation: [
      "自社サービスの開発・運用",
      "新規デジタルサービスの立ち上げ",
      "既存サービスの継続的改善",
      "事業のDX推進"
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">契約開始の流れ</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-gray-200"></th>
              <th className="p-4 border-b-2 border-blue-200 bg-blue-50">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-xl font-bold text-blue-800">確実爆速納品プラン</div>
                    <div className="text-sm text-blue-600 mt-1">期限内の確実な納品をお約束</div>
                  </div>
                </div>
              </th>
              <th className="p-4 border-b-2 border-green-200 bg-green-50">
                <div className="flex items-center justify-center space-x-2">
                  <Lightbulb className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-xl font-bold text-green-800">デジタル共創ラボ</div>
                    <div className="text-sm text-green-600 mt-1">事業成長のための技術パートナー</div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 border-b border-gray-200 font-semibold w-1/5">
                  {feature.category}
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className="whitespace-pre-line">
                    {feature.project}
                  </div>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className="whitespace-pre-line">
                    {feature.innovation}
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-4 border-b border-gray-200 font-semibold">
                導入実績
              </td>
              <td className="p-4 border-b border-gray-200">
                <ul className="space-y-2">
                  {recommendedCases.project.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-4 border-b border-gray-200">
                <ul className="space-y-2">
                  {recommendedCases.innovation.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
