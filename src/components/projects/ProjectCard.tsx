import { Card, CardContent } from "../ui/card";
import { ArrowRight, Tag, BookOpen, ExternalLink, Clock, Sparkles } from "lucide-react";
import type { ProjectProps } from "@/components/projects/ProjectProps";
import { motion } from "framer-motion";

const makeTags = (tags: string[]) => {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="タグリスト" role="list">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 px-3 py-1 text-xs font-medium text-teal-700 border border-teal-100 transition-all duration-300 hover:bg-teal-500/20 hover:border-teal-200 shadow-sm"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

const ProjectCard = ({
  project,
  index,
  withoutSummary = false,
}: {
  project: ProjectProps;
  index: number;
  withoutSummary?: boolean;
}) => {
  const titleId = `project-title-${index}`;
  const hasDetail = project.caseStudyUrl || project.demoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
      onClick={() => {
        if (project.href) {
          window.location.href = project.href;
        }
      }}
      style={{ cursor: project.href ? 'pointer' : 'default' }}
    >
      <Card
        className="relative h-full overflow-hidden bg-white border-none transition-all duration-300 hover:shadow-2xl group rounded-xl"
        role="article"
      >
        {/* Decorative corner effect */}
        <div
          className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-br from-teal-400 to-blue-500 opacity-80 transition-all duration-500 group-hover:scale-[1.8] group-hover:opacity-90 blur-[1px] group-hover:blur-0"
          aria-hidden="true"
        />

        {/* 装飾用の背景色 - サムネイルの有無に関わらず表示 */}
        <div className="relative h-16 w-full overflow-hidden bg-gradient-to-r from-teal-500/10 to-blue-500/10 border-b border-teal-100/50 rounded-t-xl">
          <div className="absolute top-4 right-4">
            <motion.div
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-teal-600" />
            </motion.div>
          </div>
        </div>

        <CardContent className="relative flex h-full flex-col p-6">
          {/* Tags section */}
          <div className="mb-4 flex items-start space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 mt-1 flex-shrink-0">
              <Tag
                className="h-3.5 w-3.5 text-teal-600 group-hover:text-teal-700 transition-colors duration-300"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              {project.tags && makeTags(project.tags)}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow">
            <h3
              id={titleId}
              className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal-600 line-clamp-2"
            >
              {project.title}
            </h3>
            {!withoutSummary && (
              <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                {project.summary}
              </p>
            )}
          </div>

          {/* Links to case studies or demos if available */}
          {hasDetail && (
            <div className="mt-4 mb-4 flex flex-wrap gap-2">
              {project.caseStudyUrl && (
                <a
                  href={project.caseStudyUrl}
                  className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 hover:bg-teal-100 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  ケーススタディ
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  デモを見る
                </a>
              )}
            </div>
          )}

          {/* Footer with date and arrow */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                <Clock className="h-3 w-3" aria-hidden="true" />
              </div>
              <time dateTime={project.publishedDate.toISOString()}>
                {project.publishedDate.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <a
              href={project.href}
              className="group/button"
              aria-labelledby={titleId}
            >
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-sm transition-all duration-300 hover:shadow-md"
                aria-hidden="true"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
