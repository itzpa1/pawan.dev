"use client";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Projects } from "@/assets/assets";
import { CircleCheckIcon } from "@/components/ui/circle-check";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { useState } from "react";

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24" id="project">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experience."
        />
        <div className="flex flex-col mt-10 md:mt-20 gap-20 ">
          {Projects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{ top: `calc(64px + ${projectIndex * 40}px)` }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  {/* ... Header Content ... */}
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5 " />
                  
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <ResultItem key={result.title} title={result.title} />
                    ))}
                  </ul>

                  <LiveSiteButton link={project.link} />
                </div>
                
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultItem = ({ title }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      className="flex gap-2 text-sm md:text-base text-white/50 cursor-default transition-colors hover:text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CircleCheckIcon size={20} isTriggered={hovered} />
      <span>{title}</span>
    </li>
  );
};

const LiveSiteButton = ({ link }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 cursor-pointer active:scale-95 transition-all">
        <ArrowUpRightIcon size={16} isTriggered={hovered} />
        <span>Visit Live Site</span>
      </button>
    </a>
  );
};