"use client";

import { motion } from "motion/react";
import { Calendar, User, Clock, ChevronRight, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/src/app/data/portfolio";
import { Solution } from "@/src/app/types";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  wide = false,
}: {
  project: Solution;
  wide?: boolean;
}) {
  return (
    <Link href={`/solutions/${project.slug}`} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className={`cursor-pointer text-left w-full group rounded-2xl overflow-hidden border transition-colors bg-white border-zinc-200 dark:bg-[#111111] dark:border-[#1e1e1e] hover:border-zinc-300 dark:hover:border-[#2a2a2a] shadow-sm hover:shadow-md ${
          wide ? "md:flex md:flex-row" : ""
        }`}
      >
        {/* image */}
        <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${
          wide ? "md:w-3/5 aspect-video md:aspect-auto md:min-h-72" : "aspect-video"
        }`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={wide ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* dark overlay — visible by default, fades on hover to reveal image */}
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:opacity-0" />
          {project.ongoing && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/70 text-slate-800 dark:text-[#FCF7F2]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Ongoing
            </span>
          )}
          <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/70 text-zinc-600 dark:text-[#888]">
            {project.category}
          </span>
          {project.openSource && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-400">
              <GitBranch size={11} /> Open Source
            </span>
          )}
        </div>

        {/* content */}
        <div className={`p-5 ${wide ? "md:w-2/5 md:flex md:flex-col md:justify-center md:p-8" : ""}`}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-bold text-slate-900 dark:text-[#FCF7F2] leading-snug ${wide ? "text-xl md:text-2xl" : "text-base"}`}>
              {project.title}
            </h3>
            <ChevronRight
              size={16}
              className="shrink-0 mt-0.5 text-zinc-400 group-hover:translate-x-1 transition-transform"
            />
          </div>

          <p className="text-sm text-zinc-500 dark:text-[#888] line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* profile row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-[#666] mb-4">
            <span className="flex items-center gap-1"><Calendar size={11} />{project.year}</span>
            <span className="flex items-center gap-1"><User size={11} />{project.role}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{project.duration}</span>
          </div>

          {/* result pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="px-3 py-1.5 rounded-lg text-xs border bg-zinc-50 border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]"
              >
                <span className="font-bold text-slate-800 dark:text-[#FCF7F2] mr-1">{r.value}</span>
                <span className="text-zinc-500 dark:text-[#888]">{r.label}</span>
              </div>
            ))}
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, wide ? 5 : 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 text-zinc-600 dark:bg-[#222] dark:text-[#aaa]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > (wide ? 5 : 4) && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 text-zinc-400 dark:bg-[#222] dark:text-[#666]">
                +{project.tags.length - (wide ? 5 : 4)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <main className="min-h-screen transition-colors duration-300 bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
      <SubpageNav backHref="/" backLabel="Back to Home" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Solutions</h1>
            <p className="text-lg text-zinc-500 dark:text-[#888] max-w-2xl">
              A look at the products and systems I&#39;ve built — the problem behind each one,
              how I approached it, and what came out the other side.
            </p>
          </div>

          <div className="space-y-10">
            {solutions.map((project, i) => {
              // Asymmetric pattern: every 3rd item (0, 3, 6…) is a wide hero card,
              // the other two in each group are half-width.
              const posInGroup = i % 3;
              const isHero = posInGroup === 0;

              if (isHero) {
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ProjectCard project={project} wide />
                  </motion.div>
                );
              }

              if (posInGroup === 1) {
                const next = solutions[i + 1];
                return (
                  <div key={project.slug} className="grid sm:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                    {next && (
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i + 1) * 0.06 }}
                      >
                        <ProjectCard project={next} />
                      </motion.div>
                    )}
                  </div>
                );
              }

              // posInGroup === 2 is already rendered inside posInGroup === 1
              return null;
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
