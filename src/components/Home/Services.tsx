import { Code, Database, Cloud, LineChart, ChevronRight } from "lucide-react";
import { useState } from "react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bulletPoints: { id: string; text: string }[];
  id: string;
};

const services = [
  {
    id: "software-development",
    icon: <Code className="h-6 w-6 text-teal-600" />,
    title: "Web/モバイルアプリ開発",
    description:
      "ECサイトから IoTデータ可視化、勤怠管理システム、生成AIを活用した安全管理システムまで、幅広い開発実績と最新技術の実装力を持っています",
    bulletPoints: [
      { id: "1", text: "ECサイト・業務システムの開発" },
      { id: "2", text: "IoTデータ可視化システム構築" },
      { id: "3", text: "生成AI活用システムの実装" },
    ],
  },
  {
    id: "legacy-modernization",
    icon: <Database className="h-6 w-6 text-teal-600" />,
    title: "Webサイトの開発/保守",
    description:
      "従来型WordPressから高速なJamstack構成まで、Cloudflareなど最新技術を活用し、運用負荷の軽減と安定稼働を実現",
    bulletPoints: [
      { id: "1", text: "高速なJamstack構成の実装" },
      { id: "2", text: "WordPress構築・カスタマイズ" },
      { id: "3", text: "CDN活用による安定運用" },
    ],
  },
  {
    id: "cloud-solutions",
    icon: <Cloud className="h-6 w-6 text-teal-600" />,
    title: "クラウドインテグレーション",
    description:
      "AWSなどのクラウドサービスの導入設計から運用まで対応し、セキュアで運用効率の高いクラウド環境と、リソース最適化によるムダのない利用料を実現",
    bulletPoints: [
      { id: "1", text: "クラウド移行・設計支援" },
      { id: "2", text: "セキュリティ対策の実装" },
      { id: "3", text: "運用コストの最適化" },
    ],
  },
  {
    id: "it-consulting",
    icon: <LineChart className="h-6 w-6 text-teal-600" />,
    title: "DXコンサルティング/CTO代行",
    description:
      "業務プロセスの可視化から技術戦略の立案、DevOpsの導入、開発体制の構築まで、企業のデジタル変革を現場目線で伴走支援",
    bulletPoints: [
      { id: "1", text: "技術戦略の立案支援" },
      { id: "2", text: "DevOps導入・体制構築" },
      { id: "3", text: "DX推進のための組織改革" },
    ],
  },
];

function ServiceCard({
  icon,
  title,
  description,
  bulletPoints,
  id,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative rounded-lg border border-teal-600/20 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
          {icon}
        </div>

        <div>
          {/* Default Content */}
          <div
            className={`transition-all duration-300 ${isExpanded ? "hidden" : "block"}`}
          >
            <h3 className="mb-1 text-xl font-semibold text-black">{title}</h3>
            <p className="border-t border-gray-200 pt-3 text-sm text-gray-600">
              {description}
            </p>
          </div>

          {/* Expanded Content */}
          <div
            className={`transition-all duration-300 ${isExpanded ? "block" : "hidden"}`}
          >
            <h3 className="mb-3 text-xl font-semibold text-black">{title}</h3>
            <ul className="mb-4 space-y-2">
              {bulletPoints.map(point => (
                <li
                  key={point.id}
                  className="flex items-start gap-2 text-sm text-teal-600"
                >
                  <span className="shrink-0">•</span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
            <a
              href={`/services/${id}`}
              className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700"
            >
              詳しく見る
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-4 top-4 text-teal-600 hover:text-teal-700"
      >
        {isExpanded ? "−" : "+"}
      </button>
    </div>
  );
}

export default function Services() {
  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-teal-600">
        主要サービス
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {services.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}
