import React from 'react';

const WebDevelopmentPage = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <header className="py-8">
        <h1 className="text-center text-2xl font-bold">Web アプリ開発</h1>
        <div className="mx-auto mt-2 h-0.5 w-12 bg-cyan-500"></div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Main Content Area */}
          <main className="lg:w-3/4">
            {/* Hero Section */}
            <section className="mb-12">
              <h2 className="mb-4 text-lg text-cyan-600">
                クラウドを活用した効率的な Web アプリ開発を行います
              </h2>
              <p className="mb-8 text-sm text-gray-600">
                ユーザビリティの向上、パフォーマンスの最適化、セキュリティの強化など、お客様の要件に合わせた最適な UI/UX、自動構築基盤となる Web アプリケーションを開発します。
              </p>
              <div className="text-center">
                <img
                  src="/img-web-app-hero.png?height=300&width=500"
                  alt="Web development illustration"
                  className="mx-auto mb-12"
                />
              </div>
            </section>

            {/* Strength Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-xl font-bold">CodeCiaoの強み</h2>
              <h3 className="mb-4 text-lg text-cyan-600">
                クラウドをフル活用したモダンな Web アプリケーション開発
              </h3>
              <p className="mb-8 text-sm text-gray-600">
                CodeCiaoでは、最新技術を用いたフルスタックなモダンな Web アプリケーション開発を行っています。
              </p>
              <p className="mb-8 text-sm text-gray-600">
                バックエンドは AWS マネージドサービスを駆使したサーバーレスアーキテクチャを、フロントエンドは Vue.js や React.js などのフレームワークを活用して開発しています。
              </p>

              <div className="mb-8">
                <h4 className="mb-2 font-bold">Vue.js, React.js</h4>
                <p className="text-sm text-gray-600">
                  Vue.js および React.js は、UI の開発を容易に、また の機能性を向上させている Web アプリケーションのフロント開発フレームワークです。
                </p>
              </div>

              {/* Server Architecture Diagram */}
              <div className="mb-12">
                <img
                  src="/img-web-app-01.png?height=400&width=600"
                  alt="Server architecture diagram"
                  className="mx-auto border border-gray-200"
                />
              </div>
            </section>

            {/* Case Studies Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-xl font-bold">導入事例</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 p-4 shadow-sm">
                    <img
                      src="/placeholder.svg?height=50&width=120"
                      alt={`Case study ${i + 1}`}
                      className="mb-4"
                    />
                    <p className="mb-2 text-sm">事例説明テキストがここに入ります</p>
                    <a href="#" className="text-xs text-cyan-600 hover:underline">
                      詳細な事例を見る
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Development Process Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-lg text-cyan-600">
                要件定義・デザインからシステム開発・運用までワンストップで提供
              </h2>
              <p className="mb-8 text-sm text-gray-600">
                CodeCiaoでは、インフラ構築／アプリ・バックエンド開発／デザイン制作など、あらゆる分野に対応する専門チームが揃っており、お客様がご要望されるシステムソリューションを提供することができます。
              </p>
              <div className="text-center">
                <img
                  src="/img-web-app-03.png?height=300&width=300"
                  alt="Development process"
                  className="mx-auto mb-8"
                />
              </div>
            </section>

            {/* Contact Section */}
            <section className="mb-12 text-center">
              <p className="mb-4 text-sm">経験豊富な技術者が最適な提案で課題解決します。</p>
              <p className="mb-8 text-sm">お気軽にご相談ください。</p>
              <button className="mb-8 rounded bg-teal-600 px-8 py-3 text-white hover:bg-teal-700">
                お問い合わせはこちら
              </button>
            </section>

            {/* Related Links */}
            <section className="mb-12">
              <h3 className="mb-4 text-sm">このページをみた方は、こんなページもみています</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-start gap-2 rounded-lg border border-gray-200 p-3 text-xs hover:bg-gray-50"
                  >
                    <span className="mt-1 text-cyan-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                    <span>関連コンテンツタイトル</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Social Buttons */}
            <div className="mb-12 flex items-center gap-2">
              <button className="rounded bg-blue-600 px-4 py-1 text-xs text-white">
                いいね！
              </button>
              <button className="rounded bg-gray-700 px-4 py-1 text-xs text-white">
                ツイート
              </button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-4 rounded-lg border border-gray-200 p-4">
              <h2 className="mb-4 text-sm font-bold">システム開発</h2>
              <ul className="space-y-2 text-sm">
                {[
                  'Web アプリ開発',
                  'システム開発',
                  'AI / ML',
                  'データ基盤の構築',
                  'IoT システム開発',
                  'UI/UX デザイン',
                  'AmazonConnect',
                  'チーム開発',
                  'LLM 開発',
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className={`block ${
                        i === 0 ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:text-cyan-600'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <a href="#" className="flex items-center gap-2 text-sm text-orange-600">
                  <span className="rounded-full bg-orange-100 p-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </span>
                  AWS導入相談会
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-cyan-400">CONTACT</h2>
          <p className="text-center text-sm">
            クラウト導入のご相談、見積もり、サービスについてのご質問など お気軽にお問い合わせください。
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <a href="#" className="text-sm hover:text-cyan-400">
              お問い合わせ
            </a>
            <a href="#" className="text-sm hover:text-cyan-400">
              システム開発のご相談
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WebDevelopmentPage;