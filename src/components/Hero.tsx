import { Button } from "./ui/button";
import { Users } from "lucide-react";
import {
  Code,
  Database,
  Cloud,
  LineChart,
  ArrowRight,
  Calendar,
} from "lucide-react";

export default function Hero() {
  const services = [
    {
      icon: <Code className="text-primary h-12 w-12" />,
      title: "Web/モバイルアプリ開発",
      description:
        "ECサイトからIoTデータ可視化、勤怠管理システムまで、幅広い開発実績と最新技術の実装力を持っています",
    },
    {
      icon: <Database className="text-primary h-12 w-12" />,
      title: "Webサイトの開発/保守",
      description:
        "従来型WordPressから高速なJamstack構成まで、最新技術を活用し、運用負荷の軽減と安定稼働を実現",
    },
    {
      icon: <Cloud className="text-primary h-12 w-12" />,
      title: "クラウドインテグレーション",
      description:
        "AWSなどのクラウドサービスの導入設計から運用まで対応し、セキュアで運用効率の高いクラウド環境を実現",
    },
    {
      icon: <LineChart className="text-primary h-12 w-12" />,
      title: "DXコンサルティング/CTO代行",
      description:
        "業務プロセスの可視化から技術戦略の立案、DevOpsの導入まで、企業のデジタル変革を支援",
    },
  ];

  return (
    <section className="from-primary/5 to-background relative bg-gradient-to-b">
      {/* Background pattern for visual interest */}
      <div className="bg-grid-gray-100/25 absolute inset-0 bg-[size:20px_20px] opacity-20" />

      <div className="container relative flex min-h-[80vh] flex-col items-center justify-between gap-8 py-8 lg:flex-row">
        <div className="text-center lg:w-3/5 lg:text-left">
          <h2 className="text-foreground animate-fade-in animation-delay-200 mb-10 bg-clip-text text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            クラウドネイティブ開発で
            <br className="hidden md:block" />
            事業成長を
            <span className="relative">
              <span className="text-teal-600">加速</span>
              <span>する</span>
            </span>
            <div className="text-muted-foreground mt-2 text-xl md:text-2xl">
              企画から実装/運用まで一気通貫でサポート
            </div>
          </h2>

          <p className="text-muted-foreground/80 animate-fade-in animation-delay-400 mb-16 max-w-4xl text-lg leading-relaxed md:text-lg">
            クラウドや生成AIなど最新技術に精通した専門エンジニア集団が
            <br />
            スケーラブルでセキュアなWebシステム構築に必要なノウハウや
            <br />
            エンジニア人員が不足しているクライアント様の課題を解決します
          </p>

          <div className="animate-fade-in animation-delay-600 flex flex-col justify-center gap-6 sm:flex-row lg:justify-start">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group rounded-2xl px-6 py-8 text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Calendar className="mr-2 h-6 w-6" />
              無料相談を予約する
              <ArrowRight className="ml-2 h-6 w-6 transform transition-transform group-hover:translate-x-1" />
            </Button>
            <a href="/members">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground group rounded-2xl px-10 py-8 text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Users className="mr-2 h-6 w-6" />
                メンバー紹介
                <ArrowRight className="ml-2 h-6 w-6 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
        {/* Updated Services Section with better vertical space handling */}
        <div className="animate-fade-in animation-delay-800 relative z-10 min-h-[400px] rounded-2xl border border-gray-100 bg-white/70 p-6 shadow-lg backdrop-blur-sm lg:w-2/5">
          <div className="services-container relative h-full min-h-[400px]">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-slide animate-fade absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center whitespace-normal p-6 text-center`}
                style={{
                  animationDelay: `${index * 3}s`,
                }}
              >
                <div className="bg-primary/5 mb-4 shrink-0 transform rounded-xl p-4 transition-transform duration-500 hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="mb-3 w-full shrink-0 whitespace-normal text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="w-full max-w-sm whitespace-normal text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade {
          0%, 20% {
            opacity: 0;
            transform: translateY(10px);
            visibility: hidden;
          }
          25%, 45% {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
          }
          50%, 100% {
            opacity: 0;
            transform: translateY(-10px);
            visibility: hidden;
          }
        }

        .services-container {
          perspective: 1000px;
        }

        .service-slide {
          opacity: 0;
          visibility: hidden;
          animation: fade 12s infinite;
          transition: all 0.3s ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .service-slide {
            animation: none;
            opacity: 1;
            visibility: visible;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
