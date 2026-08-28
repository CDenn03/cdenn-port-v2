import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL!;

export async function POST(req: NextRequest) {
  const { name, email, role, company } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `CV Request from ${name}${company ? ` at ${company}` : ""}`,
    html: `
      <h2>CV Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${role ? `<p><strong>Role:</strong> ${role}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
