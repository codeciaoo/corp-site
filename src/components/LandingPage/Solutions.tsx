import { Cloud, LineChart, Settings } from "lucide-react";
import SolutionCard from "./SolutionCard";

export default function Solutions() {
  return (
    <div className="container py-8">
      <h2 className="text-center text-3xl font-bold text-[#009a9a] mb-8">
        解決できる課題
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <SolutionCard
          title="クラウド活用がしたい"
          description="クラウドの導入から運用まで、ビジネスに最適なクラウド環境を実現します"
          bulletPoints={[
            { id: '1', text: "オンプレミスからクラウドへの移行支援" },
            { id: '2', text: "クラウドインフラの設計と構築" },
            { id: '3', text: "セキュアなクラウド環境の実現" }
          ]}
          href="/services"
          icon={<Cloud className="h-6 w-6 text-[#009a9a]" />}
        />

        <SolutionCard
          title="業務のDX化を進めたい"
          description="デジタル技術で業務プロセスを改革し、生産性を向上させます"
          bulletPoints={[
            { id: '1', text: "業務プロセスのデジタル化" },
            { id: '2', text: "社内システムの連携強化" },
            { id: '3', text: "ワークフローの自動化導入" }
          ]}
          href="/services"
          icon={<LineChart className="h-6 w-6 text-[#009a9a]" />}
        />

        <SolutionCard
          title="システム運用を改善したい"
          description="システム運用の自動化と効率化で、運用負荷とコストを削減します"
          bulletPoints={[
            { id: '1', text: "運用自動化ツールの導入" },
            { id: '2', text: "監視体制の構築と整備" },
            { id: '3', text: "DevOps環境の実現" }
          ]}
          href="/services"
          icon={<Settings className="h-6 w-6 text-[#009a9a]" />}
        />
      </div>
    </div>
  )
}