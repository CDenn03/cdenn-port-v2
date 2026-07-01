"use client";

import { useTheme } from "./hooks/useTheme";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackgroundAmbience } from "./components/ui/BackgroundAmbience";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { SolutionsSection } from "./components/sections/SolutionsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/layout/Footer";
import { BackToTop } from "./components/ui/BackToTop";

export default function PortfolioClient() {

  const { mounted } = useTheme();

  return (
    <main
      className="min-h-screen overflow-x-hidden relative transition-colors duration-300 bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]"
      suppressHydrationWarning
    >
      {mounted && <ScrollProgress />}
      {mounted && <BackgroundAmbience />}

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SolutionsSection />
      <div className="w-4/5 h-px bg-zinc-200 dark:bg-[#1a1a1a]" />
      <ContactSection />
      <Footer />

      {mounted && <BackToTop />}
    </main>
  );
}
