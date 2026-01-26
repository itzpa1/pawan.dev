import { LeftSection } from "@/sections/graphic/Hero";
import { RightSection } from "@/sections/graphic/Article";
import grainImage from "@/assets/images/grain.jpg";

export const metadata ={
  title: "Graphic",
  description:
    "Official portfolio of Pawan (itzpa1). A Full-stack Developer specializing in high-performance web applications using Next.js, TypeScript, and Convex.",
  keywords: [
    "Pawan.Dev",
    "itzpa1",
    "Full-stack Developer Portfolio",
    "Next.js Developer India",
    "TypeScript Engineer",
    "Convex Database Expert",
    "Software Engineer Portfolio 2026",
    "React Frontend Developer",
    "Web Scalability Specialist",
    "Tailwind CSS Expert",
    "Portfolio",
    "2026",
  ],
}

export default function Graphic() {
  return (
    <div className="flex flex-col md:flex-row relative md:h-screen">
      <div
        className="absolute inset-0 -z-30 opacity-5 "
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>
      <LeftSection />
      <RightSection />
    </div>
  );
}
