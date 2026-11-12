/**
 * Availability, maintained by hand.
 *
 * There is no integration behind this and there is not meant to be one. The
 * trade-off is deliberate: an automated "available" signal that drifts out of
 * date is worse than a hand-written one that shows its age, so the page always
 * prints `updatedAt` next to the claim and the reader can judge it.
 */
export interface Status {
  /** Short enough to sit in a chip. */
  headline: string;
  /** One sentence of detail, shown beside the chip on wider screens. */
  detail: string;
  /** ISO date (YYYY-MM-DD). Rendered verbatim beside the claim. */
  updatedAt: string;
}

export const status: Status = {
  headline: "Open to work",
  detail:
    "Open to remote engineering roles and selected consulting engagements. Time zones are not a constraint.",
  updatedAt: "2026-11-12",
};

/** After this many days the claim is treated as unreliable. */
export const STATUS_STALE_AFTER_DAYS = 60;

export function statusAgeInDays(from: Date = new Date()): number {
  const updated = new Date(`${status.updatedAt}T00:00:00Z`);
  const ms = from.getTime() - updated.getTime();
  return Math.floor(ms / 86_400_000);
}

export function isStatusStale(from: Date = new Date()): boolean {
  return statusAgeInDays(from) > STATUS_STALE_AFTER_DAYS;
}

/** "12 November 2026" - written out, because a bare ISO date reads as machine output. */
export function formatStatusDate(): string {
  return new Date(`${status.updatedAt}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
