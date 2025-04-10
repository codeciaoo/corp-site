import React from "react";
import { Clock, Building, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface ProjectInfoCardProps {
  /**
   * プロジェクトのタイトル
   */
  title: string;
  /**
   * クライアント情報
   */
  client?: string;
  /**
   * プロジェクト期間
   */
  duration?: string;
  /**
   * プロジェクトチーム
   */
  team?: string;
  /**
   * プロジェクト概要
   */
  summary?: string;
  /**
   * その他の情報（HTML形式）
   */
  content?: string;
  /**
   * テクノロジースタック
   */
  technologies?: Array<{name: string; description?: string; icon?: string}>;
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * プロジェクト情報カードコンポーネント - 拡張されたプロジェクト基本情報
 */
const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({
  title,
  client,
  duration,
  team,
  summary,
  content,
  className,
}) => {
  return (
    <ScrollReveal 
      animation="slide-up" 
      className={cn("w-full", className)}
      delay={0.1}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <span className="rounded-full bg-blue-100 p-1.5">
              <Building className="h-5 w-5 text-blue-600" />
            </span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {(client || duration || team) && (
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-3">
              {client && (
                <div className="flex items-start gap-2">
                  <Building className="mt-0.5 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">クライアント</div>
                    <div className="text-sm text-gray-800">{client}</div>
                  </div>
                </div>
              )}
              
              {duration && (
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">期間</div>
                    <div className="text-sm text-gray-800">{duration}</div>
                  </div>
                </div>
              )}
              
              {team && (
                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">チーム構成</div>
                    <div className="text-sm text-gray-800">{team}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {summary && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-blue-700 border-b border-blue-200 pb-1">概要</h3>
              <p className="text-gray-600">{summary}</p>
            </div>
          )}
          
          {content && (
            <div 
              className="prose prose-blue max-w-none prose-h2:text-base prose-h2:font-semibold prose-h2:text-blue-700 prose-h2:border-b prose-h2:border-blue-200 prose-h2:pb-1"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          )}
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default ProjectInfoCard;
