import Link from "next/link";
import type { Metadata } from "next";
import { PrivacyRequestForm } from "./PrivacyRequestForm";

export const metadata: Metadata = {
  title: "Privacy Policy | CDenn",
  description: "How CDenn handles your personal information.",
};

const sections = [
  {
    title: "1. Who This Applies To",
    content: `This Privacy Policy applies to visitors of cdenn.dev (the "Site"), including anyone who submits a message through the contact form. The Site is operated by Dennis Ndungu ("I", "me", or "CDenn").`,
  },
  {
    title: "2. What Data I Collect",
    content: `When you use the contact form, I collect the following information you voluntarily provide:`,
    list: [
      "Full name",
      "Email address",
      "Project type and budget range",
      "Project description",
    ],
    after: `I do not use cookies, analytics trackers, or any third-party tracking scripts. No data is collected passively from your visit.`,
  },
  {
    title: "3. How I Use Your Data",
    content: `The information you submit is used solely to:`,
    list: [
      "Respond to your inquiry",
      "Understand the scope of your project",
      "Follow up on potential collaboration",
    ],
    after: `Your data is never sold, rented, or shared with third parties for marketing purposes.`,
  },
  {
    title: "4. How Your Data Is Processed",
    content: `Contact form submissions are sent via Resend (resend.com), a transactional email service. Your message is delivered directly to my personal email inbox. Resend may temporarily process your data as part of email delivery. You can review Resend's privacy practices at resend.com/privacy.`,
  },
  {
    title: "5. Data Retention",
    content: `I retain your contact information only as long as necessary to respond to your inquiry or maintain an ongoing professional relationship. You may request deletion of your data at any time by emailing me directly.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your location, you may have the right to:`,
    list: [
      "Access the personal data I hold about you",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Withdraw consent at any time",
    ],
    after: `To exercise any of these rights, use the contact form on this site or reach out directly. I will respond within 30 days.`,
  },
  {
    title: "7. Data Security",
    content: `I take reasonable precautions to protect your information. All data is transmitted over HTTPS. I do not store form submissions in any database — messages are forwarded directly to my email and are subject to my email provider's security practices.`,
  },
  {
    title: "8. Children's Privacy",
    content: `This Site is not directed at children under the age of 13. I do not knowingly collect personal information from children.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `I may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date. Continued use of the Site after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FCF7F2] dark:bg-[#0a0a0a] text-slate-900 dark:text-[#FCF7F2]">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 dark:text-[#888888] hover:text-primary dark:hover:text-[#FCF7F2] transition-colors"
          >
            ← Back to site
          </Link>
          <span className="text-xs text-zinc-400 dark:text-[#555555]">
            Effective: April 18, 2026
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary dark:text-[#888888] mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-zinc-600 dark:text-[#b0b0b0] leading-relaxed">
            This site is a personal portfolio. I keep things simple — I only collect what you
            choose to share, and I use it only to respond to you.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-zinc-200 dark:border-[#1a1a1a] pt-8">
              <h2 className="text-lg font-bold mb-3 text-slate-900 dark:text-[#FCF7F2]">
                {section.title}
              </h2>
              <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-3">
                {section.content}
              </p>
              {section.list && (
                <ul className="space-y-1.5 mb-3 pl-4">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="text-zinc-600 dark:text-[#b0b0b0] flex gap-2 items-start"
                    >
                      <span className="text-primary dark:text-[#888888] mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.after && (
                <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed">
                  {section.after}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-[#1a1a1a]">

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-[#FCF7F2]">
              Submit a Privacy Request
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8">
              To exercise any of your rights under this policy, fill out the form below.
              I&apos;ll respond within 30 days.
            </p>
            <PrivacyRequestForm />
          </div>

          <p className="text-sm text-zinc-400 dark:text-[#555555]">
            © {new Date().getFullYear()} Dennis Ndungu (CDenn). All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
