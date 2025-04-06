import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "@/components/projects/ProjectProps";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Filter, X } from "lucide-react";

const HomeProjects = ({ projects }: { projects: ProjectProps[] }) => {
  const [projectsToShow, setProjectsToShow] = useState(2);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  // Extract all unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags || [])));
  
  // Filter projects based on selected tag
  const filterProjects = (tag: string) => {
    setActiveFilter(tag);
    if (tag === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.tags?.includes(tag)
      ));
    }
  };
  
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
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Filter chips component
  const FilterChips = () => {
    return (
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => filterProjects('all')}
          className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeFilter === 'all' 
            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md' 
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
        >
          すべて
          {activeFilter === 'all' && (
            <X className="ml-1 h-3.5 w-3.5" />
          )}
        </button>
        
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => filterProjects(tag)}
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeFilter === tag 
              ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
          >
            {tag}
            {activeFilter === tag && (
              <X className="ml-1 h-3.5 w-3.5" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const projectCards = (projectsToDisplay: ProjectProps[]) => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projectsToDisplay.map((project, index) => (
        <ProjectCard
          withoutSummary={true}
          project={project}
          index={index}
          key={project.title}
        />
      ))}
    </div>
  );

  return (
    <div className="py-20 md:py-24" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 } 
            }
          }}
        >
          <h2 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent sm:text-4xl">
            開発実績
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            私たちが手掛けたプロジェクトの一部をご紹介します
          </p>
          
          {/* Filter options */}
          {allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 } 
                }
              }}
            >
              <div className="flex items-center justify-center mb-2 text-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">フィルター:</span>
              </div>
              <FilterChips />
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          className="gap-8 sm:block sm:grid-cols-2 lg:hidden"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
              } 
            }
          }}
        >
          {projectCards(filteredProjects.slice(0, projectsToShow))}
        </motion.div>
        
        <motion.div 
          className="hidden gap-8 lg:block lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
              } 
            }
          }}
        >
          {projectCards(filteredProjects.slice(0, projectsToShow))}
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            該当するプロジェクトが見つかりません。他のフィルターをお試しください。
          </div>
        )}
      </div>
      
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, delay: 0.6 } 
          }
        }}
      >
        <a href="/projects">
          <Button
            variant="outline"
            size="lg"
            className="text-md border-teal-600 bg-white text-teal-600 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-teal-50 hover:-translate-y-0.5"
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
