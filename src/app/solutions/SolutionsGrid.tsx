import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/src/app/data/portfolio";

export default function SolutionsGrid() {
  if (solutions.length === 0) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">No project case studies are published yet.</p>;
  }

  return (
    <div className="border-t border-zinc-300 dark:border-zinc-700">
      {solutions.map((project, index) => (
        <article key={project.slug} className="grid gap-6 border-b border-zinc-300 py-9 md:grid-cols-12 md:gap-8 dark:border-zinc-700">
          <p className="font-mono text-xs text-zinc-500 md:col-span-1 dark:text-zinc-400">{String(index + 1).padStart(2, "0")}</p>
          <div className="relative aspect-video overflow-hidden border border-zinc-200 bg-zinc-100 md:col-span-4 dark:border-zinc-800 dark:bg-zinc-900">
            {project.image ? (
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 34vw" className="object-cover" />
            ) : (
              <div className="flex h-full items-end p-4 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">{project.category}</div>
            )}
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">{project.category}{project.ongoing ? " / In progress" : ""}</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-900 dark:text-[#FCF7F2]">{project.title}</h2>
              <ArrowUpRight size={18} className="mt-1 shrink-0 text-zinc-500 dark:text-zinc-400" />
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.description}</p>
            <p className="mt-4 font-mono text-xs leading-5 text-zinc-500 dark:text-zinc-400">{project.year} / {project.role} / {project.duration}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.results.map((result) => `${result.value} ${result.label}`).join(" · ")}</p>
            <p className="mt-3 font-mono text-xs leading-5 text-zinc-500 dark:text-zinc-400">{project.tags.join(" / ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold">
              <Link href={`/solutions/${project.slug}`} className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">Read case study →</Link>
              {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">Live site ↗</a>}
              {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:decoration-zinc-700">GitHub ↗</a>}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
