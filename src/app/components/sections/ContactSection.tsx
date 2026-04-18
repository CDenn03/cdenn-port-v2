"use client";

import { useState } from "react";
import { Mail, Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

export const ContactSection = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      budgetRange: (form.elements.namedItem("budgetRange") as HTMLSelectElement).value,
      projectDescription: (form.elements.namedItem("projectDescription") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputClass = "w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary dark:focus:border-[#FCF7F2] transition-colors bg-white border-zinc-300 text-slate-900 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:text-[#FCF7F2] dark:placeholder-[#555555]";

  return (
    <section id="contact" className="py-20 md:py-32 px-6 transition-colors duration-300 bg-[#F5EFE8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-[#FCF7F2]">Let&apos;s Build Something Great.</h2>
            <p className="text-lg md:text-xl mb-10 text-zinc-600 dark:text-[#b0b0b0]">
              Have something you&apos;re building or improving? I&apos;d love to hear about it.
              Let&apos;s talk through your ideas and see how we can bring them to life.
            </p>
          </Reveal>

          <Reveal>
            <div className="space-y-6">
              <a href="#contact" className="flex items-center gap-4 transition-colors group text-zinc-700 hover:text-primary dark:text-[#b0b0b0] dark:hover:text-[#FCF7F2]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-zinc-50 border border-zinc-200 group-hover:border-primary/30 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:group-hover:border-[#FCF7F2]/30">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-[#666666]">Email</p>
                  <p className="font-mono text-base text-slate-900 dark:text-[#FCF7F2]">Use the form below</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 transition-colors group text-zinc-700 hover:text-primary dark:text-[#b0b0b0] dark:hover:text-[#FCF7F2]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-zinc-50 border border-zinc-200 group-hover:border-primary/30 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:group-hover:border-[#FCF7F2]/30">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-[#666666]">Schedule</p>
                  <p className="font-mono text-base text-slate-900 dark:text-[#FCF7F2]">Book a 15-min intro call</p>
                </div>
              </a>
            </div>

            <div className="mt-8 py-4 px-2">
              <p className="text-sm flex items-center gap-2 text-primary dark:text-[#FCF7F2]">
                <Clock size={16} />
                I typically respond within 24 hours.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form
            className="rounded-3xl p-8 space-y-6 shadow-sm bg-zinc-50 border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-[#b0b0b0]">Name</label>
              <input type="text" id="name" name="name" required className={inputClass} placeholder="John Doe" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-[#b0b0b0]">Email</label>
              <input type="email" id="email" name="email" required className={inputClass} placeholder="john@company.com" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="project-type" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-[#b0b0b0]">Project Type</label>
                <select id="project-type" name="projectType" className={`${inputClass} appearance-none`}>
                  <option>Freelance / Contract</option>
                  <option>Full-time Opportunity</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget-range" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-[#b0b0b0]">Budget Range</label>
                <select id="budget-range" name="budgetRange" className={`${inputClass} appearance-none`}>
                  <option>&lt; $5k</option>
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="project-description" className="block text-sm font-bold mb-2 text-zinc-700 dark:text-[#b0b0b0]">Project Description</label>
              <textarea
                rows={4}
                id="project-description"
                name="projectDescription"
                required
                className={inputClass}
                placeholder="Tell me about your project..."
              />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2 text-sm text-primary dark:text-[#253C38]">
                <CheckCircle size={16} /> Message sent! I&apos;ll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-primary-foreground text-base font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
