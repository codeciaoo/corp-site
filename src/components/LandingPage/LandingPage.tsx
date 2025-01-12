import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CloudIcon, Users2Icon, ArrowRightIcon, CheckCircleIcon, SendIcon, MenuIcon, BarChartIcon, ShieldIcon, RocketIcon, CodeIcon, Cloud, LineChart, Settings } from 'lucide-react'
import SolutionCard from "./SolutionCard"
// import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009a9a]/5 to-[#009a9a]/10">

      {/* Hero Section */}
      <section className="container py-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center rounded-full bg-[#009a9a] px-4 py-1.5 text-sm text-white font-medium">
              <CloudIcon className="mr-2 h-4 w-4" />
              クラウドネイティブ開発のエキスパート
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              クラウドネイティブ開発で
              <span className="text-[#009a9a] block mt-2">事業成長を加速する</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              企画から実装/運用まで一気通貫でサポート。スケーラブルでセキュアなWebシステム構築に必要なノウハウやエンジニア人員が不足しているクライアント様の課題を解決します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="bg-white hover:bg-[#009a9a]/10">
                <Users2Icon className="mr-2 h-4 w-4" />
                メンバー紹介
              </Button>
              <Button variant="outline" className="bg-white hover:bg-[#009a9a]/10">
                <BarChartIcon className="mr-2 h-4 w-4" />
                実績を見る
              </Button>
            </div>
            <div className="pt-8 border-t border-[#009a9a]/20">
              <div className="flex items-center gap-8">
                <div className="flex -space-x-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full border-2 border-white bg-gradient-to-br from-[#009a9a] to-[#00c2c2] shadow-lg" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#009a9a]">200+</span>
                    <span className="text-sm text-muted-foreground">プロジェクト実績</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#009a9a]">98%</span>
                    <span className="text-sm text-muted-foreground">顧客満足度</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <Card className="lg:col-span-5 p-6 lg:p-8 space-y-6 bg-white shadow-xl border-[#009a9a]/20 rounded-2xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#009a9a]">無料相談を予約する</h2>
              <p className="text-sm text-muted-foreground">
                まずは気軽にご相談ください。貴社の課題に合わせた最適なソリューションをご提案いたします。
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">会社名</Label>
                <Input id="company" placeholder="株式会社Example" className="border-[#009a9a]/20 focus:border-[#009a9a] transition-colors" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input id="name" placeholder="山田 太郎" className="border-[#009a9a]/20 focus:border-[#009a9a] transition-colors" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" placeholder="taro.yamada@example.com" className="border-[#009a9a]/20 focus:border-[#009a9a] transition-colors" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">ご興味のあるサービス</Label>
                <Select>
                  <SelectTrigger id="service" className="border-[#009a9a]/20 focus:border-[#009a9a] transition-colors">
                    <SelectValue placeholder="サービスを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud">クラウドインテグレーション</SelectItem>
                    <SelectItem value="development">システム開発</SelectItem>
                    <SelectItem value="consulting">技術コンサルティング</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">ご相談内容</Label>
                <textarea 
                  id="message"
                  className="min-h-[100px] w-full rounded-md border border-[#009a9a]/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009a9a] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  placeholder="現在の課題や目標についてお聞かせください"
                />
              </div>
              <Button type="submit" className="w-full bg-[#009a9a] hover:bg-[#008080] text-white transition-colors" size="lg">
                <SendIcon className="mr-2 h-4 w-4" />
                無料相談を申し込む
              </Button>
            </form>
            <div className="pt-6 border-t border-[#009a9a]/20">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircleIcon className="mr-2 h-4 w-4 text-[#009a9a]" />
                  24時間以内に返信
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="mr-2 h-4 w-4 text-[#009a9a]" />
                  無料相談
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t border-[#009a9a]/20 bg-white/50 backdrop-blur-sm">
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
      </section>
    </div>
  )
}

