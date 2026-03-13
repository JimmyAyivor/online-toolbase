// src/app/tools/gradient-generator/page.tsx
import type { Metadata } from "next";
import GradientGeneratorClient from "./GradientGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Linear, Radial & Conic Gradient Tool",
  description:
    "Generate beautiful CSS gradients with a live visual editor. Supports linear, radial, and conic gradients with multi-stop support. Copy CSS instantly. Free, no signup.",
  keywords:
    "css gradient generator, gradient generator, linear gradient css, radial gradient css, background gradient generator, css background generator, gradient color tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/gradient-generator` },
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
    url: `${SITE_URL}/tools/gradient-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "CSS Gradient Generator — Linear, Radial & Conic",
    description:
      "Build stunning CSS gradients visually and copy the CSS code instantly. Linear, radial, conic — all supported.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free CSS Gradient Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "CSS Gradient Generator",
    description:
      "Generate linear, radial, and conic CSS gradients with a live editor. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CSS Gradient Generator",
  description:
    "Generate CSS gradients visually with a live preview. Supports linear, radial, and conic gradients.",
  url: `${SITE_URL}/tools/gradient-generator`,
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
      name: "Gradient Generator",
      item: `${SITE_URL}/tools/gradient-generator`,
    },
  ],
};

export default function GradientGeneratorPage() {
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
            <a href='/' className='hover:text-fuchsia-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/design'
              className='hover:text-fuchsia-600 transition-colors'
            >
              Design Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Gradient Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-fuchsia-600 uppercase tracking-widest mb-1'>
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          CSS Gradient Generator — Linear, Radial & Conic Gradient Tool
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Create beautiful CSS gradients visually — pick colors, set direction,
          copy the CSS. Linear, radial, and conic supported.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='CSS Gradient Generator tool'>
          <GradientGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
