import {
  Cloud,
  Settings,
  Server,
  Database,
  Bot,
  Shield,
  Code,
  Gauge,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface Solution {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Challenge {
  id: number;
  icon: React.ReactNode;
  quote: string;
  title: string;
  problem: string;
  solutions: Solution[];
}

const challenges: Challenge[] = [
  {
    id: 1,
    icon: <Cloud className="h-6 w-6 text-teal-700" />,
    quote: "クラウド移行のメリットやコストがわかりません...",
    title: "クラウド移行支援",
    problem:
      "クラウド移行の方法やメリット、コストの見通しが不透明で、具体的にどう進めればよいのか悩んでいます。また、移行後の運用体制にも不安があります。",
    solutions: [
      {
        id: 1,
        icon: <Server className="h-5 w-5 text-teal-700" />,
        title: "クラウド初期構築",
        description: "要件分析からクラウド環境の設計・構築まで一貫してサポート",
      },
      {
        id: 2,
        icon: <Database className="h-5 w-5 text-teal-700" />,
        title: "コスト最適化",
        description: "クラウドリソースの効率的な利用とコスト管理の実現",
      },
      {
        id: 3,
        icon: <Shield className="h-5 w-5 text-teal-700" />,
        title: "インフラ自動化",
        description: "運用効率を高めるインフラ自動化の導入支援",
      },
    ],
  },
  {
    id: 2,
    icon: <Bot className="h-6 w-6 text-teal-700" />,
    quote: "生成AIを活用したシステムを作りたい...",
    title: "生成AI開発支援",
    problem:
      "生成AIやRAGを活用したシステム開発に興味がありますが、技術選定や設計、セキュリティ面での知見が不足しており、効果的な実装方法がわかりません。",
    solutions: [
      {
        id: 1,
        icon: <Bot className="h-5 w-5 text-teal-700" />,
        title: "RAGシステム開発",
        description: "社内文書を活用した検索強化型の生成AIシステムの開発",
      },
      {
        id: 2,
        icon: <Code className="h-5 w-5 text-teal-700" />,
        title: "生成AIシステム開発",
        description: "業務特化型の生成AIアプリケーション開発",
      },
      {
        id: 3,
        icon: <Shield className="h-5 w-5 text-teal-700" />,
        title: "AI活用コンサルティング",
        description: "生成AI活用の戦略立案から実装までの包括的支援",
      },
    ],
  },
  {
    id: 3,
    icon: <Settings className="h-6 w-6 text-teal-700" />,
    quote: "IT人材不足で開発が進まない...",
    title: "リソース不足対策",
    problem:
      "IT人材の確保が困難で、開発案件の遅延や品質低下が発生しています。また、既存チームの負荷が高まり、新規プロジェクトへの着手が困難な状況です。",
    solutions: [
      {
        id: 1,
        icon: <Gauge className="h-5 w-5 text-teal-700" />,
        title: "開発支援サービス",
        description: "経験豊富な開発チームによる技術支援とナレッジ移転",
      },
      {
        id: 2,
        icon: <Code className="h-5 w-5 text-teal-700" />,
        title: "技術支援・コンサルティング",
        description: "アーキテクチャ設計から実装までの技術支援と知見共有",
      },
      {
        id: 3,
        icon: <Database className="h-5 w-5 text-teal-700" />,
        title: "開発プロセス改善",
        description: "開発効率を高めるプロセスとツールの導入支援",
      },
    ],
  },
];

export default function ChallengesSection() {
  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const desktopActiveChallenge = activeChallenge > 0 ? activeChallenge : 1;

  const toggleChallenge = (id: number) => {
    setActiveChallenge(id === activeChallenge ? 0 : id);
  };

  return (
    <div className="mx-auto max-w-7xl py-8 sm:px-6 sm:py-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-teal-800 sm:mb-12 sm:text-4xl">
        <span className="whitespace-nowrap">こんな悩み</span>
        <span className="whitespace-nowrap">ありませんか？</span>
      </h2>

      {/* Mobile layout (default) */}
      <div className="space-y-6 md:hidden">
        {challenges.map(challenge => (
          <div key={challenge.id} className="rounded-2xl bg-white shadow-xl">
            <div
              className="flex cursor-pointer items-center justify-between p-4 sm:p-6"
              onClick={() => toggleChallenge(challenge.id)}
            >
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 sm:h-12 sm:w-12">
                  {challenge.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-teal-900 sm:text-xl">
                    "{challenge.quote}"
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base"></p>
                </div>
              </div>
              {activeChallenge === challenge.id ? (
                <ChevronUp className="h-6 w-6 text-teal-700" />
              ) : (
                <ChevronDown className="h-6 w-6 text-teal-700" />
              )}
            </div>
            {activeChallenge === challenge.id && (
              <div className="border-t border-gray-200 p-4 sm:p-6">
                <div className="flex h-full flex-col">
                  <p className="mb-4 min-h-[4rem] text-sm leading-relaxed text-gray-800 sm:text-base">
                    {challenge.problem}
                  </p>
                  <h4 className="mb-4 text-lg font-semibold text-teal-900 sm:text-xl">
                    解決策
                  </h4>
                  <div className="grid gap-4">
                    {challenge.solutions.map(solution => (
                      <div
                        key={solution.id}
                        className="flex flex-col rounded-xl bg-gray-50 p-4 shadow-md transition-all duration-200 hover:shadow-lg"
                      >
                        <div className="mb-3 flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                            {solution.icon}
                          </div>
                          <h5 className="text-base font-semibold text-gray-900">
                            {solution.title}
                          </h5>
                        </div>
                        <p className="min-h-[3rem] text-sm text-gray-800">
                          {solution.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <div
                key={challenge.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  desktopActiveChallenge === challenge.id
                    ? "scale-105 transform"
                    : ""
                }`}
                onClick={() => setActiveChallenge(challenge.id)}
              >
                <div
                  className={`relative h-full rounded-2xl bg-white p-6 shadow-xl ${
                    desktopActiveChallenge === challenge.id
                      ? "ring-2 ring-teal-600 ring-offset-2"
                      : "opacity-70 hover:opacity-100 hover:shadow-lg"
                  }`}
                >
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                    <div className="h-6 w-6 rotate-45 transform bg-white shadow-xl" />
                  </div>
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                      {challenge.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-teal-900">
                      "{challenge.quote}"
                    </h3>
                    <hr className="mb-4 border-gray-200" />
                    <p className="min-h-[6rem] text-sm leading-relaxed text-gray-800">
                      {challenge.problem}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="rounded-3xl bg-gray-100 p-8">
              <h3 className="mb-6 text-2xl font-bold text-teal-900">
                {challenges[desktopActiveChallenge - 1].title}
                の解決策
              </h3>
              <div className="grid grid-cols-3 gap-8">
                {challenges[desktopActiveChallenge - 1].solutions.map(
                  solution => (
                    <div
                      key={solution.id}
                      className="flex h-full flex-col rounded-xl bg-white p-8 shadow-md transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                          {solution.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {solution.title}
                        </h4>
                      </div>
                      <p className="min-h-[4rem] text-sm text-gray-800">
                        {solution.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
