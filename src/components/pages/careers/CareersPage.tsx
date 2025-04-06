"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Users, Code, Briefcase, Heart, Zap, Lightbulb } from "lucide-react";
import CareersForm from "./CareersForm";
import { AuroraBackground } from "@/components/ui/aurora-background";

// TypeScript interfaces
interface Position {
  title: string;
  type: string;
  icon: React.ReactNode;
  color: string;
  shortDescription: string;
  requirements: string[];
  preferred: string[];
}

interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ApplicationStep {
  title: string;
  description: string;
}

interface PositionAccordionProps {
  position: Position;
}

interface AnimatedCounterProps {
  end: number;
  label: string;
}

// Constants for the positions
const POSITIONS: Position[] = [
  {
    title: "フルスタックエンジニア（業務委託）",
    type: "fullstack",
    icon: <Code className="h-10 w-10 text-teal-500" />,
    color: "from-teal-500 to-cyan-400",
    shortDescription: "最新技術を駆使したWeb開発に携わりたいエンジニア向け",
    requirements: [
      "Web開発経験3年以上",
      "TypeScript/React.js での開発経験",
      "AWS/GCPなどのクラウドサービスの利用経験",
    ],
    preferred: [
      "生成AI関連の開発経験",
      "バックエンド開発経験（Node.js/Python）",
      "アジャイル開発経験",
    ],
  },
  {
    title: "エンジニアインターン（AI/Web開発）",
    type: "intern",
    icon: <Lightbulb className="h-10 w-10 text-orange-500" />,
    color: "from-orange-400 to-amber-300",
    shortDescription: "AIとWeb技術を実践的に学びたい学生向け",
    requirements: [
      "「改訂新版」プロになるためのWeb技術入門の内容を大体理解していること",
      "AIコーディングツール（GitHub Copilot、Claudeなど）の使用経験",
      "開発ツール（GitやVSCodeなど）の使用経験",
    ],
    preferred: [
      "Web開発やAI開発の基礎知識",
      "プロジェクト推進経験",
      "週2日以上勤務可能な方",
    ],
  },
];

// Company values
const COMPANY_VALUES: CompanyValue[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "技術探究",
    description: "最新のAI・Web技術への飽くなき探究心",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "課題解決",
    description: "お客様の本質的な課題に向き合う姿勢",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "チーム協働",
    description: "多様なバックグラウンドを持つメンバーとの協働",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "自律性",
    description: "自ら考え行動できる環境づくり",
  },
];

// Application process steps
const APPLICATION_STEPS: ApplicationStep[] = [
  { title: "応募", description: "応募フォームからご応募ください" },
  { title: "面接（技術課題含む）", description: "面接の中で技術課題に取り組んでいただきます" },
  { title: "内定", description: "合格の場合、正式にオファーをご案内します" },
];

// Accordion component for the position details
const PositionAccordion: React.FC<PositionAccordionProps> = ({ position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-500 ${isOpen ? 'shadow-lg' : 'hover:shadow-md'}`}
    >
      <div
        className={`flex cursor-pointer items-center justify-between p-6 ${isOpen ? 'bg-gray-50' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <div className={`flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${position.color}`}>
            {position.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{position.title}</h3>
            <p className="text-sm text-gray-600">{position.shortDescription}</p>
          </div>
        </div>
        <ChevronDown className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <div
        ref={contentRef}
        style={{ maxHeight: contentHeight ? `${contentHeight}px` : '0px' }}
        className="transition-all duration-500 ease-in-out"
      >
        <div className="p-6 pt-0">
          <div className="mb-4 mt-2">
            <h4 className="mb-2 font-medium text-gray-700">必須スキル</h4>
            <ul className="list-inside list-disc text-gray-600">
              {position.requirements.map((req: string, i: number) => (
                <li key={i} className="mb-1">{req}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="mb-2 font-medium text-gray-700">歓迎スキル</h4>
            <ul className="list-inside list-disc text-gray-600">
              {position.preferred.map((pref: string, i: number) => (
                <li key={i} className="mb-1">{pref}</li>
              ))}
            </ul>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600"
            onClick={() => window.location.href = `/careers/${position.type}`}
          >
            詳細を見る
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Animated number counter component for statistics
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
          const step = 16; // for 60fps
          const increment = Math.max(1, Math.floor((end * step) / duration));

          const timer = setInterval(() => {
            start += increment;
            if (start > end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, step);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end]);

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <span className="text-4xl font-bold text-teal-600">{count}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState('culture');

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with AuroraBackground - Reduced Size */}
      <AuroraBackground className="py-10">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              CodeCiao と共に未来を創る
            </h1>
            <p className="mx-auto mb-5 max-w-2xl text-base text-gray-600 dark:text-gray-300">
              最新のAI技術とWeb開発を駆使して、革新的なソリューションを生み出す仲間を募集しています
            </p>
            <Button
              className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-2 text-white hover:from-teal-700 hover:to-teal-600"
              onClick={() => {
                const formElement = document.getElementById('careers-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              応募する <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </AuroraBackground>

      {/* Stats Section - Reduced Padding */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            <AnimatedCounter end={15} label="社員数" />
            <AnimatedCounter end={50} label="プロジェクト実績" />
            <AnimatedCounter end={5} label="平均業界経験年数" />
            <AnimatedCounter end={100} label="顧客満足度 (%)" />
          </div>
        </div>
      </div>

      {/* Tabs for Culture and Positions */}
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex justify-center space-x-4">
          <button
            className={`rounded-full px-6 py-2 text-lg transition-colors ${activeTab === 'culture' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('culture')}
          >
            企業文化
          </button>
          <button
            className={`rounded-full px-6 py-2 text-lg transition-colors ${activeTab === 'positions' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('positions')}
          >
            募集職種
          </button>
        </div>

        {/* Company Culture Tab */}
        <div className={`transition-opacity duration-500 ${activeTab === 'culture' ? 'opacity-100' : 'hidden opacity-0'}`}>
          <div className="mx-auto max-w-6xl">
            <Card className="mb-20 overflow-hidden bg-white shadow-xl">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-blue-50 px-6 py-6">
                <CardTitle className="text-center text-2xl font-bold text-teal-800">
                  CodeCiaoで働く
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-8">
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  CodeCiaoは、最新技術への探究心と、お客様の課題解決への情熱を持つメンバーが集まるテクノロジーカンパニーです。
                  私たちは、生成AI・クラウド・Web技術を駆使して、お客様のビジネスに革新的なソリューションを提供しています。
                  フラットな組織文化の中で、メンバー一人一人が主体的に考え、行動できる環境を大切にしています。
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {COMPANY_VALUES.map((value: CompanyValue, index: number) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center rounded-lg border border-gray-200 p-6 text-center transition-all hover:border-teal-400 hover:shadow-md"
                    >
                      <div className="mb-4 rounded-full bg-teal-100 p-3 text-teal-600 transition-all group-hover:bg-teal-600 group-hover:text-white">
                        {value.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Process Flow */}
            <div className="mb-10 mt-20 w-full max-w-7xl mx-auto pt-10 border-t border-gray-100">
              <h2 className="mb-8 text-center text-2xl font-bold text-teal-800">
                採用フロー
              </h2>
              <div className="flex flex-col md:flex-row justify-between items-stretch gap-10 w-full px-4 relative">
                {/* Desktop Arrows */}
                {APPLICATION_STEPS.slice(0, -1).map((_, index) => (
                  <div key={`arrow-${index}`} className="absolute hidden md:flex items-center justify-center" style={{ left: `calc(${33.33 * (index + 1)}%)`, top: '50%', transform: 'translateY(-50%) translateX(-50%)' }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 hover:bg-teal-600 hover:text-white z-10">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                ))}

                {APPLICATION_STEPS.map((step: ApplicationStep, index: number) => (
                  <div key={index} className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl w-full md:flex-1">
                    <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110">
                      {index + 1}
                    </div>
                    <div className="mb-4 mt-6 flex items-center gap-3">
                      <h3 className="text-xl font-bold text-teal-900">{step.title}</h3>
                    </div>
                    <p className="text-base leading-relaxed text-gray-600">{step.description}</p>
                    {/* Mobile Arrow (only for mobile) */}
                    {index < APPLICATION_STEPS.length - 1 && (
                      <div className="absolute -bottom-10 left-1/2 block -translate-x-1/2 md:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                          <ArrowRight className="h-5 w-5 rotate-90" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Positions Tab */}
        <div className={`transition-opacity duration-500 ${activeTab === 'positions' ? 'opacity-100' : 'hidden opacity-0'}`}>
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-teal-800">
              募集職種
            </h2>
            {POSITIONS.map((position: Position, index: number) => (
              <PositionAccordion key={index} position={position} />
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="careers-form" className="scroll-mt-20">
        <CareersForm />
      </div>
    </div>
  );
};

export default CareersPage;
