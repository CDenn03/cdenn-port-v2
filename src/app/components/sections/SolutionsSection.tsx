"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { solutions } from "@/src/app/data/portfolio";

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 md:py-32 px-6 transition-colors duration-300 bg-[#F5EFE8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]">Featured Solutions</h2>
          <div className="w-20 h-1 bg-primary dark:bg-[#FCF7F2] mb-12 md:mb-16 rounded-full" />
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
                    <div className="absolute inset-0 bg-[#0f2a44]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                <div className={`md:col-span-5 ${
                  project.layout === 'right' ? 'md:order-first' : ''
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold transition-colors text-slate-900 dark:text-[#FCF7F2]">{project.title}</h3>
                    {project.ongoing && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-[#FCF7F2]/10 dark:text-[#FCF7F2] shrink-0">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-[#FCF7F2] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary dark:bg-[#FCF7F2]"></span>
                        </span>
                        <span>Ongoing</span>
                      </span>
                    )}
                  </div>
                  <p className="text-base mb-6 text-zinc-600 dark:text-[#b0b0b0]">{project.description}</p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h5 className="text-xs font-bold uppercase mb-2 text-zinc-500 dark:text-[#888888]">The Challenge</h5>
                      <p className="text-sm text-zinc-700 dark:text-[#b0b0b0]">{project.challenge}</p>
                    </div>
                    {project.solution && (
                      <div>
                        <h5 className="text-xs font-bold uppercase mb-2 text-zinc-500 dark:text-[#888888]">The Solution</h5>
                        <p className="text-sm text-zinc-700 dark:text-[#b0b0b0]">{project.solution}</p>
                      </div>
                    )}
                    <div>
                      <h5 className="text-xs font-bold uppercase mb-3 text-zinc-500 dark:text-[#888888]">The Results</h5>
                      <div className="flex flex-wrap gap-3">
                        {project.results.map((res) => (
                          <div key={`${res.label}-${res.value}`} className="px-3 py-2 rounded shadow-sm min-w-20 bg-white border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                            <span className="text-primary dark:text-[#FCF7F2] font-bold text-lg block">{res.value}</span>
                            <span className="text-xs text-zinc-600 dark:text-[#888888]">{res.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs font-medium mb-8 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full font-medium bg-zinc-100 text-slate-700 dark:bg-[#222222] dark:text-[#FCF7F2]">{tag}</span>
                    ))}
                  </div>

                  {(project.websiteUrl || project.codeUrl) && (
                    <div className="flex gap-4">
                      {project.websiteUrl && (
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-primary dark:hover:text-[#FCF7F2] underline underline-offset-4 text-slate-900 dark:text-[#FCF7F2]">Visit website</a>
                      )}
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold flex items-center gap-1 hover:text-primary dark:hover:text-[#FCF7F2] text-zinc-500 dark:text-[#888888]">
                          <ExternalLink size={14} /> Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};