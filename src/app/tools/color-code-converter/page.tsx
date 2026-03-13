// src/app/tools/color-code-converter/page.tsx
import type { Metadata } from "next";
import ColorCodeConverterClient from "./ColorCodeConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Color Code Converter — HEX, RGB, HSL & HSB Conversion Tool",
  description:
    "Convert color codes between HEX, RGB, HSL, and HSB formats instantly. Pick any color visually, copy values with one click. Free, no signup required.",
  keywords:
    "color code converter, hex to rgb, rgb to hex, hex to hsl, color converter, color picker, css color converter, hex rgb hsl hsb converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/color-code-converter` },
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
    url: `${SITE_URL}/tools/color-code-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Color Code Converter — HEX, RGB, HSL & HSB",
    description:
      "Instantly convert colors between HEX, RGB, HSL, and HSB. Visual picker + one-click copy.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Color Code Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Color Code Converter — HEX, RGB, HSL & HSB",
    description:
      "Convert between HEX, RGB, HSL, and HSB color formats. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Color Code Converter",
  description:
    "Convert color codes between HEX, RGB, HSL, and HSB formats with a visual color picker.",
  url: `${SITE_URL}/tools/color-code-converter`,
  applicationCategory: "DesignApplication",
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
      name: "Design Tools",
      item: `${SITE_URL}/tools/category/design`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Color Code Converter",
      item: `${SITE_URL}/tools/color-code-converter`,
    },
  ],
};

export default function ColorCodeConverterPage() {
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
            <a href='/' className='hover:text-pink-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/design'
              className='hover:text-pink-600 transition-colors'
            >
              Design Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Color Code Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1'>
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Color Code Converter — HEX, RGB, HSL & HSB Conversion Tool
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Convert any color between HEX, RGB, HSL, and HSB formats with a live
          preview and one-click copy for CSS, design tools, and code.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Color Code Converter tool'>
          <ColorCodeConverterClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
