"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { ProjectCover } from "../ui/ProjectCover";
import { solutions } from "@/src/app/data/portfolio";

// The `featured` flag is the single source of truth for the homepage set --
// no slice here, so featuring a project is all it takes to surface it.
const featured = solutions.filter((solution) => solution.featured);

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="bg-[#F5EFE8] px-4 py-16 transition-colors duration-300 md:px-6 md:py-24 dark:bg-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid gap-5 border-t-2 border-primary pt-5 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900 md:text-5xl dark:text-[#FCF7F2]">Evidence, not a gallery.</h2>
            </div>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">A small selection of systems where the constraint shaped the work.</p>
          </div>
        </Reveal>

        <div className="mt-14">
          {featured.map((project, index) => (
            <Reveal key={project.slug}>
              <article className="group grid gap-7 border-t border-zinc-300 py-10 md:grid-cols-12 md:gap-10 dark:border-zinc-700">
                <div className="md:col-span-1">
                  <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">0{index + 1}</p>
                </div>
                <div className="md:col-span-6">
                  <Link
                    href={`/solutions/${project.slug}`}
                    aria-label={`Read the ${project.title} case study`}
                    className="hover-lift relative block aspect-video overflow-hidden border border-zinc-200 bg-white group-hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-zinc-600"
                  >
                    {project.image ? (
                      <Image src={project.image} alt={project.title} fill className="media-zoom object-cover" sizes="(max-width: 768px) 100vw, 58vw" />
                    ) : (
                      <ProjectCover project={project} />
                    )}
                  </Link>
                </div>
                <div className="md:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    {project.category}{project.ongoing ? " / In progress" : ""}
                  </p>
                  <Link href={`/solutions/${project.slug}`} className="mt-3 block">
                    <h3 className="text-2xl font-bold tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-primary md:text-3xl dark:text-[#FCF7F2]">{project.title}</h3>
                  </Link>
                  <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">{project.description}</p>
                  <dl className="mt-7 space-y-5 border-t border-zinc-300 pt-5 dark:border-zinc-700">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Constraint</dt>
                      <dd className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.challenge}</dd>
                    </div>
                    {project.solution && (
                      <div>
                        <dt className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Approach</dt>
                        <dd className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.solution}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Evidence</dt>
                      <dd className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                        {project.results.map((result) => `${result.value} ${result.label}`).join(" · ")}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-6 font-mono text-xs leading-6 text-zinc-500 dark:text-zinc-400">{project.tags.join(" / ")}</p>
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold">
                    {/* Named groups (`group/cta`) rather than the bare `.group`
                        utility: the card itself is a group, so an unnamed
                        group-hover would fire these icons on card hover. */}
                    <Link href={`/solutions/${project.slug}`} className="group/cta inline-flex items-center gap-1 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">
                      Read case study
                      <ChevronRight size={14} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
                    </Link>
                    {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="group/cta inline-flex items-center gap-1 text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:text-zinc-300 dark:decoration-zinc-700">Live site <ExternalLink size={13} className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5" /></a>}
                    {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="group/cta inline-flex items-center gap-1 text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:text-zinc-300 dark:decoration-zinc-700">GitHub <ExternalLink size={13} className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5" /></a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-t border-zinc-300 pt-8 dark:border-zinc-700">
            <Link href="/solutions" className="press group/cta inline-flex min-h-11 items-center gap-1.5 border border-zinc-300 px-5 text-sm font-bold transition-colors hover:border-slate-900 hover:bg-zinc-900/[0.03] dark:border-zinc-700 dark:hover:border-white dark:hover:bg-white/5">
              View all work
              <ChevronRight size={16} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
