import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProjectProps {
  href: string;
  title: string;
  summary: string;
  publishedDate: Date;
  cover: string;
  coverAlt: string;
}

const Projects = ({ projects }: { projects: ProjectProps[] }) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          導入実績
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <a
              href={project.href}
              key={project.href}
              className="block no-underline"
            >
              <Card className="group overflow-hidden bg-white transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={project.cover || "/placeholder.svg"}
                  alt={project.coverAlt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-teal-600">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {project.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {new Date(project.publishedDate).toLocaleDateString(
                      "ja-JP",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </span>
                  <span className="inline-flex items-center text-sm font-medium text-teal-600">
                    詳細を見る
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
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
