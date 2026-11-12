/**
 * The four areas the work is organised around.
 *
 * Each one points at the service page that explains it, so the home page can
 * state the specialisation in a scannable row without repeating that page's
 * copy. `proof` names what in the archive backs the claim: the point is that a
 * reader can check it rather than take it.
 */
export interface Specialism {
  title: string;
  /** One line. No absolutes, no figures without a method. */
  summary: string;
  /** What in the archive demonstrates it. */
  proof: string;
  href: string;
  /** Varies because not every specialism has a service page behind it. */
  linkText: string;
}

export const specialisms: Specialism[] = [
  {
    title: "Multi-tenant platforms",
    summary:
      "Tenant scope and role permissions enforced in the data layer, with staged approvals and action-level audit logs.",
    proof: "Bancassurance platform, WarehouseLens",
    href: "/services/multi-tenant-saas",
    linkText: "The engagement",
  },
  {
    title: "Payments and reconciliation",
    summary:
      "Provider callbacks validated, made idempotent and reconciled against an internal ledger rather than trusted on arrival.",
    proof: "Ndoa Plan",
    href: "/services/fintech-automation",
    linkText: "The engagement",
  },
  {
    title: "Offline-first products",
    summary:
      "A local database as the source of truth, with a durable replay queue and a conflict strategy chosen per record type.",
    proof: "Ndoa Plan, Sefer, Mathesis, Near Field",
    href: "/services/offline-first-apps",
    linkText: "The engagement",
  },
  {
    title: "AI-assisted operations",
    summary:
      "Tool-routed agents that refuse out-of-scope questions, with permission checks inside the agent and no model-written SQL.",
    proof: "WarehouseLens, Email Refiner",
    // No service page for this one yet, so it links to the work itself rather
    // than to a page that does not exist.
    href: "/solutions/warehouselens",
    linkText: "The case study",
  },
];
