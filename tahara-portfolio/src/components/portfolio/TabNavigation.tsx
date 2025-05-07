import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export interface NavigationTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export const defaultTabs: NavigationTab[] = [
  { id: "skills", label: "スキル" },
  { id: "career", label: "経歴" },
  { id: "projects", label: "プロジェクト" },
  { id: "pr", label: "自己PR" },
];

interface TabNavigationProps {
  tabs: NavigationTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div className={cn("sticky top-0 z-10 bg-white py-4 shadow-sm", className)}>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={onChange}
        className="w-full"
      >
        <TabsList className="flex w-full justify-around rounded-lg bg-gray-100 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-all",
                "data-[state=active]:bg-white data-[state=active]:shadow-sm",
                "hover:bg-gray-50 data-[state=active]:hover:bg-white"
              )}
            >
              {tab.icon && <span className="mr-1">{tab.icon}</span>}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;