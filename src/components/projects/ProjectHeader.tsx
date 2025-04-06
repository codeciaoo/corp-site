import React from "react";
import { cn } from "@/lib/utils";

interface ProjectHeaderProps {
  /**
   * プロジェクトのタイトル
   */
  title: string;
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * プロジェクトヘッダーコンポーネント - タイトルを表示
 */
const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  className,
}) => {
  return (
    <div className={cn("mx-auto max-w-full text-center", className)}>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl text-center">
        {title}
      </h1>
    </div>
  );
};

export default ProjectHeader;
