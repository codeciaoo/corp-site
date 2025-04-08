import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headingClassName?: string;
  animation?: "fade" | "slide-up" | "slide-right" | "scale" | "zoom";
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  title,
  icon,
  className,
  contentClassName,
  headingClassName,
  animation = "slide-up",
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <ScrollReveal
      animation={animation}
      delay={delay}
      className={cn("w-full", className)}
    >
      <div className="space-y-4">
        {title && (
          <div className={cn("flex items-center gap-2", headingClassName)}>
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        )}

        {staggerChildren ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={contentClassName}
          >
            {React.Children.map(children, (child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={contentClassName}>{children}</div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default ScrollAnimatedSection;
