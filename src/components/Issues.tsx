import React from "react";
import { ChevronDown } from "lucide-react";

const Issues = () => {
  const issues = [
    {
      title: "開発スピードが遅く、市場投入が間に合わない",
      description:
        "最新の開発手法とツールの導入、効率的な開発体制の構築により、開発期間の短縮とリリースサイクルの高速化を実現します。",
    },
    {
      title: "社内にDX推進のノウハウが不足している",
      description:
        "技術選定から開発プロセスの改善まで、豊富な実績を持つエンジニアが、現場に寄り添いながら段階的な改善を支援します。",
    },
    {
      title: "システムの保守運用負荷が高すぎる",
      description:
        "クラウドネイティブな設計とDevOpsの導入により、運用の自動化と効率化を図り、本質的な開発業務に注力できる環境を構築します。",
    },
  ];

  return (
    <div className="from-primary/5 to-background relative bg-gradient-to-b py-20">
      <div className="bg-grid-gray-100/25 absolute inset-0 bg-[size:20px_20px] opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-2 text-4xl font-bold">
            解決できる課題
          </h2>
          <p className="text-muted-foreground">issues we can solve</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {issues.map((item, index) => (
            <div key={index} className="flex h-full flex-col">
              <div className="mb-4 flex h-[180px] flex-col rounded-2xl border border-gray-100 bg-white/70 p-8 shadow-lg backdrop-blur-sm">
                <div className="text-primary font-serif text-4xl">"</div>
                <h3 className="mb-4 mt-4 flex-1 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <ChevronDown className="text-primary h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 h-[100px] px-4 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Issues;
