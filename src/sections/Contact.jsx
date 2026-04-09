"use client";
import grainImage from "@/assets/images/grain.jpg";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import Link from "next/link";
import { useState } from "react"; // 1. Import useState

export const ContactSection = () => {
  // 2. Setup the hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-16 pt-12 lg:py-24 lg:pt-20" id="contact">
      <div className="container ">
        <div className="bg-linear-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-20">
          <div
            className="absolute inset-0 opacity-5 -z-10"
            style={{
              backgroundImage: `url(${grainImage.src})`,
            }}
          ></div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center z-0">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Let&apos;s create something amazing together
              </h2>
              <p className="text-sm md:text-base mt-2">
                Ready to bring your next project to life? Let&apos;s connect and
                discuss how I can help you achieve goals.
              </p>
            </div>
            {/* 3. Attach hover listeners to the Link/Button area */}
            <Link
              href="/contact"
              className="z-10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 cursor-pointer active:scale-95 transition-all">
                <span className="font-semibold ">Contact Me</span>
                <ArrowUpRightIcon size={16} isTriggered={isHovered} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};