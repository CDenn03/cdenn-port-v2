"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { RequestCV } from "./RequestCV";
import { socialLinks } from "@/src/app/data/social";

const primaryProfiles = socialLinks.filter(({ network }) =>
  ["github", "linkedin", "x"].includes(network)
);

export const HeroSection = () => {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="flex items-center px-4 pt-24 pb-16 md:min-h-[calc(100svh-4rem)] md:px-6 md:pt-28 md:pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div className="order-1 lg:order-2">
            <Reveal delay={0.1}>
              <h1 className="mb-6 max-w-[20ch] font-bold leading-[0.95] tracking-[-0.04em] text-foreground text-[clamp(2.25rem,6vw,4.5rem)]">
                Reliable systems for operational work.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mb-8 max-w-xl text-lg leading-8 text-foreground md:text-xl">
                Full-stack engineering for fintech, multi-tenant SaaS, offline-first products, and AI-assisted operations. Based in Nairobi, Kenya, working worldwide.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="press inline-flex min-h-12 items-center justify-center bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-[#1b2d2a]"
                >
                  Discuss a project
                </a>
                <a
                  href="#solutions"
                  className="press group/cta inline-flex min-h-12 items-center justify-center gap-1.5 bg-surface px-6 py-3 text-base font-bold text-foreground transition-colors hover:bg-[#ddd9d0] dark:hover:bg-[#1f2522]"
                >
                  View selected work
                  <ChevronRight size={18} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
                </a>
              </div>
              <button
                onClick={() => setCvOpen(true)}
                className="mt-5 text-base text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Request CV
              </button>
              <p className="mt-8 text-base text-foreground">
                Find the work on{" "}
                {primaryProfiles.map((profile, index) => (
                  <span key={profile.network}>
                    {index > 0 && <span aria-hidden="true">, </span>}
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="font-bold underline underline-offset-4 transition-colors hover:text-primary dark:hover:text-accent"
                    >
                      {profile.label}
                    </a>
                  </span>
                ))}
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.4} className="order-2 lg:order-1">
            <figure className="opacity-100">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src="/assets/images/port-photo-4.png"
                  alt="Dennis Ndung'u, the software engineer behind CDenn"
                  fill
                  className="object-cover object-top opacity-100"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-4">
                <p className="text-base text-muted-foreground">Currently building</p>
                <p className="mt-1 text-lg font-bold text-foreground">WarehouseLens</p>
                <p className="mt-1 text-base text-foreground">Permission-aware warehouse operations software.</p>
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
                  className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center bg-surface text-foreground transition-colors hover:bg-[#ddd9d0] dark:hover:bg-[#1f2522]"
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

