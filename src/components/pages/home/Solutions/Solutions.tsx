import React, { useState } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../../../ui/scroll-reveal";
import { AnimatedIcon } from "../../../ui/animated-icon";
import { SolutionCard } from "../../../ui/solution-card";

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
        description: "即戦力エンジニアが最短2週間で参画可能。開発チームの増強を実現し、プロジェクトの遅延リスクを解消",
      },
      {
        id: 2,
        icon: <Code className="h-5 w-5 text-teal-700" />,
        title: "コンサルティング",
        description: "現場の課題に応じた技術支援を提供。アーキテクチャ設計から実装まで、既存チームの成長をサポート",
      },
      {
        id: 3,
        icon: <Database className="h-5 w-5 text-teal-700" />,
        title: "開発プロセス改善",
        description: "CI/CD導入やテスト自動化により、開発効率を最大50%改善。チームの負荷を大幅に軽減",
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
        description: "社内文書やナレッジを活用したAIチャットボットを1ヶ月で構築。問い合わせ対応時間を大幅に削減",
      },
      {
        id: 2,
        icon: <Code className="h-5 w-5 text-teal-700" />,
        title: "生成AIシステム開発",
        description: "OpenAI・Gemini・Anthropicなど最新のAI技術を活用し。セキュリティを確保しながら業務効率を改善",
      },
      {
        id: 3,
        icon: <Shield className="h-5 w-5 text-teal-700" />,
        title: "AI活用コンサルティング",
        description: "貴社の業務分析から具体的なAI活用プランを提案。ROIを重視した実装ロードマップを策定",
      },
    ],
  },
  {
    id: 3,
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
        description: "AWS・Azureなど、最適なクラウドを選定。システム規模に応じた段階的な移行で、ダウンタイムを最小限に抑える",
      },
      {
        id: 2,
        icon: <Database className="h-5 w-5 text-teal-700" />,
        title: "コスト最適化",
        description: "オートスケーリングやリザーブドインスタンスの活用、サーバーレスアーキテクチャやリソース構成の最適化で、平均30%のコスト削減を実現",
      },
      {
        id: 3,
        icon: <Shield className="h-5 w-5 text-teal-700" />,
        title: "インフラ自動化",
        description: "CDK・Terraform・Ansibleでインフラをコード化。運用の効率化と障害対応の迅速化を実現",
      },
    ],
  },
];

export default function ChallengesSection() {
  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const desktopActiveChallenge = activeChallenge > 0 ? activeChallenge : 1;
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const toggleChallenge = (id: number) => {
    setActiveChallenge(id === activeChallenge ? 0 : id);
  };

  return (
    <div className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl sm:px-6">
        <ScrollReveal animation="fade" delay={0.2}>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent sm:text-4xl">
              <span className="whitespace-nowrap">こんな悩み</span>
              <span className="whitespace-nowrap">ありませんか？</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile layout (default) */}
        <ScrollReveal animation="slide-up" delay={0.4} className="space-y-6 md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {challenges.map(challenge => (
              <motion.div 
                key={challenge.id} 
                variants={itemVariants}
                className="rounded-2xl bg-white shadow-xl overflow-hidden"
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div
                  className="flex cursor-pointer items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-teal-100/40"
                  onClick={() => toggleChallenge(challenge.id)}
                >
                  <div className="flex items-center space-x-3">
                    <AnimatedIcon 
                      icon={challenge.icon} 
                      size="sm" 
                      hover={true}
                      className="sm:h-12 sm:w-12"
                    />
                    <div>
                      <h3 className="text-[15px] font-bold text-teal-900 sm:text-xl">
                        {challenge.quote}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeChallenge === challenge.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-teal-600" />
                  </motion.div>
                </div>
                
                {/* Challenge details when expanded */}
                {activeChallenge === challenge.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: { duration: 0.3 } 
                    }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="mb-4">
                        <h4 className="mb-2 text-lg font-bold text-gray-900">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-gray-700">
                          {challenge.problem}
                        </p>
                      </div>
                      
                      <h5 className="mb-3 text-sm font-semibold text-teal-700 uppercase">
                        解決策
                      </h5>
                      <motion.div 
                        className="grid gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {challenge.solutions.map((solution) => (
                          <motion.div
                            key={`${challenge.id}-${solution.id}`}
                            variants={itemVariants}
                            className="rounded-xl bg-gradient-to-br from-teal-50 to-white p-4 shadow-md"
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                                {solution.icon}
                              </div>
                              <h5 className="text-base font-semibold text-gray-900">
                                {solution.title}
                              </h5>
                            </div>
                            <p className="min-h-[5rem] text-sm text-gray-800">
                              {solution.description}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <ScrollReveal animation="fade" className="relative">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-6"
            >
              {challenges.map(challenge => (
                <motion.div
                  key={challenge.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  className="relative cursor-pointer"
                  onClick={() => setActiveChallenge(challenge.id)}
                >
                  <div
                    className={`relative h-full rounded-2xl bg-gradient-to-b from-white to-teal-50/30 p-6 shadow-xl transition-all duration-300 ${
                      desktopActiveChallenge === challenge.id
                        ? "border-2 border-teal-500 ring-2 ring-teal-300"
                        : "border border-gray-100"
                    }`}
                  >
                    <AnimatedIcon 
                      icon={challenge.icon} 
                      pulse={desktopActiveChallenge === challenge.id}
                      hover={true}
                      className="mb-4"
                    />
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      {challenge.quote}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {challenge.problem}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <ScrollReveal animation="fade" delay={0.4}>
              <motion.div
                className="mt-16 rounded-2xl bg-gradient-to-br from-white to-teal-50/30 p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h3 
                  className="mb-6 flex flex-wrap items-center text-xl font-bold text-teal-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <AnimatedIcon 
                    icon={challenges[desktopActiveChallenge - 1].icon} 
                    size="md"
                    hover={true}
                    pulse={true}
                    className="mr-3"
                  />
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {challenges[desktopActiveChallenge - 1].title}
                  </motion.span>
                </motion.h3>
                <motion.div 
                  className="grid grid-cols-3 gap-8 items-stretch"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {challenges[desktopActiveChallenge - 1].solutions.map(
                    (solution, index) => (
                      <motion.div
                        key={`${desktopActiveChallenge}-${solution.id}`}
                        variants={itemVariants}
                        custom={index}
                        layout
                        className="h-full"
                      >
                        <SolutionCard
                          icon={solution.icon}
                          title={solution.title}
                          description={solution.description}
                          className="bg-gradient-to-br from-white to-teal-50/20 h-full"
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
