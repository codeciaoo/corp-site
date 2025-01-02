import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const valuePropositions = [
  {
    title: "戦略からシステムまでのワンストップソリューション",
    description: "コンサルティングとシステム開発の両方の経験を持つからこそ、企画段階から実装まで一貫してサポート。単なるシステム開発ではなく、事業成長に直結する提案を実現します。",
  },
  {
    title: "優秀なエンジニアによる確かな実装力",
    description: "経験豊富なエンジニアチームによる、高品質なシステム開発。最新技術を適材適所で活用し、スケーラブルなソリューションを提供します。",
  },
]

export default function ValuePropositions() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h3 className="text-3xl font-bold text-center mb-12">
          提供価値
        </h3>
        <div className="max-w-3xl mx-auto space-y-8">
          {valuePropositions.map((prop, index) => (
            <Card key={index} className="bg-secondary hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 