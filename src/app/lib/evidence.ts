import type { Evidence, EvidenceKind } from "@/src/app/types";

interface KindPresentation {
  /** Shown in the case-study evidence table, always. */
  badge: string;
  /**
   * Prefixed to the value in compact contexts (cards, index rows) where there
   * is no room for a table or a key.
   *
   * Only set for kinds that would be misread without it. A `capability` or a
   * `test` entry already describes itself ("Drift over SQLite", "155 tests"),
   * so prefixing it adds noise. A `target` or a `confidential` entry would
   * otherwise read as a verified outcome, which is the one thing this model
   * exists to prevent.
   */
  prefix?: string;
  /** Explains the badge in the table key. */
  note: string;
}

const PRESENTATION: Record<EvidenceKind, KindPresentation> = {
  measured: {
    badge: "Measured",
    prefix: "Measured",
    note: "Taken from a real measurement; the method and date are stated.",
  },
  capability: {
    badge: "Built",
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

export function evidenceBadge(kind: EvidenceKind): string {
  return PRESENTATION[kind].badge;
}

/**
 * One-line form for cards and index rows: "Target: under 200MB RAM".
 * Falls back to the bare value where a prefix would only add noise.
 */
export function evidenceLine(item: Evidence): string {
  const { prefix } = PRESENTATION[item.kind];
  return prefix ? `${prefix}: ${item.value}` : item.value;
}

export function evidenceSummary(items: Evidence[], max = 3): string {
  return items.slice(0, max).map(evidenceLine).join(" · ");
}

/**
 * The key printed under a case study's evidence table, covering only the kinds
 * that study actually uses, so a page of plain capabilities does not carry an
 * explanation of measurement it never claims.
 */
export function evidenceKey(items: Evidence[]): Array<{ badge: string; note: string }> {
  const seen = new Set<EvidenceKind>();
  const key: Array<{ badge: string; note: string }> = [];

  for (const item of items) {
    if (seen.has(item.kind)) continue;
    seen.add(item.kind);
    key.push({ badge: PRESENTATION[item.kind].badge, note: PRESENTATION[item.kind].note });
  }

  return key;
}
