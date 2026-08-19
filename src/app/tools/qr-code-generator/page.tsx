// src/app/tools/qr-code-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "qr-code-generator");
const QrCodeGeneratorClient = dynamic(() => import("./QrCodeGeneratorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free QR Code Generator — URLs, WiFi, Email & More",
  description:
    "Generate QR codes for URLs, text, WiFi, email, phone, SMS, vCard, and location. Custom colours and sizes. Download as PNG instantly. Free, no signup.",
  keywords:
    "qr code generator, free qr code generator, custom qr code, wifi qr code, url qr code, vcard qr code, qr code maker online, generate qr code free, qr code download, qr code creator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/qr-code-generator` },
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
    url: `${SITE_URL}/tools/qr-code-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free QR Code Generator — URLs, WiFi, Email & More",
    description:
      "Generate QR codes for URLs, text, WiFi, email, phone, SMS, vCard, and location. Custom colours, sizes, download as PNG. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free QR Code Generator — URLs, WiFi, Email & More",
    description:
      "Generate QR codes for URLs, WiFi, email, vCard, and more. Custom colours and sizes, download as PNG. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QR Code Generator",
  description:
    "Generate QR codes for URLs, text, WiFi networks, email addresses, phone numbers, SMS, vCard contact cards, and geographic locations. Custom foreground and background colours, adjustable size, download as PNG.",
  url: `${SITE_URL}/tools/qr-code-generator`,
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
      name: "QR Code Generator",
      item: `${SITE_URL}/tools/qr-code-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of QR code can I generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool supports eight QR code content types. Website URL generates a QR code that opens a web address when scanned. Plain Text encodes any text string — useful for short messages, codes, or identifiers. Email generates a mailto: link that opens the user's email client pre-addressed to the specified address. Phone generates a tel: link that prompts the user to call the number. SMS generates an sms: link that opens a text message pre-addressed to the number with an optional pre-filled message body...",
      },
    },
    {
      "@type": "Question",
      name: "How do I generate a WiFi QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select the WiFi type and enter your network details in the format NetworkName:Password:SecurityType. For example: MyHomeWiFi:mysecretpassword:WPA. The security type is typically WPA (for WPA2 and WPA3 networks), WEP (for older networks), or nopass (for open networks with no password). When someone scans the QR code with their phone camera, they'll be prompted to join the network automatically — no need to type the password. This is particularly useful for guest networks in homes, cafés, offices, and events...",
      },
    },
    {
      "@type": "Question",
      name: "What size should I make my QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The right size depends on how the QR code will be displayed and scanned. For digital use (websites, emails, presentations) a size of 200–300 pixels is sufficient — phones scan QR codes from screens easily at close range. For print materials like business cards, a minimum physical size of 2 × 2 cm (about 0.8 inches) is recommended for reliable scanning. For posters and signage that will be scanned from a distance of 1–2 metres, the QR code should be at least 10 × 10 cm. A general rule: the scanning distance should be no more than 10 times the QR code's physical size...",
      },
    },
    {
      "@type": "Question",
      name: "Can I customise the colours of my QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the foreground (module) colour and background colour can both be customised using the colour pickers. The foreground colour is the dark modules that form the QR code pattern; the background colour is the light areas. For reliable scanning, the foreground must be significantly darker than the background — high contrast is required. The QR code specification assumes dark-on-light, so avoid inverting this relationship (light foreground on dark background) as it may cause scanning failures on some devices or in poor lighting...",
      },
    },
    {
      "@type": "Question",
      name: "What file format does the downloaded QR code use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The downloaded file is a PNG image, which is the most universally compatible format for QR codes. PNG is a lossless format — unlike JPEG, it does not introduce compression artifacts that could blur the sharp edges of QR code modules and cause scanning failures. PNG files can be placed in Word documents, PowerPoint presentations, PDF files, web pages, and printed materials...",
      },
    },
    {
      "@type": "Question",
      name: "How do I format a vCard QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select the Contact Card (vCard) type and enter the contact details in the format Name:Phone:Email — for example: Jane Smith:+447911123456:jane@example.com. The tool encodes this as a vCard 3.0 format, which is the most widely supported contact card standard. When someone scans the QR code, their phone will prompt them to save the contact to their address book with the name, phone number, and email address pre-filled. vCard QR codes are commonly used on business cards as a quick way to share contact details without manual entry...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the QR Code Generator",
  description:
    "Step-by-step guide to using the free QR Code Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose your QR code type",
      text: "Select from URL, plain text, email, phone, WiFi, or contact card — each type has specific fields.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your content",
      text: "Fill in the URL, text, or other details you want the QR code to encode.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download your QR code",
      text: "Click Generate then download as PNG or SVG. SVG is recommended for print — it stays sharp at any size.",
    },
  ],
};

export default function QrCodeGeneratorPage() {
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
              QR Code Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          QR Code Generator — Free Custom QR Codes for URLs, WiFi, Email &amp;
          More
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate QR codes for URLs, WiFi, email, vCard, and more — custom
          colours, adjustable size, download as PNG.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="QR Code Generator tool">
          <QrCodeGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="qr-code-generator"
          toolName="QR Code Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
