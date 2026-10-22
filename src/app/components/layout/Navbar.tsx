"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/src/app/components/ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/src/app/hooks/useTheme";
import { solutions } from "@/src/app/data/portfolio";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

/**
 * Derived from the portfolio data rather than hardcoded, so reordering or
 * re-featuring a project updates the menu with no edit here.
 */
const workLinks = [
  { href: "#solutions", label: "Selected work" },
  ...solutions
    .filter((solution) => solution.featured)
    .map((solution) => ({ href: `/solutions/${solution.slug}`, label: solution.title })),
  { href: "/solutions", label: "All work" },
];

const serviceLinks = [
  { href: "/services/multi-tenant-saas", label: "Multi-tenant SaaS" },
  { href: "/services/fintech-automation", label: "Fintech and payments" },
  { href: "/services/offline-first-apps", label: "Offline-first apps" },
  { href: "/services", label: "All services" },
];

const MotionLink = motion.create(Link);

type NavItem = { href: string; label: string };

const NavDropdown = ({ label, items }: { label: string; items: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((previous) => !previous);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        // Close once focus leaves the trigger and the panel entirely.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        // Mouse is handled by hover; toggling here too would close a menu the
        // pointer just opened. Touch and pen have no hover, so they toggle.
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") toggle();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          } else if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        className="link-underline flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-[#FCF7F2]"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] ${open ? "motion-safe:rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-60 border border-zinc-200 bg-[#FCF7F2] dark:border-[#1a1a1a] dark:bg-[#0a0a0a]"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition-colors last:border-b-0 hover:bg-zinc-100 hover:text-primary dark:border-[#1a1a1a] dark:text-zinc-300 dark:hover:bg-[#111] dark:hover:text-[#FCF7F2]"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinkGroup = ({
  heading,
  items,
  startIndex,
  onNavigate,
}: {
  heading: string;
  items: NavItem[];
  startIndex: number;
  onNavigate: () => void;
}) => (
  <>
    <p className="pt-6 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
      {heading}
    </p>
    <div className="mt-2">
      {items.map((item, index) => (
        <MotionLink
          key={item.href}
          href={item.href}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (startIndex + index) * 0.04 }}
          onClick={onNavigate}
          className="block py-2 text-sm text-zinc-600 dark:text-zinc-300"
        >
          {item.label}
        </MotionLink>
      ))}
    </div>
  </>
);

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    document.documentElement.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const logoSrc = resolvedTheme === "dark" ? "/assets/logo/CDenn_white.png" : "/assets/logo/CDenn.png";
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-[#FCF7F2] transition-colors duration-300 dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-2">
        <Link href="/" className="flex items-center" aria-label="CDenn home">
          <Image src={logoSrc} alt="CDenn" width={120} height={40} className="h-9 w-auto object-contain" priority />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#about" className="link-underline text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-[#FCF7F2]">
            About
          </a>
          <NavDropdown label="Work" items={workLinks} />
          <NavDropdown label="Services" items={serviceLinks} />
          <Link href="/writing" className="link-underline text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-[#FCF7F2]">
            Writing
          </Link>
          <a href="#contact" className="link-underline text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-[#FCF7F2]">
            Contact
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-10 w-10 items-center justify-center border border-zinc-200 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-zinc-200 bg-[#FCF7F2] md:hidden dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
            <div className="px-6 py-5">
              {navLinks.map((link, index) => (
                <MotionLink key={link.href} href={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} onClick={closeMobileMenu} className="block border-b border-zinc-200 py-3 text-base text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
                  {link.label}
                </MotionLink>
              ))}
              <MobileLinkGroup heading="Work" items={workLinks} startIndex={navLinks.length} onNavigate={closeMobileMenu} />
              <MobileLinkGroup heading="Services" items={serviceLinks} startIndex={navLinks.length + workLinks.length} onNavigate={closeMobileMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
