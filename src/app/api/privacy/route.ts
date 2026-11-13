import { NextRequest, NextResponse } from "next/server";
import { privacyRequestLabel } from "@/src/app/data/contact-options";
import {
  MAX_LENGTHS,
  asText,
  escapeHtml,
  escapeMultiline,
  isValidEmail,
  requireMailer,
  resolveFromEmail,
  singleLine,
} from "@/src/app/lib/email";
import {
  FORM_RATE_LIMIT,
  isHoneypotFilled,
  rateLimit,
  rejectOverLongFields,
  requireJsonRequest,
  requireSameOrigin,
} from "@/src/app/lib/request-guard";

const FIELD_LIMITS = [
  { key: "name", label: "name", max: MAX_LENGTHS.name },
  { key: "email", label: "email address", max: MAX_LENGTHS.email },
  { key: "requestType", label: "request type", max: MAX_LENGTHS.shortField },
  { key: "details", label: "details", max: MAX_LENGTHS.longText },
] as const;

export async function POST(req: NextRequest) {
  const blocked =
    requireJsonRequest(req) ??
    requireSameOrigin(req) ??
    rateLimit({ req, key: "privacy", ...FORM_RATE_LIMIT });
  if (blocked) return blocked;

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  if (isHoneypotFilled(body)) return NextResponse.json({ success: true });

  const overLong = rejectOverLongFields(body, FIELD_LIMITS);
  if (overLong) return overLong;

  const name = asText(body.name, MAX_LENGTHS.name);
  const email = asText(body.email, MAX_LENGTHS.email);
  const requestType = asText(body.requestType, MAX_LENGTHS.shortField);
  const details = asText(body.details, MAX_LENGTHS.longText);

  if (!name || !email || !requestType || !details) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const request = privacyRequestLabel(requestType);
  if (!request) {
    return NextResponse.json(
      { error: "Please choose a request type from the list." },
      { status: 400 }
    );
  }

  // Request is well-formed; now confirm the mailer is actually configured.
  const mailer = requireMailer("privacy");
  if (!mailer.ok) return mailer.response;

  const { error } = await mailer.resend.emails.send({
    from: resolveFromEmail("Privacy Request"),
    to: mailer.to,
    replyTo: email,
    subject: singleLine(`Privacy Request: ${request} - from ${name}`),
    html: `
      <h2>Privacy Data Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Request Type:</strong> ${escapeHtml(request)}</p>
      <p><strong>Details:</strong></p>
      <p>${escapeMultiline(details)}</p>
    `,
  });

  if (error) {
    console.error("[privacy] Resend send failed:", error.message);
    return NextResponse.json(
      { error: "We could not send your request. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
