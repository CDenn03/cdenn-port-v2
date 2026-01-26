"use client";

import { useTheme } from "./hooks/useTheme";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackgroundAmbience } from "./components/ui/BackgroundAmbience";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { StatsSection } from "./components/sections/StatsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { SolutionsSection } from "./components/sections/SolutionsSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { WritingSection } from "./components/sections/WritingSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/layout/Footer";
import { BackToTop } from "./components/ui/BackToTop";

export default function Portfolio() {
  const { mounted } = useTheme();
  
  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen overflow-x-hidden relative transition-colors duration-300 bg-zinc-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ScrollProgress />
      <BackgroundAmbience />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ExperienceSection />
      <SolutionsSection />
      <TestimonialsSection />
      <WritingSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
}