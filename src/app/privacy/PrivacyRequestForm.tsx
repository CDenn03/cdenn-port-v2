"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const requestTypes = [
  "Access my data",
  "Correct my data",
  "Delete my data",
  "Withdraw consent",
  "General privacy question",
];

export function PrivacyRequestForm() {
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
      requestType: (form.elements.namedItem("requestType") as HTMLSelectElement).value,
      details: (form.elements.namedItem("details") as HTMLTextAreaElement).value,
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
    "w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary dark:focus:border-[#FCF7F2] transition-colors bg-white border-zinc-300 text-slate-900 placeholder-zinc-400 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:text-[#FCF7F2] dark:placeholder-[#555555]";

  if (status === "success") {
    return (
      <div className="rounded-2xl p-8 border border-zinc-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-center space-y-3">
        <CheckCircle className="mx-auto text-primary dark:text-[#FCF7F2]" size={32} />
        <p className="font-semibold text-slate-900 dark:text-[#FCF7F2]">Request received</p>
        <p className="text-sm text-zinc-500 dark:text-[#888888]">
          I&apos;ll review your request and respond within 30 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="priv-name" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-[#b0b0b0]">
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
          <label htmlFor="priv-email" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-[#b0b0b0]">
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
        <label htmlFor="priv-type" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-[#b0b0b0]">
          Request Type
        </label>
        <select id="priv-type" name="requestType" required className={`${inputClass} appearance-none`}>
          <option value="">Select a request type</option>
          {requestTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priv-details" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-[#b0b0b0]">
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

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === "loading"
          ? <><Loader2 size={16} className="animate-spin" /> Submitting...</>
          : "Submit Request"
        }
      </button>

      <p className="text-xs text-zinc-400 dark:text-[#555555] text-center">
        I will respond within 30 days as required by GDPR.
      </p>
    </form>
  );
}
