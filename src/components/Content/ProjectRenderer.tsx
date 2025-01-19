import React, { type ReactNode } from "react";

interface ProjectRendererProps {
  children: ReactNode;
  className?: string;
}

const ProjectRenderer: React.FC<ProjectRendererProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`prose prose-teal dark:prose-invert /* Base styles */ /* Headers */ prose-h1:text-3xl prose-h1:font-bold prose-h1:text-teal-900 prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-teal-800 prose-h2:mb-6 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-teal-900 prose-h3:mb-4 /* Paragraph */ prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4 /* Lists */ prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-li:mb-2 prose-li:text-gray-800 /* Links */ prose-a:text-teal-600 prose-a:no-underline hover:prose-a:text-teal-700 dark:prose-a:text-teal-500 dark:hover:prose-a:text-teal-400 /* Blockquotes */ prose-blockquote:border-l-4 prose-blockquote:border-teal-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:text-gray-700 dark:prose-blockquote:border-teal-800 /* Code */ prose-code:bg-teal-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:text-teal-800 dark:prose-code:bg-teal-900/10 /* Pre (Code blocks) */ prose-pre:bg-gray-50 prose-pre:p-6 prose-pre:rounded-xl prose-pre:shadow-sm prose-pre:mb-6 dark:prose-pre:bg-gray-900/10 prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0 /* Images */ prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 /* Horizontal Rule */ prose-hr:my-8 prose-hr:border-teal-100 dark:prose-hr:border-teal-900/20 /* Tables */ prose-table:w-full prose-table:my-6 prose-th:bg-teal-50 prose-th:text-teal-900 prose-th:p-3 prose-th:font-semibold prose-td:p-3 prose-td:border-b prose-td:border-teal-100 max-w-none text-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default ProjectRenderer;
