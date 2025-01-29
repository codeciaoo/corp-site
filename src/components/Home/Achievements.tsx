import ProjectCard from "../Achievements/ProjectCard";
import type { ProjectProps } from "../Achievements/ProjectProps";
import { useState, useEffect } from "react";

const Projects = ({ projects }: { projects: ProjectProps[] }) => {
  const [projectsToShow, setProjectsToShow] = useState(1);

  useEffect(() => {
    const updateProjectCount = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setProjectsToShow(3);
      } else if (window.innerWidth >= 640) {
        // sm breakpoint
        setProjectsToShow(2);
      } else {
        setProjectsToShow(2);
      }
    };

    // Set initial value
    updateProjectCount();

    // Update on resize
    window.addEventListener("resize", updateProjectCount);
    return () => window.removeEventListener("resize", updateProjectCount);
  }, []);

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
          導入実績
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, projectsToShow).map((project, index) => (
            <ProjectCard
              withoutSummary={true}
              project={project}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
