import { Lightbulb, Cpu, TrendingUp } from "lucide-react";

const strengths = [
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "経営課題解決のための戦略立案",
    description:
      "コンサルティングファーム出身者による、業務プロセス分析から投資対効果の可視化まで",
    illustration: "/analysis_illustration.jpg",
  },
  {
    icon: <Cpu className="h-6 w-6 text-teal-600" />,
    title: "最新技術の活用",
    description:
      "AI・クラウドなど最新技術へのキャッチアップと、実務での適切な技術選定力",
    illustration: "/tech_illustration.jpg",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
    title: "実践的なアプローチ",
    description:
      "システム開発の現場経験を活かした、実現性の高いソリューションの提供",
    illustration: "/application_illustration.jpg",
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
          <p className="text-lg leading-relaxed text-gray-600">{description}</p>
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
          <h2 className="mb-2 text-3xl font-bold">CodeCiaoの強み</h2>
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
