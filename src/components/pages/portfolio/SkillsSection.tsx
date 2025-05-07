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
  
  // 熟練度に応じた色を返す関数
  const getLevelColor = (level?: number) => {
    if (!level) return "bg-gray-200";
    if (level >= 4) return "bg-indigo-600";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-teal-500";
    return "bg-teal-400";
  };
  
  // 熟練度のテキスト表示
  const getLevelText = (level?: number) => {
    if (!level) return "";
    if (level >= 4) return "エキスパート";
    if (level >= 3) return "上級者";
    if (level >= 2) return "中級者";
    return "初級者";
  };
  
  // 熟練度の詳細説明
  const getLevelDescription = (level?: number) => {
    if (!level) return "";
    if (level >= 4) return "他者への指導・主導が可能";
    if (level >= 3) return "自律的に業務を遂行可能";
    if (level >= 2) return "基本的な業務を遂行可能";
    return "基礎知識・経験あり";
  };
  
  return (
    <div className="relative rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all duration-300 ring-1 ring-gray-200 hover:translate-y-[-2px]">
      <div className="flex items-center gap-3 mb-2">
        <TechStackIcon tech={name} className="text-blue-600 flex-shrink-0" size={24} />
        <p className="font-medium text-gray-800 text-sm">{name}</p>
      </div>
      
      <div className="space-y-2">
        {level && (
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600">熟練度</span>
              <span className="text-xs font-medium text-gray-800">{getLevelText(level)}</span>
            </div>
            <div className="mb-1">
              <span className="text-xs text-gray-500 italic">{getLevelDescription(level)}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full ${getLevelColor(level)} transition-all duration-500 ease-in-out`}
                style={{ width: `${(level / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {years && (
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600">経験年数</span>
              <span className="text-xs font-medium text-gray-800">{years}年</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-blue-400 transition-all duration-500 ease-in-out"
                style={{ width: `${Math.min(years / 10, 1) * 100}%` }}
              />
            </div>
          </div>
        )}
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
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.skills.map((skill, i) => (
            <ScrollReveal
              key={i}
              animation="fade-in"
              delay={0.05 * i}
            >
              <SkillBadge skill={skill} />
            </ScrollReveal>
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
      <div className="space-y-8 rounded-xl bg-gray-50/70 p-6 backdrop-blur-sm shadow-inner">
        {skills.map((category, index) => (
          <SkillCategory key={index} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;