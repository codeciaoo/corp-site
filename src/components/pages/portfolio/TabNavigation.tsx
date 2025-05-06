import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Code, Briefcase, GraduationCap, MessageSquareQuote } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabNavigationProps {
  /**
   * タブ項目の配列
   */
  tabs: TabItem[];
  /**
   * アクティブなタブID
   */
  activeTab: string;
  /**
   * タブ切り替え時のコールバック
   */
  onChange: (id: string) => void;
}

/**
 * タブナビゲーションコンポーネント
 */
const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // アクティブタブ変更時のスクロールアニメーション
  useEffect(() => {
    if (tabsRef.current && activeTabRef.current) {
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const activeTabRect = activeTabRef.current.getBoundingClientRect();
      
      const scrollLeft = activeTabRect.left - tabsRect.left - (tabsRect.width - activeTabRect.width) / 2;
      
      tabsRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
    <div className="sticky top-0 z-10 mb-8 w-full bg-white pb-2 pt-2 shadow-sm">
      <div 
        ref={tabsRef}
        className="flex overflow-x-auto whitespace-nowrap py-1 scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={tab.id === activeTab ? activeTabRef : undefined}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex min-w-fit flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all md:flex-none",
              tab.id === activeTab
                ? "border-b-2 border-teal-500 text-teal-600"
                : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            )}
            role="tab"
            aria-selected={tab.id === activeTab}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// デフォルトのタブ項目
export const defaultTabs: TabItem[] = [
  {
    id: "skills",
    label: "スキル",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "career",
    label: "経歴・資格",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    id: "projects",
    label: "プロジェクト実績",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: "pr",
    label: "自己PR",
    icon: <MessageSquareQuote className="h-4 w-4" />,
  },
];

export default TabNavigation;