// src/app/tools/signature-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "signature-generator");
const SignatureGeneratorClient = dynamic(
  () => import("./SignatureGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Signature Generator — Digital Signature & PNG",
  description:
    "Create a handwritten-style digital signature from your name. Choose font style, colour, size, and line weight — download as a transparent PNG or copy for use in documents and emails. Free, no signup.",
  keywords:
    "signature generator, digital signature, online signature maker, handwritten signature, signature PNG, signature for documents, email signature, free signature creator, signature download",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/signature-generator` },
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
    url: `${SITE_URL}/tools/signature-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Signature Generator — Digital Signature & PNG",
    description:
      "Create a handwritten-style digital signature from your name. Choose font, colour, and size. Download as transparent PNG. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Signature Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Signature Generator — Digital Signature & PNG",
    description:
      "Create a handwritten-style digital signature and download as transparent PNG. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Signature Generator",
  description:
    "Generates a handwritten-style digital signature from typed text. Users can choose from multiple cursive and script font styles, select signature colour and ink opacity, adjust text size and line weight, and preview the result on a canvas element. The signature can be downloaded as a transparent PNG file for use in PDFs, documents, and email signatures. All processing runs in the browser — no data is uploaded.",
  url: `${SITE_URL}/tools/signature-generator`,
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
      name: "Signature Generator",
      item: `${SITE_URL}/tools/signature-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is a digitally generated signature legally valid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The legal validity of a digital signature depends on the jurisdiction and the type of document. In the US, the Electronic Signatures in Global and National Commerce (ESIGN) Act and the Uniform Electronic Transactions Act (UETA) give electronic signatures the same legal standing as handwritten signatures for most commercial and personal documents. In the UK, the Electronic Communications Act 2000 and subsequent EU eIDAS regulation (retained in UK law post-Brexit) similarly recognise electronic signatures...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a digital signature and an electronic signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These terms are often used interchangeably but have distinct technical meanings. An electronic signature (e-signature) is any electronic process that indicates acceptance of an agreement or document — this includes typing your name, checking a box, or inserting a stylised image of your signature. It's the broad legal category. A digital signature is a specific technical implementation of an electronic signature that uses cryptographic technology to verify the identity of the signer and ensure the document hasn't been altered after signing...",
      },
    },
    {
      "@type": "Question",
      name: "How do I add my signature to a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are several ways to add a signature image to a PDF depending on your software. In Adobe Acrobat Reader (free): open the PDF, select Tools → Fill & Sign → Sign Yourself → Add Signature → Image, then upload your PNG signature. In Preview on Mac: open the PDF, click the markup toolbar pen icon, select Signature from the toolbar, then drag your signature to the correct position. In Google Chrome: open the PDF in Chrome, use the annotation tools if available, or right-click and select Open with, then use the built-in editor...",
      },
    },
    {
      "@type": "Question",
      name: "How do I add my signature to an email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adding a signature image to your email signature depends on your email client. In Gmail: go to Settings → See all settings → Signature → Create new signature. In the signature editor, click the Insert Image button and upload your PNG signature file. Position it below your name and contact details. In Outlook (desktop): File → Options → Mail → Signatures → New. In the signature editor, use Insert → Pictures to add your signature image. In Apple Mail: Mail → Settings → Signatures → New signature. Paste your signature image into the text area...",
      },
    },
    {
      "@type": "Question",
      name: "Why should I download as a transparent PNG rather than a white background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A transparent PNG background means the signature image has no visible background — it shows only the signature strokes themselves, not a white rectangle around them. When you place a transparent PNG signature on a document, form, or email, it sits cleanly on whatever background is beneath it — white paper, coloured document backgrounds, or any other surface. A white-background signature, by contrast, places a visible white rectangle on the page wherever the image is positioned, which looks unprofessional on anything other than a pure white background...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this signature for official documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most everyday business purposes — signing contracts, offer letters, NDAs, service agreements, purchase orders, and general business correspondence — a digitally generated signature image is legally acceptable and widely used. For documents with specific legal requirements around signature authenticity — such as wills, certain property transactions, sworn affidavits, and court filings — a wet ink signature or a cryptographically verified digital signature may be required...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Signature Generator",
  description:
    "Step-by-step guide to using the free Signature Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Signature Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Signature Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SignatureGeneratorPage() {
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
            <a href="/" className="hover:text-rose-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business-productivity"
              className="hover:text-rose-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Signature Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Signature Generator — Create a Digital Signature Free Online &amp;
          Download PNG
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Create a handwritten-style digital signature from your name — choose
          font, colour, and size, then download as a transparent PNG.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Signature Generator tool">
          <SignatureGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="signature-generator"
          toolName="Signature Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
