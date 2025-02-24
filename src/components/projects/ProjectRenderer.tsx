import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, FileText, ArrowRight } from "lucide-react";

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
      basicInfo: [] as React.ReactNode[],
      background: [] as React.ReactNode[],
      result: [] as React.ReactNode[],
      others: [] as React.ReactNode[],
    };

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) return;

      // StaticHtmlコンポーネントからHTML文字列を取得
      const htmlContent = child.props?.value?.toString() || '';
      
      // h2タグでコンテンツを分割
      const h2Sections = htmlContent.split(/<h2[^>]*>/);
      
      h2Sections.forEach((section: string, index: number) => {
        if (index === 0) return; // 最初のセクションは無視（h1タグまでの部分）

        // セクションのタイトルを抽出
        const titleMatch = section.match(/^([^<]*)/);
        const sectionTitle = titleMatch ? titleMatch[1].trim() : '';
        
        // セクションの内容を取得
        const content = section.substring(section.indexOf('</h2>') + 5);

        if (sectionTitle === 'お客様の情報' || sectionTitle === 'プロジェクト概要' || sectionTitle === 'CodeCiaoの役割') {
          result.basicInfo.push(
            <div key={`basicInfo-${index}`} dangerouslySetInnerHTML={{ __html: `<h2>${sectionTitle}</h2>${content}` }} />
          );
        } else if (sectionTitle === 'ご相談の背景') {
          result.background.push(
            <div key={`background-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
          );
        } else if (sectionTitle === '取り組みの結果') {
          result.result.push(
            <div key={`result-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
          );
        } else {
          // テーブルを含むコンテンツを処理
          const processedContent = content.replace(
            /<table([^>]*)>/g,
            '<div class="table-wrapper"><table$1>'
          ).replace(
            /<\/table>/g,
            '</table></div>'
          );

          result.others.push(
            <div key={`others-${index}`} dangerouslySetInnerHTML={{ 
              __html: `<h2>${sectionTitle}</h2>${processedContent}`
            }} />
          );
        }
      });
    });

    return result;
  }, [children]);

  return (
    <article className={cn("mx-auto max-w-6xl px-2 md:px-4 py-12", className)}>
      <div className="space-y-16">
        {/* プロジェクトの概要セクション */}
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                const htmlContent = child.props?.value?.toString() || '';
                const match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
                return match ? match[1] : '';
              }
              return null;
            })?.[0] || ""}
          </h1>
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-8">
          {/* プロジェクト基本情報 */}
          {sections.basicInfo.length > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-blue-100/50 transition-transform duration-300 group-hover:scale-110" />
              <div className="relative">
                <div className="mb-0.5">
                  <div className="mb-0 inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-4 py-1 backdrop-blur">
                    <FileText className="h-4 w-4 text-blue-700" />
                    <span className="text-sm font-medium text-blue-900">プロジェクト基本情報</span>
                  </div>
                </div>
                  <div className="prose prose-slate prose-headings:text-lg prose-headings:font-semibold prose-headings:text-blue-700 prose-h2:border-b prose-h2:border-blue-200 prose-h2:pb-1 prose-h2:pt-0 prose-p:text-slate-600 prose-strong:text-blue-700 prose-ul:space-y-1 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-4 md:pl-6 max-w-none [&_table]:table-wrapper">
                  {sections.basicInfo.map((section, index) => {
                    if (React.isValidElement(section) && section.props?.dangerouslySetInnerHTML?.__html) {
                      return (
                        <div 
                          key={`basicInfo-${index}`} 
                          dangerouslySetInnerHTML={{ 
                            __html: section.props.dangerouslySetInnerHTML.__html.replace(
                              /<li>/g, 
                              '<li><span class="absolute left-0 text-blue-500">•</span>'
                            )
                          }} 
                        />
                      );
                    }
                    return section;
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 背景と結果のグリッド */}
          {(sections.background.length > 0 || sections.result.length > 0) && (
            <div className="relative grid grid-cols-1 gap-16 md:grid-cols-2">
              {/* 背景から結果への矢印（md以上の画面幅でのみ表示） */}
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-teal-50 shadow-lg">
                  <ArrowRight className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              
              {sections.background.length > 0 && (
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-red-100/50 transition-transform duration-300 group-hover:scale-110" />
                  <div className="relative">
                    <div className="mb-8">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100/80 px-4 py-1 backdrop-blur">
                        <AlertCircle className="h-4 w-4 text-red-700" />
                        <span className="text-sm font-medium text-red-900">課題の背景</span>
                      </div>
                      <h2 className="text-2xl font-bold text-red-800">ご相談の背景</h2>
                    </div>
                    <div className="prose prose-slate max-w-none [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-6 [&_table]:table-wrapper">
                      <div dangerouslySetInnerHTML={{ 
                        __html: sections.background.map(section => {
                          if (React.isValidElement(section) && section.props?.dangerouslySetInnerHTML?.__html) {
                            return section.props.dangerouslySetInnerHTML.__html.replace(/<li>/g, '<li><span class="absolute left-0 text-red-500">❌</span>');
                          }
                          return '';
                        })[0] || ''
                      }} />
                    </div>
                  </div>
                </div>
              )}
              {sections.result.length > 0 && (
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-teal-100/50 transition-transform duration-300 group-hover:scale-110" />
                  <div className="relative">
                    <div className="mb-8">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1 backdrop-blur">
                        <CheckCircle2 className="h-4 w-4 text-teal-700" />
                        <span className="text-sm font-medium text-teal-900">改善結果</span>
                      </div>
                      <h2 className="text-2xl font-bold text-teal-800">取り組みの結果</h2>
                    </div>
                    <div className="prose prose-slate max-w-none [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-6">
                      <div dangerouslySetInnerHTML={{ 
                        __html: sections.result.map(section => {
                          if (React.isValidElement(section) && section.props?.dangerouslySetInnerHTML?.__html) {
                            return section.props.dangerouslySetInnerHTML.__html.replace(/<li>/g, '<li><span class="absolute left-0 text-teal-500">✅</span>');
                          }
                          return '';
                        })[0] || ''
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* その他のセクション */}
          {sections.others.length > 0 && (
            <div className="space-y-12">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-6 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-slate-100/50 transition-transform duration-300 group-hover:scale-110" />
                <div className="relative">
                  <div className="mb-0">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-4 py-1 backdrop-blur">
                      <FileText className="h-4 w-4 text-slate-700" />
                      <span className="text-sm font-medium text-slate-900">プロジェクト詳細</span>
                    </div>
                  </div>
                  <div className="prose prose-slate prose-headings:text-lg prose-headings:font-semibold prose-headings:text-slate-700 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-1 prose-h2:pt-0 prose-p:text-slate-600 prose-strong:text-slate-700 prose-ul:space-y-1 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-6 max-w-none [&_table]:table-wrapper">
                    <div dangerouslySetInnerHTML={{ 
                      __html: sections.others.map(section => {
                        if (React.isValidElement(section) && section.props?.dangerouslySetInnerHTML?.__html) {
                          return section.props.dangerouslySetInnerHTML.__html.replace(/<li>/g, '<li><span class="absolute left-0 text-slate-400">▪️</span>');
                        }
                        return '';
                      }).join('')
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectRenderer;
