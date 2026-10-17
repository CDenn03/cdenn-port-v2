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
  // {
  //   slug: "insuremaster",
  //   title: "InsureMaster - Bancassurance Platform",
  //   summary:
  //     "Multi-tenant bancassurance SaaS for Kenyan banks - managing policies, claims, and compliance reporting in one place.",
  //   description:
  //     "A multi-tenant SaaS platform for managing insurance policy lifecycles, from onboarding to claims and reporting.",
  //   story:
  //     "Insurance distribution in emerging markets is plagued by paper-heavy processes, slow policy issuance, and disconnected systems between banks and insurers. InsureMaster was built to bridge that gap - a single platform that lets bancassurance teams onboard customers, issue policies, process claims, and generate compliance reports, all without leaving their workflow. I led the frontend architecture from the ground up, designing a component system that could serve multiple tenants with different branding while sharing a unified codebase.",
  //   challenge:
  //     "Built to support multi-tenant architecture with secure role-based access and high-performance financial workflows at scale.",
  //   solution:
  //     "Designed a theme-aware component library with tenant-scoped configs, JWT-based role permissions, and a virtual-scroll data grid that handled 50k+ policy records without UI degradation.",
  //   results: [
  //     { label: "LCP", value: "2.1s" },
  //     { label: "Concurrent Users", value: "10k+" },
  //     { label: "Uptime", value: "99.9%" },
  //   ],
  //   tags: ["Next.js", "TypeScript", "TailwindCSS", "Radix UI", "JWT"],
  //   image: "/assets/project-shots/InsureMaster.png",
  //   layout: "right",
  //   featured: true,
  //   year: "2025",
  //   role: "Frontend Lead",
  //   duration: "8 months",
  //   category: "SaaS / Fintech",
  // },
  {
    slug: "bancassurance-platform",
    title: "Bancassurance Platform",
    summary:
      "Multi-tenant SaaS for a financial services provider - policy lifecycle management, claims processing, and compliance reporting. Code under NDA.",
    description:
      "Multi-tenant SaaS platform for managing insurance policy lifecycles across bancassurance channels. Built for a financial services provider operating across multiple bank partnerships.",
    story:
      "Insurance distribution in East Africa relies heavily on bank branches as the primary sales channel. The challenge was building a single platform that could serve multiple bank tenants - each with different branding, products, and compliance requirements - while sharing a unified codebase. I led the frontend architecture: a multi-tenant RBAC model with JWT-based tenant isolation, action-level audit logging across the platform, and a maker-checker approval workflow enforced end-to-end from the UI down to the API. Virtualised data grids kept large policy and claims tables responsive, and a shared schema-validation layer backed the multi-step policy creation and onboarding flows.",
    challenge:
      "Multi-tenant architecture with strict data isolation between bank tenants, role-based access that reflects real approval hierarchies, and auditable financial workflows - without forking the codebase per tenant.",
    solution:
      "Designed a theme-aware component library with tenant-scoped configs, JWT-based role permissions enforced at the tenant boundary, action-level audit logging, and a maker-checker approval workflow spanning 7 entity types. Session security included OTP-based 2FA and silent token refresh with cookie rotation.",
    results: [
      { label: "Architecture", value: "Multi-tenant RBAC" },
      { label: "Approval Workflow", value: "Maker-checker, 7 entities" },
      { label: "Auditability", value: "Action-level logging" },
      { label: "Delivery", value: "8 months" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "JWT",
      "RBAC",
      "Multi-tenant",
      "Fintech",
    ],
    image: undefined,
    layout: "right",
    featured: true,
    nda: true,
    year: "2025",
    role: "Frontend Lead",
    duration: "8 months",
    category: "SaaS / Fintech",
  },
  {
    slug: "warehouselens",
    title: "WarehouseLens",
    summary:
      "Multi-tenant warehouse operations platform with a natural-language copilot - tool-routing agent, demand forecasting, and warehouse-scoped RBAC. Built solo.",
    description:
      "A multi-tenant, AI-assisted warehouse operations platform covering inventory, procurement, and outbound logistics. A Next.js BFF over a FastAPI backend, with a natural-language copilot, Prophet/XGBoost demand forecasting, and permission enforcement down to individual warehouses.",
    story:
      "Warehouse teams sit on data they cannot interrogate - stock levels, supplier performance, and outbound status live in separate screens, and the question an operations manager actually has rarely maps to one of them. WarehouseLens answers those questions in natural language, but the interesting constraint was trust: the planner is never allowed to generate SQL. It selects exactly one tool through native tool-calling, that tool runs a fixed parameterized query, and a second model call turns the structured result into prose - so the copilot cannot invent a number, and it refuses outright when a question reaches a warehouse the caller is not assigned to. Underneath sits a two-level identity model (a platform tenant that provisions other tenants), 6 roles across 21 permissions with warehouse-scope enforcement, and a background worker that keeps aggregation and reservation recompute off the request path.",
    challenge:
      "Letting a language model answer operational questions without ever letting it fabricate a figure or read across a tenant or warehouse boundary - while keeping a write-heavy API responsive and demand forecasts honest enough to act on.",
    solution:
      "Built a LangGraph plan/execute/synthesize graph where the planner only ever picks a tool, never writes a query, and permission checks run inside the agent so an out-of-scope question is refused rather than answered. Paired it with a Next.js BFF that keeps tokens out of client JS, Keycloak JWTs verified against a cached JWKS endpoint, a Prophet and XGBoost forecasting layer validated by a rolling-fold backtest harness, and a background worker for asynchronous aggregation.",
    results: [
      { label: "Access Control", value: "6 roles / 21 permissions" },
      { label: "Copilot", value: "Tool-routing, no generated SQL" },
      { label: "Forecasting", value: "Prophet + XGBoost, backtested" },
      { label: "Test Suite", value: "94 tests + eval harness" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Keycloak",
      "LangGraph",
      "Prophet",
      "XGBoost",
      "Docker",
    ],
    image: undefined,
    featured: true,
    ongoing: true,
    year: "2026",
    role: "Solo Developer",
    duration: "Ongoing",
    category: "SaaS / Logistics / AI",
  },
  {
    slug: "opsis",
    title: "Opsis",
    summary:
      "Self-hosted production control platform for church media teams - a Next.js BFF, an always-on Rust core, and live OBS control over WebSocket.",
    description:
      "A self-hosted, single-organization platform that monitors and controls a church's live production stack. A multi-service system splitting a Next.js frontend/BFF, an always-on Rust control core, and live OBS integration over WebSocket.",
    story:
      "Church media teams run live production stacks with little visibility into what's actually happening and no safe, central way to control it. Opsis was built as a self-hosted platform that gives one organization production-grade visibility and control over that stack. The architecture deliberately splits responsibilities: a Next.js frontend doubles as a BFF and issues auth, while an always-on Rust core handles production control, talks to OBS, and runs a WebSocket hub. A shared JWT contract lets both services verify tokens independently, and the whole stack ships as a Docker Compose deployment that applies migrations and seeds a first operator on start.",
    challenge:
      "Designing a multi-service system where a Rust control core and a Next.js BFF each verify auth independently against a shared JWT contract, hold an always-on connection to OBS, and run as a single-command self-hosted deployment within a tight resource budget.",
    solution:
      "Built a Next.js BFF that issues auth and a Rust core that enforces it independently against a shared JWT verification spec, a WebSocket hub for live OBS control, and a Docker Compose deployment that applies migrations and seeds the first operator on first run - targeting under 200MB RAM and 5% idle CPU for the core.",
    results: [
      { label: "Services", value: "Next.js BFF + Rust core" },
      { label: "Live Control", value: "OBS over WebSocket" },
      { label: "Core Footprint", value: "<200MB / <5% CPU" },
      { label: "Deploy", value: "docker compose up" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Rust",
      "WebSocket",
      "OBS",
      "PostgreSQL",
      "JWT",
      "Docker",
    ],
    image: "/assets/project-shots/opsis.png",
    layout: "left",
    featured: true,
    ongoing: true,
    year: "2026",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    category: "Media Tech / Self-Hosted",
  },
  {
    slug: "steward",
    title: "Steward",
    summary:
      "Financial governance platform for faith-based organizations - multi-stage budget approvals, role-based permissions, and receipt tracking.",
    description:
      "A financial governance platform for faith-based organizations, non-profits, and community groups. Manages budgets through a multi-stage approval workflow with fine-grained, role-based permissions.",
    story:
      "Faith-based organizations and non-profits handle real money but rarely have software built for how they actually govern it - budgets drafted by department heads, reviewed by finance, and signed off by a chairperson, with receipts and disbursements tracked throughout. Steward models that governance directly. A budget moves through a defined approval pipeline (Draft → Submitted → Finance Review → Chair Approval → Approved, with a Needs-Changes path back to Draft), and a role-based permission system scopes exactly what each role can see and do. It's built on Next.js with Prisma over PostgreSQL, Auth.js for authentication, and Cloudflare R2 for receipt storage.",
    challenge:
      "Encoding a real-world financial approval workflow with role-scoped permissions - draft, review, and sign-off stages plus receipt and disbursement tracking - into a maintainable, auditable system.",
    solution:
      "Built a staged approval pipeline (Draft → Submitted → Finance Review → Chair Approval → Approved, with a Needs-Changes return path) on Next.js and Prisma/PostgreSQL, with a fine-grained role-based permission layer, Auth.js authentication, and Cloudflare R2 for receipt uploads.",
    results: [
      { label: "Approval Stages", value: "5-stage pipeline" },
      { label: "Access Control", value: "Role-based permissions" },
      { label: "Receipts", value: "R2-backed uploads" },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Auth.js",
      "Tailwind CSS 4",
      "Cloudflare R2",
      "Recharts",
    ],
    image: undefined,
    layout: "right",
    featured: true,
    year: "2025",
    role: "Full-Stack Developer",
    duration: "3 months",
    category: "SaaS / Fintech",
  },
  {
    slug: "email-refiner",
    title: "Email Refiner",
    summary:
      "Chrome extension that rewrites email tone inside Gmail and Zimbra - no copy-paste, no context switching.",
    description:
      "AI-powered Chrome extension that enhances email writing in Gmail and Zimbra with real-time tone transformation and preview.",
    story:
      "Most AI writing tools live outside the browser - users copy their draft, visit a tool, paste, rewrite, and copy back. That friction kills adoption. Email Refiner injected itself directly into Gmail and Zimbra's compose windows, adding a floating toolbar that rewrote tone (formal, friendly, concise) in under a second without leaving the editor. I built the injection layer with MutationObserver to handle Gmail's dynamic DOM, and the extension's content script communicated with a background worker to keep API calls off the main thread.",
    challenge:
      "Integrating seamlessly into third-party email clients while maintaining performance, security, and a smooth user experience within dynamic DOM environments.",
    solution:
      "Used MutationObserver to detect compose windows across both clients, isolated the React UI in a shadow DOM to prevent style conflicts, and offloaded OpenAI calls to a background service worker.",
    results: [
      { label: "Editing Time", value: "-40%" },
      { label: "Supported Clients", value: "2" },
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
    featured: false,
    websiteUrl: "https://refine-mail-web.vercel.app/",
    codeUrl: "https://github.com/CDenn03/RefineMailWeb",
    openSource: true,
    year: "2026",
    role: "Solo Developer",
    duration: "3 months",
    category: "Browser Extension / AI",
  },
  {
    slug: "ndoa-plan",
    title: "Ndoa Plan",
    summary:
      "Offline-first wedding coordination platform for Kenyan events - payments API reconciliation, budget tracking, and day-of execution tools.",
    description:
      "Offline-first wedding coordination platform built for Kenyan weddings, with payments API reconciliation, multi-event planning, budget tracking, and real-time day-of execution tools.",
    story:
      "Kenyan weddings are complex, multi-day events involving dozens of vendors, hundreds of guests, and financial contributions collected through digital payment channels. Spreadsheets and WhatsApp groups collapse under that weight. Ndoa Plan was designed for event coordinators who need reliability - the app works fully offline, syncing data when connectivity returns, and reconciles payment-provider callbacks to track who paid what. Building offline-first with Dexie (IndexedDB) as the primary store while keeping a Postgres backend in sync was the most technically demanding part of the project.",
    challenge:
      "Building a reliable planning tool for low-connectivity environments while keeping financial data consistent across offline-first sync, payment-provider callbacks, and a multi-user role system.",
    solution:
      "Implemented a Dexie-based local-first store with a background sync queue, conflict resolution strategy using server timestamps, and a webhook handler for payments API callbacks that reconciled payments against guest contribution records.",
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
      "Payments APIs",
      "Supabase Storage",
      "TanStack Query",
      "Tailwind CSS",
    ],
    image: "/assets/project-shots/NdoaPlan.png",
    layout: "right",
    featured: false,
    websiteUrl: "https://ndoa-plan.vercel.app",
    codeUrl: "",
    ongoing: true,
    year: "2026",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    category: "Event Tech / Fintech",
  },
  {
    slug: "sefer",
    title: "Sefer",
    summary:
      "Offline-first PDF reader for Android - library management, persistent annotations, and an immersive reading experience.",
    description:
      "A clean, feature-rich PDF reader built with Flutter for Android. Manage a local library of documents, organise files into collections, annotate with highlights and freehand drawing, and resume reading exactly where you left off - all without a network connection.",
    story:
      "Most Android PDF readers are either too bloated or too bare. Sefer was built to hit the sweet spot - fast, offline-first, and genuinely useful. The annotation system was the hardest part: accurately mapping touch coordinates to PDF page space across different zoom levels and reading modes required a custom coordinate mapper layered on top of pdfrx's render pipeline. Persisting those annotations reliably in SQLite, then replaying them as overlays on re-open, took careful separation between the render layer and the data layer.",
    challenge:
      "Building a pixel-accurate annotation overlay that survives zoom, page changes, and reading mode switches, while keeping the SQLite persistence and Riverpod state in sync without leaking render details into business logic.",
    solution:
      "Implemented a custom CoordinateMapper that converts between screen and normalised PDF-space coordinates, backed by dedicated SQLite DAOs for annotations and notes. Riverpod providers isolate reader state from annotation state, and a debounced persistence service batches rapid library mutations into single writes.",
    results: [
      { label: "Reading Modes", value: "3" },
      { label: "Annotation Types", value: "Highlight, Draw, Note" },
      { label: "Offline Support", value: "Full CRUD" },
    ],
    tags: [
      "Flutter",
      "Dart",
      "Riverpod",
      "sqflite",
      "pdfrx",
      "Syncfusion PDF",
      "GoRouter",
      "Freezed",
      "SharedPreferences",
      "Google Fonts",
    ],
    image: "/assets/project-shots/sefer.jpeg",
    layout: "left",
    featured: false,
    websiteUrl: "",
    codeUrl: "https://github.com/CDenn03/pdf_app",
    ongoing: true,
    openSource: true,
    year: "2026",
    role: "Mobile Developer",
    duration: "Ongoing",
    category: "Productivity / Mobile",
  },
  {
    slug: "mathesis",
    title: "Mathesis",
    summary:
      "Multi-discipline learning platform with dual reference and learn modes - search-first navigation and interactive experiments for every topic.",
    description:
      "A personal multi-discipline learning platform that pairs quick-lookup reference material with interactive, hands-on learning for every topic. Built around a search-first navigation model and a repeatable learn-by-doing loop.",
    story:
      "Most learning resources force a choice: reference docs you skim, or courses you grind through. Mathesis was built to serve both from a single content model - every topic has a reference view for quick lookup and a learn view that walks through an experience-then-explain loop. The hardest part was designing a content registry that could express both modes without duplicating material, so a book, chapter, and topic each resolve to the right view through a single typed registry. A command palette makes search the primary way to move around rather than deep menu trees.",
    challenge:
      "Modelling content so every topic supports both a reference and an interactive learn mode from one source, while keeping search-first navigation fast and the structure easy to extend with new books.",
    solution:
      "Built a typed content registry in TypeScript that resolves books, chapters, and topics to dual views without duplication, a ⌘K command palette for search-first navigation, and localStorage-backed bookmarks and recently-viewed tracking for lightweight progress state.",
    results: [
      { label: "Content Modes", value: "Reference + Learn" },
      { label: "Navigation", value: "⌘K search-first" },
      { label: "Progress", value: "Bookmarks + history" },
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
    ],
    image: undefined,
    layout: "right",
    featured: false,
    ongoing: true,
    year: "2026",
    role: "Solo Developer",
    duration: "Ongoing",
    category: "EdTech / Web",
  },
  {
    slug: "near-field",
    title: "Near Field",
    summary:
      "Android alarm clock that only dismisses when you tap a registered NFC tag - Flutter UI over a native Kotlin alarm engine via Pigeon.",
    description:
      "An Android-only Flutter alarm clock that can only be dismissed by tapping a registered NFC tag. Flutter owns alarm and tag configuration; native Android owns persistence, exact scheduling, reboot recovery, and the full-screen ringing flow.",
    story:
      "The point of an alarm is to get you out of bed - but a swipe-to-dismiss alarm is too easy to beat half-asleep. Near Field forces you to physically walk to a registered NFC tag and tap it to stop the alarm. That requirement pushed the hard parts into native Android: exact scheduling that survives deep sleep and reboot, a full-screen ringing flow over the lock screen, and tag validation. Flutter handles configuration while a typed Pigeon bridge carries the contract between Dart and Kotlin. The app deliberately skips a state-management package - constructor injection and ListenableBuilder are enough for its small state surface.",
    challenge:
      "Guaranteeing an alarm fires after deep sleep and reboot, appears over the lock screen, and dismisses only on a registered NFC tag - across the Flutter/Android boundary and OEM battery-optimization policies.",
    solution:
      "Split the app so Android owns alarm lifecycle, exact scheduling, reboot recovery, and the full-screen ringing flow, while Flutter owns configuration - connected by a typed Pigeon bridge. Tag dismissal validates registered NTAG215 tags and resets progress after snooze.",
    results: [
      { label: "Dismissal", value: "NFC tag tap" },
      { label: "Native Bridge", value: "Pigeon (Dart ↔ Kotlin)" },
      { label: "Reliability", value: "Survives reboot + deep sleep" },
    ],
    tags: [
      "Flutter",
      "Dart",
      "Kotlin",
      "Android",
      "NFC",
      "Pigeon",
    ],
    image: undefined,
    layout: "left",
    featured: false,
    ongoing: true,
    year: "2026",
    role: "Mobile Developer",
    duration: "Ongoing",
    category: "Utility / Mobile",
  },
  {
    slug: "gik-souls-app",
    title: "GIK Souls App",
    summary:
      "Offline-first Flutter app for mission follow-up - clean architecture, Drift local-first storage, and a background sync queue.",
    description:
      "An offline-first Flutter app built for mission follow-up workflows, structured on a strict clean architecture with a pure-Dart domain layer, Riverpod presentation, and a local-first data layer backed by Drift.",
    story:
      "Follow-up work happens in the field, often without reliable connectivity, so the app had to work fully offline and sync when a connection returns. I built it on a strict clean architecture: a pure-Dart domain layer with Freezed entities and repository contracts, a Riverpod presentation layer that depends only on domain interfaces, and a data layer that coordinates local-first reads from Drift while enqueuing mutations for a remote Django backend over Dio. Keeping the domain layer free of Flutter and package dependencies made the business rules testable in isolation and the sync behaviour easy to reason about.",
    challenge:
      "Delivering a field-ready app that works fully offline, syncs reliably when connectivity returns, and keeps business rules testable - without leaking framework or network concerns into the domain layer.",
    solution:
      "Implemented a layered clean architecture: pure-Dart domain (Freezed entities, use cases, repository contracts), Riverpod presentation depending only on domain interfaces, and a data layer that reads local-first from Drift and enqueues mutations to a Django backend via Dio with interceptors.",
    results: [
      { label: "Offline Support", value: "Full local-first" },
      { label: "Architecture", value: "Clean / layered" },
      { label: "Local Store", value: "Drift (SQLite)" },
    ],
    tags: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Drift",
      "Freezed",
      "Dio",
      "GoRouter",
      "Django (backend)",
    ],
    image: undefined,
    layout: "right",
    featured: false,
    year: "2026",
    role: "Mobile Developer",
    duration: "2 months",
    category: "Mission Tech / Mobile",
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
