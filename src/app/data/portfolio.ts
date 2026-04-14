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
    title: "InsureMaster - Bancassurance Platform",
    description:
      "A multi-tenant SaaS platform for managing insurance policy lifecycles, from onboarding to claims and reporting.",
    challenge:
      "Built to support multi-tenant architecture with secure role-based access and high-performance financial workflows at scale.",
    results: [
      { label: "LCP", value: "2.1s" },
      { label: "Concurrent Users", value: "10k+" },
      { label: "Uptime", value: "99.9%" },
    ],
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Radix UI", "JWT"],
    image: "/assets/project-shots/InsureMaster.png",
    layout: "right",
    websiteUrl: "https://insuremaster.example.com",
    codeUrl: "https://github.com/example/insuremaster",
  },
  {
    title: "Email Refiner",
    description:
      "AI-powered Chrome extension that enhances email writing in Gmail and Zimbra with real-time tone transformation and preview.",
    challenge:
      "Integrating seamlessly into third-party email clients while maintaining performance, security, and a smooth user experience within dynamic DOM environments.",
    results: [
      { label: "Editing Time", value: "-40%" },
      { label: "Supported Clients", value: "2 (Gmail, Zimbra)" },
      { label: "Response Time", value: "<1s" },
    ],
    tags: [
      "React",
      "TypeScript",
      "Chrome Extensions",
      "OpenAI API",
      "MutationObserver",
    ],
    image: "/assets/project-shots/Email.png",
    layout: "left",
    websiteUrl: "https://refine-mail-web.vercel.app/",
    codeUrl: "https://github.com/CDenn03/RefineMailWeb",
  },
  {
    title: "Ndoa Plan",
    description:
      "Offline-first wedding coordination platform built for Kenyan weddings, with M-Pesa payment reconciliation, multi-event planning, budget tracking, and real-time day-of execution tools.",
    challenge:
      "Building a reliable planning tool for low-connectivity environments while keeping financial data consistent across offline-first sync, M-Pesa callbacks, and a multi-user role system.",
    results: [
      { label: "Wedding Events Supported", value: "10+" },
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
    websiteUrl: "",
    codeUrl: "https://github.com/CDenn03/ndoa_plan",
    ongoing: true,
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
