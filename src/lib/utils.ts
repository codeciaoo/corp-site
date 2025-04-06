import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import { AlertCircle, CheckCircle2, FileText } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * セクションタイプの定義
 */
export type SectionType = "basicInfo" | "background" | "result" | "others";

/**
 * プロジェクトセクションの共通プロパティ
 */
export interface ProjectSectionProps {
  /**
   * セクションのタイプ
   */
  type: SectionType;
  /**
   * セクションのタイトル
   */
  title: string;
  /**
   * セクションの内容（HTMLコンテンツ）
   */
  content: string;
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * セクションタイプに基づく設定情報
 */
export const sectionConfig: Record<SectionType, {
  icon: React.FC<{ className?: string }>;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  badgeColor: string;
  badgeTextColor: string;
}> = {
  basicInfo: {
    icon: FileText,
    label: "プロジェクト基本情報",
    gradientFrom: "from-blue-50",
    gradientTo: "to-white",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    iconColor: "text-blue-700",
    badgeColor: "bg-blue-100/80",
    badgeTextColor: "text-blue-900",
  },
  background: {
    icon: AlertCircle,
    label: "課題の背景",
    gradientFrom: "from-red-50",
    gradientTo: "to-white",
    textColor: "text-red-800",
    borderColor: "border-red-200",
    iconColor: "text-red-700",
    badgeColor: "bg-red-100/80",
    badgeTextColor: "text-red-900",
  },
  result: {
    icon: CheckCircle2,
    label: "改善結果",
    gradientFrom: "from-teal-50",
    gradientTo: "to-white",
    textColor: "text-teal-800",
    borderColor: "border-teal-200",
    iconColor: "text-teal-700",
    badgeColor: "bg-teal-100/80",
    badgeTextColor: "text-teal-900",
  },
  others: {
    icon: FileText,
    label: "プロジェクト詳細",
    gradientFrom: "from-slate-50",
    gradientTo: "to-white",
    textColor: "text-slate-700",
    borderColor: "border-slate-200",
    iconColor: "text-slate-700",
    badgeColor: "bg-slate-100/80",
    badgeTextColor: "text-slate-900",
  }
};

/**
 * マークダウンからセクションを抽出する関数
 * @param htmlContent HTML形式のマークダウンコンテンツ
 * @returns 抽出されたセクション配列
 */
export function extractSectionsFromMarkdown(htmlContent: string): ProjectSectionProps[] {
  if (!htmlContent) return [];
  
  const sections: ProjectSectionProps[] = [];
  
  // h2タグでコンテンツを分割
  const h2Sections = htmlContent.split(/<h2[^>]*>/);
  
  h2Sections.forEach((section: string, index: number) => {
    if (index === 0) return; // 最初のセクションは無視（h1タグまでの部分）

    // セクションのタイトルを抽出
    const titleMatch = section.match(/^([^<]*)/);
    const sectionTitle = titleMatch ? titleMatch[1].trim() : '';
    
    // セクションの内容を取得
    const content = section.substring(section.indexOf('</h2>') + 5);

    // テーブルを含むコンテンツを処理
    const processedContent = content.replace(
      /<table([^>]*)>/g,
      '<div class="table-wrapper"><table$1>'
    ).replace(
      /<\/table>/g,
      '</table></div>'
    );

    // セクションタイプを判定
    let type: SectionType = "others";
    
    if (sectionTitle === 'お客様の情報' || sectionTitle === 'プロジェクト概要' || sectionTitle === 'CodeCiaoの役割') {
      type = "basicInfo";
    } else if (sectionTitle === 'ご相談の背景') {
      type = "background";
    } else if (sectionTitle === '取り組みの結果') {
      type = "result";
    }

    sections.push({
      type,
      title: sectionTitle,
      content: type === "basicInfo" 
        ? `<h2>${sectionTitle}</h2>${processedContent}` 
        : processedContent
    });
  });

  return sections;
}

/**
 * セクションタイプに合わせてリスト要素を拡張する関数
 * @param htmlContent HTML文字列
 * @param type セクションタイプ
 * @returns 拡張されたHTML文字列
 */
export function enhanceListItems(htmlContent: string, type: SectionType): string {
  if (!htmlContent) return "";
  
  switch (type) {
    case "basicInfo":
      return htmlContent.replace(
        /<li>/g, 
        '<li><span class="absolute left-0 text-blue-500">•</span>'
      );
    
    case "background":
      return htmlContent.replace(
        /<li>/g, 
        '<li><span class="absolute left-0 flex items-center justify-center top-1"><span class="animate-in fade-in slide-in-from-left-1 duration-300"><svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></span></span>'
      );
    
    case "result":
      return htmlContent.replace(
        /<li>/g, 
        '<li><span class="absolute left-0 flex items-center justify-center top-1"><span class="animate-in fade-in slide-in-from-left-1 duration-300"><svg class="h-5 w-5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13.5l2.5 2.5L16 9"/></svg></span></span>'
      );
    
    case "others":
    default:
      return htmlContent.replace(
        /<li>/g, 
        '<li><span class="absolute left-0 text-slate-400">▪️</span>'
      );
  }
}
