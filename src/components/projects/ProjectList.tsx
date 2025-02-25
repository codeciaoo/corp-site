import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "@/components/projects/ProjectProps";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectListProps {
  projects: ProjectProps[];
  itemsPerPage?: number;
}

const ProjectList = ({ projects, itemsPerPage = 15 }: ProjectListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  
  // Get current projects
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    // 表示するページ番号の範囲を計算
    const MAX_VISIBLE_PAGES = 5;
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
    
    // ページ数が少ない場合は調整
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-1" aria-label="ページナビゲーション">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
            aria-label="前のページ"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100"
                aria-label="1ページ目"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
              )}
            </>
          )}
          
          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-md font-medium ${
                page === currentPage
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100"
              }`}
              aria-label={`${page}ページ目`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100"
                aria-label={`${totalPages}ページ目`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
            aria-label="次のページ"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-teal-800 sm:text-3xl lg:text-4xl">
          開発実績
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="プロジェクト一覧">
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.href} project={project} index={index} />
          ))}
        </div>
        
        {projects.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            全 {projects.length} 件中 {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, projects.length)} 件を表示
          </div>
        )}
        
        {renderPagination()}
      </div>
    </div>
  );
};

export default ProjectList;
