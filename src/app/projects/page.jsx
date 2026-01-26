"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

const PROJECTS_PER_PAGE = 6;

/* ---------------------------------------------
   Reusable Image Component (SAFE)
--------------------------------------------- */
function ProjectImage({ project }) {
  const [imgError, setImgError] = useState(false);
  const thumbnail = project.thumbnail || project.image;

  if (!thumbnail || imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white/10 text-emerald-300/30 font-serif text-2xl uppercase tracking-widest">
        {project.title?.charAt(0) || "P"}
      </div>
    );
  }

  return (
    <Image
      src={thumbnail}
      alt={project.title}
      width={500}
      height={300}
      loading="lazy"
      unoptimized
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      onError={() => setImgError(true)}
    />
  );
}

export default function ProjectsPage() {
  const convexProjects = useQuery(api.projects.get);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const loading = convexProjects === undefined;

  // Only show visible projects
  const allProjects = convexProjects
    ? convexProjects.filter((p) => p.visible !== false)
    : [];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
  };

  const displayedProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 py-32 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow="Portfolio"
            title="My Projects Hub"
            description="Explore my latest work and professional projects stored on Convex."
          />
        </motion.div>

        {loading ? (
          <div className="mt-24 flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-300 border-r-transparent"></div>
            <p className="text-white/50 animate-pulse font-medium">
              Loading Projects...
            </p>
          </div>
        ) : (
          <>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="h-full flex flex-col group transition-all duration-300 border border-white/5 hover:border-emerald-300/50 hover:shadow-2xl hover:shadow-emerald-500/10">
                      <div className="relative h-52 w-full overflow-hidden bg-white/5">
                        <ProjectImage project={project} />

                        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 tracking-wider text-emerald-300 uppercase">
                          {project.techStack?.[0] || "Project"}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-serif text-xl leading-tight group-hover:text-emerald-300 transition-colors uppercase tracking-wide mb-4">
                          {project.title}
                        </h3>

                        {project.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-white/50 uppercase tracking-tight"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-3 mt-auto">
                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white/5 hover:bg-white/10 text-white h-11 rounded-xl inline-flex items-center justify-center gap-2 text-xs font-semibold transition-all border border-white/10"
                            >
                              <FaGithub className="size-4" />
                              Repo
                            </a>
                          ) : (
                            <div className="flex-1 text-white/20 h-11 rounded-xl inline-flex items-center justify-center text-[10px] font-bold border border-white/5 uppercase">
                              Private
                            </div>
                          )}

                          <a
                            href={project.demoUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-950 h-11 rounded-xl inline-flex items-center justify-center gap-2 text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/10"
                          >
                            Live Site
                            <LuArrowUpRight className="size-3" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {displayedProjects.length === 0 && (
              <div className="mt-24 text-center">
                <p className="text-white/50">No projects found.</p>
              </div>
            )}

            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="bg-white/10 hover:bg-white/20 text-white px-10 py-3 rounded-full font-bold transition-all border border-white/10 cursor-pointer z-40"
                >
                  Load More Projects
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
