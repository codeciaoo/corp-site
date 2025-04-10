import React from "react";
import { cn, enhanceListItems, sectionConfig } from "@/lib/utils";
import type { ProjectSectionProps } from "@/lib/utils";

/**
 * プロジェクト詳細コンポーネント
 * その他のセクションを表示
 */
const ProjectDetail: React.FC<ProjectSectionProps> = ({
  content,
  className,
}) => {
  const config = sectionConfig.others;
  const enhancedContent = enhanceListItems(content, "others");
  const { icon: Icon } = config;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl",
      className
    )}>
      <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-slate-100/50 transition-transform duration-300 group-hover:scale-110" />
      <div className="relative">
        <div className="mb-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-4 py-1 backdrop-blur">
            <Icon className="h-4 w-4 text-slate-700" />
            <span className="text-sm font-medium text-slate-900">{config.label}</span>
          </div>
        </div>
        <div className="prose prose-slate prose-headings:text-base prose-headings:font-semibold prose-headings:text-slate-700 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-1 prose-h2:pt-0 prose-p:text-slate-600 prose-strong:text-slate-700 prose-ul:space-y-1 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-6 max-w-none [&_table]:table-wrapper">
          <div dangerouslySetInnerHTML={{ __html: enhancedContent }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
