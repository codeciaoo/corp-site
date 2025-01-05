import React from 'react'

const teamMembers = [
  {
    name: '田原 翼',
    role: 'プロジェクトマネージャー & バックエンドエンジニア',
    image: '/president.png?height=400&width=800',
    description: `
      経歴：
      - 慶應義塾大学卒業後、株式会社ベイカレントコンサルティングに入社
      - 2021年にlivepass株式会社にプロジェクトマネージャーとして入社
      - 自社SaaSの開発及び、上場企業向けに受託開発や技術コンサルティングを行う
      - 2024年2月にCodeCia株式会社を設立

      得意分野：
      - プロジェクトマネジメント(ウォーターフォール、スクラム)
      - クラウドインフラストラクチャの設計とIaCによる構築・運用
      - マイクロサービスアーキテクチャの設計と実装

      最近のプロジェクト：
      - レガシーシステムの刷新プロジェクトのリード
      - RAG × LLMを用いた社内事例検索システムの構築
      - 工場向けデータ可視化ダッシュボード及びホワイトボードの構築
    `
  },
  {
    name: '一ノ瀬 英太',
    role: 'フロント & ネイティブアプリエンジニア',
    image: '/ichinose.jpg?height=400&width=400',
    description: `
      経歴：
      - 専門学校卒業後、中島産業株式会社に入社
      - 製造ラインの工程管理・安全衛生活動を行いつつ、社内の業務システムの要件定義から開発・運用に従事
      - 2021年に株式会社トライビートに参画し、テックリードとして技術選定や設計を主導
      - 大手人材マッチングサービスのプラットフォーム開発や大手飲食店の予約アプリの開発に従事

      得意分野：
      - React, TypeScript, Next.jsを用いたモダンなフロントエンド開発
      - パフォーマンス最適化とアクセシビリティを考慮したUIの実装
      - Storybook/Testingライブラリを活用したコンポーネント駆動開発
      - Flutterを用いたクロスプラットフォームアプリ開発

      最近のプロジェクト：
      - 建設人材の派遣管理システム
      - メンテナンス点検管理システム
      - 工場向けデータ可視化ダッシュボード及びホワイトボードの構築
    `
  },
  {
    name: '穐山 悠太',
    role: 'バックエンド & AIエンジニア',
    image: '/placeholder.svg?height=400&width=400',
    description: `
      経歴：
      - 美術大学でグラフィックデザインを専攻
      - 広告代理店でのデザイナー経験を経て、UI/UXデザインの世界へ
      - 当社では主要プロダクトのUI設計とブランディングを担当

      得意分野：
      - Python/FastAPIを用いたバックエンド開発
      - 生成AI/LLMを活用したアプリケーション開発
      - 機械学習モデルの構築と本番環境での運用

      最近のプロジェクト：
      - RAG × LLMを用いた社内事例検索システムの構築
      - 企業向け生成AI活用のコンサルティング
    `
  }
]

const Members = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">主要メンバーの紹介</h1>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover md:h-full md:w-96"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">{member.role}</div>
                  <h2 className="mt-1 text-2xl font-semibold text-gray-900">{member.name}</h2>
                  <div className="mt-4 text-gray-700 space-y-4">
                    {member.description.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        <p>&copy; 2025 Our Amazing Company. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Members;