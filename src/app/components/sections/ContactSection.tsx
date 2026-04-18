"use client";

import { useState, useSyncExternalStore } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { CustomSelect } from "./contact/CustomSelect";
import {
  detectCurrency,
  engagementTypes,
  buildBudgetOptions,
  fallbackBudgetOptions,
} from "./contact/utils";

type Status = "idle" | "loading" | "success" | "error";

export const ContactSection = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");

  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const currency = mounted ? detectCurrency() : "USD";
  const budgetOptions = mounted ? buildBudgetOptions(currency) : fallbackBudgetOptions;
  const engagementOptions = engagementTypes.map((t) => ({ value: t, label: t }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      engagementType,
      budgetRange: budgetRange === "prefer-not" ? "Not specified" : budgetRange,
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
      setEngagementType("");
      setBudgetRange("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary dark:focus:border-[#FCF7F2] transition-colors bg-white border-zinc-300 text-slate-900 placeholder-zinc-400 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:text-[#FCF7F2] dark:placeholder-[#555555]";

  return (
    <section id="contact" className="py-20 md:py-32 px-6 transition-colors duration-300 bg-[#F5EFE8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* Left */}
        <div>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]">
              Let&apos;s Build Something Great.
            </h2>
            <p className="text-lg mb-10 text-zinc-600 dark:text-[#b0b0b0] leading-relaxed">
              Whether you have a project in mind, want to explore a collaboration, or just want
              to talk tech — I&apos;m open to it. Fill in the form and I&apos;ll get back to you.
            </p>
          </Reveal>

          <Reveal>
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-zinc-700 dark:text-[#b0b0b0]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-[#666666]">Prefer a call?</p>
                  <p className="text-base font-medium text-slate-900 dark:text-[#FCF7F2]">Book a 15-min intro call</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-[#888888] pl-1">
                <Clock size={14} className="shrink-0" />
                Typically responds within 24 hours
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal>
          {status === "success" ? (
            <div className="rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 bg-white border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] min-h-[400px]">
              <CheckCircle size={40} className="text-primary dark:text-[#FCF7F2]" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#FCF7F2]">Message sent!</h3>
              <p className="text-zinc-500 dark:text-[#888888]">I&apos;ll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm font-medium text-primary dark:text-[#FCF7F2] hover:underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="rounded-3xl p-8 space-y-5 bg-white border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]"
              onSubmit={handleSubmit}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">Name</label>
                  <input type="text" id="name" name="name" required className={inputClass} placeholder="Jane Smith" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">Email</label>
                  <input type="email" id="email" name="email" required className={inputClass} placeholder="jane@company.com" />
                </div>
              </div>

              <div>
                <label htmlFor="engagementType" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
                  Engagement Type
                </label>
                <CustomSelect
                  id="engagementType"
                  name="engagementType"
                  value={engagementType}
                  onChange={setEngagementType}
                  options={engagementOptions}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
                  Budget Range <span className="text-zinc-400 dark:text-[#555555] font-normal">(optional)</span>
                </label>
                <CustomSelect
                  id="budgetRange"
                  name="budgetRange"
                  value={budgetRange}
                  onChange={setBudgetRange}
                  options={budgetOptions}
                  placeholder="Prefer not to say"
                />
              </div>

              <div>
                <label htmlFor="project-description" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
                  Tell me about it
                </label>
                <textarea
                  rows={4}
                  id="project-description"
                  name="projectDescription"
                  required
                  className={inputClass}
                  placeholder="What are you building? What's the challenge? What does success look like?"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-primary-foreground text-base font-bold py-4 rounded-xl hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading"
                  ? <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  : "Send Message"
                }
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
