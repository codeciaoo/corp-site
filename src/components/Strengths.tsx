import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Lightbulb, Cpu, TrendingUp } from "lucide-react";

const strengths = [
  {
    icon: <Lightbulb className="text-primary h-12 w-12" />,
    title: "経営課題解決のための戦略立案",
    description:
      "コンサルティングファーム出身者による、業務プロセス分析から投資対効果の可視化まで。システム投資を確実な事業成長へ転換",
  },
  {
    icon: <Cpu className="text-primary h-12 w-12" />,
    title: "最新技術の活用",
    description:
      "AI・クラウドなど最新技術へのキャッチアップと、実務での適切な技術選定力",
  },
  {
    icon: <TrendingUp className="text-primary h-12 w-12" />,
    title: "実践的なアプローチ",
    description:
      "システム開発の現場経験を活かした、実現性の高いソリューションの提供",
  },
];

export default function Strengths() {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <div className="container">
        <h3 className="mb-12 text-center text-3xl font-bold">3つの強み</h3>
        <div className="grid gap-8 md:grid-cols-3">
          {strengths.map((strength, index) => (
            <Card
              key={index}
              className="bg-background transition-shadow duration-300 hover:shadow-md"
            >
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
  );
}
