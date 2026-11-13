"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { HONEYPOT_FIELD } from "@/src/app/data/contact-options";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border px-4 py-3 text-base focus:border-primary transition-colors bg-surface border-line-strong text-ink placeholder:text-ink-subtle";

export function RequestCV() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      [HONEYPOT_FIELD]: (form.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/request-cv", {
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

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="p-10 flex flex-col items-center justify-center text-center gap-4 bg-surface border border-line min-h-[320px]"
      >
        <CheckCircle size={40} aria-hidden="true" className="text-primary" />
        <h3 className="text-xl font-bold text-ink">Request received!</h3>
        <p className="text-ink-muted">
          I&apos;ll send my CV to your email within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="p-8 space-y-5 bg-surface border border-line"
      onSubmit={handleSubmit}
    >
      {/* Header inside the card */}
      <div className="mb-1">
        <h2 className="text-xl font-bold text-ink">Request CV</h2>
        <p className="text-sm text-ink-muted mt-1">
          Leave your details and I&apos;ll send my CV within 24 hours.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-name" className="block text-sm font-medium mb-2 text-ink-muted">
            Name
          </label>
          <input
            type="text"
            id="cv-name"
            name="name"
            required
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="cv-email" className="block text-sm font-medium mb-2 text-ink-muted">
            Email
          </label>
          <input
            type="email"
            id="cv-email"
            name="email"
            required
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-role" className="block text-sm font-medium mb-2 text-ink-muted">
            Role <span className="text-ink-subtle font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="cv-role"
            name="role"
            className={inputClass}
            placeholder="Hiring Manager"
          />
        </div>
        <div>
          <label htmlFor="cv-company" className="block text-sm font-medium mb-2 text-ink-muted">
            Company <span className="text-ink-subtle font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="cv-company"
            name="company"
            className={inputClass}
            placeholder="Company Name"
          />
        </div>
      </div>

      {/* Hidden from people and assistive technology; a bot that fills it is
          accepted and discarded server-side. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cv-bot-field">Leave this field empty</label>
        <input type="text" id="cv-bot-field" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" className="flex items-center gap-2 text-sm text-danger">
          <AlertCircle size={16} aria-hidden="true" /> {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full bg-primary text-on-primary text-base font-bold py-4 hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading"
          ? <><Loader2 size={18} aria-hidden="true" className="animate-spin" /> Sending request...</>
          : "Request CV"
        }
      </button>
    </form>
  );
}
