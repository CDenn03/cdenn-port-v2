/**
 * How a piece of proof should be read.
 *
 * Every item carries one of these, and the UI prints the kind beside it, so
 * nothing can read as a measured outcome unless it actually is one. A figure
 * survives as `measured` only when its baseline, method and date can be
 * described; otherwise it becomes a plain statement of what was built.
 */
export type EvidenceKind =
  /** A real measurement. `method` is required. */
  | "measured"
  /** An implementation fact about what exists in the system. */
  | "capability"
  /** Test or backtest evidence. */
  | "test"
  /** A design goal that was aimed at, not a result that was achieved. */
  | "target"
  /** A deployed reference running illustrative rather than customer data. */
  | "demo"
  /** A client claim that cannot be shown or independently checked. */
  | "confidential";

export interface Evidence {
  label: string;
  value: string;
  kind: EvidenceKind;
  /** How and when it was measured. Only meaningful for `measured`. */
  method?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  desc: string[];
  tech: string;
}

export interface Solution {
  title: string;
  slug: string;
  description: string;
  story: string;
  challenge: string;
  solution?: string;
  /**
   * Named `evidence`, not `results`: most entries are implementation facts or
   * stated targets rather than outcomes, and the old name invited reading them
   * all as achievements.
   */
  evidence: Evidence[];
  tags: string[];
  image?: string;
  /**
   * Legacy hint only. The homepage alternates sides by position
   * (see SolutionsSection), so reordering projects needs no edits here.
   */
  layout?: "left" | "right";
  websiteUrl?: string;
  codeUrl?: string;
  ongoing?: boolean;
  openSource?: boolean;
  featured?: boolean;
  /**
   * True only for work whose code genuinely cannot be shared (client/employer
   * NDA). Drives the lock badge and the "Code under NDA" copy. A project that
   * merely has no screenshot yet must NOT set this - it gets a neutral
   * placeholder instead, so the site never claims a confidentiality
   * restriction that does not exist.
   */
  nda?: boolean;
  // profile fields
  year: string;
  role: string;
  duration: string;
  category: string;
  // detail page fields
  summary?: string;
  heroPosition?: string;
  process?: Array<{ step: string; detail: string }>;
  screenshots?: Array<{ src: string; caption: string }>;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ThemeContextType {
  theme: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
  mounted: boolean;
}
export interface RevisionResult {
  success: boolean;
  type: 'extension' | 'general' | 'cover';
  revisionId?: string;
  message?: string;
}

export interface RevisionFormData {
  coverType: string;
  description: string;
  attachments: File[];
}