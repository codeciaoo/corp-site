import type { ReactNode } from "react";

type BgColor = "white" | "light" | "dark";

const bgColors = {
  white: "bg-white",
  light: "bg-teal-100/10",
  dark: "bg-teal-100/20",
} as const;

const Section = ({
  children,
  ariaLabel,
  bg = "white",
  className,
}: {
  children: ReactNode;
  ariaLabel?: string;
  bg?: BgColor;
  className?: string;
}) => (
  <section
    className={`w-full border border-teal-600/10 ${bgColors[bg]} ${className || ''}`}
    aria-label={ariaLabel}
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

export default Section;
