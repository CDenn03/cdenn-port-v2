import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL!;

export async function POST(req: NextRequest) {
  const { name, email, engagementType, budgetRange, projectDescription } = await req.json();

  if (!name || !email || !projectDescription) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `New inquiry from ${name} — ${engagementType}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Engagement Type:</strong> ${engagementType}</p>
      <p><strong>Budget:</strong> ${budgetRange || "Not specified"}</p>
      <p><strong>Description:</strong></p>
      <p>${projectDescription}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
