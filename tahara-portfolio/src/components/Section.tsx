import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "light" | "dark" | "white" | "gradient";
  container?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const Section = ({
  children,
  className,
  id,
  bg = "white",
  container = true,
  as: Component = "section",
}: SectionProps) => {
  const getBgColor = () => {
    switch (bg) {
      case "light":
        return "bg-gray-50";
      case "dark":
        return "bg-gray-900 text-white";
      case "gradient":
        return "bg-gradient-to-r from-blue-50 to-indigo-50";
      default:
        return "bg-white";
    }
  };

  return (
    <Component
      id={id}
      className={cn(
        getBgColor(),
        "py-12 md:py-20",
        className
      )}
    >
      {container ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
};

export default Section;