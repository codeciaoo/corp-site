import type React from "react";
import { Lightbulb, Cpu, TrendingUp } from "lucide-react";

const strengths = [
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "堅実なプロジェクト管理",
    description:
      "大手コンサルティングファームでの経験や、大規模プロジェクトのマネジメント実績を持つメンバーが、ウォーターフォールやスクラム開発を使い分け、確実なプロジェクト運営を実現",
    illustration: "/img-strengths-1.webp",
  },
  {
    icon: <Cpu className="h-6 w-6 text-teal-600" />,
    title: "最新技術の活用",
    description:
      "AWSやGCPを活用したクラウドインフラの構築や、生成AIやRAGを活用したシステムなど、最新技術を駆使した豊富な実績",
    illustration: "/img-strengths-2.webp",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
    title: "実践的なアプローチ",
    description:
      "マイクロサービス設計、CI/CD構築、IaCによるインフラ構築、負荷試験やセキュリティ診断など、エンタープライズレベルの包括的なソリューション提供",
    illustration: "/img-strengths-3.webp",
  },
];

interface StrengthCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  illustration: string;
  isEven: boolean;
}

function StrengthCard({
  icon,
  title,
  description,
  illustration,
  isEven,
}: StrengthCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div
        className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600/10">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {title}
              </h3>
            </div>
            <div className="mt-2 h-px w-full bg-gray-200" />
          </div>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base md:mb-6">
            {description}
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-2/5">
          <img
            src={illustration || "/placeholder.svg"}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}

export default function Strengths() {
  return (
    <div className="py-12 md:py-16">
      <a href="http://www.freepik.com" className="hidden">
        Designed by rawpixel.com / Freepik
      </a>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-2xl font-bold text-teal-800 sm:text-3xl md:text-4xl">
            CodeCiaoの強み
          </h2>
        </div>
        <div className="space-y-6 md:space-y-8">
          {strengths.map((strength, index) => (
            <StrengthCard key={index} {...strength} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
