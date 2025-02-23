import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "@/components/projects/ProjectProps";

const ProjectList = ({ projects }: { projects: ProjectProps[] }) => {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
          開発実績
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="プロジェクト一覧">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
