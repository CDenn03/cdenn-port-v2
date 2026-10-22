import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { ProjectCover } from "@/src/app/components/ui/ProjectCover";
import { solutions } from "@/src/app/data/portfolio";

export default function SolutionsGrid() {
  if (solutions.length === 0) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">No project case studies are published yet.</p>;
  }

  return (
    <div className="border-t border-zinc-300 dark:border-zinc-700">
      {solutions.map((project, index) => {
        const caseStudyHref = `/solutions/${project.slug}`;

        return (
        <article key={project.slug} className="group grid gap-6 border-b border-zinc-300 py-9 md:grid-cols-12 md:gap-8 dark:border-zinc-700">
          <p className="font-mono text-xs text-zinc-500 md:col-span-1 dark:text-zinc-400">{String(index + 1).padStart(2, "0")}</p>
          {/* The cover is its own link rather than the whole card being one:
              the card also holds Live site / GitHub links, which cannot be
              nested inside an outer anchor. */}
          <Link
            href={caseStudyHref}
            aria-label={`Read the ${project.title} case study`}
            className="hover-lift relative block aspect-video overflow-hidden border border-zinc-200 bg-zinc-100 group-hover:border-zinc-400 md:col-span-4 dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-zinc-600"
          >
            {project.image ? (
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 34vw" className="media-zoom object-cover" />
            ) : (
              <ProjectCover project={project} />
            )}
          </Link>
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">{project.category}{project.ongoing ? " / In progress" : ""}</p>
            {/* Title and arrow share one link, so the arrow is clickable
                without adding a third redundant target for screen readers. */}
            <Link href={caseStudyHref} className="mt-2 flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-primary dark:text-[#FCF7F2] dark:group-hover:text-[#FCF7F2]">{project.title}</h2>
              <ArrowUpRight size={18} aria-hidden="true" className="mt-1 shrink-0 text-zinc-500 transition-[transform,color] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hover:text-primary motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 dark:text-zinc-400 dark:group-hover:text-[#FCF7F2]" />
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.description}</p>
            <p className="mt-4 font-mono text-xs leading-5 text-zinc-500 dark:text-zinc-400">{project.year} / {project.role} / {project.duration}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.results.map((result) => `${result.value} ${result.label}`).join(" · ")}</p>
            <p className="mt-3 font-mono text-xs leading-5 text-zinc-500 dark:text-zinc-400">{project.tags.join(" / ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold">
              {/* `group/cta` keeps these icons off the card-level group hover. */}
              <Link href={caseStudyHref} className="group/cta inline-flex items-center gap-1 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">
                Read case study
                <ChevronRight size={14} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
              </Link>
              {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="group/cta inline-flex items-center gap-1 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">Live site <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5" /></a>}
              {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="group/cta inline-flex items-center gap-1 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">GitHub <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5" /></a>}
            </div>
          </div>
        </article>
        );
      })}
    </div>
  );
}
