// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { Section, InfoBox } from "@/components/LegalLayout";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
const LAST_UPDATED = "January 22, 2024";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description: `Get in touch with ${SITE_NAME}. Report bugs, request features, or ask questions about our free online tools.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: `Contact Us | ${SITE_NAME}`,
    description: `Reach out to ${SITE_NAME} with questions, bug reports, or feature requests.`,
  },
};

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: `${SITE_URL}/contact`,
    },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "support@onlinetoolbase.com",
      contactType: "customer support",
    },
    {
      "@type": "ContactPoint",
      email: "bugs@onlinetoolbase.com",
      contactType: "technical support",
    },
    {
      "@type": "ContactPoint",
      email: "business@onlinetoolbase.com",
      contactType: "business",
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ContactCardProps {
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  title: string;
  email: string;
  note: string;
}

function ContactCard({
  icon,
  bgColor,
  iconColor,
  title,
  email,
  note,
}: ContactCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        <span className={`${iconColor} text-xl`}>{icon}</span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <a
          href={`mailto:${email}`}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          {email}
        </a>
        <p className="text-sm text-gray-500 mt-0.5">{note}</p>
      </div>
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{question}</h3>
      <p className="text-sm text-gray-700">{answer}</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <LegalLayout
        title="Contact Us"
        lastUpdated={LAST_UPDATED}
        description="Have a question, found a bug, or want to suggest a new tool? We'd love to hear from you."
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — Contact channels */}
          <Section title="Get in Touch">
            <div className="space-y-6">
              <ContactCard
                icon="✉️"
                bgColor="bg-indigo-100"
                iconColor="text-indigo-600"
                title="General Support"
                email="support@onlinetoolbase.com"
                note="We typically respond within 24–48 hours."
              />
              <ContactCard
                icon="🐛"
                bgColor="bg-red-100"
                iconColor="text-red-600"
                title="Report a Bug"
                email="bugs@onlinetoolbase.com"
                note="Include the tool name, browser, and steps to reproduce."
              />
              <ContactCard
                icon="💡"
                bgColor="bg-green-100"
                iconColor="text-green-600"
                title="Feature Requests"
                email="features@onlinetoolbase.com"
                note="Suggest new tools or improvements to existing ones."
              />
              <ContactCard
                icon="🔒"
                bgColor="bg-purple-100"
                iconColor="text-purple-600"
                title="Privacy &amp; Legal"
                email="privacy@onlinetoolbase.com"
                note="GDPR requests, CCPA opt-outs, copyright concerns."
              />
              <ContactCard
                icon="⚖️"
                bgColor="bg-gray-100"
                iconColor="text-gray-600"
                title="Legal &amp; Terms"
                email="legal@onlinetoolbase.com"
                note="Terms of service questions, takedown requests."
              />
            </div>
          </Section>

          {/* Right — FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked
            </h2>
            <div className="space-y-3">
              <FaqItem
                question="Are the tools really free?"
                answer="Yes — all tools are 100% free with no hidden costs, premium tiers, or account requirements."
              />
              <FaqItem
                question="Do you store my data?"
                answer="No. All tools process data locally in your browser. We never see or store your input data (text, images, files, etc.)."
              />
              <FaqItem
                question="Can I use the tools for commercial purposes?"
                answer="Yes, subject to our Terms of Service. You are responsible for verifying that results meet your needs before commercial use."
              />
              <FaqItem
                question="Can I suggest a new tool?"
                answer="Absolutely! Send your ideas to features@onlinetoolbase.com — we love hearing what tools people need."
              />
              <FaqItem
                question="How do I report a bug?"
                answer="Email bugs@onlinetoolbase.com with the tool name, your browser and OS, and steps to reproduce the issue."
              />
              <FaqItem
                question="Are the social media tools guaranteed to improve my results?"
                answer="No. Our social media tools provide suggestions based on best practices. Results vary by account, niche, audience, and platform algorithm changes."
              />
              <FaqItem
                question="Is the financial/health calculator data accurate?"
                answer="We strive for accuracy but cannot guarantee results suit your specific situation. Always verify critical calculations and consult professionals."
              />
              <FaqItem
                question="How do I opt out of personalised ads?"
                answer="Visit Google Ads Settings (g.co/adsettings) or use your browser's cookie controls to opt out of personalised advertising."
              />
            </div>
          </div>
        </div>

        {/* Business enquiries */}
        <div className="mt-10">
          <InfoBox variant="blue" title="Business Enquiries">
            <p className="mb-3">
              For partnership opportunities, advertising arrangements, or other
              business-related enquiries, please contact:
            </p>
            <a
              href="mailto:business@onlinetoolbase.com"
              className="text-lg font-semibold text-blue-800 underline hover:text-blue-900"
            >
              business@onlinetoolbase.com
            </a>
          </InfoBox>
        </div>

        {/* Legal pages quick links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
            Legal Documents
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms-of-service", label: "Terms of Service" },
              { href: "/disclaimer", label: "Disclaimer" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </LegalLayout>
    </>
  );
}
