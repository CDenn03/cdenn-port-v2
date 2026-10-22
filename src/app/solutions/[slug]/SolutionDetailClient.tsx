import Image from "next/image";
import { Solution } from "@/src/app/types";
import { ProjectCover } from "@/src/app/components/ui/ProjectCover";

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
        <ProjectCover project={project} size="hero" />
      )}
      {project.ongoing && <p className="absolute left-4 top-4 border border-white/50 bg-black/70 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-white">In progress</p>}
    </div>
  );
}
