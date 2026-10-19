"use client";

import { useState, useSyncExternalStore } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { CustomSelect } from "./contact/CustomSelect";
import { detectCurrency, engagementTypes, buildBudgetOptions, fallbackBudgetOptions } from "./contact/utils";

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";
type Status = "idle" | "loading" | "success" | "error";

export const ContactSection = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const currency = mounted ? detectCurrency() : "USD";
  const budgetOptions = mounted ? buildBudgetOptions(currency) : fallbackBudgetOptions;
  const engagementOptions = engagementTypes.map((type) => ({ value: type, label: type }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      engagementType,
      budgetRange: budgetRange === "prefer-not" ? "Not specified" : budgetRange,
      projectDescription: (form.elements.namedItem("projectDescription") as HTMLTextAreaElement).value,
    };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
      setEngagementType("");
      setBudgetRange("");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputClass = "w-full min-h-12 border border-zinc-300 bg-white px-4 py-3 text-base text-slate-900 transition-colors placeholder:text-zinc-400 focus:border-primary focus:outline-none dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-[#FCF7F2] dark:placeholder:text-[#666] dark:focus:border-[#FCF7F2]";

  return (
    <section id="contact" className="bg-[#F5EFE8] px-4 py-16 transition-colors duration-300 md:px-6 md:py-24 dark:bg-[#111111]">
      <div className="mx-auto grid max-w-6xl gap-14 border-t-2 border-primary pt-5 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Project brief</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-900 md:text-5xl dark:text-[#FCF7F2]">Start with the constraint.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-700 dark:text-zinc-300">Tell me what needs to work reliably, what is getting in the way, and what success looks like. I&apos;ll reply with the clearest next step.</p>
          </Reveal>
          <Reveal>
            <div className="mt-10 space-y-5 border-t border-zinc-300 pt-6 dark:border-zinc-700">
              {bookingUrl && (
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="mt-0.5 text-primary dark:text-[#FCF7F2]" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">Prefer a call?</p>
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-bold underline decoration-zinc-300 underline-offset-4 hover:text-primary dark:decoration-zinc-700">Book a 15-minute introduction →</a>
                  </div>
                </div>
              )}
              <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"><Clock size={15} /> Typically responds within 24 hours.</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          {status === "success" ? (
            <div className="flex min-h-[380px] flex-col items-start justify-center border border-zinc-300 bg-white p-8 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <CheckCircle size={36} className="text-primary dark:text-[#FCF7F2]" />
              <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-[#FCF7F2]">Message sent.</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">I&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold underline decoration-zinc-300 underline-offset-4 hover:text-primary dark:decoration-zinc-700">Send another message</button>
            </div>
          ) : (
            <form className="border border-zinc-300 bg-white p-6 md:p-8 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="name" className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">Name</label><input type="text" id="name" name="name" required className={inputClass} placeholder="Jane Smith" /></div>
                <div><label htmlFor="email" className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">Email</label><input type="email" id="email" name="email" required className={inputClass} placeholder="jane@company.com" /></div>
              </div>
              <div className="mt-5"><label htmlFor="engagementType" className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">What kind of work is this?</label><CustomSelect id="engagementType" name="engagementType" value={engagementType} onChange={setEngagementType} options={engagementOptions} placeholder="Choose one" required /></div>
              <div className="mt-5"><label htmlFor="budgetRange" className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">Budget range <span className="text-zinc-500 dark:text-zinc-400">(optional)</span></label><CustomSelect id="budgetRange" name="budgetRange" value={budgetRange} onChange={setBudgetRange} options={budgetOptions} placeholder="Prefer not to say" /></div>
              <div className="mt-5"><label htmlFor="project-description" className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">What needs to work reliably?</label><textarea rows={5} id="project-description" name="projectDescription" required className={inputClass} placeholder="The product, the constraint, and what success looks like." /></div>
              {status === "error" && <p className="mt-4 flex items-center gap-2 text-sm text-red-600"><AlertCircle size={16} /> {errorMsg}</p>}
              <button type="submit" disabled={status === "loading"} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:hover:text-[#FCF7F2]">
                {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Sending</> : "Send project brief"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
