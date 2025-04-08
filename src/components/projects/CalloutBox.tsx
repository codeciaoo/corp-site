import React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "idea";

interface CalloutBoxProps {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}

const CalloutBox: React.FC<CalloutBoxProps> = ({
  children,
  type = "info",
  title,
  className,
}) => {
  const styles = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <Info className="h-5 w-5 text-blue-500" />,
      title: title || "情報",
      titleColor: "text-blue-700",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      title: title || "注意",
      titleColor: "text-amber-700",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      title: title || "成功",
      titleColor: "text-green-700",
    },
    idea: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
      title: title || "アイデア",
      titleColor: "text-purple-700",
    },
  };

  const { bg, border, icon, title: defaultTitle, titleColor } = styles[type];

  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-sm",
        bg,
        border,
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className={cn("font-medium", titleColor)}>{title || defaultTitle}</h4>
      </div>
      <div className="prose-sm">{children}</div>
    </div>
  );
};

export default CalloutBox;
