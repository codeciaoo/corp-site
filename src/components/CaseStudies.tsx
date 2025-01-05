import React from 'react';
import { ArrowRight } from 'lucide-react';

const CaseStudies = () => {
  const cases = [
    {
      company: "製造業 A社",
      title: "生産管理プロセスのDX化支援",
      description: "業務分析から導入まで一貫支援。結果、生産効率25%向上、在庫コスト30%削減を実現",
      path: "/case1"
    },
    {
      company: "小売業 B社",
      title: "顧客管理システムの刷新",
      description: "既存システムの課題分析から、クラウド移行含め新システムの構築。運用コスト40%削減",
    },
    {
      company: "サービス業 C社",
      title: "予約システムのモダナイゼーション",
      description: "レガシーシステムをクラウドネイティブアーキテクチャへ移行。運用効率が60%改善",
    },
    {
      company: "IT企業 D社",
      title: "社内業務システムの統合",
      description: "複数のシステムを統合し、業務効率化を実現。工数削減率35%を達成",
    },
    {
      company: "物流業 E社",
      title: "配送管理システムの開発",
      description: "リアルタイム配送追跡システムを構築。顧客満足度が45%向上",
    },
    {
      company: "金融業 F社",
      title: "セキュリティ基盤の強化",
      description: "最新のセキュリティ対策を実装。インシデント発生率を90%削減",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12">支援実績</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{item.company}</h3>
            <h4 className="text-xl font-bold mb-4">{item.title}</h4>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <a 
              href={item.path || "#"} 
              className="text-blue-600 hover:text-blue-800 flex items-center group"
            >
              詳細を見る
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies; 