"use client";

import { Mail, Calendar, Clock } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6 transition-colors duration-300 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-zinc-100">Let&apos;s Build Something Great.</h2>
            <p className="text-lg md:text-xl mb-10 text-zinc-600 dark:text-zinc-400">
              Have a project in mind? I&apos;d love to hear about it. Fill out form or book a call directly.
            </p>
          </Reveal>

          <Reveal>
            <div className="space-y-6">
              <a href="mailto:hello@chrisdennison.dev" className="flex items-center gap-4 transition-colors group text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-zinc-50 border border-zinc-200 group-hover:border-emerald-500/30 dark:bg-zinc-800 dark:border-zinc-700 dark:group-hover:border-emerald-500/30">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Email</p>
                  <p className="font-mono text-base text-slate-900 dark:text-zinc-100">hello@chrisdennison.dev</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 transition-colors group text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-zinc-50 border border-zinc-200 group-hover:border-emerald-500/30 dark:bg-zinc-800 dark:border-zinc-700 dark:group-hover:border-emerald-500/30">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Schedule</p>
                  <p className="font-mono text-base text-slate-900 dark:text-zinc-100">Book a 15-min intro call</p>
                </div>
              </a>
            </div>

            <div className="mt-12 p-6 rounded-xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-900/50">
              <p className="text-sm flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
                <Clock size={16} className="text-emerald-500" />
                I typically respond within 24 hours.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form className="rounded-3xl p-8 space-y-6 shadow-sm bg-zinc-50 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors bg-white border-zinc-300 text-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-600" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors bg-white border-zinc-300 text-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-600" 
                placeholder="john@company.com" 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="project-type" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300">Project Type</label>
                <select 
                  id="project-type"
                  name="projectType"
                  className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors appearance-none bg-white border-zinc-300 text-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                >
                  <option>Freelance / Contract</option>
                  <option>Full-time Opportunity</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget-range" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300">Budget Range</label>
                <select 
                  id="budget-range"
                  name="budgetRange"
                  className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors appearance-none bg-white border-zinc-300 text-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                >
                  <option>&lt; $5k</option>
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="project-description" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300">Project Description</label>
              <textarea 
                rows={4} 
                id="project-description"
                name="projectDescription"
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors bg-white border-zinc-300 text-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-600" 
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white text-base font-bold py-4 rounded-xl hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20">
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};