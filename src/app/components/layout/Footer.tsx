"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/src/app/hooks/useTheme";
import { socialLinks } from "@/src/app/data/social";
import { GithubIcon } from "@/src/app/components/icons/GithubIcon";
import { LinkedInIcon } from "@/src/app/components/icons/LinkedInIcon";
import { XIcon } from "@/src/app/components/icons/XIcon";
import { BehanceIcon } from "@/src/app/components/icons/BehanceIcon";
import { DribbbleIcon } from "@/src/app/components/icons/DribbbleIcon";
import { MediumIcon } from "@/src/app/components/icons/MediumIcon";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedInIcon size={18} />,
  x: <XIcon size={18} />,
  behance: <BehanceIcon size={18} />,
  dribbble: <DribbbleIcon size={18} />,
  medium: <MediumIcon size={18} />,
};

export const Footer = () => {
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === "dark"
      ? "/assets/logo/CDenn_white.png"
      : "/assets/logo/CDenn.png";

  return (
    <footer className="bg-background px-6 pt-16 pb-10 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
          <p className="font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-[clamp(2rem,5vw,3.75rem)]">
            Let&apos;s build something that holds up.
          </p>
          <div className="md:pb-2">
            <p className="max-w-sm text-lg leading-8 text-foreground">
              Tell me the constraint and what has to work. I&apos;ll reply with the clearest next step, usually within a day.
            </p>
            <a
              href="#contact"
              className="press mt-6 inline-flex min-h-12 items-center bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-[#1b2d2a]"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src={logoSrc}
                alt="CDenn Logo"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-base text-foreground">
              Full-stack software developer in Nairobi, Kenya. Building reliable
              systems for fintech, multi-tenant SaaS, and offline-first products.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold text-foreground">
              Navigation
            </h4>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="#about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About CDenn</Link></li>
              <li><Link href="#solutions" className="hover:text-foreground">Solutions</Link></li>
              <li><Link href="#contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold text-foreground">
              Services
            </h4>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li><Link href="/services/multi-tenant-saas" className="hover:text-foreground">Multi-Tenant SaaS</Link></li>
              <li><Link href="/services/fintech-automation" className="hover:text-foreground">Fintech &amp; Payments</Link></li>
              <li><Link href="/services/offline-first-apps" className="hover:text-foreground">Offline-First Apps</Link></li>
              <li><Link href="/services" className="hover:text-foreground">All services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold text-foreground">
              Legal
            </h4>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li><a href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-base text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} CDenn. All rights reserved.</p>

          <div className="flex items-center gap-2 pr-20 md:pr-0">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.url}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={link.label}
                className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {iconMap[link.network]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
