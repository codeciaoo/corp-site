import React from "react";
import { Code, Bot, Cloud, LineChart } from "lucide-react";
import { motion } from "framer-motion";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bulletPoints: { id: string; text: React.ReactNode }[];
};

const services = [
  {
    icon: <Code className="h-7 w-7" />,
    title: "Web/モバイルアプリ開発",
    description:
      "ECサイト、IoTデータ可視化、勤怠管理システム、生成AIを活用した安全管理システムの開発実績と最新技術の実装力",
    bulletPoints: [
      { id: "1", text: <span className="text-sm md:text-base">ECサイト・業務システムの開発</span> },
      { id: "2", text: <span className="text-sm md:text-base">IoTデータ可視化システム構築</span> },
      { id: "3", text: <span className="text-sm md:text-base">生成AI活用システムの実装</span> },
    ],
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: "生成AI開発/導入支援",
    description:
      "OpenAIやGemini等の生成AIを活用したシステム開発から、RAGを用いた社内文書検索まで、最新のAI技術を活用したソリューションを提供",
    bulletPoints: [
      { id: "1", text: <span className="text-sm md:text-base">生成AIを活用したシステム開発</span> },
      { id: "2", text: <span className="text-sm md:text-base">RAGによる社内文書検索システム構築</span> },
      { id: "3", text: <span className="text-sm md:text-base">AIモデルのファインチューニング</span> },
    ],
  },
  {
    icon: <Cloud className="h-7 w-7" />,
    title: "クラウド導入/運用",
    description:
      "AWSなどのクラウド導入設計から運用まで対応し、セキュアで効率的なクラウド環境とリソース/コスト最適化を実現",
    bulletPoints: [
      { id: "1", text: <span className="text-sm md:text-base">クラウド移行・設計支援</span> },
      { id: "2", text: <span className="text-sm md:text-base">セキュリティ対策の実装</span> },
      { id: "3", text: <span className="text-sm md:text-base">運用コストの最適化</span> },
    ],
  },
  {
    icon: <LineChart className="h-7 w-7" />,
    title: "DXコンサル/CTO代行",
    description:
      "業務プロセスの可視化から技術戦略の立案、DevOpsの導入、開発体制の構築まで、企業のデジタル変革を現場目線で伴走支援",
    bulletPoints: [
      { id: "1", text: <span className="text-sm md:text-base">技術戦略の立案支援</span> },
      { id: "2", text: <span className="text-sm md:text-base">DevOps導入・体制構築</span> },
      { id: "3", text: <span className="text-sm md:text-base">DX推進のための組織改革</span> },
    ],
  },
];

const ServiceCard = motion(
  ({ icon, title, description, bulletPoints }: ServiceCardProps) => {
    return (
      <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-600 shadow-md">
              {React.cloneElement(icon as React.ReactElement, {
                className: "h-5 w-5 md:h-7 md:w-7"
              })}
            </div>
            <h3 className="pt-2 text-lg md:text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <div className="mb-4 mt-2 h-px w-full bg-gray-200" />
          <p className="mb-8 text-sm md:text-base text-gray-600">{description}</p>
          <ul className="mb-8 space-y-4">
            {bulletPoints.map(point => (
              <li
                key={point.id}
                className="flex items-start gap-3"
                // initial={{ opacity: 0, x: -20 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.5 }}
              >
                <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                <span className="text-sm text-gray-600">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default function Services() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
            主要サービス
          </h2>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {services.map(service => (
            <div
              key={service.title}
              // initial={{ opacity: 0, y: 50 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5 }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
