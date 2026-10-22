"use client";

import { useTheme } from "./hooks/useTheme";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { SolutionsSection } from "./components/sections/SolutionsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/layout/Footer";
import { BackToTop } from "./components/ui/BackToTop";

export default function PortfolioClient() {

  const { mounted } = useTheme();

  return (
    <main
      className="relative min-h-dvh overflow-x-hidden bg-background text-foreground transition-colors duration-300"
      suppressHydrationWarning
    >
      {mounted && <ScrollProgress />}

      <Navbar />
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <ContactSection />
      <Footer />

      {mounted && <BackToTop />}
    </main>
  );
}
