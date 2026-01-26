import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { GraphicsSection } from "@/sections/Graphic";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";

export const metadata = {
  title: "Portfolio",
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
  openGraph: {
    title: "Pawan.Dev | Software Engineer Portfolio",
    description:
      "Building scalable, user-centric web applications with modern tech stacks.",
    url: "https://codeitzpa1.vercel.app/",
    siteName: "Pawan.Dev Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Preview of Pawan.Dev Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pawan.Dev | @itzpa1",
    description:
      "Full-stack Developer building the future with Next.js & Convex.",
    creator: "@itzpa1",
    images: ["/preview.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <GraphicsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
