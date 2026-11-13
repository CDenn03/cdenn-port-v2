"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import {
  BUDGET_OPTIONS,
  ENGAGEMENT_OPTIONS,
  HONEYPOT_FIELD,
} from "@/src/app/data/contact-options";

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";
type Status = "idle" | "loading" | "success" | "error";

export const ContactSection = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentWithCV, setSentWithCV] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // Replacing the form with a success panel is a silent change for a screen
  // reader unless focus follows it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = event.currentTarget;
    const valueOf = (field: string) => {
      const element = form.elements.namedItem(field);
      return element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
        ? element.value
        : "";
    };
    const checkedState = (field: string) => {
      const element = form.elements.namedItem(field);
      return element instanceof HTMLInputElement ? element.checked : false;
    };

    const wantsCV = checkedState("wantsCV");

    const data = {
      name: valueOf("name"),
      email: valueOf("email"),
      engagementType: valueOf("engagementType"),
      budgetRange: valueOf("budgetRange"),
      projectDescription: valueOf("projectDescription"),
      wantsCV,
      [HONEYPOT_FIELD]: valueOf(HONEYPOT_FIELD),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Something went wrong.");
      }
      // Captured before the reset, so the confirmation can say whether a CV is
      // coming rather than making the sender guess.
      setSentWithCV(wantsCV);
      setStatus("success");
      form.reset();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full min-h-12 border border-line-strong bg-surface px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-subtle hover:border-ink-muted focus:border-primary";

  return (
    <section id="contact" className="bg-canvas px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              Start a conversation.
            </h2>
            <h3 className="mt-6 text-lg font-bold text-ink">Hiring?</h3>
            <p className="mt-1 max-w-lg text-base leading-7 text-ink-muted">
              Tell me about the team, the product and the problems you&apos;re working through.
              I&apos;ll reply with the work closest to what you need and my CV if you&apos;d like it.
            </p>
            <h3 className="mt-5 text-lg font-bold text-ink">Need something built?</h3>
            <p className="mt-1 max-w-lg text-base leading-7 text-ink-muted">
              Tell me what&apos;s getting in the way. I&apos;ll reply with what I think the actual
              problem is and how I&apos;d approach it.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                  Good fits for a first conversation
                </h3>
                <ul className="mt-3 space-y-2 text-base leading-7 text-ink">
                  <li>A frontend that needs an owner, not just a ticket-taker.</li>
                  <li>A payments or reconciliation flow where accuracy matters as much as speed.</li>
                  <li>A platform serving client organisations that need real roles, permissions and isolation.</li>
                  <li>A product that must keep working through patchy connectivity.</li>
                  <li>An AI feature that needs human review, controlled access and traceable answers.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                  How a client engagement starts
                </h3>
                <p className="mt-3 text-base leading-7 text-ink-muted">
                  We begin with scoped, paid discovery. I work with you to understand the business
                  problem, explore possible solutions and define the scope before committing to a
                  full build.
                </p>
                <p className="mt-3 text-base leading-7 text-ink-muted">
                  The outcome is a clearer understanding of the problem, the proposed approach and
                  the work involved before making a larger commitment.
                </p>
              </div>
              <div className="space-y-3 border-t border-line pt-5">
                {bookingUrl && (
                  <div className="flex items-start gap-3">
                    <Calendar size={18} aria-hidden="true" className="mt-0.5 text-primary" />
                    <div>
                      <p className="text-base font-bold text-ink">Prefer a call?</p>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex min-h-11 items-center text-base font-bold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                      >
                        Book a 15-minute introduction
                      </a>
                    </div>
                  </div>
                )}
                <p className="flex items-center gap-2 text-base text-ink">
                  <Clock size={15} aria-hidden="true" /> I usually reply within one working day.
                </p>
                <p className="text-sm text-ink-muted">Nairobi, Kenya - working across time zones.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            {status === "success" ? (
              <div
                ref={successRef}
                tabIndex={-1}
                className="flex min-h-[380px] flex-col items-start justify-center border border-line bg-surface p-8"
              >
                <CheckCircle size={36} aria-hidden="true" className="text-primary" />
                <h3 className="mt-5 text-2xl font-bold text-ink">Message sent.</h3>
                <p className="mt-2 text-base leading-7 text-ink">
                  I&apos;ll get back to you within a working day
                  {sentWithCV ? ", with my CV attached." : "."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex min-h-11 items-center text-base font-bold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="border border-line bg-surface p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-base text-ink">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={200}
                      className={inputClass}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-base text-ink">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={320}
                      className={inputClass}
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="engagementType" className="mb-2 block text-base text-ink">
                    What kind of work is this?
                  </label>
                  <select
                    id="engagementType"
                    name="engagementType"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {ENGAGEMENT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="budgetRange" className="mb-2 block text-base text-ink">
                    Budget range <span className="text-ink-muted">(optional, USD)</span>
                  </label>
                  <select id="budgetRange" name="budgetRange" defaultValue="unstated" className={inputClass}>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="projectDescription" className="mb-2 block text-base text-ink">
                    What needs to work reliably?
                  </label>
                  <textarea
                    rows={5}
                    id="projectDescription"
                    name="projectDescription"
                    required
                    maxLength={5000}
                    className={inputClass}
                    placeholder="The product, what is breaking or missing, and what success looks like."
                  />
                </div>

                {/* The CV lives here rather than behind its own dialog and its
                    own endpoint: a recruiter who is already writing a message
                    should not have to fill a second form to get it.

                    The box itself is 24px, which is the WCAG 2.2 AA minimum.
                    The effective target is the whole row, because the label
                    wraps the text and clicking a label toggles its input. */}
                <div className="mt-5 border border-line bg-canvas">
                  <label
                    htmlFor="wantsCV"
                    className="flex cursor-pointer items-start gap-3 p-4 text-base leading-6 text-ink"
                  >
                    <input
                      type="checkbox"
                      id="wantsCV"
                      name="wantsCV"
                      className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--primary)]"
                    />
                    <span>
                      Send me the CV as well
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        Attached to my reply. Nothing is sent automatically.
                      </span>
                    </span>
                  </label>
                </div>

                {/* Hidden from people and assistive technology; a bot that fills it is
                    accepted and discarded server-side. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-bot-field">Leave this field empty</label>
                  <input
                    type="text"
                    id="contact-bot-field"
                    name={HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-4 flex items-center gap-2 text-base text-danger">
                    <AlertCircle size={16} aria-hidden="true" /> {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="press mt-6 flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 text-base font-bold text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} aria-hidden="true" className="animate-spin" /> Sending
                    </>
                  ) : (
                    "Send project brief"
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
