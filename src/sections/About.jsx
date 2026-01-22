"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import mapImage from "@/assets/images/map.png";
import smileEmoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { Toolboxitems } from "@/components/Toolboxitems";
import { motion } from "framer-motion";
import { useRef } from "react";
import { techStack, toolboxItems } from "@/assets/assets";

export const AboutSection = () => {
  const constraintRef = useRef();

  return (
    <div className="pb-20 lg:py-28" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what Inspires Me"
        />
        <div className="mt-20 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspectives."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="book" />
              </div>
            </Card>
            <Card className="h-[320px] p-0 md:col-span-3 lg:col-span-2 ">
              <CardHeader
                title="TechStack"
                description="Explore the technologies I use to craft exceptional digital experiences."
                className=""
              />
              <Toolboxitems
                items={techStack}
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <Toolboxitems
                items={techStack}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2 ">
              <CardHeader
                title="My ToolBox"
                description="Explore the tools I use to craft exceptional digital experiences."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {toolboxItems.map((toolboxItem) => {
                  const IconComponent = toolboxItem.icon;
                  if (!IconComponent) return null;
                  return (
                    <motion.div
                      key={toolboxItem.title}
                      className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                      style={{
                        left: toolboxItem.left,
                        top: toolboxItem.top,
                      }}
                      drag
                      dragConstraints={constraintRef}
                    >
                      <span className="font-medium text-gray-950">
                        {toolboxItem.title}
                      </span>
                      <IconComponent className="size-5 text-gray-950" />
                    </motion.div>
                  );
                })}
              </div>
            </Card>
            <Card className="h-[320px] p-0 md:col-span-2 lg:col-span-1 relative">
              <div className="absolute bottom-4 left-4 bg-gray-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10 flex items-center gap-1">
                Based in New Delhi, IN
                <img
                  src={"https://flagcdn.com/in.svg"}
                  alt="India Flag"
                  className="size-4"
                />
              </div>
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image
                  src={smileEmoji}
                  alt="smiling memoji"
                  className="size-20 "
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
