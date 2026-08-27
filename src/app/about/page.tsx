import type { Metadata } from "next";
import Link from "next/link";
import { sameAsUrls } from "@/src/app/data/social";

export const metadata: Metadata = {
  title: "About CDenn | Full-Stack Software Developer",
  description:
    "CDenn is Dennis Ndung'u, a Nairobi-based developer. Learn about his expertise in Next.js, fintech, and AI.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About CDenn | Full-Stack Software Developer",
    description:
      "CDenn is Dennis Ndung'u, a Nairobi-based developer specialising in Next.js, fintech, and AI tools.",
    url: "https://www.cdenn.dev/about",
    type: "profile",
  },
};

const aboutPersonSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Dennis Ndung'u",
    alternateName: "CDenn",
    url: "https://www.cdenn.dev",
    image: "https://www.cdenn.dev/assets/images/port-photo.png",
    jobTitle: "Full-Stack Software Developer",
    description:
      "CDenn is the professional brand and online identity of Dennis Ndung'u, a full-stack software developer based in Nairobi, Kenya.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    sameAs: sameAsUrls,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPersonSchema).replaceAll(
            "<",
            String.raw`\u003c`
          ),
        }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Portfolio
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              About <span className="text-primary">CDenn</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              The person behind the brand
            </p>
          </header>

          {/* Content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2>Who is CDenn?</h2>
              <p>
                <strong>CDenn</strong> is the professional brand name of{" "}
                <strong>Dennis Ndung&apos;u</strong>, a full-stack software developer
                based in Nairobi, Kenya. The name CDenn combines the initial
                &quot;C&quot; from his middle name with &quot;Denn&quot; from Dennis, creating a
                distinctive identity for his freelance and consulting work in
                software development.
              </p>
              <p>
                CDenn is <em>not</em> affiliated with the scientific term
                &quot;cDENN&quot;, which refers to the central conserved module of the
                DENN protein domain in molecular biology. CDenn is purely a
                software development brand focused on web applications, fintech
                systems, and AI integration.
              </p>
            </section>

            <section className="mb-12">
              <h2>What CDenn Does</h2>
              <p>
                CDenn specialises in building modern, performant web
                applications with a focus on:
              </p>
              <ul>
                <li>
                  <strong>Next.js &amp; React Development</strong> - Server-side
                  rendering, App Router architecture, and optimised frontend
                  performance
                </li>
                <li>
                  <strong>Fintech &amp; Payment Systems</strong> - M-Pesa Daraja
                  API integrations, STK push implementations, and payment
                  reconciliation systems for East African markets
                </li>
                <li>
                  <strong>AI-Integrated Applications</strong> - Leveraging
                  OpenAI and other AI APIs to build intelligent features like
                  the Email Refiner Chrome extension
                </li>
                <li>
                  <strong>Offline-First Applications</strong> - Progressive web
                  apps and mobile applications designed for low-connectivity
                  environments
                </li>
                <li>
                  <strong>MVP Development</strong> - Helping startups go from
                  idea to production-ready product quickly and efficiently
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2>Technical Expertise</h2>
              <p>
                With a strong foundation in TypeScript and modern JavaScript,
                CDenn delivers production-grade code across the full stack:
              </p>
              <div className="grid grid-cols-2 gap-4 not-prose my-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                    Frontend
                  </h3>
                  <p className="text-sm">
                    React, Next.js, TypeScript, TailwindCSS, Radix UI
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                    Backend
                  </h3>
                  <p className="text-sm">
                    Node.js, Prisma, PostgreSQL, REST APIs, Webhooks
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                    Mobile
                  </h3>
                  <p className="text-sm">Flutter, Dart, Riverpod, SQLite</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                    Tools
                  </h3>
                  <p className="text-sm">
                    Git, Vercel, Supabase, Chrome Extensions
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Featured Work</h2>
              <p>Some notable projects from the CDenn portfolio include:</p>
              <ul>
                <li>
                  <strong>Email Refiner</strong> - An AI-powered Chrome
                  extension that transforms email tone inside Gmail and Zimbra
                  without leaving the compose window
                </li>
                <li>
                  <strong>Ndoa Plan</strong> - An offline-first wedding
                  coordination platform built for Kenyan events, featuring
                  M-Pesa payment reconciliation and real-time collaboration
                </li>
                <li>
                  <strong>Sefer</strong> - A clean, feature-rich PDF reader for
                  Android with persistent annotations and library management
                </li>
              </ul>
              <p>
                View the full portfolio at{" "}
                <Link href="/" className="text-primary hover:underline">
                  cdenn.dev
                </Link>
                .
              </p>
            </section>

            <section className="mb-12">
              <h2>Working With CDenn</h2>
              <p>
                CDenn is available for full-time remote positions, freelance
                contracts, and consulting engagements. Whether you need:
              </p>
              <ul>
                <li>A complete MVP built from scratch</li>
                <li>M-Pesa integration for your existing platform</li>
                <li>Frontend architecture consulting</li>
                <li>AI feature development</li>
              </ul>
              <p>
                Get in touch through the{" "}
                <Link href="/#contact" className="text-primary hover:underline">
                  contact form
                </Link>{" "}
                to discuss your project.
              </p>
            </section>

            <section>
              <h2>Connect</h2>
              <p>Find CDenn across the web:</p>
              <ul>
                <li>
                  <a
                    href="https://github.com/CDenn03"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub - @CDenn03
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/cdenn03"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn - cdenn03
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/C_MDennis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X (Twitter) - @C_MDennis
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@cdenn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Medium - @cdenn
                  </a>
                </li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
