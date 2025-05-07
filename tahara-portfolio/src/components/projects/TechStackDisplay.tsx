import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TechStackIcon from "./TechStackIcon";
import { Info } from "lucide-react";

export interface TechInfo {
  name: string;
  description?: string;
  icon?: string;
}

interface TechStackDisplayProps {
  technologies: TechInfo[];
  className?: string;
}

const TechStackDisplay: React.FC<TechStackDisplayProps> = ({
  technologies,
  className,
}) => {
  const [selectedTech, setSelectedTech] = useState<TechInfo | null>(null);

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-gray-800">使用技術</h3>
      
      <motion.div 
        className="flex flex-wrap gap-3" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <motion.div
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm transition-all",
                selectedTech?.name === tech.name && "border-blue-300 bg-blue-50 shadow-md"
              )}
              onClick={() => setSelectedTech(tech.name === selectedTech?.name ? null : tech)}
            >
              <TechStackIcon 
                tech={tech.name} 
                className="text-blue-600" 
                size={18}
              />
              <span>{tech.name}</span>
              {tech.description && (
                <Info className="h-4 w-4 text-gray-400" />
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech Description Panel */}
      {selectedTech && selectedTech.description && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-gray-700"
        >
          <h4 className="mb-1 font-medium text-blue-700">{selectedTech.name}</h4>
          <p>{selectedTech.description}</p>
        </motion.div>
      )}
    </div>
  );
};

export default TechStackDisplay;