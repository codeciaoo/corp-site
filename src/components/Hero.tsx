import { Button } from "./ui/button"
import { Users } from "lucide-react"
import { Code, Database, Cloud, LineChart, ArrowRight, Calendar } from 'lucide-react'

export default function Hero() {
  const services = [
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Web/モバイルアプリ開発",
      description: "ECサイトからIoTデータ可視化、勤怠管理システムまで、幅広い開発実績と最新技術の実装力を持っています"
    },
    {
      icon: <Database className="w-12 h-12 text-primary" />,
      title: "Webサイトの開発/保守",
      description: "従来型WordPressから高速なJamstack構成まで、最新技術を活用し、運用負荷の軽減と安定稼働を実現"
    },
    {
      icon: <Cloud className="w-12 h-12 text-primary" />,
      title: "クラウドインテグレーション",
      description: "AWSなどのクラウドサービスの導入設計から運用まで対応し、セキュアで運用効率の高いクラウド環境を実現"
    },
    {
      icon: <LineChart className="w-12 h-12 text-primary" />,
      title: "DXコンサルティング/CTO代行",
      description: "業務プロセスの可視化から技術戦略の立案、DevOpsの導入まで、企業のデジタル変革を支援"
    }
  ]

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background">
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 bg-grid-gray-100/25 bg-[size:20px_20px] opacity-20" />
      
      <div className="container relative flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-8 py-8">
        <div className="lg:w-3/5 text-center lg:text-left">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight bg-clip-text animate-fade-in animation-delay-200 mb-10">
            クラウドネイティブ開発で<br className="hidden md:block" />
            事業成長を<span className="relative">
              <span className="text-teal-600">加速</span>
              <span>する</span>
            </span>
            <div className="text-xl md:text-2xl mt-2 text-muted-foreground">企画から実装/運用まで一気通貫でサポート</div>
          </h2>
          
          <p className="text-lg md:text-lg text-muted-foreground/80 leading-relaxed animate-fade-in animation-delay-400 max-w-4xl mb-16">
            クラウドや生成AIなど最新技術に精通した専門エンジニア集団が<br />
            スケーラブルでセキュアなWebシステム構築に必要なノウハウや<br />
            エンジニア人員が不足しているクライアント様の課題を解決します
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in animation-delay-600">
            <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 text-xl px-6 py-8 rounded-2xl hover:scale-105 shadow-lg hover:shadow-xl">
              <Calendar className="w-6 h-6 mr-2" />
              無料相談を予約する
              <ArrowRight className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="/members">
              <Button className="group bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 text-xl px-10 py-8 rounded-2xl hover:scale-105 shadow-lg hover:shadow-xl">
                <Users className="w-6 h-6 mr-2" />
                メンバー紹介
                <ArrowRight className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
        {/* Updated Services Section with better vertical space handling */}
        <div className="lg:w-2/5 min-h-[400px] relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 z-10 animate-fade-in animation-delay-800 border border-gray-100">
          <div className="services-container relative h-full min-h-[400px]">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-slide absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 text-center animate-fade whitespace-normal`}
                style={{
                  animationDelay: `${index * 3}s`
                }}
              >
                <div className="shrink-0 mb-4 transform transition-transform duration-500 hover:scale-110 bg-primary/5 p-4 rounded-xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 shrink-0 w-full whitespace-normal">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm w-full max-w-sm leading-relaxed whitespace-normal">
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
  )
}