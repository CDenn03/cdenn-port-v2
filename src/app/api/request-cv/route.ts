import { NextRequest, NextResponse } from "next/server";
import {
  MAX_LENGTHS,
  asText,
  escapeHtml,
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
  const role = asText(body.role, MAX_LENGTHS.shortField);
  const company = asText(body.company, MAX_LENGTHS.shortField);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Request is well-formed; now confirm the mailer is actually configured.
  const mailer = requireMailer("request-cv");
  if (!mailer.ok) return mailer.response;

  const { error } = await mailer.resend.emails.send({
    from: resolveFromEmail("Portfolio Contact"),
    to: mailer.to,
    replyTo: email,
    subject: singleLine(`CV Request from ${name}${company ? ` at ${company}` : ""}`),
    html: `
      <h2>CV Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${role ? `<p><strong>Role:</strong> ${escapeHtml(role)}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    `,
  });

  if (error) {
    console.error("[request-cv] Resend send failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
