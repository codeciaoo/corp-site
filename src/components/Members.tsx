import React, { useState } from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
    <div className="h-px flex-1 bg-gray-100"></div>
    {children}
    <div className="h-px flex-1 bg-gray-100"></div>
  </h3>
);

const Skill = ({ children }: { children: string }) => (
  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
    {children}
  </span>
);

interface FormattedSections {
  career: string[];
  skills: string[];
  projects: string[];
  media: {
    title: string;
    url: string;
    description: string;
  }[];
}

const teamMembers = [
  {
    name: "田原 翼",
    role: "プロジェクトマネージャー & バックエンドエンジニア",
    image: "/president.png?height=400&width=800",
    description: `
      経歴：
      - 慶應義塾大学卒業後、株式会社ベイカレントコンサルティングに入社
      - 2021年にlivepass株式会社にプロジェクトマネージャーとして入社
      - 自社SaaSの開発及び、上場企業向けに受託開発や技術コンサルティングを行う
      - 2024年2月にCodeCiao株式会社を設立

      得意分野：
      - プロジェクトマネジメント(ウォーターフォール、スクラム)
      - クラウドインフラストラクチャの設計とIaCによる構築・運用
      - マイクロサービスアーキテクチャの設計と実装

      最近のプロジェクト：
      - レガシーシステムの刷新プロジェクトのリード
      - RAG × LLMを用いた社内事例検索システムの構築
      - 工場向けデータ可視化ダッシュボード及びホワイトボードの構築
    `,
  },
  {
    name: "一ノ瀬 英太",
    role: "フロント & ネイティブアプリエンジニア",
    image: "/ichinose.jpg?height=400&width=400",
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
    `,
  },
  {
    name: "穐山 悠太",
    role: "バックエンド & AIエンジニア",
    image: "/akiyama.jpg?height=400&width=400",
    description: `
      経歴：
      - 大学卒業後、システム開発会社に入社
      - 公共機関向けシステムや不動産データ分析サービスの開発を担当
      - 個人開発のサブスクリプションWebアプリで顧客450人、売上1,000万円を達成

      得意分野：
      - Python/FastAPIを用いたバックエンド開発
      - 機械学習/生成AIを活用したシステム開発
      - 要件定義から運用までの一貫した開発支援

      最近のプロジェクト：
      - 機械学習を活用した画像識別システムの開発
      - 越境EC向け自動化ツールの開発
      - 企業向け生成AI活用のコンサルティング

      メディア出演：
      - ABEMA Prime アベプラ 【AIカバー】声の無断生成にNO！声優やアーティストの想いは？悪用も？ https://youtu.be/QvWevDJEDIM?si=j6eNEAzGLUKlxcRs
    `,
  },
];

const Members = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const formatDescription = (description: string): FormattedSections => {
    const trimmedDesc = description.trim();
    const sections: FormattedSections = {
      career: [],
      skills: [],
      projects: [],
      media: [],
    };

    const parts = trimmedDesc.split(/\n\s*\n/);
    parts.forEach(part => {
      const trimmedPart = part.trim();
      if (trimmedPart.startsWith("経歴：")) {
        sections.career = trimmedPart
          .replace("経歴：", "")
          .split("\n")
          .map(item => item.trim())
          .filter(item => item.startsWith("-"))
          .map(item => item.slice(2).trim())
          .filter(Boolean);
      } else if (trimmedPart.startsWith("得意分野：")) {
        sections.skills = trimmedPart
          .replace("得意分野：", "")
          .split("\n")
          .map(item => item.trim())
          .filter(item => item.startsWith("-"))
          .map(item => item.slice(2).trim())
          .filter(Boolean);
      } else if (trimmedPart.startsWith("最近のプロジェクト：")) {
        sections.projects = trimmedPart
          .replace("最近のプロジェクト：", "")
          .split("\n")
          .map(item => item.trim())
          .filter(item => item.startsWith("-"))
          .map(item => item.slice(2).trim())
          .filter(Boolean);
      } else if (trimmedPart.startsWith("メディア出演：")) {
        const lines = trimmedPart
          .replace("メディア出演：", "")
          .split("\n")
          .map(line => line.trim())
          .filter(line => line.startsWith("- "));
        
        lines.forEach(line => {
          const parts = line.slice(2).split(" https://");
          if (parts.length === 2) {
            const [titleAndDesc, url] = parts;
            const lastSpaceIndex = titleAndDesc.lastIndexOf(" ");
            const title = titleAndDesc.slice(0, lastSpaceIndex);
            const description = titleAndDesc.slice(lastSpaceIndex + 1);
            
            sections.media.push({
              title: title.trim(),
              url: "https://" + url.trim(),
              description: description.trim(),
            });
          }
        });
      }
    });

    return sections;
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="relative mx-auto max-w-5xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl"
        >
          主要メンバーの紹介
        </motion.h1>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {teamMembers.map((member, index) => {
            const sections = formatDescription(member.description);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.01 }}
                className={`group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-md ${
                  selectedMember === index ? 'ring-1 ring-teal-500' : ''
                }`}
                onClick={() => setSelectedMember(index)}
              >
                <div className="md:flex md:items-start">
                  <div className="relative md:flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="h-40 w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] md:h-[280px] md:w-[300px]"
                    />
                  </div>
                  <div className="flex-1 space-y-4 p-6">
                    <motion.div 
                      className="flex flex-col space-y-1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="inline-flex w-fit items-center rounded-full bg-teal-50/80 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                        {member.role}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 sm:text-xl">
                        {member.name}
                      </h2>
                    </motion.div>

                    <div className="space-y-4">
                      {sections.career.length > 0 && (
                        <div>
                          <SectionTitle>経歴</SectionTitle>
                          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600">
                            {sections.career.map((item, i) => (
                              <li key={i} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sections.skills.length > 0 && (
                        <div>
                          <SectionTitle>得意分野</SectionTitle>
                          <div className="flex flex-wrap gap-1.5">
                            {sections.skills.map((skill, i) => (
                              <Skill key={i}>{skill}</Skill>
                            ))}
                          </div>
                        </div>
                      )}

                      {sections.projects.length > 0 && (
                        <div>
                          <SectionTitle>最近のプロジェクト</SectionTitle>
                          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600">
                            {sections.projects.map((project, i) => (
                              <li key={i} className="text-sm">{project}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sections.media.length > 0 && (
                        <div>
                          <SectionTitle>メディア出演</SectionTitle>
                          <div className="rounded-md bg-gray-50/70 p-3 text-xs text-gray-600 space-y-2">
                            {sections.media.map((item, i) => (
                              <div key={i} className="space-y-1">
                                <p className="font-medium">{item.title}</p>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-teal-600 hover:text-teal-800 underline"
                                >
                                  {item.description}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Members;
