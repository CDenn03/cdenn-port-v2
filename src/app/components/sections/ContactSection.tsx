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

  const inputClass = "w-full min-h-12 bg-background px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus:outline-2 focus:outline-primary dark:focus:outline-accent";

  return (
    <section id="contact" className="bg-surface px-4 py-16 transition-colors duration-300 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground md:text-5xl">Start with the constraint.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-foreground">Tell me what needs to work reliably, what is getting in the way, and what success looks like. I&apos;ll reply with the clearest next step.</p>
          </Reveal>
          <Reveal>
            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Good fits for a first conversation</h3>
                <ul className="mt-3 space-y-2 text-base leading-7 text-foreground">
                  <li>A payments or reconciliation flow that has to be correct, not just fast.</li>
                  <li>A multi-tenant platform that needs real roles, permissions and isolation.</li>
                  <li>An offline-first product that must survive patchy connectivity.</li>
                  <li>An AI feature that has to stay inside human review and real permissions.</li>
                </ul>
              </div>
              <div className="space-y-2 pt-2">
                {bookingUrl && (
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="mt-0.5 text-primary dark:text-accent" />
                    <div>
                      <p className="text-base font-bold text-foreground">Prefer a call?</p>
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-base font-bold underline underline-offset-4 hover:text-primary dark:hover:text-accent">Book a 15-minute introduction →</a>
                    </div>
                  </div>
                )}
                <p className="flex items-center gap-2 text-base text-foreground"><Clock size={15} /> Typically responds within 24 hours.</p>
                <p className="text-base text-muted-foreground">Nairobi, Kenya. Working with teams worldwide.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          {status === "success" ? (
            <div className="flex min-h-[380px] flex-col items-start justify-center bg-background p-8">
              <CheckCircle size={36} className="text-primary dark:text-accent" />
              <h3 className="mt-5 text-2xl font-bold text-foreground">Message sent.</h3>
              <p className="mt-2 text-base text-foreground">I&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-base font-bold underline underline-offset-4 hover:text-primary dark:hover:text-accent">Send another message</button>
            </div>
          ) : (
            <form className="bg-background p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="name" className="mb-2 block text-base text-foreground">Name</label><input type="text" id="name" name="name" required className={inputClass} placeholder="Jane Smith" /></div>
                <div><label htmlFor="email" className="mb-2 block text-base text-foreground">Email</label><input type="email" id="email" name="email" required className={inputClass} placeholder="jane@company.com" /></div>
              </div>
              <div className="mt-5"><label htmlFor="engagementType" className="mb-2 block text-base text-foreground">What kind of work is this?</label><CustomSelect id="engagementType" name="engagementType" value={engagementType} onChange={setEngagementType} options={engagementOptions} placeholder="Choose one" required /></div>
              <div className="mt-5"><label htmlFor="budgetRange" className="mb-2 block text-base text-foreground">Budget range <span className="text-muted-foreground">(optional)</span></label><CustomSelect id="budgetRange" name="budgetRange" value={budgetRange} onChange={setBudgetRange} options={budgetOptions} placeholder="Prefer not to say" /></div>
              <div className="mt-5"><label htmlFor="project-description" className="mb-2 block text-base text-foreground">What needs to work reliably?</label><textarea rows={5} id="project-description" name="projectDescription" required className={inputClass} placeholder="The product, the constraint, and what success looks like." /></div>
              {status === "error" && <p className="mt-4 flex items-center gap-2 text-base text-destructive"><AlertCircle size={16} /> {errorMsg}</p>}
              <button type="submit" disabled={status === "loading"} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-[#1b2d2a] disabled:cursor-not-allowed disabled:opacity-60">
                {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Sending</> : "Send project brief"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
