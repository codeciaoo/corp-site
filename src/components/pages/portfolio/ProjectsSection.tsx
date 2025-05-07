import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import ProjectInfoCard from "@/components/projects/ProjectInfoCard";
import TechStackIcon from "@/components/projects/TechStackIcon";
import { Briefcase, Code } from "lucide-react";
import type { TechInfo } from "@/components/projects/TechStackDisplay";

/**
 * プロジェクトエントリーの型定義
 */
export interface ProjectEntry {
  id: string;
  period: string;
  projectContent: string;
  role: {
    position: string;
    details: string[];
  };
  /**
   * 業界/クライアント情報
   */
  industry: string;
  /**
   * プロジェクト規模/チーム構成
   */
  scale: string;
  /**
   * 使用技術リスト
   */
  technologies: string[];
}

export interface ProjectsSectionProps {
  /**
   * プロジェクト一覧
   */
  projects: ProjectEntry[];
}

/**
 * HTML形式の役割詳細を生成
 */
const generateRoleDetailsHtml = (position: string, details: string[]): string => {
  return `
    <h2>役割: ${position}</h2>
    <ul>
      ${details.map(detail => `<li>${detail}</li>`).join('')}
    </ul>
  `;
};

// 技術スタックはTechStackDisplayコンポーネントで表示するため、HTML生成関数は不要になりました

/**
 * 技術名の配列をTechInfo配列に変換
 */
const convertToTechInfo = (technologies: string[]): TechInfo[] => {
  return technologies.map(tech => ({
    name: tech
  }));
};

/**
 * プロジェクトセクションコンポーネント
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
        <Briefcase className="h-6 w-6 text-teal-700" />
        プロジェクト実績
      </h2>
      
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            animation="slide-up"
            delay={0.1 * index}
          >
            <ProjectInfoCard
              title={project.projectContent}
              duration={project.period}
              client={project.industry}
              team={project.scale}
              content={generateRoleDetailsHtml(project.role.position, project.role.details)}
              technologies={convertToTechInfo(project.technologies)}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;