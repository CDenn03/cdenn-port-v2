import { Solution } from "@/src/app/types";

/**
 * Branded stand-in for a project that has no screenshot yet.
 *
 * Previously each surface rendered its own placeholder: the detail page showed
 * this emerald cover, while the homepage and /solutions showed a bare grey box
 * with the category in one corner, which read as a broken image. This is the
 * detail page's treatment extracted so every surface shows the same cover.
 *
 * `size` only scales type and padding -- the markup is identical, so a card
 * and a full-width hero cannot drift apart.
 */
export function ProjectCover({
  project,
  size = "card",
}: {
  project: Pick<Solution, "category" | "title" | "summary" | "description">;
  size?: "card" | "hero";
}) {
  const isHero = size === "hero";

  return (
    <div
      className={`flex h-full flex-col justify-end bg-primary text-primary-foreground ${
        isHero ? "p-6 sm:p-10" : "p-4 sm:p-5"
      }`}
    >
      <p
        className={`font-mono uppercase tracking-[0.16em] opacity-70 ${
          isHero ? "mb-3 text-xs" : "mb-2 text-[0.625rem]"
        }`}
      >
        {project.category}
      </p>
      <h3
        className={`max-w-2xl font-bold tracking-[-0.03em] ${
          isHero ? "text-3xl sm:text-5xl" : "text-lg sm:text-xl"
        }`}
      >
        {project.title}
      </h3>
      <p
        className={`max-w-2xl leading-6 opacity-80 ${
          isHero ? "mt-4 text-sm sm:text-base" : "mt-2 line-clamp-2 text-xs"
        }`}
      >
        {project.summary ?? project.description}
      </p>
    </div>
  );
}
