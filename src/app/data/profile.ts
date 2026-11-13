/**
 * Identity and headline copy, in one place.
 *
 * The headline and the deck live here rather than inline in the hero so the
 * wording can be revised without touching layout, and so the same strings can
 * feed metadata and structured data without being retyped.
 */
export const profile = {
  /** The brand leads; the legal name follows it. */
  brand: "CDenn",
  name: "Dennis Ndung'u",
  location: "Nairobi",
  reach: "working across time zones",

  /** H1. Short, concrete, and a claim that the case studies can carry. */
  headline: "I build operational systems that keep working.",

  /** The deck. */
  deck: "I find the gap a business can feel, work out what closing it is worth, and build to that. Multi-tenant platforms, payments and reconciliation, offline-first products, AI-assisted operations.",

  /** Stack line shown under the deck. */
  stack: "React · Next.js · TypeScript · Node · Rust · PostgreSQL · Flutter · FastAPI",

  portrait: {
    src: "/assets/images/port-photo-4.png",
    alt: "Dennis Ndung'u, the engineer behind CDenn",
  },
} as const;

/** "CDenn · Dennis Ndung'u · Nairobi, working across time zones" */
export const identityLine = [
  profile.brand,
  profile.name,
  `${profile.location}, ${profile.reach}`,
];
