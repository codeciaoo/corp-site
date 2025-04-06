import React from "react";
import { cn, enhanceListItems, sectionConfig } from "@/lib/utils";
import type { ProjectSectionProps } from "@/lib/utils";

/**
 * プロジェクト基本情報コンポーネント
 * お客様の情報、プロジェクト概要、CodeCiaoの役割などを表示
 */
const ProjectBasicInfo: React.FC<ProjectSectionProps> = ({
  content,
  className,
}) => {
  const config = sectionConfig.basicInfo;
  const enhancedContent = enhanceListItems(content, "basicInfo");
  const { icon: Icon } = config;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl",
      className
    )}>
      <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-blue-100/50 transition-transform duration-300 group-hover:scale-110" />
      <div className="relative">
        <div className="mb-0.5">
          <div className="mb-0 inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-4 py-1 backdrop-blur">
            <Icon className="h-4 w-4 text-blue-700" />
            <span className="text-sm font-medium text-blue-900">{config.label}</span>
          </div>
        </div>
        <div className="prose prose-slate prose-headings:text-lg prose-headings:font-semibold prose-headings:text-blue-700 prose-h2:border-b prose-h2:border-blue-200 prose-h2:pb-1 prose-h2:pt-0 prose-p:text-slate-600 prose-strong:text-blue-700 prose-ul:space-y-1 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-4 md:pl-6 max-w-none [&_table]:table-wrapper">
          <div dangerouslySetInnerHTML={{ __html: enhancedContent }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectBasicInfo;
