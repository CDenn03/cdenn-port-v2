"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/src/app/components/ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { useDialog } from "@/src/app/hooks/useDialog";
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
        className="link-underline flex min-h-11 items-center gap-1 text-base text-ink-muted transition-colors hover:text-ink"
        aria-expanded={open}
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
            className="absolute right-0 top-full mt-3 w-60 border border-line bg-surface shadow-lg" /* taste-skill-ignore: dropdown menu is a real overlay; shadows allowed on things that float */
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center px-4 text-base text-ink transition-colors hover:bg-surface-alt hover:text-primary"
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
    <p className="pt-6 text-base font-bold text-ink">
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
          className="flex min-h-11 items-center text-base text-ink-muted"
        >
          {item.label}
        </MotionLink>
      ))}
    </div>
  </>
);

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // The trap has to span the header row and the panel together: the control that
  // closes the menu lives in the header, so trapping the panel alone would put
  // it out of reach.
  const { containerRef, dialogProps } = useDialog({
    open: mobileMenuOpen,
    onClose: closeMobileMenu,
    label: "Menu",
  });

  const logoSrc = resolvedTheme === "dark" ? "/assets/logo/CDenn_white.png" : "/assets/logo/CDenn.png";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-surface/95 shadow-[0_1px_0_0_var(--line)] backdrop-blur-sm" /* taste-skill-ignore: scrolled nav is a floating bar; a 1px edge anchors it over content */
          : "bg-transparent"
      }`}
    >
      <div ref={containerRef} {...dialogProps}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-2">
          <Link href="/" className="flex min-h-11 items-center" aria-label="CDenn home">
            <Image src={logoSrc} alt="CDenn" width={120} height={40} className="h-9 w-auto object-contain" priority />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <a href="#about" className="link-underline inline-flex min-h-11 items-center text-base text-ink-muted transition-colors hover:text-ink">
              About
            </a>
            <NavDropdown label="Work" items={workLinks} />
            <NavDropdown label="Services" items={serviceLinks} />
            <Link href="/writing" className="link-underline inline-flex min-h-11 items-center text-base text-ink-muted transition-colors hover:text-ink">
              Writing
            </Link>
            <a href="#contact" className="link-underline inline-flex min-h-11 items-center text-base text-ink-muted transition-colors hover:text-ink">
              Contact
            </a>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              className="press flex h-11 w-11 items-center justify-center border border-line bg-surface-alt text-ink transition-colors hover:bg-surface"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div id="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="max-h-[calc(100dvh-4rem)] overflow-y-auto bg-surface md:hidden">
              <div className="px-6 py-5">
                {navLinks.map((link, index) => (
                  <MotionLink key={link.href} href={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} onClick={closeMobileMenu} className="flex min-h-11 items-center text-lg text-ink">
                    {link.label}
                  </MotionLink>
                ))}
                <MobileLinkGroup heading="Work" items={workLinks} startIndex={navLinks.length} onNavigate={closeMobileMenu} />
                <MobileLinkGroup heading="Services" items={serviceLinks} startIndex={navLinks.length + workLinks.length} onNavigate={closeMobileMenu} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
