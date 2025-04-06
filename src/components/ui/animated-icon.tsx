import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  backgroundClassName?: string;
  iconClassName?: string;
  pulse?: boolean;
  hover?: boolean;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  size = 'md',
  backgroundClassName,
  iconClassName,
  pulse = false,
  hover = true,
  className,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const pulseAnimation = {
    animate: pulse ? {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    } : {},
  };

  const hoverAnimation = {
    whileHover: hover ? {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.3 },
    } : {},
  };

  return (
    <motion.div
      className={cn(
        'flex items-center justify-center rounded-full bg-teal-100',
        sizeClasses[size],
        backgroundClassName,
        className
      )}
      {...pulseAnimation}
      {...hoverAnimation}
    >
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement, {
            className: cn(iconSizeClasses[size], 'text-teal-700', iconClassName),
          })
        : icon}
    </motion.div>
  );
};
