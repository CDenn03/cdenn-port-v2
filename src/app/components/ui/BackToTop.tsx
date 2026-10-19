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

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center border border-zinc-300 bg-[#FCF7F2] text-slate-900 transition-colors hover:border-primary dark:border-zinc-700 dark:bg-[#0a0a0a] dark:text-zinc-100"
      aria-label="Back to top"
    >
      <ArrowUp size={19} />
    </button>
  );
};
