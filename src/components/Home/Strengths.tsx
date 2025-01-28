import { Lightbulb, Cpu, TrendingUp } from "lucide-react";

const strengths = [
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "経営課題解決のための戦略立案",
    description:
      "大手コンサルティングファーム出身者が、業務プロセスの可視化・分析、ROI算出など、システム開発を超えた経営戦略の立案と実行支援をサポート",
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

function StrengthCard({
  icon,
  title,
  description,
  illustration,
  isEven,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  illustration: string;
  isEven: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
      <div
        className={`flex h-full flex-col md:flex-row ${
          isEven ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex h-full flex-[2] flex-col justify-center p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600/10">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="leading-relaxed text-gray-600">{description}</p>
        </div>
        <div className="relative flex-1">
          <img
            src={illustration}
            alt=""
            className="h-full w-full object-cover md:h-48"
          />
        </div>
      </div>
    </div>
  );
}

export default function Strengths() {
  return (
    <div className="py-16">
      <a href="http://www.freepik.com" className="hidden">
        Designed by rawpixel.com / Freepik
      </a>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-center text-3xl font-bold text-teal-800 sm:mb-12 sm:text-4xl">
            CodeCiaoの強み
          </h2>
        </div>
        <div className="space-y-4">
          {strengths.map((strength, index) => (
            <StrengthCard key={index} {...strength} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
