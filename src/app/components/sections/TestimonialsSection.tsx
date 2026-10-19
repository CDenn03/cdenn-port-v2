"use client";

import { Reveal } from "../ui/Reveal";
import { testimonials } from "@/src/app/data/portfolio";

export const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 transition-colors duration-300 bg-[#F5EFE8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-900 dark:text-white">What Clients Say</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <Reveal key={`${item.author}-${item.role}`} delay={testimonials.indexOf(item) * 0.1}>
              <div className="border-t border-zinc-300 pt-6 h-full flex flex-col justify-between dark:border-zinc-700">
                <div>
                  <p className="text-lg mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300">&ldquo;{item.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-sm font-bold border border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.author}</h4>
                    <p className="text-sm text-zinc-500">{item.role}</p>
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