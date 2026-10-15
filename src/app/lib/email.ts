/**
 * Shared helpers for the Resend-backed contact / privacy / CV-request routes.
 *
 * All three take untrusted form input and interpolate it into an HTML email
 * body. Everything that reaches that body must go through `escapeHtml`, and
 * anything reaching a header (subject, reply-to) must be single-line.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

/** Escape HTML so submitted text cannot inject markup into an email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Coerce to a trimmed, length-capped string; anything non-string becomes "". */
export function asText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

/** Strip CR/LF so a submitted value cannot smuggle extra email headers. */
export function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

/**
 * Deliberately permissive check: enough to reject a malformed or multi-line
 * value that would be unusable as a reply-to address, without bouncing
 * valid real-world addresses.
 */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Escape text for HTML and render newlines as line breaks. */
export function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

/**
 * Sender address for transactional mail from this site.
 *
 * `onboarding@resend.dev` is Resend's shared TEST sender: it is rate-limited
 * and only reliably delivers to the Resend account owner's own address. Set
 * CONTACT_FROM_EMAIL to a verified-domain sender (e.g.
 * "CDenn <contact@cdenn.dev>") before relying on this in production.
 */
export function resolveFromEmail(label: string): string {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  if (configured) return configured;
  return `${label} <onboarding@resend.dev>`;
}

/** Field length caps, so a hostile payload stays bounded. */
export const MAX_LENGTHS = {
  name: 200,
  email: 320,
  shortField: 100,
  longText: 5000,
} as const;

let cachedClient: Resend | null = null;

/**
 * Resend client, constructed lazily.
 *
 * Constructing it at module scope throws "Missing API key" during module
 * evaluation when RESEND_API_KEY is unset, which crashes the whole route with a
 * 500 before any request validation runs. Returning null instead lets each
 * route answer with a clean, actionable error.
 */
export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  if (!cachedClient) cachedClient = new Resend(key);
  return cachedClient;
}

/** Destination inbox for form notifications. */
export function getContactEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() ?? "";
}

/**
 * Shared guard: returns a ready client + destination, or a 503 response
 * explaining that mail is not configured. Logs server-side so a
 * misconfigured deploy is visible in logs rather than silent.
 */
export function requireMailer(routeName: string):
  | { ok: true; resend: Resend; to: string }
  | { ok: false; response: NextResponse } {
  const resend = getResendClient();
  const to = getContactEmail();

  if (!resend || !to) {
    const missing = [
      !resend ? "RESEND_API_KEY" : null,
      !to ? "CONTACT_EMAIL" : null,
    ]
      .filter(Boolean)
      .join(", ");
    console.error(`[${routeName}] mail not configured - missing: ${missing}`);
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            "The form is temporarily unavailable. Please reach out by email instead.",
        },
        { status: 503 }
      ),
    };
  }

  return { ok: true, resend, to };
}
