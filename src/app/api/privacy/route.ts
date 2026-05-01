import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL ?? "";

export async function POST(req: NextRequest) {
  const { name, email, requestType, details } = await req.json();

  if (!name || !email || !requestType || !details) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Privacy Request <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `Privacy Request: ${requestType} - from ${name}`,
    html: `
      <h2>Privacy Data Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Request Type:</strong> ${requestType}</p>
      <p><strong>Details:</strong></p>
      <p>${details}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
