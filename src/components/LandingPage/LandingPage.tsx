import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CloudIcon,
  Users2Icon,
  BarChartIcon,
  CheckCircleIcon,
  SendIcon,
} from "lucide-react";
import Solutions from "./Solutions";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen max-w-7xl bg-gradient-to-br from-[#009a9a]/5 to-[#009a9a]/10">
      {/* Background patterns - made responsive */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply">
          <div className="absolute h-full w-full bg-[radial-gradient(circle_300px_at_50%_100px,#009a9a,transparent)] md:bg-[radial-gradient(circle_500px_at_50%_200px,#009a9a,transparent)]" />
          <div className="absolute right-0 h-full w-full bg-[radial-gradient(circle_300px_at_80%_400px,#6366f1,transparent)] md:bg-[radial-gradient(circle_500px_at_80%_600px,#6366f1,transparent)]" />
        </div>
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `radial-gradient(#009a9a 0.5px, transparent 0.5px), radial-gradient(#6366f1 0.5px, transparent 0.5px)`,
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 8px 8px",
            opacity: 0.05,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="container px-4 py-8 md:py-12 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left column */}
          <div className="space-y-6 md:space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <div
                className="relative text-center text-3xl font-black tracking-tight sm:text-5xl lg:text-left xl:text-6xl"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontFeatureSettings: "'palt'",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  クラウドネイティブ開発で
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="mt-2 block bg-gradient-to-r from-[#009a9a] via-indigo-500 to-sky-500 bg-clip-text text-transparent"
                >
                  事業成長を加速する
                </motion.div>
              </div>

              <p className="text-muted-foreground max-w-2xl text-base md:text-xl">
                企画から実装/運用まで一気通貫でサポート。スケーラブルでセキュアなWebシステム構築に必要なノウハウやエンジニア人員が不足しているクライアント様の課題を解決します。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                size="lg"
                variant="default"
                className="inline-flex items-center justify-center bg-teal-600 px-4 py-4 text-base text-white transition-colors duration-200 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-800 md:px-8 md:py-6 md:text-lg"
                aria-label="メンバー紹介を見る"
              >
                <Users2Icon
                  className="mr-1 h-5 w-5 md:h-6 md:w-6"
                  aria-hidden="true"
                />
                メンバー紹介
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="inline-flex w-full items-center justify-center border-teal-600 px-4 py-4 text-base text-teal-600 transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-100 sm:w-auto md:px-8 md:py-6 md:text-lg"
                aria-label="実績を見る"
              >
                <BarChartIcon
                  className="mr-1 h-5 w-5 md:h-6 md:w-6"
                  aria-hidden="true"
                />
                実績を見る
              </Button>
            </div>

            {/* Stats section - Made responsive */}
            <div className="border-t border-[#009a9a]/20 pt-6 md:pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.3 }}
                      className="h-10 w-10 rounded-full border-2 border-white bg-[#009a9a] shadow-lg md:h-12 md:w-12"
                    />
                  ))}
                </div>
                <div className="space-y-2 sm:space-y-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-2"
                  >
                    <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                      200+
                    </span>
                    <span className="text-muted-foreground text-xs md:text-sm">
                      プロジェクト実績
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                    className="flex items-center gap-2"
                  >
                    <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                      98%
                    </span>
                    <span className="text-muted-foreground text-xs md:text-sm">
                      顧客満足度
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card - Made responsive */}
          <Card className="space-y-4 rounded-xl border-[#009a9a]/20 bg-white p-4 shadow-xl md:space-y-6 md:rounded-2xl md:p-6 lg:col-span-5 lg:p-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#009a9a] md:text-2xl">
                無料相談を予約する
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm">
                まずは気軽にご相談ください。貴社の課題に合わせた最適なソリューションをご提案いたします。
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">会社名</Label>
                <Input
                  id="company"
                  placeholder="株式会社Example"
                  className="border-[#009a9a]/20 transition-colors focus:border-[#009a9a] focus:ring-[#009a9a]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  className="border-[#009a9a]/20 transition-colors focus:border-[#009a9a] focus:ring-[#009a9a]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="taro.yamada@example.com"
                  className="border-[#009a9a]/20 transition-colors focus:border-[#009a9a] focus:ring-[#009a9a]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">ご興味のあるサービス</Label>
                <Select>
                  <SelectTrigger
                    id="service"
                    className="border-[#009a9a]/20 transition-colors focus:border-[#009a9a] focus:ring-[#009a9a]"
                  >
                    <SelectValue placeholder="サービスを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud">
                      クラウドインテグレーション
                    </SelectItem>
                    <SelectItem value="development">システム開発</SelectItem>
                    <SelectItem value="consulting">
                      技術コンサルティング
                    </SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">ご相談内容</Label>
                <textarea
                  id="message"
                  className="bg-background ring-offset-background placeholder:text-muted-foreground min-h-[80px] w-full rounded-md border border-[#009a9a]/20 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009a9a] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[100px]"
                  placeholder="現在の課題や目標についてお聞かせください"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#009a9a] text-sm text-white transition-colors hover:bg-[#008080] md:text-base"
                size="lg"
              >
                <SendIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                無料相談を申し込む
              </Button>
            </form>
            <div className="border-t border-[#009a9a]/20 pt-4 md:pt-6">
              <div className="text-muted-foreground flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center sm:gap-0 md:text-sm">
                <div className="flex items-center">
                  <CheckCircleIcon className="mr-2 h-4 w-4 text-[#009a9a] md:h-5 md:w-5" />
                  24時間以内に返信
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="mr-2 h-4 w-4 text-[#009a9a] md:h-5 md:w-5" />
                  無料相談
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t border-[#009a9a]/20 bg-white/50 backdrop-blur-sm">
        <Solutions />
      </section>
    </div>
  );
}
