import { Experience, Solution, Testimonial, Writing } from "@/src/app/types";

export const experiences: Experience[] = [
  {
    company: "E&M Technologies",
    role: "Frontend Engineer",
    period: "Jan 2025 - Present",
    desc: [
      "Led frontend architecture and development of the core product using React and Next.js, improving page load performance by 40%",
      "Designed and implemented a scalable design system adopted across 3+ product teams, ensuring UI consistency and faster feature delivery",
      "Collaborated with backend and product teams to translate business requirements into performant, user-centric interfaces",
      "Improved maintainability of legacy code by introducing TypeScript patterns and reusable component structures",
    ],
    tech: "React, Next.js, TypeScript, TailwindCSS, REST APIs",
  },
];

export const solutions: Solution[] = [
  {
    slug: "insuremaster",
    title: "InsureMaster - Bancassurance Platform",
    summary: "Multi-tenant bancassurance SaaS for Kenyan banks — managing policies, claims, and compliance reporting in one place.",
    description:
      "A multi-tenant SaaS platform for managing insurance policy lifecycles, from onboarding to claims and reporting.",
    story:
      "Insurance distribution in emerging markets is plagued by paper-heavy processes, slow policy issuance, and disconnected systems between banks and insurers. InsureMaster was built to bridge that gap — a single platform that lets bancassurance teams onboard customers, issue policies, process claims, and generate compliance reports, all without leaving their workflow. I led the frontend architecture from the ground up, designing a component system that could serve multiple tenants with different branding while sharing a unified codebase.",
    challenge:
      "Built to support multi-tenant architecture with secure role-based access and high-performance financial workflows at scale.",
    solution:
      "Designed a theme-aware component library with tenant-scoped configs, JWT-based role permissions, and a virtual-scroll data grid that handled 50k+ policy records without UI degradation.",
    results: [
      { label: "LCP", value: "2.1s" },
      { label: "Concurrent Users", value: "10k+" },
      { label: "Uptime", value: "99.9%" },
    ],
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Radix UI", "JWT"],
    image: "/assets/project-shots/InsureMaster.png",
    layout: "right",
    featured: true,
    year: "2024",
    role: "Frontend Lead",
    duration: "8 months",
    category: "SaaS / Fintech",
  },
  {
    slug: "email-refiner",
    title: "Email Refiner",
    summary: "Chrome extension that rewrites email tone inside Gmail and Zimbra — no copy-paste, no context switching.",
    description:
      "AI-powered Chrome extension that enhances email writing in Gmail and Zimbra with real-time tone transformation and preview.",
    story:
      "Most AI writing tools live outside the browser — users copy their draft, visit a tool, paste, rewrite, and copy back. That friction kills adoption. Email Refiner injected itself directly into Gmail and Zimbra's compose windows, adding a floating toolbar that rewrote tone (formal, friendly, concise) in under a second without leaving the editor. I built the injection layer with MutationObserver to handle Gmail's dynamic DOM, and the extension's content script communicated with a background worker to keep API calls off the main thread.",
    challenge:
      "Integrating seamlessly into third-party email clients while maintaining performance, security, and a smooth user experience within dynamic DOM environments.",
    solution:
      "Used MutationObserver to detect compose windows across both clients, isolated the React UI in a shadow DOM to prevent style conflicts, and offloaded OpenAI calls to a background service worker.",
    results: [
      { label: "Editing Time", value: "-40%" },
      { label: "Supported Clients", value: "2" },
      { label: "Response Time", value: "<1s" },
    ],
    tags: ["React", "TypeScript", "Chrome Extensions", "OpenAI API", "MutationObserver"],
    image: "/assets/project-shots/Email.png",
    layout: "left",
    featured: true,
    websiteUrl: "https://refine-mail-web.vercel.app/",
    codeUrl: "https://github.com/CDenn03/RefineMailWeb",
    openSource: true,
    year: "2024",
    role: "Solo Developer",
    duration: "3 months",
    category: "Browser Extension / AI",
  },
  {
    slug: "ndoa-plan",
    title: "Ndoa Plan",
    summary: "Offline-first wedding coordination platform for Kenyan events — M-Pesa reconciliation, budget tracking, and day-of execution tools.",
    description:
      "Offline-first wedding coordination platform built for Kenyan weddings, with M-Pesa payment reconciliation, multi-event planning, budget tracking, and real-time day-of execution tools.",
    story:
      "Kenyan weddings are complex, multi-day events involving dozens of vendors, hundreds of guests, and financial contributions collected through M-Pesa. Spreadsheets and WhatsApp groups collapse under that weight. Ndoa Plan was designed for event coordinators who need reliability — the app works fully offline, syncing data when connectivity returns, and reconciles M-Pesa STK push callbacks to track who paid what. Building offline-first with Dexie (IndexedDB) as the primary store while keeping a Postgres backend in sync was the most technically demanding part of the project.",
    challenge:
      "Building a reliable planning tool for low-connectivity environments while keeping financial data consistent across offline-first sync, M-Pesa callbacks, and a multi-user role system.",
    solution:
      "Implemented a Dexie-based local-first store with a background sync queue, conflict resolution strategy using server timestamps, and a webhook handler for M-Pesa Daraja callbacks that reconciled payments against guest contribution records.",
    results: [
      { label: "Wedding Events", value: "10+" },
      { label: "Budget Accuracy", value: "Real-time" },
      { label: "Offline Support", value: "Full CRUD" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Dexie (IndexedDB)",
      "M-Pesa Daraja API",
      "Supabase Storage",
      "TanStack Query",
      "Tailwind CSS",
    ],
    image: "/assets/project-shots/NdoaPlan.png",
    layout: "right",
    featured: true,
    websiteUrl: "",
    codeUrl: "https://github.com/CDenn03/ndoa_plan",
    ongoing: true,
    openSource: true,
    year: "2025",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    category: "Event Tech / Fintech",
  },
];


export const testimonials: Testimonial[] = [
  {
    text: "CDenn delivered our MVP in half the expected time. His communication was excellent throughout, and the code quality was top-notch.",
    author: "John Smith",
    role: "CEO at StartupX",
    initials: "JS",
  },
  {
    text: "Working with CDenn transformed our user experience. Bounce rate dropped 35% after the redesign. Highly recommend him for any frontend project.",
    author: "Jane Doe",
    role: "Product Manager at CompanyY",
    initials: "JD",
  },
];

export const writings: Writing[] = [
  {
    title: "5 React Performance Patterns I Use in Every Project",
    date: "Jan 2025",
    tag: "React",
    readTime: "5 min",
  },
  {
    title: "When to Use SSR vs SSG in Next.js",
    date: "Feb 2025",
    tag: "Next.js",
    readTime: "4 min",
  },
  {
    title: "My Code Review Checklist for React Components",
    date: "Mar 2025",
    tag: "Workflow",
    readTime: "6 min",
  },
];

export function getAdjacentProjects(slug: string) {
  const idx = solutions.findIndex((s) => s.slug === slug);
  return {
    prev: idx > 0 ? solutions[idx - 1] : null,
    next: idx < solutions.length - 1 ? solutions[idx + 1] : null,
  };
}
