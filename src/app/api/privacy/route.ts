import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

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

  // Request is well-formed; now confirm the mailer is actually configured.
  const mailer = requireMailer("privacy");
  if (!mailer.ok) return mailer.response;

  const { error } = await mailer.resend.emails.send({
    from: resolveFromEmail("Privacy Request"),
    to: mailer.to,
    replyTo: email,
    subject: singleLine(`Privacy Request: ${requestType} - from ${name}`),
    html: `
      <h2>Privacy Data Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Request Type:</strong> ${escapeHtml(requestType)}</p>
      <p><strong>Details:</strong></p>
      <p>${escapeMultiline(details)}</p>
    `,
  });

  if (error) {
    console.error("[privacy] Resend send failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
