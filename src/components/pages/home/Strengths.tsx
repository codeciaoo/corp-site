import React, { useEffect, useRef } from "react";
import { Lightbulb, Cpu, TrendingUp } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Added statistic data for each strength
const strengths = [
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "堅実なプロジェクト管理",
    description:
      "大手コンサルティングファームでの経験や、大規模プロジェクトのマネジメント実績を持つメンバーが、ウォーターフォールやスクラム開発を使い分け、確実なプロジェクト運営を実現",
    illustration: "/img-strengths-1.webp",
    stats: [
      { label: "成功プロジェクト", value: 50, unit: "+" },
      { label: "納期遵守率", value: 98, unit: "%" }
    ],
  },
  {
    icon: <Cpu className="h-6 w-6 text-teal-600" />,
    title: "最新技術の活用",
    description:
      "AWSやGCPを活用したクラウドインフラの構築や、生成AIやRAGを活用したシステムなど、最新技術を駆使した豊富な実績",
    illustration: "/img-strengths-2.webp",
    stats: [
      { label: "テクノロジー導入", value: 25, unit: "+" },
      { label: "効率化率", value: 40, unit: "%" }
    ],
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
    title: "実践的なアプローチ",
    description:
      "マイクロサービス設計、CI/CD構築、IaCによるインフラ構築、負荷試験やセキュリティ診断など、エンタープライズレベルの包括的なソリューション提供",
    illustration: "/img-strengths-3.webp",
    stats: [
      { label: "開発期間短縮", value: 35, unit: "%" },
      { label: "運用コスト削減", value: 45, unit: "%" }
    ],
  },
];

interface StatItem {
  label: string;
  value: number;
  unit: string;
}

interface StrengthCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  illustration: string;
  isEven: boolean;
  stats: StatItem[];
}

// CountUp component for animating numbers
const CountUp = ({ end, duration = 2, unit = "" }: { end: number; duration?: number; unit?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = React.useState(0);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);
  
  return (
    <span ref={nodeRef} className="font-bold text-teal-600">
      {count}{unit}
    </span>
  );
};

function StrengthCard({
  icon,
  title,
  description,
  illustration,
  isEven,
  stats,
}: StrengthCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="group"
    >
      <Card className="overflow-hidden bg-white border-none relative transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">
        <div
          className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <CardContent className="flex flex-1 flex-col justify-center p-6 md:p-8">
            <div className="mb-4 md:mb-6">
              <motion.div 
                className="flex flex-row items-center gap-3"
                whileHover={{ x: isEven ? -5 : 5 }}
              >
                <motion.div 
                  className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {React.cloneElement(icon as React.ReactElement, {
                    className: "h-5 w-5 md:h-6 md:w-6 text-white"
                  })}
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 lg:text-2xl">
                  {title}
                </h3>
              </motion.div>
              <div className="mt-2 h-px w-full bg-gradient-to-r from-teal-200 to-transparent" />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
              {description}
            </p>
            
            {/* Stats display with count-up animation */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-teal-100 transition-all hover:shadow-md">
                  <div className="text-xl md:text-2xl font-bold">
                    <CountUp end={stat.value} unit={stat.unit} />
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>

          <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-2/5">
            <motion.img
              src={illustration || "/placeholder.svg"}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Strengths() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <div className="py-20 md:py-24" ref={sectionRef}>
      <a href="http://www.freepik.com" className="hidden">
        Designed by rawpixel.com / Freepik
      </a>
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: -20 }}
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
            CodeCiaoの強み
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            エンタープライズレベルの品質と先進的な技術で、お客様のビジネス課題を解決します
          </p>
        </motion.div>
        
        <div className="space-y-8 md:space-y-12">
          {strengths.map((strength, index) => (
            <StrengthCard 
              key={index} 
              {...strength} 
              isEven={index % 2 === 0} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
