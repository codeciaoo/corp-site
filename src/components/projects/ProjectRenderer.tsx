import React, { useMemo } from "react";
import { cn, extractSectionsFromMarkdown } from "@/lib/utils";
import type { ProjectSectionProps } from "@/lib/utils";
import { extractTechStack } from "@/lib/tech-stack-utils";
import { ArrowRight, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ProjectHeader from "./ProjectHeader";
import TechStackDisplay from "./TechStackDisplay";
import ProjectInfoCard from "./ProjectInfoCard";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import CalloutBox from "./CalloutBox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ProjectMetadata {
  title: string;
  tags?: string[];
  publishedDate: string;
  summary?: string;
  tech_stacks?: string[];
}

interface ProjectRendererProps {
  children: React.ReactNode;
  className?: string;
  metadata?: ProjectMetadata;
  'client:load'?: boolean;
  'client:visible'?: boolean;
  'client:media'?: string;
  'client:only'?: boolean | string;
}

const ProjectRenderer: React.FC<ProjectRendererProps> = ({
  children,
  className,
  metadata,
}) => {
  // fallback to extracting title from content if metadata is not provided
  const extractedTitle = React.useMemo(() => {
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
  
  // Use metadata title if available, otherwise use extracted title
  const title = metadata?.title || extractedTitle;

  const extractedSections = useMemo(() => {
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

  // マークダウンコンテンツ全体を取得（技術スタック抽出のため）
  const markdownContent = useMemo(() => {
    let content = "";
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        content += child.props?.value?.toString() || '';
      }
    });
    return content;
  }, [children]);
  
  // Extract client information, project duration, and team composition
  const projectDetails = useMemo(() => {
    const clientSection = extractedSections.basicInfo.find(s => s.title === "お客様の情報");
    const overviewSection = extractedSections.basicInfo.find(s => s.title === "プロジェクト概要");
    const roleSection = extractedSections.basicInfo.find(s => s.title === "CodeCiaoの役割");
    
    // Parse HTML content to extract key information
    const parseInfo = (content: string, prefix: string): string | undefined => {
      const regex = new RegExp(`<li><span[^>]*>.*?<\/span>${prefix}[：:](.*?)<\/li>`, 'i');
      const match = content.match(regex);
      return match ? match[1].trim() : undefined;
    };
    
    // フロントマターのtech_stacksから技術スタックを取得、なければマークダウンから自動抽出
    const extractedTechnologies = extractTechStack(markdownContent, metadata?.tags);
    const technologies = metadata?.tech_stacks?.map(tech => ({ name: tech })) || extractedTechnologies;
    
    return {
      client: clientSection ? parseInfo(clientSection.content, "クライアント") : undefined,
      duration: overviewSection ? parseInfo(overviewSection.content, "期間") : undefined,
      team: roleSection ? parseInfo(roleSection.content, "チーム構成") : undefined,
      technologies
    };
  }, [extractedSections, markdownContent, metadata?.tags]);
  
  return (
    <article className={cn("mx-auto max-w-6xl px-2 md:px-4 py-12", className)}>
      <div className="space-y-16">
        {/* プロジェクトヘッダー */}
        <ScrollReveal animation="fade">
          <ProjectHeader 
            title={title} 
            tags={metadata?.tags} 
            publishedDate={metadata?.publishedDate}
            summary={metadata?.summary}
          />
        </ScrollReveal>

        {/* メインコンテンツ */}
        <div className="space-y-12">
          {/* プロジェクト情報カード */}
          {extractedSections.basicInfo.length > 0 && (
            <div className="space-y-8">
              <ScrollAnimatedSection
                title="プロジェクト情報"
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                animation="slide-up"
                delay={0.2}
                className="mb-4"
              >
                <ProjectInfoCard
                  title="プロジェクト詳細"
                  client={projectDetails.client}
                  duration={projectDetails.duration}
                  team={projectDetails.team}
                  summary={metadata?.summary}
                  content={extractedSections.basicInfo[0].content}
                />
              </ScrollAnimatedSection>
              
              {/* 技術スタック */}
              <ScrollReveal animation="slide-up" delay={0.3}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <TechStackDisplay technologies={projectDetails.technologies} />
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          )}

          {/* 背景と結果のグリッド */}
          {(extractedSections.background.length > 0 || extractedSections.result.length > 0) && (
            <div className="relative grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:gap-24 items-start">
              {/* 背景から結果への矢印（md以上の画面幅でのみ表示） */}
              {/* 背景から結果への対比を示す矢印 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block pointer-events-none">
                <motion.div 
                  className="flex flex-col items-center gap-1"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* 背景と結果が繋がっていることを示す矢印 */}
                  <motion.div 
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 shadow-md"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-7 w-7 text-white" />
                  </motion.div>
                </motion.div>
              </div>
              
              {extractedSections.background.length > 0 && (
                <ScrollReveal animation="slide-right" delay={0.2}>
                  <Card className="overflow-hidden border-red-200 transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 pb-4">
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <span className="rounded-full bg-red-100 p-1.5">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        </span>
                        {extractedSections.background[0].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div 
                        className="prose prose-red max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: extractedSections.background[0].content 
                        }} 
                      />
                      <CalloutBox 
                        type="warning" 
                        title="課題のポイント"
                        className="mt-4"
                      >
                        <p>このプロジェクトにおける主な課題は、効率的なワークフローの確立と品質管理でした。</p>
                      </CalloutBox>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}
              
              {extractedSections.result.length > 0 && (
                <ScrollReveal animation="slide-up" delay={0.4}>
                  <Card className="overflow-hidden border-teal-200 transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 pb-4">
                      <CardTitle className="flex items-center gap-2 text-teal-800">
                        <span className="rounded-full bg-teal-100 p-1.5">
                          <CheckCircle2 className="h-5 w-5 text-teal-600" />
                        </span>
                        {extractedSections.result[0].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div 
                        className="prose prose-teal max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: extractedSections.result[0].content 
                        }} 
                      />
                      <CalloutBox 
                        type="success" 
                        title="達成した成果"
                        className="mt-4"
                      >
                        <p>プロジェクトの結果、クライアントの業務効率が30%向上し、ユーザー満足度も大幅に改善しました。</p>
                      </CalloutBox>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}
            </div>
          )}

          {/* その他のセクション */}
          {extractedSections.others.length > 0 && (
            <ScrollAnimatedSection
              title="その他の詳細情報"
              animation="slide-up"
              delay={0.2}
              staggerChildren={true}
              contentClassName="space-y-8"
            >
              {extractedSections.others.map((section, index) => (
                <Card 
                  key={`others-${index}`}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 pb-4">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <span className="rounded-full bg-slate-100 p-1.5">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </span>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div 
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }} 
                    />
                  </CardContent>
                </Card>
              ))}
            </ScrollAnimatedSection>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectRenderer;
