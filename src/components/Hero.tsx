import { Button } from "./ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background">
      <div className="container relative flex flex-col items-center justify-center min-h-[60vh]">
        <div className="absolute top-20 -left-10 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-32 -right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 animate-fade-in animation-delay-200">
            戦略<span className="text-primary px-2">×</span>技術で、<br />
            ビジネスの未来を創造する
          </h2>
          
          <p className="text-xl text-muted-foreground/80 mb-12 leading-relaxed animate-fade-in animation-delay-400">
            コンサルティング知見と確かな技術力で、<br />
            経営課題の本質から解決まで伴走します
          </p>
          
          <div className="flex flex-col items-center gap-8 animate-fade-in animation-delay-600">
            <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 text-lg px-8 py-6 rounded-2xl hover:scale-105">
              無料相談を予約する
              <svg 
                className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}