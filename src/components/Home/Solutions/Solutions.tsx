import {
  Cloud,
  LineChart,
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
    quote: "クラウドって難しそう...",
    title: "クラウド活用",
    problem:
      "クラウドの複雑さや専門知識の不足により、効果的な導入や運用に苦戦しています。コスト管理や適切なリソース配分にも悩んでいます。",
    solutions: [
      {
        id: 1,
        icon: <Server className="h-5 w-5 text-teal-700" />,
        title: "クラウドインフラ構築",
        description:
          "AWS/Azure/GCPなど、最適なクラウドプラットフォームの選定と構築",
      },
      {
        id: 2,
        icon: <Database className="h-5 w-5 text-teal-700" />,
        title: "クラウドマイグレーション",
        description: "既存システムのクラウド移行戦略の策定と実装",
      },
      {
        id: 3,
        icon: <Shield className="h-5 w-5 text-teal-700" />,
        title: "セキュリティ対策",
        description: "クラウド環境のセキュリティ設計と運用管理",
      },
    ],
  },
  {
    id: 2,
    icon: <LineChart className="h-6 w-6 text-teal-700" />,
    quote: "デジタル化の波に乗り遅れそう...",
    title: "業務のDX化",
    problem:
      "従来の業務プロセスが非効率で、デジタル技術の導入に伴う変化への対応に苦慮しています。データの有効活用や従業員のスキル向上も課題です。",
    solutions: [
      {
        id: 1,
        icon: <Bot className="h-5 w-5 text-teal-700" />,
        title: "業務自動化",
        description: "RPAやAIを活用した業務プロセスの自動化",
      },
      {
        id: 2,
        icon: <Code className="h-5 w-5 text-teal-700" />,
        title: "カスタムソフトウェア開発",
        description: "業務に特化したシステムの設計・開発",
      },
      {
        id: 3,
        icon: <Database className="h-5 w-5 text-teal-700" />,
        title: "データ分析基盤構築",
        description: "ビジネスインテリジェンスとデータ分析環境の整備",
      },
    ],
  },
  {
    id: 3,
    icon: <Settings className="h-6 w-6 text-teal-700" />,
    quote: "システム運用が追いつかない...",
    title: "システム運用",
    problem:
      "システムの複雑化に伴い、運用負荷が増大しています。障害対応の遅れやヒューマンエラーによるトラブルも頻発し、コスト増加の一因となっています。",
    solutions: [
      {
        id: 1,
        icon: <Gauge className="h-5 w-5 text-teal-700" />,
        title: "運用監視の自動化",
        description: "システム監視の自動化とアラート体制の構築",
      },
      {
        id: 2,
        icon: <Code className="h-5 w-5 text-teal-700" />,
        title: "DevOps導入支援",
        description: "継続的なデプロイメントと運用の効率化",
      },
      {
        id: 3,
        icon: <Shield className="h-5 w-5 text-teal-700" />,
        title: "インシデント管理",
        description: "障害対応プロセスの確立と実装",
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
                <p className="mb-4 text-sm leading-relaxed text-gray-800 sm:text-base">
                  {challenge.problem}
                </p>
                <h4 className="mb-4 text-lg font-semibold text-teal-900 sm:text-xl">
                  解決策
                </h4>
                <div className="grid gap-4">
                  {challenge.solutions.map(solution => (
                    <div
                      key={solution.id}
                      className="rounded-xl bg-gray-50 p-4 shadow-md transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="mb-3 flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                          {solution.icon}
                        </div>
                        <h5 className="text-base font-semibold text-gray-900">
                          {solution.title}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-800">
                        {solution.description}
                      </p>
                    </div>
                  ))}
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
                  className={`relative rounded-2xl bg-white p-6 shadow-xl ${desktopActiveChallenge === challenge.id ? "ring-2 ring-teal-600 ring-offset-2" : "opacity-70 hover:opacity-100 hover:shadow-lg"}`}
                >
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                    <div className="h-6 w-6 rotate-45 transform bg-white shadow-xl" />
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                    {challenge.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-teal-900">
                    "{challenge.quote}"
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-800">
                    {challenge.problem}
                  </p>
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
                      className="rounded-xl bg-white p-8 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                          {solution.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {solution.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-800">
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
