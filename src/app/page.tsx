import type { Metadata } from "next";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { AtAGlance } from "./components/sections/AtAGlance";
import { SolutionsSection } from "./components/sections/SolutionsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackToTop } from "./components/ui/BackToTop";
import { sameAsUrls } from "@/src/app/data/social";

export const metadata: Metadata = {
  // No title here: `/` is the root layout's own segment, so the `%s | CDenn`
  // template does NOT apply to it. The layout's `title.default`
  // ("CDenn | Dennis Ndung'u, Frontend Engineer") is what renders, and
  // re-declaring it here only risks the two drifting apart.
  description:
    "CDenn is Dennis Ndung'u, a Frontend Engineer in Nairobi building multi-tenant platforms, payments and reconciliation, offline-first products and AI-assisted operations.",
  alternates: {
    canonical: "/",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.cdenn.dev/#person",
  name: "Dennis Ndung'u",
  alternateName: "CDenn",
  url: "https://www.cdenn.dev",
  mainEntityOfPage: "https://www.cdenn.dev/",
  jobTitle: "Frontend Engineer",
  brand: { "@id": "https://www.cdenn.dev/#brand" },
  worksFor: { "@type": "Organization", name: "E&M Technologies" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "professional enquiries",
    url: "https://www.cdenn.dev/#contact",
    availableLanguage: ["English", "Swahili"],
  },
  description:
    "CDenn is the independent engineering brand of Dennis Ndung'u, a Frontend Engineer based in Nairobi, Kenya. He builds multi-tenant platforms, payments and reconciliation systems, offline-first products and AI-assisted operations, and is open to remote, hybrid and on-site roles and selected consulting engagements.",
  image: "https://www.cdenn.dev/assets/images/port-photo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "Payments APIs",
    "Fintech Systems",
    "AI-integrated web applications",
    "PostgreSQL",
    "Prisma ORM",
    "Flutter",
    "Chrome Extensions",
  ],
  sameAs: sameAsUrls,
};

const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "@id": "https://www.cdenn.dev/#brand",
  name: "CDenn",
  alternateName: ["cdenn", "CDENN", "C-Denn"],
  url: "https://www.cdenn.dev",
  logo: "https://www.cdenn.dev/assets/logo/CDenn.png",
  description:
    "CDenn is the independent engineering brand of Dennis Ndung'u, covering multi-tenant platforms, payments and reconciliation, offline-first products and AI-assisted operations. It is a personal brand, not a registered company. CDenn is not affiliated with the scientific term cDENN (DENN protein domain).",
  sameAs: sameAsUrls,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.cdenn.dev/#website",
  name: "CDenn",
  alternateName: "CDenn Developer Portfolio",
  url: "https://www.cdenn.dev",
  description:
    "Official website of CDenn, the independent engineering brand of Dennis Ndung'u.",
  publisher: {
    "@id": "https://www.cdenn.dev/#person",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is CDenn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDenn is the independent engineering brand of Dennis Ndung'u, a Frontend Engineer based in Nairobi, Kenya. It covers multi-tenant platforms, payments and reconciliation, offline-first products and AI-assisted operations, and the commissioned client work Dennis takes alongside his role at E&M Technologies.",
      },
    },
    {
      "@type": "Question",
      name: "What does CDenn do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDenn provides full-stack software development services including Next.js web applications, payments API integrations, fintech automation systems, Chrome extension development, and AI-powered tools. CDenn works with startups and businesses globally on MVP development, technical consulting, and custom software solutions.",
      },
    },
    {
      "@type": "Question",
      name: "Is CDenn related to the cDENN protein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. CDenn (cdenn.dev) is a software development brand and has no connection to cDENN, the central conserved module of the DENN protein domain in molecular biology. CDenn is the professional identity of Dennis Ndung'u, a web developer, not a scientific or biological term.",
      },
    },
    {
      "@type": "Question",
      name: "Where is CDenn based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDenn is based in Nairobi, Kenya but works with clients globally. Dennis Ndung'u, the developer behind CDenn, is available for remote, hybrid and on-site roles and freelance projects worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "How can I hire CDenn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can hire CDenn through the contact form at cdenn.dev. CDenn is available for full-time remote, hybrid and on-site positions, freelance contracts, and consulting engagements in web development, fintech systems, and AI integration.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(brandSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      {/*
        Composed here rather than in a "use client" wrapper. The wrapper was
        only there to read `mounted` from the theme hook, and it pulled the
        whole page - headline, portrait, every case-study string - into the
        client bundle. ScrollProgress and BackToTop are the only parts that
        need the browser, and each already handles its own first paint.
      */}
      <main
        id="main"
        className="relative min-h-dvh overflow-x-hidden bg-canvas text-ink"
      >
        <ScrollProgress />
        <Navbar />
        <HeroSection />
        <AtAGlance />
        <SolutionsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}
