import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Tag } from "lucide-react";

interface ProjectHeaderProps {
  /**
   * プロジェクトのタイトル
   */
  title: string;
  /**
   * プロジェクトのタグ一覧
   */
  tags?: string[];
  /**
   * 公開日 (フォーマット済み)
   */
  publishedDate?: string;
  /**
   * プロジェクト概要
   */
  summary?: string;
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * プロジェクトヘッダーコンポーネント - タイトルとメタデータを表示
 */
const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  tags,
  publishedDate,
  summary,
  className,
}) => {
  return (
    <div className={cn("mx-auto max-w-full", className)}>
      <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
        {publishedDate && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>
        )}
      </div>
      
      <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl text-center">
        {title}
      </h1>
      
      {summary && (
        <p className="mb-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
          {summary}
        </p>
      )}
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {tags.map((tag, index) => (
            <div 
              key={`tag-${index}`}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
