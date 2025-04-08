import React, { useState, useRef, useEffect } from "react";
import { Code, Bot, Cloud, LineChart } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bulletPoints: { id: string; text: React.ReactNode }[];
  index: number;
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
      { id: "4", text: <span className="text-sm md:text-base">レスポンシブなモバイル対応UI</span> },
      { id: "5", text: <span className="text-sm md:text-base">高パフォーマンスな実装</span> },
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
      { id: "4", text: <span className="text-sm md:text-base">AIワークフロー自動化</span> },
      { id: "5", text: <span className="text-sm md:text-base">ビジネスプロセスへの統合支援</span> },
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
      { id: "4", text: <span className="text-sm md:text-base">自動スケーリング構成</span> },
      { id: "5", text: <span className="text-sm md:text-base">マルチリージョン展開支援</span> },
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
      { id: "4", text: <span className="text-sm md:text-base">プロダクト開発プロセス改善</span> },
      { id: "5", text: <span className="text-sm md:text-base">テックスタックの最適化提案</span> },
    ],
  },
];

const ServiceCard = ({ icon, title, description, bulletPoints, index }: ServiceCardProps) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-teal-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Decorative background element */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-teal-100/40 to-teal-300/20 blur-2xl transition-all duration-500 group-hover:scale-150" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              className: "h-5 w-5 md:h-7 md:w-7"
            })}
          </motion.div>
          <h3 className="pt-2 text-lg md:text-2xl font-bold bg-gradient-to-r from-teal-800 to-teal-600 bg-clip-text text-transparent">{title}</h3>
        </div>
        
        <div className="mb-4 mt-2 h-px w-full bg-gradient-to-r from-teal-200 via-teal-300 to-transparent" />
        
        <p className="mb-6 text-sm md:text-base text-gray-600">{description}</p>
        
        <ul className="mb-6 space-y-3">
          {bulletPoints.map((point, idx) => (
            <motion.li
              key={point.id}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-teal-400 to-teal-500" />
              <span className="text-sm text-gray-600">{point.text}</span>
            </motion.li>
          ))}
        </ul>
        

      </div>
    </motion.div>
  );
};

export default function Services() {
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Calculate display services based on active tab
  const displayServices = activeTab === "all" 
    ? services 
    : services.filter((_, index) => {
        // Show specific services based on tab
        if (activeTab === "web" && index === 0) return true;
        if (activeTab === "ai" && index === 1) return true;
        if (activeTab === "cloud" && index === 2) return true;
        if (activeTab === "dx" && index === 3) return true;
        return false;
      });
  
  return (
    <div className="py-20 md:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 } 
            }
          }}
        >
          <h2 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent sm:text-4xl">
            主要サービス
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            最新技術を活用した包括的なソリューションを提供しています
          </p>
          
          {/* Tabs Interface */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-3xl">
            <TabsList className="grid w-full grid-cols-5 bg-teal-50">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                すべて
              </TabsTrigger>
              <TabsTrigger value="web" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                Web開発
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                AI
              </TabsTrigger>
              <TabsTrigger value="cloud" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                クラウド
              </TabsTrigger>
              <TabsTrigger value="dx" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                DX
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {displayServices.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
        

      </div>
    </div>
  );
}
