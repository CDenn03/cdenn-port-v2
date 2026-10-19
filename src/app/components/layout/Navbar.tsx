"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/src/app/components/ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/src/app/hooks/useTheme";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#solutions", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/multi-tenant-saas", label: "Multi-tenant SaaS" },
  { href: "/services/fintech-automation", label: "Fintech and payments" },
  { href: "/services/offline-first-apps", label: "Offline-first apps" },
  { href: "/services", label: "All services" },
];

const MotionLink = motion.create(Link);

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-[#FCF7F2] transition-colors duration-300 dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-2">
        <Link href="/" className="flex items-center" aria-label="CDenn home">
          <Image src={logoSrc} alt="CDenn" width={120} height={40} className="h-9 w-auto object-contain" priority />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-[#FCF7F2]">
              {link.label}
            </a>
          ))}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-[#FCF7F2]" aria-expanded={servicesOpen} aria-haspopup="true">
              Services <span aria-hidden="true">↓</span>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }} className="absolute right-0 top-full mt-3 w-56 border border-zinc-200 bg-[#FCF7F2] dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
                  {serviceLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block border-b border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition-colors last:border-b-0 hover:bg-zinc-100 hover:text-primary dark:border-[#1a1a1a] dark:text-zinc-300 dark:hover:bg-[#111] dark:hover:text-[#FCF7F2]">
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-zinc-200 bg-[#FCF7F2] md:hidden dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
            <div className="px-6 py-5">
              {navLinks.map((link, index) => (
                <MotionLink key={link.href} href={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} onClick={() => setMobileMenuOpen(false)} className="block border-b border-zinc-200 py-3 text-base text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
                  {link.label}
                </MotionLink>
              ))}
              <p className="pt-6 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Services</p>
              <div className="mt-2">
                {serviceLinks.map((link, index) => (
                  <MotionLink key={link.href} href={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + index) * 0.04 }} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {link.label}
                  </MotionLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
