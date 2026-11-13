"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showBackToTop) return null;

  const scrollToTop = () => {
    // Honour the OS setting: a forced smooth scroll of several screens is
    // exactly the motion `prefers-reduced-motion` exists to suppress.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="press group animate-fade-in fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center border border-line-strong bg-surface text-ink transition-colors hover:border-primary hover:bg-surface-alt"
      aria-label="Back to top"
    >
      <ArrowUp size={19} className="icon-shift-up" />
    </button>
  );
};
