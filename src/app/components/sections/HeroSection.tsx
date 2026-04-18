"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center px-6 pt-24 pb-12 md:pt-32">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        <div className="order-2 md:order-1">
          {/* <Reveal>
            <div className="inline-flex items-center gap-2 px-2 py-2 mb-4  text-xs font-semibold tracking-wide uppercase text-emerald-700  dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Opportunities</span>
            </div>
          </Reveal> */}

          <Reveal delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 text-slate-900 dark:text-white">
              Engineering high-performance <br className="hidden sm:block" />
              web applications at scale.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mb-8 md:mb-10 text-zinc-700 dark:text-zinc-200">
              I specialize in building robust, scalable Web solutions. I help teams and businesses deliver exceptional user experiences with clean, maintainable architecture.
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
                Start a Project <ArrowRight size={20} />
              </motion.a>

              <a href="#experience" className="px-6 md:px-8 py-3 md:py-4 border rounded-full text-base md:text-lg font-bold transition-all border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 text-slate-900 dark:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:border-zinc-500 dark:text-white text-center">
                View Experience
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

              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 backdrop-blur-md p-3 md:p-4 rounded-xl bg-white/95 border border-zinc-100 dark:bg-zinc-900/90 dark:border-zinc-800">
                <p className="text-xs font-mono mb-1 text-zinc-500 dark:text-zinc-400">Current Focus</p>
                <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">React Server Components & Performance</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};