import type { FC } from "react";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

interface ThemeToggleProps {
  className?: string;
  defaultTheme?: Theme;
}

const ThemeToggle: FC<ThemeToggleProps> = ({
  className = "",
  defaultTheme = "light",
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return (localStorage.getItem("theme") as Theme) || defaultTheme;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  // Combine provided className with default classes
  const buttonClasses = `relative h-9 w-9 rounded-md ${className}`.trim();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={buttonClasses}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
    >
      <Sun
        className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
