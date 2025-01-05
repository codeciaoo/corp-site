import React from 'react';
import { ChevronDown } from 'lucide-react';

const Issues = () => {
  const issues = [
    {
      title: "開発スピードが遅く、市場投入が間に合わない",
      description: "最新の開発手法とツールの導入、効率的な開発体制の構築により、開発期間の短縮とリリースサイクルの高速化を実現します。"
    },
    {
      title: "社内にDX推進のノウハウが不足している",
      description: "技術選定から開発プロセスの改善まで、豊富な実績を持つエンジニアが、現場に寄り添いながら段階的な改善を支援します。"
    },
    {
      title: "システムの保守運用負荷が高すぎる",
      description: "クラウドネイティブな設計とDevOpsの導入により、運用の自動化と効率化を図り、本質的な開発業務に注力できる環境を構築します。"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-primary/5 to-background relative py-20">
      <div className="absolute inset-0 bg-grid-gray-100/25 bg-[size:20px_20px] opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2 text-foreground">解決できる課題</h2>
          <p className="text-muted-foreground">issues we can solve</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((item, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-4 shadow-lg border border-gray-100 h-[180px] flex flex-col">
                <div className="text-4xl text-primary font-serif">"</div>
                <h3 className="text-xl font-bold mb-4 mt-4 text-gray-900 flex-1">
                  {item.title}
                </h3>
              </div>
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <ChevronDown className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-center px-4 h-[100px]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Issues;
