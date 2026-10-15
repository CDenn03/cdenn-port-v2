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
  results: Array<{
    label: string;
    value: string;
    trend?: string;
  }>;
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

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  initials: string;
}

export interface Writing {
  title: string;
  date: string;
  tag: string;
  readTime: string;
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