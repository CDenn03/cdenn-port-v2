"use client";

import { motion } from "motion/react";
import { useScrollProgress } from "@/src/app/hooks/useScrollProgress";

export const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-px z-100">
      <motion.div
        className="h-full bg-linear-to-r from-[#124170] to-[#1a5a8a] dark:from-blue-400 dark:to-blue-300 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />
    </div>
  );
};