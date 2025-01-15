import {
  LightbulbIcon,
  Code2Icon,
  CloudIcon,
  LineChartIcon,
  GaugeIcon,
  BrainCircuitIcon,
} from "lucide-react";
import { useState } from "react";

type ServiceDetailProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: {
    id: string;
    title: string;
    description: string;
  }[];
};

const services = [
  {
    icon: <LightbulbIcon className="h-6 w-6 text-teal-600" />,
    title: "コンサルティングサービス",
    description:
      "ビジネス戦略の策定から実行まで、包括的なサポートを提供します。",
    features: [
      {
        id: "1",
        title: "戦略立案",
        description: "データ分析に基づく実効性の高い戦略策定を支援します。",
      },
      {
        id: "2",
        title: "業務改善",
        description:
          "業務プロセスの可視化と効率化によるコスト削減を実現します。",
      },
      {
        id: "3",
        title: "デジタルトランスフォーメーション",
        description: "最新技術を活用した業務改革で競争力の向上を支援します。",
      },
    ],
  },
  {
    icon: <Code2Icon className="h-6 w-6 text-teal-600" />,
    title: "システム開発",
    description: "最新技術を活用した、カスタムソリューションの開発を行います。",
    features: [
      {
        id: "1",
        title: "Webアプリケーション開発",
        description:
          "使いやすさと拡張性を重視した、最新のWeb技術による開発を提供します。",
      },
      {
        id: "2",
        title: "モバイルアプリ開発",
        description:
          "iOS/Androidに対応したクロスプラットフォーム開発で、効率的な開発を実現します。",
      },
      {
        id: "3",
        title: "クラウドソリューション",
        description:
          "AWSやAzureを活用した、スケーラブルなシステム基盤を構築します。",
      },
    ],
  },
  {
    icon: <BrainCircuitIcon className="h-6 w-6 text-teal-600" />,
    title: "AI・データ分析",
    description: "機械学習とデータ分析で、ビジネスの意思決定を支援します。",
    features: [
      {
        id: "1",
        title: "予測分析",
        description: "機械学習による需要予測や異常検知システムを構築します。",
      },
      {
        id: "2",
        title: "画像認識",
        description:
          "ディープラーニングを活用した画像認識システムを開発します。",
      },
      {
        id: "3",
        title: "自然言語処理",
        description: "チャットボットや文書分析システムの開発を行います。",
      },
    ],
  },
];

function ServiceDetail({
  icon,
  title,
  description,
  features,
}: ServiceDetailProps) {
  return (
    <div className="group relative rounded-lg border border-teal-600/20 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
          {icon}
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold text-teal-900">{title}</h2>
          <p className="mb-4 text-gray-600">{description}</p>

          <div className={`space-y-4 transition-all duration-300`}>
            {features.map(feature => (
              <div key={feature.id} className="rounded-lg bg-teal-50/50 p-4">
                <h3 className="mb-2 font-semibold text-teal-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-teal-900">
        サービス
      </h1>
      <div className="grid gap-6">
        {services.map((service, index) => (
          <ServiceDetail key={index} {...service} />
        ))}
      </div>
    </div>
  );
}
