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
  image: string;
  layout: "left" | "right";
  websiteUrl?: string;
  codeUrl?: string;
  ongoing?: boolean;
  openSource?: boolean;
  featured?: boolean;
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