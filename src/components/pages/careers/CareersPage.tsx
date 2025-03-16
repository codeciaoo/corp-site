import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CareersForm from "./CareersForm";

const CareersPage = () => {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-3xl font-bold tracking-wide text-teal-800 sm:text-4xl">
        採用情報
      </h1>

      {/* 企業文化 */}
      <Card className="mb-16 overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="px-2 text-2xl text-gray-800">
            CodeCiaoで働く
          </CardTitle>
          <div className="border-b border-gray-200" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <p className="text-medium leading-relaxed text-gray-700">
            CodeCiaoは、最新技術への探究心と、お客様の課題解決への情熱を持つメンバーが集まるテクノロジーカンパニーです。
            私たちは、生成AI・クラウド・Web技術を駆使して、お客様のビジネスに革新的なソリューションを提供しています。
            フラットな組織文化の中で、メンバー一人一人が主体的に考え、行動できる環境を大切にしています。
          </p>
        </CardContent>
      </Card>

      {/* 募集職種 */}
      <Card className="mb-16 overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="px-2 text-2xl text-gray-800">
            募集職種
          </CardTitle>
          <div className="border-b border-gray-200" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "フルスタックエンジニア（業務委託）",
                type: "fullstack",
                requirements: [
                  "Web開発経験3年以上",
                  "TypeScript/React.js での開発経験",
                  "AWS/GCPなどのクラウドサービスの利用経験",
                ],
                preferred: [
                  "生成AI関連の開発経験",
                  "バックエンド開発経験（Node.js/Python）",
                  "アジャイル開発経験",
                ],
              },
              {
                title: "エンジニアインターン（AI/Web開発）",
                type: "intern",
                requirements: [
                  "「改訂新版」プロになるためのWeb技術入門の内容を大体理解していること",
                  "AIコーディングツール（GitHub Copilot、Claudeなど）の使用経験",
                  "開発ツール（GitやVSCodeなど）の使用経験",
                ],
                preferred: [
                  "Web開発やAI開発の基礎知識",
                  "プロジェクト推進経験",
                  "週2日以上勤務可能な方",
                ],
              },
            ].map((position, index) => (
              <div key={index} className="rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  {position.title}
                </h3>
                <div className="mb-4">
                  <h4 className="mb-2 font-medium text-gray-700">必須スキル</h4>
                  <ul className="list-inside list-disc text-gray-600">
                    {position.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="mb-2 font-medium text-gray-700">歓迎スキル</h4>
                  <ul className="list-inside list-disc text-gray-600">
                    {position.preferred.map((pref, i) => (
                      <li key={i}>{pref}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-teal-600 text-teal-600 hover:bg-teal-50"
                  onClick={() => window.location.href = `/careers/${position.type}`}
                >
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>



      {/* 応募フォーム */}
      <CareersForm />
    </div>
  );
};

export default CareersPage;
