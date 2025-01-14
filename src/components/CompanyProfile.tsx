import React from "react";

const CompanyProfile = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* メインコンテンツ */}
      <main className="mx-auto max-w-4xl px-8 py-12">
        <h1 className="mb-16 text-2xl font-normal">会社概要</h1>

        {/* WACULとは */}
        <section className="mb-16">
          <h2 className="mb-8 text-xl font-normal text-emerald-600">
            CodeCiaoとは
          </h2>
          <p className="leading-relaxed text-gray-700">
            CodeCiaoは、最新のWeb技術とクラウドソリューションを活用し、企業のデジタル変革を支援する技術パートナーです。Webアプリケーション開発からクラウドインフラの構築、運用保守まで、包括的なITソリューションを提供することで、お客様のビジネス成長を技術面からサポートしています。
          </p>
        </section>

        {/* 会社概要 */}
        <section>
          <h2 className="mb-8 text-xl font-normal text-emerald-600">
            会社概要
          </h2>
          <div className="divide-y divide-gray-200">
            {/* 社名 */}
            <div className="flex py-4">
              <div className="w-32 text-gray-600">社名</div>
              <div className="flex-1">
                CodeCiao株式会社（読み：コードチャオ）
              </div>
            </div>

            {/* 所在地 */}
            <div className="flex py-4">
              <div className="w-32 text-gray-600">所在地</div>
              <div className="flex-1">
                <p>〒135-0043 東京都江東区塩浜2-5-12 715</p>
              </div>
            </div>

            {/* 設立 */}
            <div className="flex py-4">
              <div className="w-32 text-gray-600">設立</div>
              <div className="flex-1">2024年2月19日</div>
            </div>

            {/* 資本金 */}
            <div className="flex py-4">
              <div className="w-32 text-gray-600">資本金</div>
              <div className="flex-1">500万円</div>
            </div>

            {/* 社員数 */}
            <div className="flex py-4">
              <div className="w-32 text-gray-600">社員数</div>
              <div className="flex-1">
                <p>社員：2人</p>
                <p>業務委託：5名</p>
                <a href="#" className="mt-2 text-blue-600">
                  求職者の方はこちら
                </a>
              </div>
            </div>

            {/* 事業内容 */}
            <div className="flex py-4">
              <div className="w-32 text-gray-600">事業内容</div>
              <div className="flex-1 leading-relaxed">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Web/モバイルアプリケーションの設計・開発</li>
                  <li>コーポレートサイト・ECサイトの開発・保守</li>
                  <li>AWSなどのクラウドインフラ構築・運用</li>
                  <li>DevOps導入支援・技術コンサルティング</li>
                  <li>DX推進支援・CTO支援サービス</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 代表挨拶 */}
        <section className="mt-16">
          <h2 className="mb-8 text-xl font-normal text-emerald-600">
            代表挨拶
          </h2>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative h-64 w-64">
              <img
                src="/president.png"
                alt="代表取締役"
                className="h-full w-full rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="flex-1 leading-relaxed text-gray-700">
              <p className="mb-4">
                私たちCodeCiaoは、技術を通じて企業のデジタル変革を支援することを使命としています。
              </p>
              <p className="mb-4">
                高度な技術力と実践的な経験を活かし、お客様のビジネス課題に最適なソリューションを提供してまいります。Webアプリケーション開発からクラウドインフラ構築まで、包括的なITサービスを通じて、お客様のビジネスの成長と進化をサポートしていきたいと考えています。
              </p>
              <p className="mt-4 text-right">
                代表取締役 <span className="font-medium">田原 翼</span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyProfile;
