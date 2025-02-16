import { Card } from "../ui/card";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import type { ProjectProps } from "@/components/projects/ProjectProps";

const makeTags = (tags: string[]) => {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="タグリスト" role="list">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="inline-flex items-center rounded-full bg-sky-600/5 px-2.5 py-0.5 text-xs font-medium text-teal-800"
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

  return (
    <a
      href={project.href}
      key={project.href}
      className="group block no-underline transform transition-all duration-300 hover:scale-[1.02]"
      aria-labelledby={titleId}
    >
      <Card className="relative flex h-full flex-col overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl" role="article">
        <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-br from-teal-400/80 to-teal-600/80 transition-all duration-300 group-hover:scale-150" aria-hidden="true" />
        <div className="relative flex h-full flex-col p-6" data-testid="project-cover">
          <div className="mb-4 flex items-center space-x-2">
            <Tag className="h-4 w-4 text-teal-600" aria-hidden="true" />
            {project.tags && makeTags(project.tags)}
          </div>
          <div className="flex-grow">
            <h3 
              id={titleId}
              className="mb-2 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-600"
            >
              {project.title}
            </h3>
            {!withoutSummary && (
              <p className="text-sm leading-relaxed text-gray-600">
                {project.summary}
              </p>
            )}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={project.publishedDate.toISOString()}>
                {project.publishedDate.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
};

export default ProjectCard;
