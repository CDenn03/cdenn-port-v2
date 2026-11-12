import { Lock, ImageOff } from "lucide-react";
import { Solution } from "@/src/app/types";

/**
 * Stand-in for a project with no screenshot.
 *
 * It says one thing: why there is no image. It deliberately does not repeat the
 * category, title or summary, because every surface that renders this already
 * shows all three immediately beside it - the cards on the home page and
 * /solutions put it next to the text column, and the case-study page puts the
 * heading directly above it. The earlier version printed them again, so an
 * NDA project stated its own title three times on one screen.
 *
 * Two cases that look identical but are not:
 *
 *   - `nda: true` - the interface cannot be shown, and that is settled. The
 *     wording has to stand permanently, because an image may never arrive.
 *   - everything else - imagery is simply not published yet. The wording
 *     promises no date, so it does not become a lie if the screenshot is never
 *     taken.
 *
 * Conflating the two would mean either claiming a confidentiality restriction
 * that does not exist, or implying a client's system is merely unphotographed
 * when it is actually off limits.
 *
 * `size` only scales type and the grid pitch - the markup is identical, so a
 * card and a full-width hero cannot drift apart.
 */
export function ProjectCover({
  project,
  size = "card",
}: {
  project: Pick<Solution, "title" | "nda">;
  size?: "card" | "hero";
}) {
  const isHero = size === "hero";
  const withheld = project.nda === true;

  const Icon = withheld ? Lock : ImageOff;
  const statement = withheld
    ? "Interface not shown. Client work under NDA."
    : "Screenshots not published yet.";

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-cover-fill p-4 text-on-cover">
      {/* A hairline grid drawn from the text colour, so it needs no token of
          its own and holds in both modes. It is here so the block reads as a
          cover that was designed rather than an image that failed to load. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: isHero ? "48px 48px" : "24px 24px",
        }}
      />

      <p
        className={`relative flex items-center gap-2 text-center opacity-80 ${
          isHero ? "text-base" : "text-xs"
        }`}
      >
        <Icon size={isHero ? 18 : 13} aria-hidden="true" className="shrink-0" />
        {/* The title is for assistive technology only: visually it is already
            on screen beside this cover, but a screen reader meeting the image
            region alone needs to know which project it belongs to. */}
        <span className="sr-only">{project.title}: </span>
        {statement}
      </p>
    </div>
  );
}
