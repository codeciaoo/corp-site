import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "@/components/projects/ProjectProps";
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <nav className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-gray-100" aria-label="ページナビゲーション">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-all hover:bg-gray-100 hover:scale-105 disabled:opacity-50 disabled:hover:bg-white disabled:hover:scale-100"
            aria-label="前のページ"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-all hover:bg-gray-100 hover:scale-105"
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
              className={`flex h-10 w-10 items-center justify-center rounded-md font-medium transition-all ${
                page === currentPage
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:shadow-md hover:scale-105"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:scale-105"
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
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-all hover:bg-gray-100 hover:scale-105"
                aria-label={`${totalPages}ページ目`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-all hover:bg-gray-100 hover:scale-105 disabled:opacity-50 disabled:hover:bg-white disabled:hover:scale-100"
            aria-label="次のページ"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      </motion.div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 backdrop-blur shadow-sm mb-4"
            variants={titleVariants}
          >
            <Briefcase className="h-4 w-4 text-teal-700" />
            <span className="text-sm font-medium text-teal-900">Projects</span>
          </motion.div>
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600"
            variants={titleVariants}
          >
            開発実績
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
            variants={titleVariants}
          >
            お客様の課題を解決した実績をご紹介します
          </motion.p>
        </motion.div>
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="プロジェクト一覧"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.href} project={project} index={index} />
          ))}
        </motion.div>

        {projects.length > 0 && (
          <motion.div
            className="mt-6 text-center text-sm text-gray-600 bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full inline-block mx-auto shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            全 {projects.length} 件中 {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, projects.length)} 件を表示
          </motion.div>
        )}

        {renderPagination()}
      </div>
    </div>
  );
};

export default ProjectList;
