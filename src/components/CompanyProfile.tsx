import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CompanyProfile = () => {
  return (
    <div className="pt-16">
      <main className="relative mx-auto max-w-5xl px-8 py-12">
        <h1 className="mb-16 text-center text-4xl font-bold tracking-tight">
          会社概要
        </h1>

        {/* CodeCiaoとは */}
        <Card className="mb-16 overflow-hidden backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-600">
              CodeCiaoとは
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-gray-700">
              CodeCiaoは、最新のWeb技術とクラウドソリューションを活用し、企業のデジタル変革を支援する技術パートナーです。Webアプリケーション開発からクラウドインフラの構築、運用保守まで、包括的なITソリューションを提供することで、お客様のビジネス成長を技術面からサポートしています。
            </p>
          </CardContent>
        </Card>

        {/* 会社概要 */}
        <Card className="mb-16 overflow-hidden backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-600">
              会社概要
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {/* 社名 */}
              <div className="flex py-6 transition-colors hover:bg-gray-50">
                <div className="w-32 font-medium text-gray-600">社名</div>
                <div className="flex-1">
                  CodeCiao株式会社（読み：コードチャオ）
                </div>
              </div>

              {/* 所在地 */}
              <div className="flex py-6 transition-colors hover:bg-gray-50">
                <div className="w-32 font-medium text-gray-600">所在地</div>
                <div className="flex-1">
                  <p>〒135-0043 東京都江東区塩浜2-5-12 715</p>
                </div>
              </div>

              {/* 設立 */}
              <div className="flex py-6 transition-colors hover:bg-gray-50">
                <div className="w-32 font-medium text-gray-600">設立</div>
                <div className="flex-1">2024年2月19日</div>
              </div>

              {/* 資本金 */}
              <div className="flex py-6 transition-colors hover:bg-gray-50">
                <div className="w-32 font-medium text-gray-600">資本金</div>
                <div className="flex-1">500万円</div>
              </div>

              {/* 社員数 */}
              <div className="flex py-6 transition-colors hover:bg-gray-50">
                <div className="w-32 font-medium text-gray-600">社員数</div>
                <div className="flex-1">
                  <p>社員：2人</p>
                  <p>業務委託：5名</p>
                  <a
                    href="/careers"
                    className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    求職者の方はこちら
                  </a>
                </div>
              </div>

              {/* 事業内容 */}
              <div className="flex py-6 transition-colors hover:bg-gray-50">
                <div className="w-32 font-medium text-gray-600">事業内容</div>
                <div className="flex-1 leading-relaxed">
                  <ul className="list-none space-y-3">
                    <li className="flex items-center space-x-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>Web/モバイルアプリケーションの設計・開発</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>コーポレートサイト・ECサイトの開発・保守</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>AWSなどのクラウドインフラ構築・運用</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>DevOps導入支援・技術コンサルティング</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>DX推進支援・CTO支援サービス</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 代表挨拶 */}
        <Card className="overflow-hidden backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-600">
              代表挨拶
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="relative h-72 w-72 overflow-hidden rounded-2xl">
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
      </main>
    </div>
  );
};

export default CompanyProfile;
