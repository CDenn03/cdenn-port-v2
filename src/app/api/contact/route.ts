import { NextRequest, NextResponse } from "next/server";
import { budgetLabel, engagementLabel } from "@/src/app/data/contact-options";
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
  { key: "engagementType", label: "engagement type", max: MAX_LENGTHS.shortField },
  { key: "budgetRange", label: "budget range", max: MAX_LENGTHS.shortField },
  { key: "projectDescription", label: "project description", max: MAX_LENGTHS.longText },
] as const;

export async function POST(req: NextRequest) {
  const blocked =
    requireJsonRequest(req) ??
    requireSameOrigin(req) ??
    rateLimit({ req, key: "contact", ...FORM_RATE_LIMIT });
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
  const engagementType = asText(body.engagementType, MAX_LENGTHS.shortField);
  const budgetRange = asText(body.budgetRange, MAX_LENGTHS.shortField) || "unstated";
  const projectDescription = asText(body.projectDescription, MAX_LENGTHS.longText);
  // Only a literal `true` counts. A truthy string from a hand-rolled payload
  // should not quietly opt someone into an attachment they did not ask for.
  const wantsCV = body.wantsCV === true;

  if (!name || !email || !projectDescription) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const engagement = engagementLabel(engagementType);
  if (!engagement) {
    return NextResponse.json(
      { error: "Please choose what kind of work this is from the list." },
      { status: 400 }
    );
  }

  const budget = budgetLabel(budgetRange);
  if (!budget) {
    return NextResponse.json(
      { error: "Please choose a budget range from the list." },
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
      `New inquiry from ${name} - ${engagement}${wantsCV ? " [CV requested]" : ""}`
    ),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Engagement Type:</strong> ${escapeHtml(engagement)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
      <p><strong>CV requested:</strong> ${wantsCV ? "Yes" : "No"}</p>
      <p><strong>Description:</strong></p>
      <p>${escapeMultiline(projectDescription)}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend send failed:", error.message);
    return NextResponse.json(
      { error: "We could not send your message. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
