import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pentanet Engineering PLC Privacy Policy — how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "Introduction",
    content: `Pentanet Engineering PLC ("we", "our", or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, and safeguard data when you visit our website or contact us through any of our forms.

This policy should be read alongside our Terms of Use. By using our website, you acknowledge this policy.

Note: This is a placeholder privacy policy. A full, legally reviewed document must be prepared and approved by Pentanet Engineering PLC before the website goes live.`,
  },
  {
    title: "Information We Collect",
    content: `When you use our contact form or quote request form, we collect the information you provide directly, including:

• Your name, email address, and phone number
• Your company or organisation name
• Details about your project or enquiry
• Technical data such as your IP address (stored only as a hashed value, never the raw address)

We do not collect payment information. We do not use tracking cookies beyond essential session management.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information you provide solely for the following purposes:

• To respond to your enquiry or quote request
• To prepare and send you an engineering proposal
• To follow up on ongoing project discussions
• To comply with any applicable legal or regulatory obligations

We do not use your information for marketing without your explicit consent. We do not sell, rent, or share your personal data with third parties for their marketing purposes.`,
  },
  {
    title: "Data Storage and Security",
    content: `Enquiry and quote data is stored securely in our database hosted on Supabase (PostgreSQL). All data transmission uses HTTPS encryption. Access to stored enquiry data is restricted to authorised Pentanet Engineering PLC staff only.

IP addresses are hashed (SHA-256) before storage — we never store raw IP addresses. We apply appropriate technical and organisational measures to protect your data against unauthorised access, loss, or disclosure.`,
  },
  {
    title: "Data Retention",
    content: `We retain enquiry and project data for as long as is necessary to fulfil the original purpose of collection, and in accordance with applicable law. When data is no longer required, it is securely deleted.`,
  },
  {
    title: "Your Rights",
    content: `Depending on your jurisdiction, you may have the right to:

• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Object to or restrict processing of your data

To exercise any of these rights, please contact us using the details below.`,
  },
  {
    title: "Third-Party Services",
    content: `Our website uses the following third-party services which may process data:

• Vercel — website hosting and content delivery
• Sanity.io — content management system (public content only, no personal data)
• Supabase — database hosting for enquiry storage
• Resend — email delivery service for enquiry notifications
• Cloudflare Turnstile — spam protection on forms

Each provider is bound by their own privacy policies and data processing agreements.`,
  },
  {
    title: "Cookies",
    content: `Our website uses only essential cookies required for normal website operation. We do not use advertising, tracking, or analytics cookies without your consent. You may configure your browser to refuse cookies, though this may affect some website functionality.`,
  },
  {
    title: "Contact",
    content: `For questions or requests related to this Privacy Policy, please contact us:

Pentanet Engineering PLC
Addis Ababa, Ethiopia
Email: info@pentanet.com [Placeholder — to be confirmed]
Phone: +251 000 000 000 [Placeholder — to be confirmed]`,
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "2024 — to be confirmed before launch";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Pentanet Engineering PLC collects, uses, and protects your personal information."
        breadcrumbs={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
      />

      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-sm text-graphite/50 italic mb-10 pb-6 border-b border-gray-100">
              Last updated: {lastUpdated}
            </p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={section.title}>
                  <h2 className="text-xl font-display font-semibold text-navy mb-3 flex items-start gap-3">
                    <span className="text-gold font-black text-lg">{String(i + 1).padStart(2, "0")}.</span>
                    {section.title}
                  </h2>
                  <div className="ml-9 text-graphite/75 leading-relaxed whitespace-pre-line text-sm">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-5 bg-gold/10 border border-gold/20 rounded-xl text-sm text-graphite/70">
              <strong className="text-navy">Important:</strong> This privacy policy is a working draft and placeholder document. It must be reviewed by a qualified legal professional and approved by Pentanet Engineering PLC management before the website is published publicly.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
