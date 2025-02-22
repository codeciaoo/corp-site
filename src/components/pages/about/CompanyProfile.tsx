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
          <p className="text-medium leading-relaxed text-gray-700">
            CodeCiaoは、最新のWeb技術とクラウドソリューションを駆使し、企業のデジタル変革を実現する技術パートナーです。OpenAIやGeminiなどの生成AI技術を活用した業務効率化システムやRAGによる社内文書検索システムの開発実績、AWSクラウドインフラの専門知識を活かしたECサイトから業務システム、IoTプラットフォームまで、幅広い開発実績を持つテクノロジーカンパニーです。
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
                  <div className="space-y-6">
                    {[
                      {
                        title: "Web/モバイルアプリ開発",
                        items: [
                          "ECサイト・業務システムの開発実績",
                          "IoTデータ可視化システムの構築実績",
                          "生成AIを活用した安全管理システムの開発実績"
                        ]
                      },
                      {
                        title: "生成AI開発/導入支援",
                        items: [
                          "OpenAI・Geminiを活用したシステム開発",
                          "RAGによる社内文書検索システムの構築",
                          "AIモデルのファインチューニング支援"
                        ]
                      },
                      {
                        title: "クラウドインテグレーション",
                        items: [
                          "AWS環境の設計・構築・運用",
                          "セキュリティ対策の実装",
                          "クラウドリソース/コストの最適化"
                        ]
                      },
                      {
                        title: "DX推進支援・CTO支援サービス",
                        items: [
                          "技術戦略の立案支援",
                          "DevOps導入・体制構築",
                          "DX推進のための組織改革支援"
                        ]
                      }
                    ].map((service, index) => (
                      <div key={index}>
                        <h4 className="mb-3 text-base font-medium text-teal-700">{service.title}</h4>
                        {service.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2 ml-4 mb-2">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-400"></span>
                            <span className="text-sm text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
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
            <div className="relative h-80 w-80 overflow-hidden rounded-2xl shadow-md"> {/* 画像のスペースを広くするためにh-80とw-80に変更 */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              <img
                src="/president.png"
                alt="代表取締役"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 scale-110 max-h-80" // 画像エリアを広くするためにmax-hを追加
              />
            </div>
            <div className="flex-1 space-y-4 leading-relaxed text-gray-700">
              <p className="text-base">
                私たちCodeCiaoは、最新のテクノロジーを通じて企業のデジタル変革を支援することを使命としています。
              </p>
              <p className="text-base">
                私自身、10年以上にわたりコンサルタント、そしてエンジニアとしてキャリアを積み、大規模なクラウドインフラの構築からWebアプリケーション開発、最新の生成AI技術の実装まで、幅広い技術分野でお客様の課題解決に携わってきました。
              </p>
              <p className="text-base">
                現在、当社はOpenAI・Geminiなどの最新AI技術やRAGアーキテクチャの実装、AWSクラウドインフラの構築まで、幅広い開発実績を持つテクノロジーカンパニーとして、お客様のビジネスの進化をサポートしています。
              </p>
              <p className="text-base">
                CodeCiaoは、確かな技術力と経営視点を併せ持つテクノロジーパートナーとして、お客様のビジネス価値向上に貢献してまいります。
              </p>
              <p className="mt-6 text-right text-lg">
                <span className="font-bold">代表取締役社長 田原 翼</span>
              </p>
            </div>  
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
