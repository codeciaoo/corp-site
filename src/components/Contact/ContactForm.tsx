import { CheckCircleIcon, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // バックエンドAPIを経由してSlackに通知を送信
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.details || responseData.error || "通知の送信に失敗しました");
      }

      // フォームをリセット
      setFormData({
        company: "",
        name: "",
        email: "",
        service: "",
        message: "",
      });

      alert("お問い合わせありがとうございます。担当者より連絡させていただきます。");
    } catch (error) {
      console.error("Error details:", error);
      alert(`送信に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="company">会社名</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="株式会社Example"
            className="border-teal-600/20 bg-white transition-colors focus:border-teal-600 focus:ring-teal-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">お名前</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            className="border-teal-600/20 bg-white transition-colors focus:border-teal-600 focus:ring-teal-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="taro.yamada@example.com"
            className="border-teal-600/20 bg-white transition-colors focus:border-teal-600 focus:ring-teal-600"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">ご興味のあるサービス</Label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger
              id="service"
              className="border-teal-600/20 bg-white shadow-sm transition-colors hover:bg-gray-50 focus:border-teal-600 focus:ring-teal-600"
            >
              <SelectValue placeholder="サービスを選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="ai">生成AI/RAG開発</SelectItem>
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
            value={formData.message}
            onChange={handleChange}
            className="ring-offset-background placeholder:text-muted-foreground min-h-[80px] w-full rounded-md border border-teal-600/20 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[100px]"
            placeholder="現在の課題や目標についてお聞かせください"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-teal-600 text-sm text-white transition-colors hover:bg-[#008080] md:text-base"
          size="lg"
          disabled={isSubmitting}
        >
          <SendIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          {isSubmitting ? "送信中..." : "無料相談を申し込む"}
        </Button>
      </form>
      <div className="border-t border-teal-600/20 pt-4 md:pt-6">
        <div className="text-muted-foreground flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center sm:gap-0 md:text-sm">
          <div className="flex items-center">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-teal-600 md:h-5 md:w-5" />
            2時間以内に返信
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
