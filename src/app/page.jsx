import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { GraphicsSection } from "@/sections/Graphic";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { ClientPageWrapper } from "@/components/ClientPageWrapper"

export const metadata = {
  title: "Home | Portfolio",
};

export default function Home() {
  return (
    <ClientPageWrapper>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <GraphicsSection />
      <ContactSection />
      <Footer />
    </ClientPageWrapper>
  );
}
