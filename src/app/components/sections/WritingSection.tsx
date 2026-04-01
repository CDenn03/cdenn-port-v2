"use client";

import { motion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { writings } from "@/src/app/data/portfolio";

export const WritingSection = () => {
  return (
    <section id="writing" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-100">Writing</h2>
            <a href="#" className="text-[#124170] dark:text-blue-400 font-bold text-sm hover:text-[#1a5a8a] dark:hover:text-blue-300">View all articles →</a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {writings.map((article) => (
            <Reveal key={`${article.title}-${article.date}`} delay={writings.indexOf(article) * 0.1}>
              <motion.a
                href="#"
                className="block h-full p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all group bg-white border border-zinc-200 hover:border-[#124170]/30 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-blue-400/30"
              >
                <span className="text-xs font-bold text-[#124170] dark:text-blue-400 uppercase tracking-wider mb-4 block">{article.tag}</span>
                <h3 className="text-lg font-bold mb-4 group-hover:text-[#124170] dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-zinc-100">{article.title}</h3>
                <p className="text-sm text-zinc-500">{article.date} • {article.readTime} read</p>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};