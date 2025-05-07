import React from "react";
import type { ProjectEntry } from "@/lib/types";

interface ProjectsSectionProps {
  projects: ProjectEntry[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <div className="mb-12">
      <h3 className="mb-6 text-2xl font-semibold text-gray-800">プロジェクト実績</h3>
      
      <div className="space-y-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
              <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-blue-800">
                <span className="rounded-full bg-blue-100 p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                    <path d="M9 22v-4h6v4"></path>
                    <path d="M8 6h.01"></path>
                    <path d="M16 6h.01"></path>
                    <path d="M12 6h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 10h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M8 14h.01"></path>
                  </svg>
                </span>
                {project.projectContent}
              </h3>
            </div>
            
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 text-gray-500">
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                    <path d="M9 22v-4h6v4"></path>
                    <path d="M8 6h.01"></path>
                    <path d="M16 6h.01"></path>
                    <path d="M12 6h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 10h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M8 14h.01"></path>
                  </svg>
                  <div>
                    <div className="text-xs font-medium text-gray-500">クライアント</div>
                    <div className="text-sm text-gray-800">{project.industry}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <div className="text-xs font-medium text-gray-500">期間</div>
                    <div className="text-sm text-gray-800">{project.period}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 text-gray-500">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <div>
                    <div className="text-xs font-medium text-gray-500">チーム構成</div>
                    <div className="text-sm text-gray-800">{project.scale}</div>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-blue max-w-none prose-h2:text-base prose-h2:font-semibold prose-h2:text-blue-700 prose-h2:border-b prose-h2:border-blue-200 prose-h2:pb-1">
                <h2>役割: {project.role.position}</h2>
                <ul>
                  {project.role.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">使用技術</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm transition-all">
                        <span>{tech}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;