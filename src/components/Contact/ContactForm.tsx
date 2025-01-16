import { CheckCircleIcon, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ContactForm() {
  return (
    <Card className="space-y-4 rounded-xl border-teal-600/20 bg-gray-100 p-4 shadow-xl md:space-y-6 md:rounded-2xl md:p-6 lg:p-8">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-teal-600 md:text-2xl">
          無料相談を予約する
        </h2>
        <p className="text-xs text-gray-800 md:text-sm">
          まずは気軽にご相談ください。会社それぞれの課題に合わせた最適なソリューションをご提案いたします。
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">会社名</Label>
          <Input
            id="company"
            placeholder="株式会社Example"
            className="border-teal-600/20 bg-white transition-colors focus:border-teal-600 focus:ring-teal-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">お名前</Label>
          <Input
            id="name"
            placeholder="山田 太郎"
            className="border-teal-600/20 bg-white transition-colors focus:border-teal-600 focus:ring-teal-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            placeholder="taro.yamada@example.com"
            className="border-teal-600/20 bg-white transition-colors focus:border-teal-600 focus:ring-teal-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">ご興味のあるサービス</Label>
          <Select>
            <SelectTrigger
              id="service"
              className="border-teal-600/20 bg-white shadow-sm transition-colors hover:bg-gray-50 focus:border-teal-600 focus:ring-teal-600"
            >
              <SelectValue placeholder="サービスを選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
            className="ring-offset-background placeholder:text-muted-foreground min-h-[80px] w-full rounded-md border border-teal-600/20 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[100px]"
            placeholder="現在の課題や目標についてお聞かせください"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-teal-600 text-sm text-white transition-colors hover:bg-[#008080] md:text-base"
          size="lg"
        >
          <SendIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          無料相談を申し込む
        </Button>
      </form>
      <div className="border-t border-teal-600/20 pt-4 md:pt-6">
        <div className="text-muted-foreground flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center sm:gap-0 md:text-sm">
          <div className="flex items-center">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-teal-600 md:h-5 md:w-5" />
            24時間以内に返信
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-teal-600 md:h-5 md:w-5" />
            無料相談
          </div>
        </div>
      </div>
    </Card>
  );
}
