// src/app/tools/invoice-generator/page.tsx
import type { Metadata } from "next";
import InvoiceGeneratorClient from "./InvoiceGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Invoice Generator — Create & Download Professional Invoices Free Online",
  description:
    "Create professional invoices with itemised line items, automatic subtotal and tax calculations, payment terms, and notes. Download as PDF or print. Free, no signup, no data stored.",
  keywords:
    "invoice generator, free invoice generator, invoice maker, online invoice creator, invoice template, freelance invoice, small business invoice, PDF invoice, invoice download",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/invoice-generator` },
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
    url: `${SITE_URL}/tools/invoice-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Invoice Generator — Create & Download Professional Invoices Free Online",
    description:
      "Create professional invoices with itemised billing, automatic totals, tax, payment terms, and notes. Download as PDF or print. Free, no signup, no data stored.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Invoice Generator — Create & Download Professional Invoices Free Online",
    description:
      "Create invoices with itemised billing, automatic totals, tax, and payment terms. Download as PDF. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Invoice Generator",
  description:
    "Creates professional invoices with company and client details, itemised line items (description, quantity, rate, amount), automatic subtotal, tax, and total calculations, payment terms, due dates, and notes fields. Invoices can be downloaded as PDF or printed directly. All data stays in the browser — nothing is sent to or stored on servers.",
  url: `${SITE_URL}/tools/invoice-generator`,
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Invoice Generator",
      item: `${SITE_URL}/tools/invoice-generator`,
    },
  ],
};

export default function InvoiceGeneratorPage() {
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
            <a href="/" className="hover:text-slate-700 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business"
              className="hover:text-slate-700 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Invoice Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Invoice Generator — Create &amp; Download Professional Invoices Free
          Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Create professional invoices with itemised billing, automatic totals,
          tax, and payment terms — download as PDF or print. Your data never
          leaves your browser.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Invoice Generator tool">
          <InvoiceGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="invoice-generator"
          toolName="Invoice Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
