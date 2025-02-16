import React from "react";
import { cn } from "@/lib/utils";

interface ProjectRendererProps {
  children: React.ReactNode;
  className?: string;
}

const ProjectRenderer: React.FC<ProjectRendererProps> = ({
  children,
  className,
}) => {
  const sections = React.useMemo(() => {
    const result = {
      background: [] as React.ReactNode[],
      result: [] as React.ReactNode[],
      others: [] as React.ReactNode[],
    };

    let currentHeading = "";
    let contentBuffer: React.ReactNode[] = [];

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) return;

      if (child.type === "h2") {
        // 前のセクションのコンテンツを保存
        if (contentBuffer.length > 0) {
          if (currentHeading === "ご相談の背景") {
            result.background = contentBuffer;
          } else if (currentHeading === "導入結果") {
            result.result = contentBuffer;
          } else {
            result.others = result.others.concat(contentBuffer);
          }
        }

        // 新しいセクションの開始
        currentHeading = child.props.children;
        contentBuffer = [];
      }

      contentBuffer.push(child);
    });

    // 最後のセクションのコンテンツを保存
    if (contentBuffer.length > 0) {
      if (currentHeading === "ご相談の背景") {
        result.background = contentBuffer;
      } else if (currentHeading === "導入結果") {
        result.result = contentBuffer;
      } else {
        result.others = result.others.concat(contentBuffer);
      }
    }

    return result;
  }, [children]);

  return (
    <article className={cn("mx-auto max-w-6xl px-4 py-12", className)}>
      <div className="space-y-16">
        {/* プロジェクトの概要セクション */}
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">
            {React.Children.map(children, child => {
              if (React.isValidElement(child) && child.type === "h1") {
                return child.props.children;
              }
              return null;
            })?.[0] || ""}
          </h1>
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-16">
          {/* 背景と結果のグリッド */}
          {(sections.background.length > 0 || sections.result.length > 0) && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {sections.background.length > 0 && (
                <div className="prose prose-slate max-w-none rounded-xl bg-white p-10 shadow-lg">
                  {sections.background}
                </div>
              )}
              {sections.result.length > 0 && (
                <div className="prose prose-slate max-w-none rounded-xl bg-white p-10 shadow-lg">
                  {sections.result}
                </div>
              )}
            </div>
          )}

          {/* その他のセクション */}
          {sections.others.length > 0 && (
            <div className="prose prose-slate max-w-none rounded-xl bg-white p-10 shadow-lg">
              {sections.others}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectRenderer;
