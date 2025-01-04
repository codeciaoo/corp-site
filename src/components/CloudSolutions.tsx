import React from 'react';

const CloudSolutionPage = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <header className="py-8">
        <h1 className="text-center text-2xl font-bold">クラウドインテグレーション</h1>
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
                AWSを活用した高可用性・高スケーラビリティなシステムをコスト最適化して構築
              </h2>
              <p className="mb-8 text-sm text-gray-600">
                CodeCiaoは、AWSプレミアムコンサルティングパートナーとして、お客様のビジネスに最適なクラウドソリューションを提供します。
                高可用性とスケーラビリティを確保しながら、コスト最適化を実現します。
              </p>
              <div className="text-center">
                <img
                  src="/img-web-app-01.png?height=300&width=500"
                  alt="Cloud architecture illustration"
                  className="mx-auto mb-12"
                />
              </div>
            </section>

            {/* AWS Services Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-xl font-bold">充実したコンピューティングリソース</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {/* EC2 */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="EC2 icon"
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="mb-3 text-center text-lg font-bold">Amazon EC2</h3>
                  <p className="text-sm text-gray-600">
                    仮想サーバーを柔軟に構築・運用。オートスケーリングによる負荷分散と可用性の向上を実現します。
                  </p>
                </div>
                {/* ECS */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="ECS icon"
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="mb-3 text-center text-lg font-bold">Amazon ECS</h3>
                  <p className="text-sm text-gray-600">
                    コンテナオーケストレーションサービスを活用し、マイクロサービスアーキテクチャの実現とスケーラブルな運用を可能にします。
                  </p>
                </div>
                {/* Lambda */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Lambda icon"
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="mb-3 text-center text-lg font-bold">AWS Lambda</h3>
                  <p className="text-sm text-gray-600">
                    サーバーレスアーキテクチャによる運用負荷の軽減と、使用量に応じた最適なコスト管理を実現します。
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-xl font-bold">クラウドソリューションの特徴</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* High Availability */}
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-cyan-600">高可用性</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>• マルチAZ構成による冗長化</li>
                    <li>• 自動フェイルオーバー機能</li>
                    <li>• 99.99%の可用性を実現</li>
                    <li>• 災害対策（DR）設計</li>
                  </ul>
                </div>
                {/* Scalability */}
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-cyan-600">スケーラビリティ</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>• オートスケーリングによる自動拡張</li>
                    <li>• 負荷に応じた柔軟なリソース調整</li>
                    <li>• 水平・垂直スケーリング対応</li>
                    <li>• 瞬間的な負荷増大にも対応</li>
                  </ul>
                </div>
                {/* Cost Optimization */}
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-cyan-600">コスト最適化</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>• 使用量に応じた従量課金</li>
                    <li>• リザーブドインスタンスの活用</li>
                    <li>• 自動シャットダウンによるコスト削減</li>
                    <li>• AWS Cost Explorerによる分析</li>
                  </ul>
                </div>
                {/* Security */}
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-cyan-600">セキュリティ</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>• AWS WAFによる防御</li>
                    <li>• IAMによる権限管理</li>
                    <li>• VPCによるネットワーク分離</li>
                    <li>• 暗号化によるデータ保護</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Architecture Diagram */}
            <section className="mb-12">
              <h2 className="mb-6 text-xl font-bold">システムアーキテクチャ例</h2>
              <div className="rounded-lg border border-gray-200 p-4">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="AWS Architecture diagram"
                  className="mx-auto"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                お客様のニーズに合わせて、最適なアーキテクチャを設計・構築いたします。
              </p>
            </section>

            {/* Case Studies */}
            <section className="mb-12">
              <h2 className="mb-8 text-xl font-bold">導入事例</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 p-6 shadow-sm">
                    <img
                      src="/placeholder.svg?height=60&width=120"
                      alt={`Case study ${i + 1}`}
                      className="mb-4"
                    />
                    <h3 className="mb-2 font-bold">事例タイトル</h3>
                    <p className="mb-4 text-sm text-gray-600">
                      AWSを活用して課題を解決した事例の説明文がここに入ります。
                    </p>
                    <a href="#" className="text-sm text-cyan-600 hover:underline">
                      詳細を見る →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section className="mb-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-center text-white">
              <h2 className="mb-4 text-2xl font-bold">お気軽にご相談ください</h2>
              <p className="mb-6 text-sm">
                クラウド導入・移行に関する課題や要望など、専門のエンジニアが丁寧にご対応いたします。
              </p>
              <button className="rounded-lg bg-white px-8 py-3 text-sm font-bold text-cyan-600 shadow-lg hover:bg-gray-100">
                無料相談はこちら
              </button>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-4 rounded-lg border border-gray-200 p-4">
              <h2 className="mb-4 text-sm font-bold">クラウドソリューション</h2>
              <ul className="space-y-2 text-sm">
                {[
                  'AWS構築・運用',
                  'クラウド移行',
                  'サーバーレス開発',
                  'コンテナ化支援',
                  'マイクロサービス化',
                  'DevOps支援',
                  'セキュリティ対策',
                  'コスト最適化',
                  '運用自動化',
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
                  AWS無料相談会
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
            クラウドソリューションに関するご相談、お見積もり、サービスについてのご質問など
            お気軽にお問い合わせください。
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <a href="#" className="text-sm hover:text-cyan-400">
              お問い合わせ
            </a>
            <a href="#" className="text-sm hover:text-cyan-400">
              AWS導入相談
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CloudSolutionPage;