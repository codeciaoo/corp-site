const Case1 = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=30&width=120"
              alt="Cloud Pack Logo"
              className="h-8"
            />
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden items-center space-x-6 text-sm md:flex">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                サービス
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                事例紹介・実績
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                イベント
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                お知らせ
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                ブログ
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                プロフィール
              </a>
            </nav>
            <a
              href="tel:0120-677-989"
              className="text-gray-600 hover:text-gray-900"
            >
              0120-677-989
            </a>
            <button className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600">
              無料でご相談
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  dummmy
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  導入事例
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">建設現場人材派遣システム</li>
            </ol>
          </nav>

          {/* Title Section */}
          <div className="mb-8 rounded-lg bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">導入事例</h1>
            <div className="border-t pt-6">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                建設現場人材派遣システム
              </h2>
              <div className="mb-6">
                <img
                  src="/placeholder.svg?height=60&width=200"
                  alt="Logo"
                  className="h-12"
                />
                <p className="mt-3 text-sm text-gray-500">
                  更新日：2021年6月25日
                </p>
              </div>

              {/* Implemented Features */}
              <div className="space-y-6 text-gray-700">
                <p className="font-medium">
                  建設現場人材派遣システムのシステム開発をご支援
                </p>
                <ul className="ml-1 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                    <span>
                      チャットボットを通じて気象データを配信・手軽に閲覧できる環境を実現
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                    <span>
                      チャットボットと連携した新しい防災情報サービスの提供を目指し、クラウドネイティブな基盤を構築
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                    <span>今後の事業展開を見据えたAWS環境の最適化を実現</span>
                  </li>
                </ul>
                <p className="mt-8">
                  建設現場人材派遣システムのシステム開発をご支援
                </p>
              </div>
            </div>
          </div>

          {/* System Architecture */}
          <div className="mb-8 rounded-lg bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-lg font-bold">システム構成図</h3>
            <div className="border bg-gray-50 p-4">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="System Architecture Diagram"
                className="w-full"
              />
            </div>
          </div>

          {/* AWS Products Table */}
          <div className="mb-8 rounded-lg bg-white p-8 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="w-1/4 bg-gray-50 px-6 py-4 font-medium">
                    製作名
                  </td>
                  <td className="px-6 py-4">建設現場人材派遣システム</td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-6 py-4 font-medium">
                    クライアント
                  </td>
                  <td className="px-6 py-4">建設現場人材派遣システム様</td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-6 py-4 align-top font-medium">
                    AWSプロダクト
                  </td>
                  <td className="px-6 py-4">
                    <ul className="space-y-2 text-sm">
                      <li>AWS CloudFormation</li>
                      <li>AWS Amplify</li>
                      <li>AWS CloudWatch</li>
                      <li>Amazon Cognito</li>
                      <li>Amazon API Gateway</li>
                      <li>AWS Lambda</li>
                      <li>Amazon Kinesis</li>
                      <li>Amazon DynamoDB</li>
                      <li>Amazon SNS</li>
                      <li>Amazon EventBridge</li>
                      <li>Amazon SQS</li>
                      <li>Amazon S3</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              システム開発
            </span>
          </div>

          {/* Contact Button */}
          <div className="mb-12 text-center">
            <button className="rounded bg-teal-600 px-8 py-4 font-medium text-white hover:bg-teal-700">
              お問い合わせはこちら
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t pt-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              ← 前の事例
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              次の事例 →
            </a>
          </div>

          {/* Social Sharing */}
          <div className="mt-8 flex items-center space-x-4">
            <span className="text-sm text-gray-600">このページをシェア</span>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                <img
                  src="/placeholder.svg?height=20&width=20"
                  alt="Line"
                  className="h-5 w-5"
                />
                <span>LINEでシェア</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                <img
                  src="/placeholder.svg?height=20&width=20"
                  alt="Facebook"
                  className="h-5 w-5"
                />
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                <img
                  src="/placeholder.svg?height=20&width=20"
                  alt="Twitter"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1B2838] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">CONTACT</h2>
            <p className="text-gray-400">
              クラウドの導入や移行、活用等について、サービスに関するご相談はお気軽にどうぞ。
            </p>
          </div>
          <div className="mb-8 flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="text-center">
              <p className="mb-2 text-sm">お電話でのお問い合わせはこちら</p>
              <a href="tel:0120-677-989" className="text-3xl font-bold">
                0120-677-989
              </a>
            </div>
            <button className="rounded bg-teal-600 px-8 py-4 text-white hover:bg-teal-700">
              導入のご相談はこちら
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Case1;
