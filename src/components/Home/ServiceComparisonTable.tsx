import React from "react";
import { Zap, Lightbulb, ArrowRight } from "lucide-react";

const ServiceComparisonTable = () => {
  const features = [
    {
      category: "特徴",
      project:
        "スピーディーな要件定義から確実な納品まで、プロジェクトの成功にフルコミット",
      innovation: "お客様専任のチームが技術パートナーとして事業成長をサポート",
    },
    {
      category: "契約形態",
      project: "成果物単位の一括請負契約\n※要件確定後の追加・変更は別途見積",
      innovation: "3ヶ月〜の期間契約\n※契約期間中の追加・変更は柔軟に対応可能",
    },
    {
      category: "適したプロジェクト",
      project:
        "・要件が明確で期限が決まっている\n・予算と機能のバランスが重要\n・品質と納期の確実性を重視",
      innovation:
        "・要件が流動的で継続的な改善が必要\n・新規事業/サービスの立ち上げ\n・既存サービスの成長",
    },
    {
      category: "チーム体制",
      project: "・プロジェクトマネージャー\n・開発チーム\n・品質管理チーム",
      innovation:
        "・お客様専任の開発チーム\n・テックリード\n・スクラムマスター",
    },
    {
      category: "メリット",
      project: "・明確な予算と納期\n・確実な品質保証\n・責任範囲が明確",
      innovation:
        "・柔軟な要件変更に対応可能\n・技術ナレッジの蓄積\n・継続的な改善と価値提供",
    },
    {
      category: "開発プロセス",
      project:
        "・要件定義→設計→開発→テスト→納品\n・マイルストーン単位での進捗管理",
      innovation:
        "・アジャイル開発\n・2週間単位のスプリント\n・継続的なフィードバック",
    },
  ];

  const recommendedCases = {
    project: [
      "基幹システムのリプレイス",
      "大規模なシステム統合",
      "パッケージシステムの導入・カスタマイズ",
      "レガシーシステムの刷新",
    ],
    innovation: [
      "自社サービスの開発・運用",
      "新規デジタルサービスの立ち上げ",
      "既存サービスの継続的改善",
      "事業のDX推進",
    ],
  };

  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-teal-600">
        契約プラン
      </h2>

      <div className="overflow-x-auto rounded-lg border border-teal-600/20 bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-50/50">
              <th className="w-1/5 border-b border-teal-600/20 p-4"></th>
              <th className="border-b border-teal-600/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
                    <Zap className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-teal-900">
                      確実爆速納品プラン
                    </div>
                    <div className="mt-1 text-sm text-teal-600">
                      期限内の確実な納品をお約束
                    </div>
                  </div>
                </div>
              </th>
              <th className="border-b border-teal-600/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
                    <Lightbulb className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-teal-900">
                      デジタル共創ラボ
                    </div>
                    <div className="mt-1 text-sm text-teal-600">
                      事業成長のための技術パートナー
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
              >
                <td className="border-b border-gray-200 p-4 font-semibold text-teal-900">
                  {feature.category}
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-600">
                  <div className="whitespace-pre-line">{feature.project}</div>
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-600">
                  <div className="whitespace-pre-line">
                    {feature.innovation}
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className="border-b border-gray-200 p-4 font-semibold text-teal-900">
                導入実績
              </td>
              <td className="border-b border-gray-200 p-4">
                <ul className="space-y-2">
                  {recommendedCases.project.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-gray-200 p-4">
                <ul className="space-y-2">
                  {recommendedCases.innovation.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-teal-500" />
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
