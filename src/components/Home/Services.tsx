import { Code, Database, Cloud, LineChart } from "lucide-react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bulletPoints: { id: string; text: string }[];
};

const services = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Web/モバイルアプリ開発",
    description:
      "ECサイト、IoTデータ可視化、勤怠管理システム、生成AIを活用した安全管理システムの開発実績と最新技術の実装力",
    bulletPoints: [
      { id: "1", text: "ECサイト・業務システムの開発" },
      { id: "2", text: "IoTデータ可視化システム構築" },
      { id: "3", text: "生成AI活用システムの実装" },
    ],
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "生成AI開発/導入支援",
    description:
      "OpenAIやGemini等の生成AIを活用したシステム開発から、RAGを用いた社内文書検索まで、最新のAI技術を活用したソリューションを提供",
    bulletPoints: [
      { id: "1", text: "生成AIを活用したシステム開発" },
      { id: "2", text: "RAGによる社内文書検索システム構築" },
      { id: "3", text: "AIモデルのファインチューニング" },
    ],
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "クラウドインテグレーション",
    description:
      "AWSなどのクラウド導入設計から運用まで対応し、セキュアで効率的なクラウド環境とリソース/コスト最適化を実現",
    bulletPoints: [
      { id: "1", text: "クラウド移行・設計支援" },
      { id: "2", text: "セキュリティ対策の実装" },
      { id: "3", text: "運用コストの最適化" },
    ],
  },
  {
    icon: <LineChart className="h-6 w-6" />,
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
}: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-teal-100 hover:shadow-lg">
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="mb-8 text-gray-600">{description}</p>
        <ul className="space-y-4">
          {bulletPoints.map(point => (
            <li key={point.id} className="flex items-start gap-3">
              <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
              <span className="text-sm text-gray-600">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute right-0 top-0 h-[200px] w-[200px] translate-x-[30%] translate-y-[-30%] rounded-full bg-gradient-to-br from-teal-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

export default function Services() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-teal-900">
          主要サービス
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {services.map(service => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
