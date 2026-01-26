"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { solutions } from "@/app/data/portfolio";

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-zinc-100">Featured Solutions</h2>
          <div className="w-20 h-1 bg-emerald-500 mb-16 rounded-full" />
        </Reveal>

        <div className="space-y-24">
          {solutions.map((project) => (
            <Reveal key={`${project.title}-${project.layout}`}>
              <div className={`grid md:grid-cols-12 gap-12 items-center ${
                project.layout === 'right' ? 'md:flex-row-reverse' : ''
              }`}>

                <div className={`md:col-span-7 group relative ${
                  project.layout === 'right' ? 'md:order-last' : ''
                }`}>
                  <div className="aspect-video rounded-2xl overflow-hidden relative shadow-md bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-emerald-900/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                <div className={`md:col-span-5 ${
                  project.layout === 'right' ? 'md:order-first' : ''
                }`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-500 transition-colors text-slate-900 dark:text-zinc-100">{project.title}</h3>
                  <p className="text-base mb-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h5 className="text-xs font-bold uppercase mb-2 text-zinc-500">The Challenge</h5>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">{project.challenge}</p>
                    </div>
                    {project.solution && (
                      <div>
                        <h5 className="text-xs font-bold uppercase mb-2 text-zinc-500">The Solution</h5>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{project.solution}</p>
                      </div>
                    )}
                    <div>
                      <h5 className="text-xs font-bold uppercase mb-3 text-zinc-500">The Results</h5>
                      <div className="flex flex-wrap gap-3">
                        {project.results.map((res) => (
                          <div key={`${res.label}-${res.value}`} className="px-3 py-2 rounded shadow-sm min-w-20 bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
                            <span className="text-emerald-500 font-bold text-lg block">{res.value}</span>
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">{res.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs font-medium mb-8 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full font-medium bg-zinc-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a href="#" className="text-sm font-bold hover:text-emerald-500 underline decoration-emerald-500/30 underline-offset-4 text-slate-900 dark:text-zinc-100">View Case Study</a>
                    <a href="#" className="text-sm font-bold flex items-center gap-1 hover:text-emerald-500 text-zinc-500">
                      <ExternalLink size={14} /> Code
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};