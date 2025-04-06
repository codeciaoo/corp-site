import React from "react";
import { cn, enhanceListItems, sectionConfig } from "@/lib/utils";
import type { ProjectSectionProps } from "@/lib/utils";

/**
 * プロジェクト背景コンポーネント
 * 「ご相談の背景」セクションを表示
 */
const ProjectBackground: React.FC<ProjectSectionProps> = ({
  title,
  content,
  className,
}) => {
  const config = sectionConfig.background;
  const enhancedContent = enhanceListItems(content, "background");
  const { icon: Icon } = config;

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl h-full",
      className
    )}>
      <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-red-100/50 transition-transform duration-300 group-hover:scale-110" />
      <div className="relative">
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100/80 px-4 py-1 backdrop-blur">
            <Icon className="h-4 w-4 text-red-700" />
            <span className="text-sm font-medium text-red-900">{config.label}</span>
          </div>
          <h2 className="text-2xl font-bold text-red-800">{title}</h2>
        </div>
        <div className="prose prose-slate max-w-none [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-7 [&_table]:table-wrapper">
          <div dangerouslySetInnerHTML={{ __html: enhancedContent }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectBackground;
