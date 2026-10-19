"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { RequestCV } from "./RequestCV";

export const HeroSection = () => {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="flex items-center px-4 pt-24 pb-16 md:min-h-[calc(100svh-4rem)] md:px-6 md:pt-28 md:pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="order-1 md:order-1">
            <Reveal delay={0.1}>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Nairobi, Kenya · Available worldwide
              </p>
              <h1 className="mb-7 text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-slate-900 md:text-5xl lg:text-5xl dark:text-white">
                Reliable systems for operational work.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mb-4 max-w-xl text-base leading-7 text-zinc-700 md:text-lg md:leading-8 dark:text-zinc-200">
                Full-stack engineering for fintech, multi-tenant SaaS, offline-first products, and AI-assisted operations.
              </p>
              <p className="mb-9 font-mono text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Next.js / Payments APIs / TypeScript / Node / PostgreSQL
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center border border-primary bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary dark:hover:text-[#FCF7F2]"
                >
                  Discuss a project
                </a>
                <a
                  href="#solutions"
                  className="inline-flex min-h-12 items-center justify-center border border-zinc-300 px-6 py-3 text-base font-bold text-slate-900 transition-colors hover:border-slate-900 dark:border-zinc-700 dark:text-white dark:hover:border-white"
                >
                  View selected work →
                </a>
              </div>
              <button
                onClick={() => setCvOpen(true)}
                className="mt-5 text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary dark:text-zinc-400 dark:decoration-zinc-700"
              >
                Request CV
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <figure className="order-2 opacity-100 md:order-2">
              <div className="relative aspect-[4/5] overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src="/assets/images/port-photo-4.png"
                  alt="Dennis Ndung'u, the software engineer behind CDenn"
                  fill
                  className="object-cover object-top opacity-100"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-4 border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Currently building</p>
                <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">WarehouseLens</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Permission-aware warehouse operations software.</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {cvOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCvOpen(false)}
              className="fixed inset-0 z-50 bg-black/50"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="pointer-events-auto relative w-full max-w-lg">
                <button
                  onClick={() => setCvOpen(false)}
                  className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-[#1a1a1a] dark:text-zinc-300 dark:hover:bg-zinc-800"
                  aria-label="Close CV request form"
                >
                  <X size={16} />
                </button>
                <RequestCV />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

