// src/app/terms-of-service/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, {
  Section,
  BulletList,
  InfoBox,
} from "@/components/LegalLayout";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";
const LAST_UPDATED = "January 22, 2024";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms of Service for ${SITE_NAME}. Read our terms and conditions for using our free web tools. No signup required.`,
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms-of-service`,
    siteName: SITE_NAME,
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Terms and conditions for using ${SITE_NAME}'s Calculators, Pdf Tools & More.`,
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
      name: "Terms of Service",
      item: `${SITE_URL}/terms-of-service`,
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: `${SITE_URL}/terms-of-service`,
  description: `Terms of Service for ${SITE_NAME}.`,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TermsOfServicePage() {
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
        title="Terms of Service"
        lastUpdated={LAST_UPDATED}
        description={`Please read these Terms carefully before using ${SITE_NAME}.`}
      >
        {/* 1 ── Acceptance */}
        <Section title="1. Acceptance of Terms">
          <p className="text-gray-700 mb-4">
            Welcome to {SITE_NAME}. By accessing or using our website and online
            tools (&ldquo;Service&rdquo;), you agree to be bound by these Terms
            of Service (&ldquo;Terms&rdquo;). If you do not agree to these
            Terms, please do not use our Service.
          </p>
          <p className="text-gray-700">
            We reserve the right to modify these Terms at any time. Your
            continued use of the Service following any changes constitutes
            acceptance of those changes.
          </p>
        </Section>

        {/* 2 ── Description */}
        <Section title="2. Description of Service">
          <p className="text-gray-700 mb-4">
            {SITE_NAME} provides a collection of free web-based tools including
            calculators, converters, generators, formatters, and utilities
            across categories such as writing, developer tools, image tools,
            finance, health, social media, and more. Our tools are designed to
            help users with various everyday tasks and are provided free of
            charge.
          </p>
          <p className="text-gray-700">
            All tools process data <strong>locally in your browser</strong>. We
            do not collect, store, or transmit the data you enter into our
            tools.
          </p>
        </Section>

        {/* 3 ── License */}
        <Section title="3. Use License">
          <p className="text-gray-700 mb-4">
            We grant you a limited, non-exclusive, non-transferable, revocable
            licence to use our Service for personal or commercial purposes,
            subject to these Terms.
          </p>
          <p className="text-gray-700 mb-3">
            You agree <strong>NOT</strong> to:
          </p>
          <BulletList
            items={[
              "Modify, copy, or create derivative works of the Service",
              "Reverse engineer, decompile, or attempt to extract source code",
              "Remove any copyright or proprietary notices",
              "Use the Service in any way that violates applicable laws or regulations",
              "Use automated systems (bots, scrapers) to access the Service excessively",
              "Attempt to gain unauthorised access to any part of the Service",
              "Use the Service to transmit malware, viruses, or harmful code",
              "Interfere with or disrupt the Service or its servers",
            ]}
          />
        </Section>

        {/* 4 ── User Responsibilities */}
        <Section title="4. User Responsibilities">
          <p className="text-gray-700 mb-3">
            As a user of our Service, you are responsible for:
          </p>
          <BulletList
            items={[
              "Ensuring that your use of the tools complies with all applicable laws",
              "Maintaining the security of your device and internet connection",
              "Verifying the accuracy of results produced by our tools before relying on them",
              "Backing up any important data before using our tools",
              "Using the tools in a reasonable manner that does not overload our servers",
            ]}
          />
        </Section>

        {/* 5 ── Warranties */}
        <Section title="5. Disclaimer of Warranties">
          <p className="text-gray-700 mb-4 uppercase font-semibold text-sm">
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or
            implied, including but not limited to:
          </p>
          <BulletList
            items={[
              "Warranties of merchantability, fitness for a particular purpose, or non-infringement",
              "That the Service will be uninterrupted, error-free, or secure",
              "That results from the Service will be accurate or reliable",
              "That any errors in the Service will be corrected",
            ]}
          />
          <p className="text-gray-700">
            We do not warrant that the tools will meet your specific
            requirements or that they are suitable for any particular purpose.
          </p>
        </Section>

        {/* 6 ── Liability */}
        <Section title="6. Limitation of Liability">
          <p className="text-gray-700 mb-4 uppercase font-semibold text-sm">
            To the maximum extent permitted by law, {SITE_NAME} shall not be
            liable for any:
          </p>
          <BulletList
            items={[
              "Indirect, incidental, special, consequential, or punitive damages",
              "Loss of profits, revenue, data, or use",
              "Damages resulting from your use or inability to use the Service",
              "Damages from errors, mistakes, or inaccuracies in results",
              "Unauthorised access to or alteration of your data",
            ]}
          />
          <p className="text-gray-700">
            Our total liability for any claims arising from the use of our
            Service shall not exceed <strong>$100 USD</strong>.
          </p>
        </Section>

        {/* 7 ── Professional Advice */}
        <Section title="7. Professional Advice Disclaimer">
          <p className="text-gray-700 mb-4">
            The tools and information provided on our website are for general
            informational purposes only and should <strong>not</strong> be
            considered professional advice. Specifically:
          </p>
          <BulletList
            items={[
              <>
                <strong>Financial Tools</strong> (loan calculator, mortgage
                calculator, compound interest, currency converter, discount
                calculator, sales tax): Not a substitute for professional
                financial, tax, investment, or legal advice.
              </>,
              <>
                <strong>Health Tools</strong> (BMI calculator, calorie &amp;
                macro calculator): Not medical advice. Do not use for diagnosing
                or treating health problems. Always consult qualified healthcare
                professionals.
              </>,
              <>
                <strong>Document Tools</strong> (invoice generator, resume
                builder, signature generator): Templates for convenience only.
                Not a substitute for professional legal or business advice.
              </>,
              <>
                <strong>Social Media Tools</strong> (hashtag generator,
                engagement rate calculator, ad copy generator): Results are
                suggestions only. Platform algorithms change frequently; always
                verify current best practices.
              </>,
              <>
                <strong>Developer Tools</strong> (hash generator, regex tester,
                JSON validator): Verify outputs independently before use in
                production systems.
              </>,
            ]}
          />
          <p className="text-gray-700">
            Always verify important calculations and consult qualified
            professionals for critical decisions.
          </p>
        </Section>

        {/* 8 ── Third Party */}
        <Section title="8. Third-Party Links and Services">
          <p className="text-gray-700">
            Our Service may contain links to third-party websites or services.
            We are not responsible for the content, privacy policies, or
            practices of any third-party sites. Your use of third-party services
            is at your own risk.
          </p>
        </Section>

        {/* 9 ── Advertising */}
        <Section title="9. Advertising">
          <p className="text-gray-700">
            Our Service displays advertisements through Google AdSense and
            potentially other advertising partners. We do not control the
            content of these advertisements and are not responsible for the
            products or services advertised. We are not responsible for any
            transactions between you and advertisers.
          </p>
        </Section>

        {/* 10 ── IP */}
        <Section title="10. Intellectual Property">
          <p className="text-gray-700 mb-4">
            The Service, including its original content, features, and
            functionality, is owned by {SITE_NAME} and is protected by
            international copyright, trademark, and other intellectual property
            laws.
          </p>
          <p className="text-gray-700">
            You may not use our trademarks, logos, or branding without our prior
            written permission.
          </p>
        </Section>

        {/* 11 ── Termination */}
        <Section title="11. Termination">
          <p className="text-gray-700">
            We reserve the right to terminate or suspend your access to the
            Service at any time, without notice, for conduct that we believe
            violates these Terms or is harmful to other users, us, or third
            parties, or for any other reason at our sole discretion.
          </p>
        </Section>

        {/* 12 ── Indemnification */}
        <Section title="12. Indemnification">
          <p className="text-gray-700">
            You agree to indemnify, defend, and hold harmless {SITE_NAME} and
            its affiliates, officers, agents, and employees from any claims,
            damages, losses, liabilities, and expenses (including reasonable
            legal fees) arising from your use of the Service or your violation
            of these Terms.
          </p>
        </Section>

        {/* 13 ── Governing Law */}
        <Section title="13. Governing Law">
          <p className="text-gray-700">
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions. Any disputes shall be resolved in the courts of
            [Your Jurisdiction]. If you are accessing the Service from outside
            [Your Jurisdiction], you are responsible for compliance with local
            laws.
          </p>
        </Section>

        {/* 14 ── Changes to Service */}
        <Section title="14. Changes to Service">
          <p className="text-gray-700">
            We reserve the right to modify, suspend, or discontinue any part of
            the Service at any time without notice. We shall not be liable to
            you or any third party for any modification, suspension, or
            discontinuance of the Service.
          </p>
        </Section>

        {/* 15 ── Severability */}
        <Section title="15. Severability">
          <p className="text-gray-700">
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary so that the Terms shall otherwise remain in
            full force and effect.
          </p>
        </Section>

        {/* 16 ── Entire Agreement */}
        <Section title="16. Entire Agreement">
          <p className="text-gray-700">
            These Terms, together with our{" "}
            <Link
              href="/privacy-policy"
              className="text-indigo-600 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/disclaimer"
              className="text-indigo-600 hover:underline"
            >
              Disclaimer
            </Link>
            , constitute the entire agreement between you and {SITE_NAME}{" "}
            regarding the use of the Service.
          </p>
        </Section>

        {/* 17 ── Contact */}
        <Section title="17. Contact Information">
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 space-y-2">
            <p className="text-gray-700">
              <strong>Legal enquiries:</strong>{" "}
              <a
                href="mailto:legal@onlinetoolbase.com"
                className="text-indigo-600 hover:underline"
              >
                legal@onlinetoolbase.com
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

        {/* Important notice */}
        <InfoBox variant="amber" title="⚠️ Important Notice">
          <p className="mb-3">By using {SITE_NAME}, you acknowledge that:</p>
          <BulletList
            items={[
              "You have read and understood these Terms of Service",
              "You agree to be bound by these Terms",
              "You are responsible for verifying all results from our tools",
              "The tools are provided free of charge 'as-is' without warranties",
            ]}
          />
        </InfoBox>
      </LegalLayout>
    </>
  );
}
