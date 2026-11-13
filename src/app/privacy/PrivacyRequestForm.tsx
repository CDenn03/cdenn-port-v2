"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { HONEYPOT_FIELD, PRIVACY_REQUEST_OPTIONS } from "@/src/app/data/contact-options";

type Status = "idle" | "loading" | "success" | "error";

export function PrivacyRequestForm() {
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
      requestType: (form.elements.namedItem("requestType") as HTMLSelectElement).value,
      details: (form.elements.namedItem("details") as HTMLTextAreaElement).value,
      [HONEYPOT_FIELD]: (form.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/privacy", {
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

  const inputClass =
    "w-full min-h-12 border px-4 py-3 text-base focus:border-primary transition-colors bg-surface border-line-strong text-foreground placeholder:text-ink-subtle";

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="p-8 border border-border bg-surface text-center space-y-3"
      >
        <CheckCircle aria-hidden="true" className="mx-auto text-primary" size={32} />
        <p className="font-semibold text-foreground">Request received</p>
        <p className="text-sm text-muted-foreground">
          I&apos;ll review your request and respond within 30 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="priv-name" className="block text-sm font-medium mb-2 text-muted-foreground">
            Full Name
          </label>
          <input
            type="text"
            id="priv-name"
            name="name"
            required
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="priv-email" className="block text-sm font-medium mb-2 text-muted-foreground">
            Email Address
          </label>
          <input
            type="email"
            id="priv-email"
            name="email"
            required
            className={inputClass}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="priv-type" className="block text-sm font-medium mb-2 text-muted-foreground">
          Request Type
        </label>
        <select id="priv-type" name="requestType" required defaultValue="" className={`${inputClass} appearance-none`}>
          <option value="" disabled>Select a request type</option>
          {PRIVACY_REQUEST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priv-details" className="block text-sm font-medium mb-2 text-muted-foreground">
          Details
        </label>
        <textarea
          id="priv-details"
          name="details"
          rows={4}
          required
          className={inputClass}
          placeholder="Please describe your request in detail..."
        />
      </div>

      {/* Hidden from people and assistive technology; a bot that fills it is
          accepted and discarded server-side. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="priv-bot-field">Leave this field empty</label>
        <input type="text" id="priv-bot-field" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle size={16} aria-hidden="true" /> {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full bg-primary text-primary-foreground font-bold min-h-12 py-3 border border-primary hover:bg-transparent hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === "loading"
          ? <><Loader2 size={16} aria-hidden="true" className="animate-spin" /> Submitting...</>
          : "Submit Request"
        }
      </button>

      <p className="text-xs text-ink-subtle text-center">
        I will respond within 30 days as required by GDPR.
      </p>
    </form>
  );
}
