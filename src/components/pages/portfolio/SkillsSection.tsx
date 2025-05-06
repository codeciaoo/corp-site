import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import TechStackIcon from "@/components/projects/TechStackIcon";

export interface SkillWithLevel {
  name: string;
  level?: number;
  years?: number;
}

export interface SkillCategory {
  category: string;
  skills: SkillWithLevel[];
}

export interface SkillsSectionProps {
  /**
   * カテゴリー別スキル一覧
   */
  skills: SkillCategory[];
}

/**
 * スキル表示用のバッジコンポーネント
 */
const SkillBadge: React.FC<{ skill: SkillWithLevel }> = ({ skill }) => {
  const { name, level, years } = skill;
  
  return (
    <div className="relative flex items-center rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <TechStackIcon tech={name} className="text-blue-600 flex-shrink-0" size={18} />
        <div className="flex-1">
          <p className="font-medium text-gray-800">{name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {level && (
              <div className="flex items-center">
                <span className="mr-1">熟練度:</span>
                <div className="flex h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="bg-teal-500"
                    style={{ width: `${(level / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
            {years && <span>経験 {years}年</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * スキルカテゴリーコンポーネント
 */
const SkillCategory: React.FC<{ category: SkillCategory; index: number }> = ({
  category,
  index,
}) => {
  // カテゴリーに対応するアイコンを取得
  const categoryIconMap: Record<string, string> = {
    "プロジェクトマネジメント": "project management",
    "クラウド/インフラ": "cloud",
    "バックエンド開発": "backend",
    "フロントエンド開発": "react",
    "AIシステム開発": "ai",
    "データベース": "database",
    "モバイルアプリ開発": "flutter",
    "テスト/品質管理": "jest",
    "インフラ/DevOps": "docker",
    "AI/機械学習": "ai",
    "その他": "code"
  };
  
  const getCategoryIcon = (categoryName: string) => {
    const iconKey = categoryIconMap[categoryName] || "code";
    return (
      <TechStackIcon 
        tech={iconKey} 
        className="text-teal-600" 
        size={16} 
      />
    );
  };
  
  return (
    <ScrollReveal
      animation="slide-up"
      delay={0.1 * index}
      className="mb-8 last:mb-0"
    >
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 border-b border-teal-100 pb-2 text-lg font-semibold text-teal-800">
          {getCategoryIcon(category.category)}
          {category.category}
        </h3>
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {category.skills.map((skill, i) => (
            <SkillBadge key={i} skill={skill} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

/**
 * スキルセクションコンポーネント
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">スキル</h2>
      <div className="space-y-8 rounded-xl bg-gray-50 p-6">
        {skills.map((category, index) => (
          <SkillCategory key={index} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;