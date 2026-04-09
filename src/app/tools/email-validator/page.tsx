// src/app/tools/email-validator/page.tsx
import type { Metadata } from "next";
import EmailValidatorClient from "./EmailValidatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Email Validator — Check Email Address Format & Validity Free Online",
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
    title:
      "Email Validator — Check Email Address Format & Validity Free Online",
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
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Email Validator — Check Email Address Format & Validity Free Online",
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
              href="/tools/category/developer"
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
        <h1 className="sr-only">
          Email Validator — Check Email Address Format &amp; Validity Free
          Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Validate single or bulk email addresses instantly — format, local
          part, domain, and TLD checks, all in your browser.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Email Validator tool">
          <EmailValidatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="email-validator" toolName="Email Validator" />
      </SidebarAdLayout>
    </>
  );
}
