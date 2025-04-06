import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { cn } from '../../lib/utils';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  active?: boolean;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  icon,
  title,
  description,
  className,
  iconClassName,
  onClick,
  active = false,
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.3 } 
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <Card className={cn(
        'overflow-hidden border-0 transition-all duration-300',
        active 
          ? 'ring-2 ring-teal-600 ring-offset-2 shadow-xl' 
          : 'shadow-md hover:shadow-xl'
      )}>
        <div className="flex flex-col h-[180px]">
          <CardHeader className="pb-1 pt-3">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                {React.isValidElement(icon) 
                  ? React.cloneElement(icon as React.ReactElement, { 
                      className: cn('h-5 w-5 text-teal-700', iconClassName) 
                    })
                  : icon}
              </div>
              <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pt-0 pb-3">
            <p className="text-sm text-gray-700 leading-relaxed overflow-hidden line-clamp-3">{description}</p>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};
