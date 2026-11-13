/**
 * The four areas the work is organised around.
 *
 * Each one points at the page that explains it, so the home page can state the
 * specialisation in a scannable row without repeating that page's copy.
 * `proof` names what in the archive backs the claim: the point is that a
 * reader can check it rather than take it.
 */
export interface Specialism {
  title: string;
  /** The business problem, stated the way the business would feel it. */
  gap: string;
  /** What I do about it. No absolutes, no figures without a method. */
  response: string;
  /** What in the archive demonstrates it. */
  proof: string;
  href: string;
  /** Varies because not every specialism has a service page behind it. */
  linkText: string;
}

export const specialisms: Specialism[] = [
  {
    title: "Multi-tenant platforms",
    gap: "One product serving client organisations that must never see each other's data, without maintaining a separate codebase for every client.",
    response:
      "Tenant scope and role permissions enforced in the architecture, supported by staged approvals and action-level audit logs.",
    proof: "Bancassurance Platform, WarehouseLens",
    href: "/services/multi-tenant-saas",
    linkText: "Explore the engagement",
  },
  {
    title: "Payments and reconciliation",
    gap: "Money that arrives twice, does not arrive at all, or leaves finance unable to reconcile internal records against the provider's records.",
    response:
      "Validated provider callbacks, idempotent processing and reconciliation against an internal ledger rather than trusting incoming events blindly.",
    proof: "Ndoa Plan",
    href: "/services/fintech-automation",
    linkText: "Explore the engagement",
  },
  {
    title: "Offline-first products",
    gap: "A field team loses a working day whenever connectivity disappears and has to reconstruct its work later from memory.",
    response:
      "A local database as the source of truth, with a durable replay queue and conflict strategy selected for each record type.",
    proof: "Ndoa Plan, Sefer, Mathesis and Near Field",
    href: "/services/offline-first-apps",
    linkText: "Explore the engagement",
  },
  {
    title: "AI-assisted operations",
    gap: "Decisions waiting on an analyst, and an obvious AI solution that could produce answers nobody can audit.",
    response:
      "Tool-routed agents that refuse out-of-scope questions, with permission checks inside the agent and no model-written SQL.",
    proof: "WarehouseLens, Email Refiner",
    // No service page for this one yet, so it links to the work itself rather
    // than to a page that does not exist.
    href: "/solutions/warehouselens",
    linkText: "Explore the case study",
  },
];
