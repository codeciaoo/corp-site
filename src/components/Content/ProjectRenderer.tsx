import React, { type ReactNode } from "react";

const ProjectRenderer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className="my-12 bg-white py-12 pl-10">
    {/* prettier-ignore */}
    <div
      className={`prose prose-teal dark:prose-invert max-w-none text-gray-800
        /* Typography - Reduced margins */
        prose-h1:text-4xl prose-h1:font-bold prose-h1:text-teal-900 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:font-bold prose-h2:text-teal-800 prose-h2:mb-3
        prose-h3:text-xl prose-h3:font-semibold prose-h3:text-teal-900 prose-h3:mb-2
        prose-p:leading-tight prose-p:mt-0 prose-p:mb-0
        
        /* Lists & Links - Tighter spacing */
        prose-ul:list-disc prose-ol:list-decimal prose-[ul,ol]:pl-4 prose-[ul,ol]:mb-3
        prose-li:m-0 prose-li:p-0 prose-[li,p]:text-gray-800
        prose-a:text-teal-600 prose-a:no-underline hover:prose-a:text-teal-700
        dark:prose-a:text-teal-500 dark:hover:prose-a:text-teal-400
        
        /* Content Blocks - Reduced margins */
        prose-blockquote:border-l-4 prose-blockquote:border-teal-200 prose-blockquote:pl-4
        prose-blockquote:italic prose-blockquote:my-3 prose-blockquote:text-gray-700
        dark:prose-blockquote:border-teal-800
        
        /* Code & Pre - Compact padding */
        prose-code:bg-teal-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:font-mono prose-code:text-sm prose-code:text-teal-800
        dark:prose-code:bg-teal-900/10
        prose-pre:bg-gray-50 prose-pre:p-4 prose-pre:rounded-xl prose-pre:shadow-sm
        prose-pre:mb-3 dark:prose-pre:bg-gray-900/10 prose-pre:prose-code:bg-transparent
        prose-pre:prose-code:p-0
        
        /* Media & Dividers - Reduced spacing */
        prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl prose-img:shadow-md
        prose-img:my-3
        prose-hr:my-4 prose-hr:border-teal-100 dark:prose-hr:border-teal-900/20
        
        /* Tables - Compact padding */
        prose-table:w-full prose-table:my-3 prose-th:bg-teal-50 prose-th:text-teal-900
        prose-th:p-2 prose-th:font-semibold prose-td:p-2 prose-td:border-b
        prose-td:border-teal-100 ${className}`}
    >
      {children}
    </div>
  </div>
);

export default ProjectRenderer;
