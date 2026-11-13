import type { Evidence, EvidenceKind } from "@/src/app/types";

interface KindPresentation {
  /**
   * Printed beside the value. `null` for `capability`, which is the default
   * and needs no label.
   *
   * 27 of the 33 evidence items across the ten projects are capabilities, so
   * badging them printed "Built" 20 times down the /solutions page. A label
   * that appears on almost everything stops being read, and it buried the six
   * items where the label is the whole point. The convention is now: a badge
   * marks an exception, and each page states once that an unlabelled line is
   * an implementation fact.
   */
  badge: string | null;
  /**
   * Prefixed to the value in compact contexts (the hero proof list) where
   * there is no room for a badge or a key.
   *
   * Only set for kinds that would be misread without it. A `capability` or a
   * `test` entry already describes itself ("Drift over SQLite", "155 tests"),
   * so prefixing it adds noise. A `target` or a `confidential` entry would
   * otherwise read as a verified outcome, which is the one thing this model
   * exists to prevent.
   */
  prefix?: string;
  /** Explains the badge, or its absence, in the table key. */
  note: string;
}

const PRESENTATION: Record<EvidenceKind, KindPresentation> = {
  measured: {
    badge: "Measured",
    prefix: "Measured",
    note: "Taken from a real measurement; the method and date are stated.",
  },
  capability: {
    badge: null,
    note: "An implementation fact: this exists in the system.",
  },
  test: {
    badge: "Tested",
    note: "Evidenced by the test or backtest suite, not by production traffic.",
  },
  target: {
    badge: "Target",
    prefix: "Target",
    note: "A budget the design was held to, not a figure measured in production.",
  },
  demo: {
    badge: "Demo",
    prefix: "Demo",
    note: "Deployed and reachable, but running illustrative rather than customer data.",
  },
  confidential: {
    badge: "Under NDA",
    prefix: "Under NDA",
    note: "Client work that cannot be shown or independently checked.",
  },
};

/** `null` where no badge is warranted, so callers render nothing at all. */
export function evidenceBadge(kind: EvidenceKind): string | null {
  return PRESENTATION[kind].badge;
}

/**
 * One-line form for the hero proof list: "Target: under 200MB RAM".
 * Falls back to the bare value where a prefix would only add noise.
 */
export function evidenceLine(item: Evidence): string {
  const { prefix } = PRESENTATION[item.kind];
  return prefix ? `${prefix}: ${item.value}` : item.value;
}

export function evidenceSummary(items: Evidence[], max = 3): string {
  return items.slice(0, max).map(evidenceLine).join(" · ");
}

/** What an unbadged line means. Printed whenever a study has capabilities. */
export const UNBADGED_NOTE = PRESENTATION.capability.note;

/**
 * The key printed under a case study's evidence table, covering only the kinds
 * that study actually uses, so a page of plain capabilities does not carry an
 * explanation of measurement it never claims.
 *
 * `badge` is null for the default kind; the caller prints "No label" or similar
 * rather than leaving the row's meaning implicit.
 */
export function evidenceKey(items: Evidence[]): Array<{ badge: string | null; note: string }> {
  const seen = new Set<EvidenceKind>();
  const key: Array<{ badge: string | null; note: string }> = [];

  for (const item of items) {
    if (seen.has(item.kind)) continue;
    seen.add(item.kind);
    key.push({ badge: PRESENTATION[item.kind].badge, note: PRESENTATION[item.kind].note });
  }

  // The unlabelled default reads as "nothing to declare", so it belongs last
  // whatever order the items happen to be in.
  key.sort((a, b) => (a.badge === null ? 1 : 0) - (b.badge === null ? 1 : 0));

  return key;
}
