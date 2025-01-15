import { Lightbulb, Cpu, TrendingUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type BulletPoint = {
  id: string;
  text: string;
};

type StrengthCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const strengths = [
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "経営課題解決のための戦略立案",
    description:
      "コンサルティングファーム出身者による、業務プロセス分析から投資対効果の可視化まで",
  },
  {
    icon: <Cpu className="h-6 w-6 text-teal-600" />,
    title: "最新技術の活用",
    description:
      "AI・クラウドなど最新技術へのキャッチアップと、実務での適切な技術選定力",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
    title: "実践的なアプローチ",
    description:
      "システム開発の現場経験を活かした、実現性の高いソリューションの提供",
  },
];

function StrengthCard({ icon, title, description }: StrengthCardProps) {
  return (
    <div className="group relative rounded-lg border border-teal-600/20 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
          {icon}
        </div>

        <div>
          {/* Default Content */}
          <div className={`transition-all duration-300`}>
            <h3 className="mb-1 text-xl font-semibold text-black">{title}</h3>
            <p className="border-t border-gray-200 pt-3 text-sm text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Strengths() {
  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-teal-600">
        3つの強み
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {strengths.map((strength, index) => (
          <StrengthCard key={index} {...strength} />
        ))}
      </div>
    </div>
  );
}
