import { CheckCircleIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormProps {
  home: boolean;
}

export default function ContactForm({ home }: ContactFormProps) {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToPrivacyPolicy) {
      alert("個人情報保護方針への同意が必要です。");
      return;
    }

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
        throw new Error(
          responseData.details ||
            responseData.error ||
            "通知の送信に失敗しました"
        );
      }

      // フォームをリセット
      setFormData({
        company: "",
        name: "",
        email: "",
        service: "",
        message: "",
      });

      alert(
        "お問い合わせありがとうございます。担当者より連絡させていただきます。"
      );
    } catch (error) {
      console.error("Error details:", error);
      alert(
        `送信に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      if (e.target.id === "privacyPolicy") {
        setAgreedToPrivacyPolicy(e.target.checked);
      }
    } else {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const bgColor = home ? "bg-gray-100" : "bg-white";
  const labelClassName = home ? "text-base md:text-lg" : "text-lg text-teal-800";

  return (
    <Card
      className={`space-y-5 rounded-xl border-teal-600/20 ${bgColor} p-5 shadow-2xl md:space-y-7 md:rounded-2xl md:p-7 lg:p-9`}
    >
      {home && (
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-teal-600 md:text-3xl">
            無料相談を予約する
          </h2>
          <p className="text-sm text-gray-800 md:text-base">
            まずは気軽にご相談ください。会社それぞれの課題に合わせた最適なソリューションをご提案いたします。
          </p>
        </div>
      )}
      <form
        className={home ? "space-y-5" : "space-y-7"}
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <Label htmlFor="company" className={labelClassName}>
            会社名
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="株式会社Example"
            className={`border-teal-600/20 ${bgColor} transition-colors focus:border-teal-600 focus:ring-teal-600 h-11 md:h-12 text-base`}
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="name" className={labelClassName}>
            お名前
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            className={`border-teal-600/20 ${bgColor} transition-colors focus:border-teal-600 focus:ring-teal-600 h-11 md:h-12 text-base`}
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className={labelClassName}>
            メールアドレス
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="taro.yamada@example.com"
            className={`border-teal-600/20 ${bgColor} transition-colors focus:border-teal-600 focus:ring-teal-600 h-11 md:h-12 text-base`}
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="service" className={labelClassName}>
            ご興味のあるサービス
          </Label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger
              id="service"
              className={`border-teal-600/20 ${bgColor} shadow-sm transition-colors hover:bg-gray-50 focus:border-teal-600 focus:ring-teal-600 h-11 md:h-12 text-base`}
            >
              <SelectValue placeholder="サービスを選択してください" />
            </SelectTrigger>
            <SelectContent className={bgColor}>
              <SelectItem value="ai">生成AI/RAG開発</SelectItem>
              <SelectItem value="cloud">クラウドインテグレーション</SelectItem>
              <SelectItem value="development">システム開発</SelectItem>
              <SelectItem value="consulting">技術コンサルティング</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="message" className={labelClassName}>
            ご相談内容
          </Label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className={`ring-offset-background placeholder:text-muted-foreground min-h-[100px] w-full rounded-md border border-teal-600/20 ${bgColor} px-4 py-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[120px]`}
            placeholder="現在の課題や目標についてお聞かせください"
            required
          />
        </div>
        <div className="space-y-5">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="privacyPolicy"
              checked={agreedToPrivacyPolicy}
              onChange={handleChange}
              className="h-5 w-5 rounded border-teal-600/20 text-teal-600 focus:ring-teal-600"
              required
            />
            <Label
              htmlFor="privacyPolicy"
              className="text-base text-gray-600"
            >
              <a
                href="/privacy-policy"
                className="text-teal-600 hover:text-teal-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                個人情報保護方針
              </a>
              に同意する
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 text-base text-white transition-colors hover:bg-[#008080] disabled:bg-gray-400 md:text-lg py-3 h-auto"
            size="lg"
            disabled={isSubmitting || !agreedToPrivacyPolicy}
          >
            <SendIcon className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            {isSubmitting ? "送信中..." : "無料相談を申し込む"}
          </Button>
        </div>
      </form>
      <div className="border-t border-teal-600/20 pt-4 md:pt-6">
        <div className="text-muted-foreground flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center sm:gap-0 md:text-base">
          <div className="flex items-center">
            <CheckCircleIcon className="mr-2 h-5 w-5 text-teal-600 md:h-6 md:w-6" />
            2時間以内に返信
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="mr-2 h-5 w-5 text-teal-600 md:h-6 md:w-6" />
            無料相談
          </div>
        </div>
      </div>
    </Card>
  );
}
