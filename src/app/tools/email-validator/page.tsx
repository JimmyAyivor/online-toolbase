// src/app/tools/email-validator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const EmailValidatorClient = dynamic(() => import("./EmailValidatorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "email-validator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Email Validator — Check Format & Domain Instantly",
  description:
    "Validate single or bulk email addresses instantly. Checks format, local part, domain, TLD, and common issues. Free, no signup, all processing in your browser.",
  keywords:
    "email validator, email address checker, validate email online, bulk email validator, email format checker, check email validity, email syntax checker, free email validator, email verification tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/email-validator` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/email-validator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Email Validator — Check Format & Domain Instantly",
    description:
      "Validate single or bulk email addresses instantly. Checks format, local part, domain, TLD, and common issues. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Email Validator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Email Validator — Check Format & Domain Instantly",
    description:
      "Validate single or bulk email addresses instantly — format, domain, TLD checks. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Email Validator",
  description:
    "Validate single or bulk email addresses instantly. Checks format, local part, domain, TLD, and common formatting issues. All processing is client-side.",
  url: `${SITE_URL}/tools/email-validator`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Email Validator",
      item: `${SITE_URL}/tools/email-validator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the email validator check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The validator performs a series of syntax checks based on the email address format rules defined in RFC 5321 and RFC 5322. It checks that the address contains exactly one @ symbol; that the local part (before @) is non-empty and uses only permitted characters; that the domain part (after @) contains at least one dot and has valid characters; that the top-level domain (TLD) is at least two characters long; that there are no consecutive dots in the local or domain parts; that the address doesn't start or end with a dot or hyphen; and that the overall length of the address doesn't exceed 254 c..",
      },
    },
    {
      "@type": "Question",
      name: "Does the validator check if an email address actually exists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — this tool performs syntax validation only. It checks whether an email address is correctly formatted, not whether the mailbox actually exists or is active. To verify whether an email address truly exists and can receive mail, you would need to either send an email and confirm receipt, or use an SMTP verification service (which connects to the mail server and checks whether the mailbox exists without sending a message). Syntax validation is the first and most important filter — an address that fails syntax validation will never work regardless of whether the mailbox exists...",
      },
    },
    {
      "@type": "Question",
      name: "What email formats are considered valid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A valid email address has the form local@domain.tld. The local part can contain letters (a-z, A-Z), digits (0-9), and the special characters . + - _ (but not starting or ending with a dot, and no consecutive dots). The domain part consists of one or more labels separated by dots — each label can contain letters, digits, and hyphens (but not starting or ending with a hyphen). The TLD (the final label after the last dot) must be at least two characters. Examples of valid formats: user@example.com, first.last@company.org, user+tag@domain.co.uk, 123@numbers.io...",
      },
    },
    {
      "@type": "Question",
      name: "How do I use the bulk validation mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Switch to the Bulk tab in the tool, then paste a list of email addresses — one per line, or separated by commas. The tool processes all addresses simultaneously and displays a results table showing each address's validation status, the specific checks that passed or failed, and a summary of how many valid and invalid addresses were found. You can copy the full results. This is useful for cleaning email lists before import into a CRM, email marketing platform, or database — removing invalid addresses reduces bounce rates and protects sender reputation.",
      },
    },
    {
      "@type": "Question",
      name: "Why does a valid-looking email address fail validation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some email addresses that look correct to human eyes fail validation for specific technical reasons. Common causes: double dots (user..name@domain.com has consecutive dots in the local part, which is not permitted); starting or ending with a dot (user.@domain.com or .user@domain.com); an @ in the local part without proper quoting (only quoted local parts can contain @); IP address domains without brackets (user@192.168.1.1 requires the IP to be in brackets: user@[192.168.1.1]); very long addresses (total length over 254 characters, or local part over 64 characters); or domain labels with hy..",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to validate emails for GDPR or marketing compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Syntax validation is one component of email list hygiene for marketing and compliance purposes, but it is not sufficient on its own for GDPR or marketing compliance. For compliance, you additionally need: confirmed opt-in (proof the person consented to receive emails), active deliverability verification (confirming the mailbox currently exists), suppression list management (removing unsubscribes and bounces), and records of consent...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Email Validator",
  description:
    "Step-by-step guide to using the free Email Validator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Email Validator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Email Validator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function EmailValidatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-cyan-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-cyan-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Email Validator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Email Validator — Check Email Address Format &amp; Validity Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Validate single or bulk email addresses instantly — format, local
          part, domain, and TLD checks, all in your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Email Validator tool">
          <EmailValidatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="email-validator" toolName="Email Validator" />
      </SidebarAdLayout>
    </>
  );
}
