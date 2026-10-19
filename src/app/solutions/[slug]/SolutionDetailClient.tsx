import Image from "next/image";
import { Solution } from "@/src/app/types";

export function SolutionDetailClient({ project }: { project: Solution }) {
  return (
    <div className="relative mb-12 aspect-video overflow-hidden border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className={`object-cover ${project.heroPosition ?? "object-top"}`}
        />
      ) : (
        <div className="flex h-full flex-col justify-end bg-primary p-6 text-primary-foreground sm:p-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] opacity-70">{project.category}</p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-5xl">{project.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 opacity-80 sm:text-base">{project.summary ?? project.description}</p>
        </div>
      )}
      {project.ongoing && <p className="absolute left-4 top-4 border border-white/50 bg-black/70 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-white">In progress</p>}
    </div>
  );
}
