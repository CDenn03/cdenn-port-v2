import Image from "next/image";
import { Solution } from "@/src/app/types";
import { ProjectCover } from "@/src/app/components/ui/ProjectCover";

export function SolutionDetailClient({ project }: { project: Solution }) {
  return (
    <div
      /*
       * 16:9 only when there is an image to fill it. The placeholder carries a
       * single line of text, so at full aspect ratio it was ~700px of empty
       * grid between the heading and the case study - the reader had to scroll
       * past a void to reach the writing. A short band states the same thing
       * and gets out of the way.
       */
      className={`relative mb-12 overflow-hidden border border-line bg-surface-alt ${
        project.image ? "aspect-video" : "h-40 sm:h-48"
      }`}
    >
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
      {project.ongoing && <p className="absolute left-4 top-4 bg-scrim px-3 py-2 text-xs uppercase tracking-[0.12em] text-on-scrim">In progress</p>}
    </div>
  );
}
