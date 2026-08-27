"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center px-6 pt-24 pb-12 md:pt-32">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        <div className="order-2 md:order-1">

          <Reveal delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 text-slate-900 dark:text-white">
              Full-stack engineer.{" "}
              <br className="hidden sm:block" />
              Fintech systems.{" "}
              <br className="hidden sm:block" />
              <span className="text-primary">Built for scale.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mb-8 md:mb-10 text-zinc-700 dark:text-zinc-200">
              I build production-grade fintech infrastructure and AI-integrated
              products for teams across East Africa and globally.{" "}
              <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                Next.js · M-Pesa · TypeScript · Node · PostgreSQL
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-full text-base md:text-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Start a Project
              </motion.a>

              <a
                href="#solutions"
                className="px-6 md:px-8 py-3 md:py-4 border rounded-full text-base md:text-lg font-bold transition-all border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 text-slate-900 dark:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:border-zinc-500 dark:text-white text-center"
              >
                See Projects
              </a>
            </div>

            {/* Request CV */}
            <div className="mt-4 pl-1">
              <a
                href="mailto:hello@cdenn.dev?subject=CV Request&body=Hi Dennis, I'd like to request your CV."
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Request CV
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <div className="relative group order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-3/4 md:aspect-3/4 shadow-2xl bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
              <Image
                src="/assets/images/port-photo-4.png"
                alt="CDenn - Software Engineer"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Current focus overlay */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 backdrop-blur-md p-3 md:p-4 rounded-xl bg-white/95 border border-zinc-100 dark:bg-zinc-900/90 dark:border-zinc-800">
                <p className="text-xs font-mono mb-1 text-zinc-500 dark:text-zinc-400">Current Focus</p>
                <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                  Ndoa Plan - offline-first event platform
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
