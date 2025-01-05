import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronRight } from 'lucide-react'

const caseStudies = [
  {
    industry: "製造業 A社",
    title: "生産管理プロセスのDX化支援",
    description: "業務分析から導入まで一貫支援。結果、生産効率25%向上、在庫コスト30%削減を実現",
    path: "/case1"
  },
  {
    industry: "小売業 B社",
    title: "顧客管理システムの刷新",
    description: "既存システムの課題分析から、クラウド移行含めた新システムの構築。運用コスト40%削減",
  },
]

export default function CaseStudies() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <h3 className="text-3xl font-bold text-center mb-12">
          支援実績
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="mb-3 w-fit px-2 py-1 bg-secondary rounded-md text-sm">
                  {study.industry}
                </div>
                <CardTitle>{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <Button 
                  variant="link" 
                  className="p-0 text-primary hover:text-primary/90"
                  asChild
                >
                  <a href={study.path || "#"}>
                    詳細を見る
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 