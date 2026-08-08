// src/app/privacy-policy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, {
  Section,
  SubSection,
  BulletList,
  InfoBox,
} from "@/components/LegalLayout";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";
const LAST_UPDATED = "January 22, 2024";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy Policy for ${SITE_NAME}. Learn how we protect your data and privacy. All tools process data locally — we never store your input.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy`,
    siteName: SITE_NAME,
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} protects your privacy. Your data never leaves your browser.`,
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
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy`,
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: `${SITE_URL}/privacy`,
  description: `Privacy Policy for ${SITE_NAME}.`,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <LegalLayout
        title="Privacy Policy"
        lastUpdated={LAST_UPDATED}
        description={`How ${SITE_NAME} collects, uses, and protects your information.`}
      >
        {/* 1 ── Introduction */}
        <Section title="1. Introduction">
          <p className="text-gray-700 mb-4">
            Welcome to {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;). We are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website and use our free online
            tools.
          </p>
          <p className="text-gray-700">
            By using our website, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </Section>

        {/* 2 ── Information We Collect */}
        <Section title="2. Information We Collect">
          <SubSection title="2.1 Information You Provide">
            <p className="text-gray-700 mb-4">
              Our tools process data <strong>locally in your browser</strong>.
              We do not collect, store, or transmit the data you enter into our
              tools (such as text, numbers, images, or files). All processing
              happens entirely on your device.
            </p>
          </SubSection>

          <SubSection title="2.2 Automatically Collected Information">
            <p className="text-gray-700 mb-3">
              When you visit our website, we may automatically collect:
            </p>
            <BulletList
              items={[
                <>
                  <strong>Usage Data:</strong> Pages visited, time spent, tools
                  used, and referring URLs.
                </>,
                <>
                  <strong>Device Information:</strong> Browser type, operating
                  system, IP address, and device identifiers.
                </>,
                <>
                  <strong>Cookies and Similar Technologies:</strong> Small data
                  files stored on your device (see Section 4).
                </>,
              ]}
            />
          </SubSection>
        </Section>

        {/* 3 ── How We Use Your Information */}
        <Section title="3. How We Use Your Information">
          <p className="text-gray-700 mb-3">
            We use automatically collected information to:
          </p>
          <BulletList
            items={[
              "Provide, maintain, and improve our services",
              "Understand how users interact with our tools",
              "Detect, prevent, and address technical issues",
              "Analyse usage patterns and optimise performance",
              "Display relevant advertisements (via Google AdSense)",
            ]}
          />
        </Section>

        {/* 4 ── Cookies */}
        <Section title="4. Cookies and Tracking Technologies">
          <p className="text-gray-700 mb-4">
            We use cookies and similar tracking technologies to track activity
            on our website. Cookies are files with a small amount of data that
            may include an anonymous unique identifier.
          </p>
          <SubSection title="Types of Cookies We Use">
            <BulletList
              items={[
                <>
                  <strong>Essential Cookies:</strong> Necessary for the website
                  to function properly.
                </>,
                <>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors interact with our website (e.g. Google Analytics).
                </>,
                <>
                  <strong>Advertising Cookies:</strong> Used to deliver relevant
                  ads through Google AdSense.
                </>,
              ]}
            />
          </SubSection>
          <p className="text-gray-700">
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, some parts of our website may
            not function correctly without cookies.
          </p>
        </Section>

        {/* 5 ── Third-Party Services */}
        <Section title="5. Third-Party Services">
          <SubSection title="Google AdSense">
            <p className="text-gray-700 mb-4">
              We use Google AdSense to display advertisements. Google uses
              cookies to serve ads based on prior visits to our website or other
              websites. You may opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-indigo-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </SubSection>

          <SubSection title="Google Analytics (or similar)">
            <p className="text-gray-700">
              We may use third-party analytics services to monitor and analyse
              website traffic. These services may use cookies and similar
              technologies to collect information about your use of the website.
            </p>
          </SubSection>
        </Section>

        {/* 6 ── Data Security */}
        <Section title="6. Data Security">
          <p className="text-gray-700 mb-4">
            Since our tools process data locally in your browser, your input
            data never reaches our servers. We implement appropriate technical
            and organisational security measures to protect any information we
            do collect (usage analytics, cookies).
          </p>
          <p className="text-gray-700">
            However, no method of transmission over the Internet is 100% secure.
            While we strive to use commercially acceptable means to protect your
            information, we cannot guarantee its absolute security.
          </p>
        </Section>

        {/* 7 ── Privacy Rights */}
        <Section title="7. Your Privacy Rights">
          <p className="text-gray-700 mb-3">
            Depending on your location, you may have the following rights:
          </p>
          <BulletList
            items={[
              <>
                <strong>Access:</strong> Request access to the personal
                information we hold about you.
              </>,
              <>
                <strong>Correction:</strong> Request correction of inaccurate
                information.
              </>,
              <>
                <strong>Deletion:</strong> Request deletion of your personal
                information.
              </>,
              <>
                <strong>Objection:</strong> Object to processing of your
                personal information.
              </>,
              <>
                <strong>Portability:</strong> Request transfer of your
                information to another service.
              </>,
              <>
                <strong>Withdraw Consent:</strong> Withdraw consent where we
                rely on consent to process your information.
              </>,
            ]}
          />
          <p className="text-gray-700">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:privacy@onlinetoolbase.com"
              className="text-indigo-600 hover:underline"
            >
              privacy@onlinetoolbase.com
            </a>
            .
          </p>
        </Section>

        {/* 8 ── GDPR / CCPA */}
        <Section title="8. GDPR & CCPA Compliance">
          <SubSection title="European Users (GDPR)">
            <p className="text-gray-700 mb-3">
              If you are located in the European Economic Area (EEA), we process
              your data under the following legal bases:
            </p>
            <BulletList
              items={[
                "Legitimate interests — to operate and improve our website",
                "Consent — for advertising cookies (you may withdraw at any time)",
                "Legal obligation — where required by applicable law",
              ]}
            />
            <p className="text-gray-700">
              You have the right to lodge a complaint with your local data
              protection authority.
            </p>
          </SubSection>

          <SubSection title="California Residents (CCPA)">
            <p className="text-gray-700 mb-3">
              California residents have the right to:
            </p>
            <BulletList
              items={[
                "Know what personal information is collected about them",
                "Know whether personal information is sold or disclosed and to whom",
                "Opt out of the sale of personal information",
                "Access their personal information",
                "Equal service and price even if they exercise their privacy rights",
              ]}
            />
            <p className="text-gray-700">
              We do not sell personal information. To submit a CCPA request,
              email{" "}
              <a
                href="mailto:privacy@onlinetoolbase.com"
                className="text-indigo-600 hover:underline"
              >
                privacy@onlinetoolbase.com
              </a>
              .
            </p>
          </SubSection>
        </Section>

        {/* 9 ── Children */}
        <Section title="9. Children's Privacy">
          <p className="text-gray-700">
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us immediately
            so we can delete such information.
          </p>
        </Section>

        {/* 10 ── International */}
        <Section title="10. International Data Transfers">
          <p className="text-gray-700">
            Your information may be transferred to and maintained on computers
            located outside your state, province, country, or other governmental
            jurisdiction where data protection laws may differ from those in
            your jurisdiction. By using our website, you consent to such
            transfers.
          </p>
        </Section>

        {/* 11 ── Changes */}
        <Section title="11. Changes to This Privacy Policy">
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify
            you of any material changes by posting the new Privacy Policy on
            this page and updating the &ldquo;Last Updated&rdquo; date at the
            top. We encourage you to review this Privacy Policy periodically.
          </p>
        </Section>

        {/* 12 ── Contact */}
        <Section title="12. Contact Us">
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 space-y-2">
            <p className="text-gray-700">
              <strong>Privacy enquiries:</strong>{" "}
              <a
                href="mailto:privacy@onlinetoolbase.com"
                className="text-indigo-600 hover:underline"
              >
                privacy@onlinetoolbase.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong>{" "}
              <Link href="/" className="text-indigo-600 hover:underline">
                {SITE_NAME}
              </Link>
            </p>
          </div>
        </Section>

        {/* Key takeaway */}
        <InfoBox variant="blue" title="Key Takeaway">
          <p>
            <strong>Your data stays private.</strong> All our tools process data
            locally in your browser. We never collect, store, or transmit the
            data you enter into our tools. Your input data (text, numbers,
            images, files) never reaches our servers.
          </p>
        </InfoBox>
      </LegalLayout>
    </>
  );
}
