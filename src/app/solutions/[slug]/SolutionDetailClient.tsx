"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Solution } from "@/src/app/types";

export function SolutionDetailClient({ project }: { project: Solution }) {
  return (
    <motion.div
      className="relative aspect-video rounded-2xl overflow-hidden mb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        className={`object-cover ${project.heroPosition ?? "object-top"}`}
      />
      {project.ongoing && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/70 text-slate-800 dark:text-[#FCF7F2]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          Ongoing
        </span>
      )}
    </motion.div>
  );
}
