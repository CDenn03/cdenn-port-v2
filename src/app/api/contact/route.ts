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
  const engagementType = asText(body.engagementType, MAX_LENGTHS.shortField);
  const budgetRange = asText(body.budgetRange, MAX_LENGTHS.shortField);
  const projectDescription = asText(body.projectDescription, MAX_LENGTHS.longText);

  if (!name || !email || !projectDescription) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Request is well-formed; now confirm the mailer is actually configured.
  const mailer = requireMailer("contact");
  if (!mailer.ok) return mailer.response;

  const { error } = await mailer.resend.emails.send({
    from: resolveFromEmail("Portfolio Contact"),
    to: mailer.to,
    replyTo: email,
    subject: singleLine(
      `New inquiry from ${name}${engagementType ? ` - ${engagementType}` : ""}`
    ),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Engagement Type:</strong> ${escapeHtml(engagementType) || "Not specified"}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budgetRange) || "Not specified"}</p>
      <p><strong>Description:</strong></p>
      <p>${escapeMultiline(projectDescription)}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend send failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
