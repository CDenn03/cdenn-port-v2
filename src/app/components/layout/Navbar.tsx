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
  { href: "#experience", label: "Experience" },
  { href: "#solutions", label: "Solutions" },
  { href: "#contact", label: "Contact" }
];

const MotionLink = motion.create(Link);

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

  const logoSrc = resolvedTheme === "dark"
    ? "/assets/logo/CDenn_white.png"
    : "/assets/logo/CDenn.png";

  return (
    <nav className="fixed top-0 w-full z-50 border-b transition-colors duration-300 border-zinc-200 bg-[#FCF7F2]/90 dark:border-[#1a1a1a] dark:bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={logoSrc}
            alt="CDenn Logo"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary dark:hover:text-[#FCF7F2] transition-colors text-zinc-600 dark:text-[#888888]"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t overflow-hidden bg-[#FCF7F2] border-zinc-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a]"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium hover:text-primary dark:hover:text-[#FCF7F2] transition-colors text-zinc-700 dark:text-[#b0b0b0]"
                >
                  {link.label}
                </MotionLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};