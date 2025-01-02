import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Cloud, LineChart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'

const services = [
  {
    icon: <Code className="w-12 h-12 text-primary" />,
    title: "Web/モバイルアプリ開発",
    description: "顧客体験を重視した、使いやすく拡張性の高いアプリケーションの設計・開発",
  },
  {
    icon: <Database className="w-12 h-12 text-primary" />,
    title: "レガシーシステムの刷新",
    description: "レガシーシステムの分析から、クラウド移行を含めた最適なシステム設計・開発まで",
  },
  {
    icon: <Cloud className="w-12 h-12 text-primary" />,
    title: "クラウドソリューション",
    description: "AWS, Azure, GCPを使ったクラウドの構築",
  },
  {
    icon: <LineChart className="w-12 h-12 text-primary" />,
    title: "DXコンサルティング",
    description: "業務プロセスの可視化・分析から、デジタル技術を活用した業務改革の実現まで",
  },
]

export default function Services() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h3 className="text-3xl font-bold text-center mb-12">
          主要サービス
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="link" className="ml-auto text-primary hover:text-primary/90">
                  詳しく見る
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

