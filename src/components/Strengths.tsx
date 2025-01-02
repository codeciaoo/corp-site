import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Lightbulb, Cpu, TrendingUp } from 'lucide-react'

const strengths = [
  {
    icon: <Lightbulb className="w-12 h-12 text-primary" />,
    title: "経営課題解決のための戦略立案",
    description: "コンサルティングファーム出身者による、業務プロセス分析から投資対効果の可視化まで。システム投資を確実な事業成長へ転換",
  },
  {
    icon: <Cpu className="w-12 h-12 text-primary" />,
    title: "最新技術の活用",
    description: "AI・クラウドなど最新技術へのキャッチアップと、実務での適切な技術選定力",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-primary" />,
    title: "実践的なアプローチ",
    description: "システム開発の現場経験を活かした、実現性の高いソリューションの提供",
  },
]

export default function Strengths() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <h3 className="text-3xl font-bold text-center mb-12">
          3つの強み
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <Card key={index} className="bg-background hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{strength.icon}</div>
                <CardTitle>{strength.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{strength.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 