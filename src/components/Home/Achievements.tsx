import { Building2, Globe, Factory, Server } from "lucide-react";
import { useState } from "react";

type AchievementCardProps = {
  icon: React.ReactNode;
  title: string;
  industry: string;
  description: string;
};

const achievements = [
  {
    icon: <Building2 className="h-6 w-6 text-teal-600" />,
    title: "基幹システムの刷新",
    industry: "製造業",
    description:
      "老朽化した基幹システムをクラウドへ移行し、運用コストを40%削減。処理速度が3倍に向上し、業務効率が大幅に改善。",
  },
  {
    icon: <Globe className="h-6 w-6 text-teal-600" />,
    title: "営業支援システムの導入",
    industry: "サービス業",
    description:
      "クラウドベースのCRMを導入し、営業活動の可視化を実現。商談成約率が25%向上し、売上げ拡大に貢献。",
  },
  {
    icon: <Factory className="h-6 w-6 text-teal-600" />,
    title: "工場IoT化プロジェクト",
    industry: "製造業",
    description:
      "生産設備のIoT化により、リアルタイムでの稼働監視を実現。生産効率が20%向上し、不良品率を半減。",
  },
  {
    icon: <Server className="h-6 w-6 text-teal-600" />,
    title: "データ基盤の統合",
    industry: "小売業",
    description:
      "バラバラだった社内データベースを統合し、データ分析基盤を構築。意思決定の迅速化と精度向上を実現。",
  },
];

function AchievementCard({
  icon,
  title,
  industry,
  description,
}: AchievementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative rounded-lg border border-teal-600/20 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-600">
              {industry}
            </span>
          </div>
          <h3 className="mb-2 mt-2 text-xl font-semibold text-black">
            {title}
          </h3>
          <p
            className={`text-sm text-gray-600 transition-all duration-300 ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {description.length > 50 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute right-4 top-4 text-teal-600 hover:text-teal-700"
        >
          {isExpanded ? "−" : "+"}
        </button>
      )}
    </div>
  );
}

export default function Achievements() {
  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-teal-600">
        導入実績
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
}
