import { SendIcon } from "lucide-react";
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

export default function CareersForm() {
  const [formData, setFormData] = useState({
    type: "careers", // 問い合わせと区別するためのタイプ情報
    name: "",
    email: "",
    position: "",
    experience: "",
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
        type: "careers",
        name: "",
        email: "",
        position: "",
        experience: "",
        message: "",
      });

      alert(
        "応募ありがとうございます。内容を確認の上、担当者より連絡させていただきます。"
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

  const handlePositionChange = (value: string) => {
    setFormData(prev => ({ ...prev, position: value }));
  };

  const handleExperienceChange = (value: string) => {
    setFormData(prev => ({ ...prev, experience: value }));
  };

  return (
    <Card
      className="space-y-6 rounded-xl border-teal-600/20 bg-white p-6 shadow-2xl md:space-y-6 md:rounded-2xl lg:p-8"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-teal-600 md:text-2xl">
          採用応募フォーム
        </h2>
        <p className="text-sm text-gray-800">
          以下のフォームに必要事項をご記入の上、送信してください。内容確認後、面接のご案内をさせていただきます。
        </p>
      </div>
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-md text-teal-800">
            お名前
          </Label>
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
          <Label htmlFor="email" className="text-md text-teal-800">
            メールアドレス
          </Label>
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
          <Label htmlFor="position" className="text-md text-teal-800">
            希望職種
          </Label>
          <Select value={formData.position} onValueChange={handlePositionChange}>
            <SelectTrigger
              id="position"
              className="border-teal-600/20 bg-white shadow-sm transition-colors hover:bg-gray-50 focus:border-teal-600 focus:ring-teal-600"
            >
              <SelectValue placeholder="希望職種を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="fullstack">フルスタックエンジニア（業務委託）</SelectItem>
              <SelectItem value="intern">エンジニアインターン（AI/Web開発）</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-md text-teal-800">
            経験年数
          </Label>
          <Select value={formData.experience} onValueChange={handleExperienceChange}>
            <SelectTrigger
              id="experience"
              className="border-teal-600/20 bg-white shadow-sm transition-colors hover:bg-gray-50 focus:border-teal-600 focus:ring-teal-600"
            >
              <SelectValue placeholder="経験年数を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="0-2">0-2年</SelectItem>
              <SelectItem value="3-5">3-5年</SelectItem>
              <SelectItem value="6-9">6-9年</SelectItem>
              <SelectItem value="10+">10年以上</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-md text-teal-800">
            自己PR
          </Label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="ring-offset-background placeholder:text-muted-foreground min-h-[120px] w-full rounded-md border border-teal-600/20 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[150px]"
            placeholder="あなたのスキルや経験、志望動機などをお書きください"
            required
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="privacyPolicy"
              checked={agreedToPrivacyPolicy}
              onChange={handleChange}
              className="h-4 w-4 rounded border-teal-600/20 text-teal-600 focus:ring-teal-600"
              required
            />
            <label
              htmlFor="privacyPolicy"
              className="text-xs text-gray-600 md:text-sm"
            >
              <a
                href="/privacy-policy"
                className="text-teal-600 underline hover:text-teal-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                個人情報保護方針
              </a>
              に同意します
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-teal-600 text-white hover:bg-teal-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "送信中..."
            ) : (
              <>
                応募する
                <SendIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
