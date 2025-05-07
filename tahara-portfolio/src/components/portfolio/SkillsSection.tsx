import React from "react";
import type { SkillCategory } from "@/lib/types";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <div className="mb-12">
      <h3 className="mb-6 text-2xl font-semibold text-gray-800">スキル</h3>
      <div className="space-y-8">
        {skills.map((category, index) => (
          <div key={index} className="rounded-lg border bg-white p-6 shadow-sm">
            <h4 className="mb-4 text-lg font-medium text-blue-700">
              {category.category}
            </h4>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                      {skill.name}
                    </span>
                    {skill.years && (
                      <span className="text-sm text-gray-500">
                        {skill.years}年
                      </span>
                    )}
                  </div>
                  
                  {skill.level && (
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;