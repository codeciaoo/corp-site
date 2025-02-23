import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "@/components/projects/ProjectProps";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HomeProjects = ({ projects }: { projects: ProjectProps[] }) => {
  const [projectsToShow, setProjectsToShow] = useState(2);

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

  const projectCards = (projectsToShow: ProjectProps[]) => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projectsToShow.map((project, index) => (
        <ProjectCard
          withoutSummary={true}
          project={project}
          index={index}
          key={index}
        />
      ))}
    </div>
  );

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
          開発実績
        </h2>
        <div className="gap-8 sm:block sm:grid-cols-2 lg:hidden">
          {projectCards(projects.slice(0, 2))}
        </div>
        <div className="hidden gap-8 lg:block lg:grid-cols-3">
          {projectCards(projects.slice(0, 3))}
        </div>
      </div>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a href="/projects">
          <Button
            variant="outline"
            size="lg"
            className="text-md border-teal-600 bg-white text-teal-600 transition-colors duration-300 hover:bg-teal-50"
          >
            一覧を見る
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </motion.div>
    </div>
  );
};

export default HomeProjects;
