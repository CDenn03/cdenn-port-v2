"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/src/app/components/ui/ThemeToggle";
import { useTheme } from "@/src/app/hooks/useTheme";

interface SubpageNavProps {
  /** Where the back button navigates. Defaults to "/". */
  backHref?: string;
  /** Label shown next to the arrow. Defaults to "Back". */
  backLabel?: string;
}

/**
 * Forward navigation for subpages. The site footer only renders on the
 * homepage, so without these links a case study or service page can only be
 * left via the Back control.
 */
const forwardLinks = [
  { href: "/solutions", label: "Work", alwaysVisible: true },
  { href: "/services", label: "Services", alwaysVisible: true },
  { href: "/writing", label: "Writing", alwaysVisible: false },
  { href: "/#contact", label: "Contact", alwaysVisible: false },
];

export function SubpageNav({ backHref = "/", backLabel = "Back" }: SubpageNavProps) {
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === "dark"
      ? "/assets/logo/CDenn_white.png"
      : "/assets/logo/CDenn.png";

  return (
    <nav className="sticky top-0 z-50 border-b transition-colors duration-300 border-zinc-200 bg-[#FCF7F2] dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* left: back button */}
        <Link
          href={backHref}
          className="group/cta inline-flex shrink-0 items-center gap-2 text-sm text-zinc-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-[#FCF7F2] transition-colors"
        >
          <ArrowLeft size={16} className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-x-0.5" />
          {backLabel}
        </Link>

        {/* center: logo. Hidden below md so it cannot overlap the links. */}
        <Link
          href="/"
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
          aria-label="CDenn home"
        >
          <Image
            src={logoSrc}
            alt="CDenn"
            width={100}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* right: forward navigation + theme toggle */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          {forwardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.alwaysVisible ? "inline-block" : "hidden sm:inline-block"} link-underline text-sm text-zinc-600 transition-colors hover:text-slate-900 dark:text-[#888] dark:hover:text-[#FCF7F2]`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
