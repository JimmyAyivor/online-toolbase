// src/app/disclaimer/page.tsx
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
const SITE_NAME = "Free Online Tools";
const LAST_UPDATED = "January 22, 2024";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_NAME}`,
  description: `Disclaimer for ${SITE_NAME}. Understand the limitations of our free online tools and when to seek professional advice.`,
  alternates: { canonical: `${SITE_URL}/disclaimer` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/disclaimer`,
    siteName: SITE_NAME,
    title: `Disclaimer | ${SITE_NAME}`,
    description: `Important limitations and professional advice notices for ${SITE_NAME}.`,
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
      name: "Disclaimer",
      item: `${SITE_URL}/disclaimer`,
    },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <LegalLayout
        title="Disclaimer"
        lastUpdated={LAST_UPDATED}
        description="Important limitations and notices about the use of our tools."
      >
        {/* General */}
        <Section title="General Disclaimer">
          <p className="text-gray-700 mb-4">
            The information and tools provided by {SITE_NAME} on our website are
            for general informational and convenience purposes only. All
            information and tool results are provided in good faith; however, we
            make no representation or warranty of any kind, express or implied,
            regarding the accuracy, adequacy, validity, reliability,
            availability, or completeness of any information or results from our
            tools.
          </p>
          <p className="text-gray-700">
            Under no circumstances shall we be liable for any loss or damage of
            any kind, including without limitation, indirect or consequential
            loss or damage, arising from your use of or reliance on our tools or
            website.
          </p>
        </Section>

        {/* No Professional Advice */}
        <Section title="No Professional Advice">
          <SubSection title="Financial Tools">
            <p className="text-gray-700 mb-3">
              Our financial calculators — including the{" "}
              <Link
                href="/tools/loan-mortgage-calculator"
                className="text-indigo-600 hover:underline"
              >
                Loan &amp; Mortgage Calculator
              </Link>
              ,{" "}
              <Link
                href="/tools/compound-interest-calculator"
                className="text-indigo-600 hover:underline"
              >
                Compound Interest Calculator
              </Link>
              ,{" "}
              <Link
                href="/tools/currency-converter"
                className="text-indigo-600 hover:underline"
              >
                Currency Converter
              </Link>
              ,{" "}
              <Link
                href="/tools/tip-calculator"
                className="text-indigo-600 hover:underline"
              >
                Tip Calculator
              </Link>
              ,{" "}
              <Link
                href="/tools/sales-tax-calculator"
                className="text-indigo-600 hover:underline"
              >
                Sales Tax Calculator
              </Link>
              , and{" "}
              <Link
                href="/tools/discount-calculator"
                className="text-indigo-600 hover:underline"
              >
                Discount Calculator
              </Link>{" "}
              — are provided for{" "}
              <strong>informational and educational purposes only</strong>. They
              are <strong>NOT</strong> a substitute for professional financial,
              investment, tax, or legal advice. Always consult with a qualified
              financial professional before making financial decisions.
            </p>
          </SubSection>

          <SubSection title="Health &amp; Medical Tools">
            <p className="text-gray-700 mb-3">
              Our health-related tools — including the{" "}
              <Link
                href="/tools/bmi-calculator"
                className="text-indigo-600 hover:underline"
              >
                BMI Calculator
              </Link>{" "}
              and{" "}
              <Link
                href="/tools/calorie-macro-calculator"
                className="text-indigo-600 hover:underline"
              >
                Calorie &amp; Macro Calculator
              </Link>{" "}
              — are for <strong>general informational purposes only</strong> and
              are <strong>NOT medical advice</strong>. They should not be used
              for diagnosing or treating health problems. Always consult with a
              qualified healthcare professional for medical advice, diagnosis,
              or treatment.
            </p>
            <p className="text-gray-700">
              BMI and calorie calculations are population-level estimates and
              may not accurately reflect individual health status.
            </p>
          </SubSection>

          <SubSection title="Document &amp; Business Tools">
            <p className="text-gray-700 mb-3">
              Our document tools — including the{" "}
              <Link
                href="/tools/invoice-generator"
                className="text-indigo-600 hover:underline"
              >
                Invoice Generator
              </Link>
              ,{" "}
              <Link
                href="/tools/resume-builder"
                className="text-indigo-600 hover:underline"
              >
                Resume Builder
              </Link>
              , and{" "}
              <Link
                href="/tools/signature-generator"
                className="text-indigo-600 hover:underline"
              >
                Signature Generator
              </Link>{" "}
              — create templates that may require customisation for your
              specific needs. They are <strong>NOT</strong> a substitute for
              professional legal or business advice. Consult with qualified
              professionals for legally binding documents.
            </p>
          </SubSection>

          <SubSection title="Social Media Tools">
            <p className="text-gray-700 mb-3">
              Our social media tools — including the{" "}
              <Link
                href="/tools/hashtag-generator"
                className="text-indigo-600 hover:underline"
              >
                Hashtag Generator
              </Link>
              ,{" "}
              <Link
                href="/tools/engagement-rate-calculator"
                className="text-indigo-600 hover:underline"
              >
                Engagement Rate Calculator
              </Link>
              , Facebook Ad Copy Generator, and platform-specific planners —
              provide suggestions based on general best practices. Platform
              algorithms, policies, and benchmarks change frequently.{" "}
              <strong>
                We make no guarantee that using our suggestions will increase
                engagement, reach, revenue, or follower count.
              </strong>{" "}
              Always verify current platform guidelines before publishing.
            </p>
          </SubSection>

          <SubSection title="Developer &amp; Security Tools">
            <p className="text-gray-700 mb-3">
              Tools including the{" "}
              <Link
                href="/tools/hash-generator"
                className="text-indigo-600 hover:underline"
              >
                Hash Generator
              </Link>
              ,{" "}
              <Link
                href="/tools/password-generator"
                className="text-indigo-600 hover:underline"
              >
                Password Generator
              </Link>
              ,{" "}
              <Link
                href="/tools/regex-tester"
                className="text-indigo-600 hover:underline"
              >
                Regex Tester
              </Link>
              , and{" "}
              <Link
                href="/tools/json-formatter-validator"
                className="text-indigo-600 hover:underline"
              >
                JSON Formatter
              </Link>{" "}
              are provided as convenience utilities.{" "}
              <strong>
                Do not rely solely on these tools for production security
                systems.
              </strong>{" "}
              Always independently verify outputs and follow your
              organisation&apos;s security policies.
            </p>
          </SubSection>

          <SubSection title="AI-Assisted &amp; Generative Tools">
            <p className="text-gray-700">
              Any tool that generates content suggestions (ad copy, bios, hooks,
              titles, descriptions) produces outputs based on templates and
              patterns — not guaranteed optimal strategies. Generated content
              should be reviewed, edited, and tested before use. We are not
              responsible for the performance of generated content in any
              context.
            </p>
          </SubSection>
        </Section>

        {/* Accuracy */}
        <Section title="Accuracy of Results">
          <p className="text-gray-700 mb-4">
            While we strive to provide accurate tools and calculations, we
            cannot guarantee that all results will be error-free or suitable for
            your specific situation. You should:
          </p>
          <BulletList
            items={[
              "Verify all important calculations independently",
              "Double-check results before making any decisions based on them",
              "Use professional services for critical or high-stakes applications",
              "Report any errors or issues you discover to help us improve",
            ]}
          />
        </Section>

        {/* External Links */}
        <Section title="External Links Disclaimer">
          <p className="text-gray-700">
            Our website may contain links to external websites. We have no
            control over the content and availability of those sites. The
            inclusion of any links does not necessarily imply a recommendation
            or endorsement of the views expressed within them. We are not
            responsible for the content, privacy practices, or reliability of
            any external sites.
          </p>
        </Section>

        {/* Errors and Omissions */}
        <Section title="Errors and Omissions">
          <p className="text-gray-700">
            Under no circumstances shall we be liable for any loss or damage,
            including without limitation, indirect or consequential loss or
            damage, or any loss or damage whatsoever arising from loss of data
            or profits arising out of, or in connection with, the use of our
            tools or website.
          </p>
        </Section>

        {/* Fair Use */}
        <Section title="Fair Use &amp; Acceptable Use">
          <p className="text-gray-700">
            Our tools are provided free of charge for reasonable personal and
            commercial use. Excessive automated requests, scraping, or attempts
            to overload our servers may result in access restrictions without
            notice. You agree to use our tools in good faith and in compliance
            with all applicable laws.
          </p>
        </Section>

        {/* Copyright */}
        <Section title="Copyright &amp; Intellectual Property">
          <p className="text-gray-700 mb-4">
            The content generated by our tools (output text, formatted
            documents, generated images) may be used freely by you. However, you
            are responsible for ensuring that:
          </p>
          <BulletList
            items={[
              "Content you input into our tools does not infringe third-party intellectual property rights",
              "Generated outputs do not inadvertently reproduce copyrighted material",
              "You have the right to use any data, images, or text you upload to our tools",
              "You comply with platform-specific terms when publishing generated social media content",
            ]}
          />
        </Section>

        {/* Important reminder */}
        <InfoBox variant="red" title="⚠️ Important — Use At Your Own Risk">
          <BulletList
            items={[
              "All tools are provided 'as-is' without warranties of any kind",
              "We are not responsible for decisions made based on tool results",
              "Always verify critical calculations independently",
              "Consult qualified professionals for financial, medical, or legal matters",
              "Social media performance cannot be guaranteed by any tool or strategy",
            ]}
          />
        </InfoBox>
      </LegalLayout>
    </>
  );
}
