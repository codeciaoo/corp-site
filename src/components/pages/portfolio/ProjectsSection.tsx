import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import ProjectInfoCard from "@/components/projects/ProjectInfoCard";
import { Briefcase, Code } from "lucide-react";

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
  industry: string;
  scale: string;
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

/**
 * HTML形式の技術スタックを生成
 */
const generateTechnologiesHtml = (technologies: string[]): string => {
  return `
    <h2>使用技術</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
      ${technologies.map(tech => `
        <span style="display: inline-flex; align-items: center; border-radius: 9999px; 
        background-color: rgba(236, 254, 255, 1); color: rgba(8, 145, 178, 1); font-size: 0.75rem; 
        font-weight: 500; padding: 0.25rem 0.75rem;">
          ${tech}
        </span>
      `).join('')}
    </div>
  `;
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
              content={`
                ${generateRoleDetailsHtml(project.role.position, project.role.details)}
                ${generateTechnologiesHtml(project.technologies)}
              `}
              technologies={project.technologies.map(tech => ({ name: tech }))}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;