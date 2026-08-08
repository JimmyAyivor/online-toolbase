// src/app/tools/invoice-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const InvoiceGeneratorClient = dynamic(
  () => import("./InvoiceGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "invoice-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Professional Invoices Fast",
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
    title: "Free Invoice Generator — Professional Invoices Fast",
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
    title: "Free Invoice Generator — Professional Invoices Fast",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What information must a legally valid invoice include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Invoice requirements vary by country and whether you're VAT/GST registered, but a standard professional invoice should include: a unique invoice number, the invoice issue date and payment due date, your full business name and address, your client's full name and address, a clear description of each product or service provided, quantity and unit price for each line item, subtotal, any applicable tax (with your tax registration number if VAT/GST registered), the total amount due, and payment instructions including accepted payment methods and bank details where applicable...",
      },
    },
    {
      "@type": "Question",
      name: "What is Net 30 and what payment terms should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net 30 means payment is due within 30 calendar days of the invoice issue date. Common payment terms include: Due on Receipt (payment expected immediately upon receiving the invoice), Net 7 (due within 7 days — suitable for small amounts or clients with fast payment cycles), Net 14 (due within 14 days — common for freelancers and small businesses), Net 30 (due within 30 days — the standard for most B2B invoices), and Net 60 or Net 90 (used in some industries for larger corporate clients)...",
      },
    },
    {
      "@type": "Question",
      name: "Should I include my bank details on the invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — including complete payment details on the invoice removes friction from the payment process and reduces the need for follow-up. For bank transfers, include your account name, bank name, sort code/routing number, and account number. If you accept PayPal, include your PayPal email. If you accept credit cards, include your payment link or note that card payments are available on request. In the UK, BACS bank transfer is the most common B2B payment method and should always be included. In the US, ACH bank transfer details are standard for B2B invoices...",
      },
    },
    {
      "@type": "Question",
      name: "How should I number invoices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Invoice numbering should be sequential, unique, and consistent. The simplest system is a number sequence starting at 001 and incrementing with each invoice (001, 002, 003…). A more structured approach includes the year (2024-001, 2024-002) which makes filing and searching easier. Some businesses include a client code (CLIENT-001, CLIENT-002) to group invoices by client. The format doesn't matter as long as it's sequential — never skip numbers, never reuse numbers, and never issue two invoices with the same number...",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a quote, a proforma invoice, and a tax invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A quote (or estimate) is a document sent before work begins that states the price you propose to charge. It is not a request for payment and has no legal payment obligation. A proforma invoice is a preliminary invoice that looks like a real invoice but is sent before goods or services are delivered — often used to request a deposit or upfront payment, or to satisfy import/export documentation requirements. It does not create a legal payment obligation on its own...",
      },
    },
    {
      "@type": "Question",
      name: "How do I follow up on an unpaid invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unpaid invoice follow-up should be structured and timely. Send a polite payment reminder on or just after the due date — a brief, professional email referencing the invoice number, amount, and due date is usually sufficient for a first reminder. If the invoice remains unpaid after 7–14 days, send a firmer second reminder that states you will charge a late payment fee if applicable (include this possibility in your original payment terms). After 30 days overdue, consider a formal letter or phone call...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Invoice Generator",
  description:
    "Step-by-step guide to using the free Invoice Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Invoice Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Invoice Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
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
            <a href="/" className="hover:text-slate-700 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business-productivity"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Invoice Generator — Create &amp; Download Professional Invoices Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Create professional invoices with itemised billing, automatic totals,
          tax, and payment terms — download as PDF or print. Your data never
          leaves your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
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
