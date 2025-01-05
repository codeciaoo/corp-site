const Case1 = () => {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/placeholder.svg?height=30&width=120"
                alt="Cloud Pack Logo"
                className="h-8"
              />
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900">サービス</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">事例紹介・実績</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">イベント</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">お知らせ</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">ブログ</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">プロフィール</a>
              </nav>
              <a href="tel:0120-677-989" className="text-gray-600 hover:text-gray-900">
                0120-677-989
              </a>
              <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600">
                無料でご相談
              </button>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
              <ol className="flex items-center space-x-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-700">dummmy</a></li>
                <li className="text-gray-400">/</li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700">導入事例</a></li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-600">建設現場人材派遣システム</li>
              </ol>
            </nav>
  
            {/* Title Section */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">導入事例</h1>
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  建設現場人材派遣システム
                </h2>
                <div className="mb-6">
                  <img
                    src="/placeholder.svg?height=60&width=200"
                    alt="Logo"
                    className="h-12"
                  />
                  <p className="text-sm text-gray-500 mt-3">更新日：2021年6月25日</p>
                </div>
  
                {/* Implemented Features */}
                <div className="space-y-6 text-gray-700">
                  <p className="font-medium">
                    建設現場人材派遣システムのシステム開発をご支援
                  </p>
                  <ul className="space-y-3 ml-1">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2.5 bg-gray-400 rounded-full flex-shrink-0"></div>
                      <span>チャットボットを通じて気象データを配信・手軽に閲覧できる環境を実現</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2.5 bg-gray-400 rounded-full flex-shrink-0"></div>
                      <span>チャットボットと連携した新しい防災情報サービスの提供を目指し、クラウドネイティブな基盤を構築</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2.5 bg-gray-400 rounded-full flex-shrink-0"></div>
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
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h3 className="text-lg font-bold mb-6">システム構成図</h3>
              <div className="border p-4 bg-gray-50">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="System Architecture Diagram"
                  className="w-full"
                />
              </div>
            </div>
  
            {/* AWS Products Table */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 bg-gray-50 w-1/4 font-medium">製作名</td>
                    <td className="py-4 px-6">
                      建設現場人材派遣システム
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 bg-gray-50 font-medium">クライアント</td>
                    <td className="py-4 px-6">建設現場人材派遣システム様</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 bg-gray-50 font-medium align-top">AWSプロダクト</td>
                    <td className="py-4 px-6">
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
              <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                システム開発
              </span>
            </div>
  
            {/* Contact Button */}
            <div className="text-center mb-12">
              <button className="bg-teal-600 text-white px-8 py-4 rounded hover:bg-teal-700 font-medium">
                お問い合わせはこちら
              </button>
            </div>
  
            {/* Navigation */}
            <div className="flex justify-between items-center border-t pt-8 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">← 前の事例</a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">次の事例 →</a>
            </div>
  
            {/* Social Sharing */}
            <div className="mt-8 flex items-center space-x-4">
              <span className="text-sm text-gray-600">このページをシェア</span>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                  <img src="/placeholder.svg?height=20&width=20" alt="Line" className="w-5 h-5" />
                  <span>LINEでシェア</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  <img src="/placeholder.svg?height=20&width=20" alt="Facebook" className="w-5 h-5" />
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  <img src="/placeholder.svg?height=20&width=20" alt="Twitter" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="bg-[#1B2838] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">CONTACT</h2>
              <p className="text-gray-400">クラウドの導入や移行、活用等について、サービスに関するご相談はお気軽にどうぞ。</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm mb-2">お電話でのお問い合わせはこちら</p>
                <a href="tel:0120-677-989" className="text-3xl font-bold">0120-677-989</a>
              </div>
              <button className="bg-teal-600 text-white px-8 py-4 rounded hover:bg-teal-700">
                導入のご相談はこちら
              </button>
            </div>
          </div>
        </footer>
      </div>
    )
  }
  
  export default Case1;