import React from "react";
import { cn, extractSectionsFromMarkdown } from "@/lib/utils";
import type { ProjectSectionProps } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import ProjectHeader from "./ProjectHeader";
import ProjectBasicInfo from "./ProjectBasicInfo";
import ProjectBackground from "./ProjectBackground";
import ProjectResult from "./ProjectResult";
import ProjectDetail from "./ProjectDetail";

interface ProjectRendererProps {
  children: React.ReactNode;
  className?: string;
}

const ProjectRenderer: React.FC<ProjectRendererProps> = ({
  children,
  className,
}) => {
  const title = React.useMemo(() => {
    let projectTitle = "";
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        const htmlContent = child.props?.value?.toString() || '';
        const match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
        if (match) {
          projectTitle = match[1];
          return;
        }
      }
    });
    return projectTitle;
  }, [children]);

  const extractedSections = React.useMemo(() => {
    let allSections: ProjectSectionProps[] = [];
    
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) return;
      
      // StaticHtmlコンポーネントからHTML文字列を取得
      const htmlContent = child.props?.value?.toString() || '';
      if (htmlContent) {
        allSections = extractSectionsFromMarkdown(htmlContent);
      }
    });
    
    return {
      basicInfo: allSections.filter(s => s.type === "basicInfo"),
      background: allSections.filter(s => s.type === "background"),
      result: allSections.filter(s => s.type === "result"),
      others: allSections.filter(s => s.type === "others"),
    };
  }, [children]);
  
  return (
    <article className={cn("mx-auto max-w-6xl px-2 md:px-4 py-12", className)}>
      <div className="space-y-16">
        {/* プロジェクトヘッダー */}
        <ProjectHeader title={title} />

        {/* メインコンテンツ */}
        <div className="space-y-8">
          {/* プロジェクト基本情報 */}
          {extractedSections.basicInfo.length > 0 && extractedSections.basicInfo.map((section, index) => (
            <ProjectBasicInfo
              key={`basicInfo-${index}`}
              type={section.type}
              title={section.title}
              content={section.content}
            />
          ))}

          {/* 背景と結果のグリッド */}
          {(extractedSections.background.length > 0 || extractedSections.result.length > 0) && (
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              {/* 背景から結果への矢印（md以上の画面幅でのみ表示） */}
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-teal-50 shadow-lg">
                  <ArrowRight className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              
              {extractedSections.background.length > 0 && 
                <ProjectBackground
                  type={extractedSections.background[0].type}
                  title={extractedSections.background[0].title}
                  content={extractedSections.background[0].content}
                />
              }
              
              {extractedSections.result.length > 0 && 
                <ProjectResult
                  type={extractedSections.result[0].type}
                  title={extractedSections.result[0].title}
                  content={extractedSections.result[0].content}
                />
              }
            </div>
          )}

          {/* その他のセクション */}
          {extractedSections.others.length > 0 && (
            <div className="space-y-12">
              {extractedSections.others.map((section, index) => (
                <ProjectDetail
                  key={`others-${index}`}
                  type={section.type}
                  title={section.title}
                  content={section.content}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectRenderer;
