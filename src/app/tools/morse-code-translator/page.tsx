// src/app/tools/morse-code-translator/page.tsx
import type { Metadata } from "next";
import MorseCodeTranslatorClient from "./MorseCodeTranslatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Morse Code Translator — Text to Morse Code & Back",
  description:
    "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
  keywords:
    "morse code translator, text to morse code, morse code converter, morse code decoder, encode morse code",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/morse-code-translator` },
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
    url: `${SITE_URL}/tools/morse-code-translator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Morse Code Translator — Text to Morse Code & Back",
    description:
      "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Morse Code Translator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Morse Code Translator — Text to Morse Code & Back",
    description:
      "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Morse Code Translator",
  description:
    "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
  url: `${SITE_URL}/tools/morse-code-translator`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Morse Code Translator",
      item: `${SITE_URL}/tools/morse-code-translator`,
    },
  ],
};

export default function MorseCodeTranslatorPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-yellow-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/text'
              className='hover:text-yellow-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Morse Code Translator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-1'>
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Morse Code Translator — Text to Morse Code & Back
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Morse Code Translator tool'>
          <MorseCodeTranslatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="morse-code-translator" toolName="Morse Code Translator" />
      </SidebarAdLayout>
    </>
  );
}
