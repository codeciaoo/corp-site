import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'scale' | 'zoom' | 'fade-in';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  margin?: string | number | { top?: number | string; bottom?: number | string; left?: number | string; right?: number | string; };
}

export function ScrollReveal({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  once = true,
  className = '',
  margin = '-100px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Cast margin to avoid TypeScript errors with framer-motion's useInView
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { margin: margin as any, once });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide-up' ? 50 : 0,
      x: animation === 'slide-right' ? -50 : 0,
      scale: animation === 'scale' || animation === 'zoom' ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}