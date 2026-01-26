"use client";

import { motion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { writings } from "@/app/data/portfolio";

export const WritingSection = () => {
  return (
    <section id="writing" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-100">Writing</h2>
            <a href="#" className="text-emerald-500 font-bold text-sm hover:text-emerald-400">View all articles →</a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {writings.map((article) => (
            <Reveal key={`${article.title}-${article.date}`} delay={writings.indexOf(article) * 0.1}>
              <motion.a
                href="#"
                className="block h-full p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all group bg-white border border-zinc-200 hover:border-emerald-500/30 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-emerald-500/30"
              >
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4 block">{article.tag}</span>
                <h3 className="text-lg font-bold mb-4 group-hover:text-emerald-500 transition-colors text-slate-900 dark:text-zinc-100">{article.title}</h3>
                <p className="text-sm text-zinc-500">{article.date} • {article.readTime} read</p>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};