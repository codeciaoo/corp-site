import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProjectProps {
  href: string;
  title: string;
  summary: string;
  publishedDate: Date;
  cover?: string;
  coverAlt?: string;
}

const Projects = ({ projects }: { projects: ProjectProps[] }) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-teal-800 sm:mb-12 sm:text-4xl">
          導入実績
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <a
              href={project.href}
              key={project.href}
              className="block no-underline"
            >
              <Card className="group h-full bg-white p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex h-full items-center justify-between">
                  <h3 className="flex-1 text-xl font-semibold text-gray-900 group-hover:text-teal-600">
                    {project.title}
                  </h3>
                  <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-teal-600 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
