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
    <section id="solutions" className="bg-background px-4 py-20 transition-colors duration-300 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_22rem] md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground md:text-5xl">Evidence, not a gallery.</h2>
            </div>
            <p className="text-lg leading-7 text-foreground">A small selection of systems where the constraint shaped the work.</p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-16">
          {featured.map((project) => (
            <Reveal key={project.slug}>
              <article className="group grid gap-7 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-6">
                  <Link
                    href={`/solutions/${project.slug}`}
                    aria-label={`Read the ${project.title} case study`}
                    className="hover-lift relative block aspect-video overflow-hidden bg-surface"
                  >
                    {project.image ? (
                      <Image src={project.image} alt={`${project.title} interface`} fill className="media-zoom object-cover" sizes="(max-width: 768px) 100vw, 58vw" />
                    ) : (
                      <ProjectCover project={project} />
                    )}
                  </Link>
                </div>
                <div className="md:col-span-6">
                  <p className="text-base text-muted-foreground">
                    {project.category}{project.ongoing ? " — in progress" : ""}
                  </p>
                  <Link href={`/solutions/${project.slug}`} className="mt-2 block">
                    <h3 className="text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary dark:group-hover:text-accent md:text-3xl">{project.title}</h3>
                  </Link>
                  <p className="mt-4 text-lg leading-8 text-foreground">{project.description}</p>

                  <div className="mt-7 space-y-5">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">The constraint</h4>
                      <p className="mt-1 text-base leading-7 text-foreground">{project.challenge}</p>
                    </div>
                    {project.solution && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground">The approach</h4>
                        <p className="mt-1 text-base leading-7 text-foreground">{project.solution}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-bold text-foreground">The evidence</h4>
                      <p className="mt-1 text-base leading-7 text-foreground">
                        {project.results.map((result) => `${result.value} ${result.label}`).join(" · ")}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-7 text-muted-foreground">{project.tags.join(", ")}</p>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-base font-bold">
                    {/* Named groups (`group/cta`) rather than the bare `.group`
                        utility: the card itself is a group, so an unnamed
                        group-hover would fire these icons on card hover. */}
                    <Link href={`/solutions/${project.slug}`} className="group/cta inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-primary dark:hover:text-accent">
                      Read case study
                      <ChevronRight size={16} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
                    </Link>
                    {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="group/cta inline-flex items-center gap-1 text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary dark:hover:text-accent">Live site <ExternalLink size={14} className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5" /></a>}
                    {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="group/cta inline-flex items-center gap-1 text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary dark:hover:text-accent">GitHub <ExternalLink size={14} className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5" /></a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-8 text-foreground">
              Five more systems — bancassurance, logistics, financial governance and others — are written up the same way.
            </p>
            <Link href="/solutions" className="press group/cta inline-flex min-h-12 shrink-0 items-center gap-1.5 bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-[#1b2d2a]">
              View all work
              <ChevronRight size={16} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
