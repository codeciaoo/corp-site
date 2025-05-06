import React, { useState, useRef, useEffect } from "react";
import type { MemberPortfolio } from "./membersPortfolioData";
import ProfileHeader from "./ProfileHeader";
import SkillsSection from "./SkillsSection";
import CareerSection from "./CareerSection";
import ProjectsSection from "./ProjectsSection";
import SelfPrSection from "./SelfPrSection";
import TabNavigation, { defaultTabs } from "./TabNavigation";

export interface MemberPortfolioProps {
  /**
   * メンバーポートフォリオデータ
   */
  member: MemberPortfolio;
}

/**
 * メンバーポートフォリオページのメインコンポーネント
 */
const MemberPortfolioComponent: React.FC<MemberPortfolioProps> = ({ member }) => {
  // アクティブなタブ状態
  const [activeTab, setActiveTab] = useState("skills");
  
  // 各セクションへの参照
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    skills: null,
    career: null,
    projects: null,
    pr: null,
  });
  
  // タブ切り替え時のスクロール処理
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // 対象セクションへスクロール
    const section = sectionsRef.current[tabId];
    if (section) {
      // ヘッダーの高さを考慮したオフセット
      const offset = 80;
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };
  
  // スクロールイベントハンドラ
  useEffect(() => {
    const handleScroll = () => {
      // 現在表示中のセクションを判定
      const sections = Object.entries(sectionsRef.current);
      
      for (const [id, section] of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // 画面上部に表示されているセクションをアクティブに
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveTab(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* プロフィールヘッダー */}
      <ProfileHeader
        name={member.name}
        role={member.role}
        image={member.image}
        bio={member.fullBio}
        contactInfo={member.contactInfo}
      />
      
      {/* タブナビゲーション */}
      <TabNavigation
        tabs={defaultTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />
      
      {/* スキルセクション */}
      <div ref={(el) => (sectionsRef.current.skills = el)}>
        <SkillsSection skills={member.detailedSkills} />
      </div>
      
      {/* 経歴セクション */}
      <div ref={(el) => (sectionsRef.current.career = el)}>
        <CareerSection
          career={member.detailedCareer}
          education={member.education}
          certifications={member.certifications}
          organizationLogos={member.organizationLogos}
        />
      </div>
      
      {/* プロジェクトセクション */}
      <div ref={(el) => (sectionsRef.current.projects = el)}>
        <ProjectsSection projects={member.projectsTable} />
      </div>
      
      {/* 自己PRセクション */}
      <div ref={(el) => (sectionsRef.current.pr = el)}>
        <SelfPrSection content={member.selfPr} />
      </div>
    </div>
  );
};

export default MemberPortfolioComponent;