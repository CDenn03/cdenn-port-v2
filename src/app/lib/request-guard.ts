/**
 * Guards for the public, unauthenticated form endpoints.
 *
 * Each guard returns a `NextResponse` to send back, or `null` to continue, so a
 * route can chain them in a fixed order:
 *
 *   const blocked =
 *     requireJsonRequest(req) ??
 *     requireSameOrigin(req) ??
 *     rateLimit({ req, key: "contact", ...FORM_RATE_LIMIT });
 *   if (blocked) return blocked;
 *
 * Every response body follows the same contract as the routes themselves:
 * `{ error: string }` with a message a visitor can act on, and nothing about
 * the provider or the failure internals.
 */

import { NextRequest, NextResponse } from "next/server";
import { HONEYPOT_FIELD } from "@/src/app/data/contact-options";

function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Requires a JSON content type.
 *
 * A browser can POST a cross-site form as `text/plain` or
 * `application/x-www-form-urlencoded` without a preflight; demanding JSON means
 * such a request has to pass CORS first.
 */
export function requireJsonRequest(req: NextRequest): NextResponse | null {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return errorResponse("This endpoint only accepts JSON.", 415);
  }
  return null;
}

function requestHost(req: NextRequest): string {
  return req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
}

/**
 * Rejects a browser request that came from another site.
 *
 * A missing Origin is allowed: curl and other non-browser clients send none,
 * and the header is only trustworthy when the browser sets it.
 */
export function requireSameOrigin(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin");
  if (!origin) return null;

  const host = requestHost(req);
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return errorResponse("This request was blocked.", 403);
  }

  if (!host || originHost !== host) {
    return errorResponse("This request was blocked.", 403);
  }
  return null;
}

/** Client address, from the proxy header the host sets, with a shared fallback. */
function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip")?.trim() || "unknown";
}

type Window = { count: number; expiresAt: number };

const windows = new Map<string, Window>();

function dropExpired(now: number): void {
  for (const [key, window] of windows) {
    if (window.expiresAt <= now) windows.delete(key);
  }
}

/** Shared budget for the form endpoints: 5 submissions per 10 minutes per route. */
export const FORM_RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 } as const;

/**
 * Fixed-window counter, per client address and per route key.
 *
 * The counters live in this process's memory, so each serverless instance has
 * its own: this raises the cost of flooding a form but does not cap total
 * traffic. A shared store (or an edge rate limit) is needed for a hard ceiling.
 */
export function rateLimit({
  req,
  key,
  limit,
  windowMs,
}: {
  req: NextRequest;
  key: string;
  limit: number;
  windowMs: number;
}): NextResponse | null {
  const now = Date.now();
  dropExpired(now);

  const bucket = `${key}:${clientIp(req)}`;
  const window = windows.get(bucket);

  if (!window) {
    windows.set(bucket, { count: 1, expiresAt: now + windowMs });
    return null;
  }

  window.count += 1;
  if (window.count > limit) {
    return errorResponse("Too many requests. Please try again later.", 429);
  }
  return null;
}

/**
 * True when the hidden field a person never sees has content.
 *
 * The caller answers a filled honeypot with a normal success and sends no
 * email, so a bot learns nothing from the response.
 */
export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

export type FieldLimit = { key: string; label: string; max: number };

/**
 * Rejects an over-long field instead of truncating it, so a visitor who pasted
 * more than the cap is told rather than having the tail silently dropped.
 */
export function rejectOverLongFields(
  body: Record<string, unknown>,
  fields: readonly FieldLimit[]
): NextResponse | null {
  for (const field of fields) {
    const value = body[field.key];
    if (typeof value === "string" && value.trim().length > field.max) {
      return errorResponse(
        `Your ${field.label} is too long. Please keep it under ${field.max} characters.`,
        400
      );
    }
  }
  return null;
}
