import { Experience, Solution, Testimonial, Writing } from "@/src/app/types";

export const experiences: Experience[] = [
  {
    company: "E&M Technologies",
    role: "Software Engineer",
    period: "Mar 2025 - Present",
    desc: [
      "Led frontend development for core product, improving load time by 40%",
      "Implemented design system used across 3 product teams"
    ],
    tech: "React, Next.js, TailwindCSS"
  },
  {
    company: "Self-Employed",
    role: "Freelance Developer",
    period: "Aug 2022 - Feb 2025",
    desc: [
      "Delivered 10+ custom web solutions for international clients",
      "Managed full project lifecycle from concept to deployment"
    ],
    tech: "React, Node.js, AWS"
  }
];

export const solutions: Solution[] = [
  {
    title: "E-Commerce Platform",
    description: "Scalable online storefront with real-time inventory and secure checkout.",
    challenge: "Client needed to handle 10k concurrent users during flash sales without crashing.",
    results: [
      { label: "Uptime", value: "99.9%" },
      { label: "Load Time", value: "2.5s" },
      { label: "SKUs", value: "150+" }
    ],
    tags: ["Next.js", "Stripe", "Supabase"],
    image: "https://picsum.photos/seed/ecommerce/800/600",
    layout: "left"
  },
  {
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform with ML-powered insights for enterprise teams.",
    challenge: "Manual reporting was taking 20+ hours per week for data analysts.",
    solution: "Integrated OpenAI API to summarize complex datasets into actionable insights.",
    results: [
      { label: "Faster Decisions", value: "60%" },
      { label: "Data Points", value: "10k+" },
      { label: "Manual Work", value: "-45%" }
    ],
    tags: ["React", "Python", "FastAPI"],
    image: "https://picsum.photos/seed/analytics/800/600",
    layout: "right"
  }
];

export const testimonials: Testimonial[] = [
  {
    text: "CDenn delivered our MVP in half the expected time. His communication was excellent throughout, and the code quality was top-notch.",
    author: "John Smith",
    role: "CEO at StartupX",
    initials: "JS"
  },
  {
    text: "Working with CDenn transformed our user experience. Bounce rate dropped 35% after the redesign. Highly recommend him for any frontend project.",
    author: "Jane Doe",
    role: "Product Manager at CompanyY",
    initials: "JD"
  }
];

export const writings: Writing[] = [
  { title: "5 React Performance Patterns I Use in Every Project", date: "Jan 2025", tag: "React", readTime: "5 min" },
  { title: "When to Use SSR vs SSG in Next.js", date: "Feb 2025", tag: "Next.js", readTime: "4 min" },
  { title: "My Code Review Checklist for React Components", date: "Mar 2025", tag: "Workflow", readTime: "6 min" }
];