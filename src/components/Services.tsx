import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code, Database, Cloud, LineChart } from "lucide-react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const services = [
  {
    id: "software-development",
    icon: <Code className="text-primary h-12 w-12" />,
    title: "Web/モバイルアプリ開発",
    description:
      "ECサイトから IoTデータ可視化、勤怠管理システム、生成AIを活用した安全管理システムまで、幅広い開発実績と最新技術の実装力を持っています",
  },
  {
    id: "legacy-modernization",
    icon: <Database className="text-primary h-12 w-12" />,
    title: "Webサイトの開発/保守",
    description:
      "従来型WordPressから高速なJamstack構成まで、Cloudflareなど最新技術を活用し、運用負荷の軽減と安定稼働を実現",
  },
  {
    id: "cloud-solutions",
    icon: <Cloud className="text-primary h-12 w-12" />,
    title: "クラウドインテグレーション",
    description:
      "AWSなどのクラウドサービスの導入設計から運用まで対応し、セキュアで運用効率の高いクラウド環境と、リソース最適化によるムダのない利用料を実現",
  },
  {
    id: "it-consulting",
    icon: <LineChart className="text-primary h-12 w-12" />,
    title: "DXコンサルティング/CTO代行",
    description:
      "業務プロセスの可視化から技術戦略の立案、DevOpsの導入、開発体制の構築まで、企業のデジタル変革を現場目線で伴走支援",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <h3 className="mb-12 text-center text-3xl font-bold">主要サービス</h3>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group transition-shadow duration-300 hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/90 ml-auto"
                  asChild
                >
                  <a href={`/services/${service.id}`}>
                    詳しく見る
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
