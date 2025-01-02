import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="pt-24 pb-16 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            戦略<span className="text-primary">×</span>技術で、<br />
            ビジネスの未来を創造する
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            コンサルティング知見と確かな技術力で、<br />
            経営課題の本質から解決まで伴走します
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200 text-lg px-8 py-6">
            無料相談を予約する
          </Button>
        </div>
      </div>
    </div>
  )
}

