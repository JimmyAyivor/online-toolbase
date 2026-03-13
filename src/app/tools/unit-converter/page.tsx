// src/app/tools/unit-converter/page.tsx
import type { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Unit Converter — Length, Weight, Temperature, Volume, Speed & Time, Free Online",
  description:
    "Convert between length, weight, temperature, volume, speed, and time units. 6 categories, 40+ units — metres to feet, kg to lbs, Celsius to Fahrenheit, litres to gallons, and more. Free, instant, no signup.",
  keywords:
    "unit converter, length converter, weight converter, temperature converter, volume converter, speed converter, time converter, metres to feet, kg to lbs, celsius to fahrenheit, free unit converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/unit-converter` },
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
    url: `${SITE_URL}/tools/unit-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Unit Converter — Length, Weight, Temperature, Volume, Speed & Time, Free Online",
    description:
      "Convert between 40+ units across 6 categories. metres, kg, Celsius, litres, km/h, seconds and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Unit Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Unit Converter — Length, Weight, Temperature, Volume, Speed & Time, Free Online",
    description:
      "Convert 40+ units across 6 categories — length, weight, temperature, volume, speed, and time. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Unit Converter",
  description:
    "Convert between units across six categories: length (metres, feet, miles, inches, km), weight (kg, lbs, grams, ounces), temperature (Celsius, Fahrenheit, Kelvin), volume (litres, gallons, cups, fluid ounces), speed (km/h, mph, knots, m/s), and time (seconds, minutes, hours, days, weeks, years).",
  url: `${SITE_URL}/tools/unit-converter`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Unit Converter",
      item: `${SITE_URL}/tools/unit-converter`,
    },
  ],
};

export default function UnitConverterPage() {
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
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/calculator'
              className='hover:text-indigo-600 transition-colors'
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Unit Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Unit Converter — Length, Weight, Temperature, Volume, Speed &amp;
          Time, Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Convert between 40+ units across 6 categories — length, weight,
          temperature, volume, speed, and time. Instant results.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Unit Converter tool'>
          <UnitConverterClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
