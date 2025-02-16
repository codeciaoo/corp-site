import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const CompanyProfile = () => {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-3xl font-bold tracking-wide text-teal-800 sm:text-4xl">
        会社概要
      </h1>

      {/* CodeCiaoとは */}
      <Card className="mb-16 overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="px-2 text-2xl text-gray-800">
            CodeCiaoとは
          </CardTitle>
          <div className="border-b border-gray-200" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <p className="text-lg leading-relaxed text-gray-700">
            CodeCiaoは、最新のWeb技術とクラウドソリューションを活用し、企業のデジタル変革を支援する技術パートナーです。Webアプリケーション開発からクラウドインフラの構築、運用保守まで、包括的なITソリューションを提供することで、お客様のビジネス成長を技術面からサポートしています。
          </p>
        </CardContent>
      </Card>

      {/* 会社概要 */}
      <Card className="mb-16 overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="px-2 text-2xl tracking-wide text-gray-800">
            会社概要
          </CardTitle>
          <div className="border-b border-gray-200" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="divide-y divide-gray-200">
            {[
              {
                label: "社名",
                value: "CodeCiao株式会社（読み：コードチャオ）",
              },
              {
                label: "所在地",
                value: "〒135-0043 東京都江東区塩浜2-5-12 715",
              },
              { label: "設立", value: "2024年2月19日" },
              { label: "資本金", value: "500万円" },
              {
                label: "社員数",
                value: (
                  <div>
                    <p>社員：2人</p>
                    <p>業務委託：5名</p>
                    <a
                      href="/careers"
                      className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      求職者の方はこちら
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                ),
              },
              {
                label: "事業内容",
                value: (
                  <ul className="list-none space-y-3">
                    {[
                      "Web/モバイルアプリケーションの設計・開発",
                      "コーポレートサイト・ECサイトの開発・保守",
                      "AWSなどのクラウドインフラ構築・運用",
                      "DevOps導入支援・技術コンサルティング",
                      "DX推進支援・CTO支援サービス",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-teal-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex py-6 transition-colors hover:bg-gray-50"
              >
                <div className="w-32 font-medium text-gray-600">
                  {item.label}
                </div>
                <div className="flex-1">{item.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 代表挨拶 */}
      <Card className="overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="px-2 text-2xl tracking-wide text-gray-800">
            代表挨拶
          </CardTitle>
          <div className="border-b border-gray-200" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative h-72 w-72 overflow-hidden rounded-2xl shadow-md">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              <img
                src="/president.png"
                alt="代表取締役"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex-1 space-y-4 leading-relaxed text-gray-700">
              <p className="text-lg">
                私たちCodeCiaoは、技術を通じて企業のデジタル変革を支援することを使命としています。
              </p>
              <p className="text-lg">
                高度な技術力と実践的な経験を活かし、お客様のビジネス課題に最適なソリューションを提供してまいります。Webアプリケーション開発からクラウドインフラ構築まで、包括的なITサービスを通じて、お客様のビジネスの成長と進化をサポートしていきたいと考えています。
              </p>
              <p className="mt-6 text-right text-lg">
                <span className="font-bold">代表取締役 田原 翼</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
