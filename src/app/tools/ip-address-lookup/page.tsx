// src/app/tools/ip-address-lookup/page.tsx
import type { Metadata } from "next";
import IpAddressLookupClient from "./IpAddressLookupClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "IP Address Lookup — Geolocation & Network Info for Any IP, Free Online",
  description:
    "Look up geolocation, ISP, ASN, and network information for any IP address instantly. Detects your own IP automatically. Free, no signup.",
  keywords:
    "ip address lookup, ip geolocation, ip location finder, what is my ip, ip address info, ip to location, isp lookup, asn lookup, ip address checker, free ip lookup tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/ip-address-lookup` },
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
    url: `${SITE_URL}/tools/ip-address-lookup`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "IP Address Lookup — Geolocation & Network Info for Any IP, Free Online",
    description:
      "Look up geolocation, ISP, ASN, and network info for any IP instantly. Detects your own IP automatically. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online IP Address Lookup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "IP Address Lookup — Geolocation & Network Info for Any IP, Free Online",
    description:
      "Look up geolocation, ISP, ASN, and network info for any IP instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "IP Address Lookup",
  description:
    "Look up geolocation, ISP, ASN, timezone, and network information for any IPv4 or IPv6 address. Detects your own IP automatically.",
  url: `${SITE_URL}/tools/ip-address-lookup`,
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
      name: "IP Address Lookup",
      item: `${SITE_URL}/tools/ip-address-lookup`,
    },
  ],
};

export default function IpAddressLookupPage() {
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
              href='/tools/category/developer'
              className='hover:text-indigo-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              IP Address Lookup
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          IP Address Lookup — Geolocation &amp; Network Info for Any IP, Free
          Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Look up geolocation, ISP, ASN, and network info for any IP address
          instantly — detects your own IP automatically.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='IP Address Lookup tool'>
          <IpAddressLookupClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="ip-address-lookup" toolName="IP Address Lookup" />
      </SidebarAdLayout>
    </>
  );
}
