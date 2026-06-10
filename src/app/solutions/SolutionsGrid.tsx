"use client";

import { motion } from "motion/react";
import { Calendar, User, Clock, ChevronRight, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/src/app/data/portfolio";
import { Solution } from "@/src/app/types";

// ─── Layout grouping ─────────────────────────────────────────────────────────

type Group =
  | { type: "hero"; project: Solution }
  | { type: "pair"; projects: [Solution, Solution] };

function groupSolutions(items: Solution[]): Group[] {
  const groups: Group[] = [];
  let i = 0;

  while (i < items.length) {
    const hero = items[i];
    const a = items[i + 1];
    const b = items[i + 2];

    groups.push({ type: "hero", project: hero });

    if (a && b) {
      groups.push({ type: "pair", projects: [a, b] });
      i += 3;
    } else if (a) {
      groups.push({ type: "hero", project: a });
      i += 2;
    } else {
      i += 1;
    }
  }

  return groups;
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project, wide = false }: { project: Solution; wide?: boolean }) {
  const v = {
    title: wide ? "text-xl md:text-2xl" : "text-base",
    padding: wide ? "md:p-8" : "",
    tagLimit: wide ? 5 : 4,
    imageCol: wide ? "md:w-3/5 aspect-video md:aspect-auto md:min-h-72" : "aspect-video",
    contentCol: wide ? "md:w-2/5 md:flex md:flex-col md:justify-center" : "",
    cardLayout: wide ? "md:flex md:flex-row" : "",
    imageSizes: wide ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw",
  };

  return (
    <Link href={`/solutions/${project.slug}`} className="block w-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={`cursor-pointer text-left w-full group rounded-2xl overflow-hidden border transition-colors bg-white border-zinc-200 dark:bg-[#111111] dark:border-[#1e1e1e] hover:border-zinc-300 dark:hover:border-[#2a2a2a] shadow-sm hover:shadow-md ${v.cardLayout}`}
      >
        <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${v.imageCol}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={v.imageSizes}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-0 bg-black/50 transition-opacity duration-500 group-hover:opacity-0" />
          {project.ongoing && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/70 text-slate-800 dark:text-[#FCF7F2]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Ongoing
            </span>
          )}
          <span className="absolute top-3 right-3 z-10 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/70 text-zinc-600 dark:text-[#888]">
            {project.category}
          </span>
          {project.openSource && (
            <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-400">
              <GitBranch size={11} /> Open Source
            </span>
          )}
        </div>

        <div className={`p-5 ${v.contentCol} ${v.padding}`}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-bold text-slate-900 dark:text-[#FCF7F2] leading-snug ${v.title}`}>
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

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-[#666] mb-4">
            <span className="flex items-center gap-1"><Calendar size={11} />{project.year}</span>
            <span className="flex items-center gap-1"><User size={11} />{project.role}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{project.duration}</span>
          </div>

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

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, v.tagLimit).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 text-zinc-600 dark:bg-[#222] dark:text-[#aaa]">
                {tag}
              </span>
            ))}
            {project.tags.length > v.tagLimit && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 text-zinc-400 dark:bg-[#222] dark:text-[#666]">
                +{project.tags.length - v.tagLimit}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export default function SolutionsGrid() {
  const groups = groupSolutions(solutions);

  if (solutions.length === 0) {
    return (
      <p className="text-sm text-zinc-400 dark:text-[#555]">
        No projects yet — check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {groups.map((group, gi) => {
        if (group.type === "hero") {
          return (
            <motion.div
              key={group.project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.06 }}
            >
              <ProjectCard project={group.project} wide />
            </motion.div>
          );
        }

        return (
          <div key={`${group.projects[0].slug}-pair`} className="grid sm:grid-cols-2 gap-6">
            {group.projects.map((project, pi) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (gi + pi * 0.5) * 0.06 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
