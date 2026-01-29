"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full text-xs font-semibold tracking-wide uppercase border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Opportunities</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900 dark:text-zinc-100">
              Engineering high-performance <br />
              web applications at scale.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl max-w-xl leading-relaxed mb-10 text-zinc-600 dark:text-zinc-400">
              I specialize in building robust, scalable frontend solutions using Next.js. I help teams and businesses deliver exceptional user experiences with clean, maintainable architecture.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-emerald-600 text-white rounded-full text-lg font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                Start a Project <ArrowRight size={20} />
              </motion.a>

              <a href="#experience" className="px-8 py-4 border rounded-full text-lg font-bold transition-all border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 text-slate-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:border-zinc-600 dark:text-zinc-100">
                View Experience
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <div className="relative group">
            <div className="absolute -inset-4 rounded-2xl blur-xl transition duration-500 bg-gradient-to-tr from-emerald-100 to-white opacity-50 group-hover:opacity-75 dark:from-emerald-900/30 dark:to-zinc-900"></div>

            <div className="relative rounded-2xl overflow-hidden aspect-4/5 md:aspect-3/4 shadow-2xl bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
              <Image
                src="/assets/images/port-photo-4.png"
                alt="CDenn Dennison - Frontend Developer"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md p-4 rounded-xl bg-white/95 border border-zinc-100 dark:bg-zinc-900/90 dark:border-zinc-800">
                <p className="text-xs font-mono mb-1 text-zinc-500">Current Focus</p>
                <p className="text-base font-semibold text-slate-900 dark:text-zinc-100">React Server Components & Performance</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};