// src/app/tools/ip-address-lookup/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const IpAddressLookupClient = dynamic(() => import("./IpAddressLookupClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "ip-address-lookup");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free IP Address Lookup — Location & Network Info",
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
    title: "Free IP Address Lookup — Location & Network Info",
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
    title: "Free IP Address Lookup — Location & Network Info",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What information does an IP lookup return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An IP address lookup queries a geolocation database and returns several categories of information. Geographic data includes the country, region (state or province), city, and approximate latitude and longitude coordinates. Network data includes the Internet Service Provider (ISP) or hosting company that owns the IP address block, the Autonomous System Number (ASN) and name (a unique identifier for each network on the internet), and the IP range (CIDR block) that contains the address...",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is IP geolocation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IP geolocation accuracy depends on the granularity of the location being estimated. Country-level accuracy is very high — typically 95–99% — because regional internet registries (RIRs) assign IP blocks to specific countries and this information is public. State or region accuracy is lower, typically 55–80%, because IP blocks within a country can be used anywhere in that country. City-level accuracy is lower still, typically 50–75%, and the coordinates shown often represent the centre of the city or the ISP's registered location rather than the physical location of the device...",
      },
    },
    {
      "@type": "Question",
      name: "What is an ASN (Autonomous System Number)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Autonomous System Number (ASN) is a unique identifier assigned to each network on the internet that independently routes traffic. Each ISP, cloud provider, university, government network, or large enterprise typically has one or more ASNs. For example, Google has ASN 15169, Amazon AWS has AS16509, and Cloudflare has AS13335. ASNs are used by the Border Gateway Protocol (BGP) to route traffic between networks — each AS announces the IP address prefixes it controls to its peers...",
      },
    },
    {
      "@type": "Question",
      name: "Why does my IP show the wrong location?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are several common reasons an IP address shows an inaccurate location. The most common is that your ISP registered its IP blocks at a central location (their headquarters or a major exchange point) rather than in each city where they have customers — so your IP may show as your ISP's home city rather than your actual city. If you're using a VPN, the location shown will be the VPN server's exit location, not your physical location. Corporate networks that route all traffic through a central office will show the office location...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between IPv4 and IPv6?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IPv4 (Internet Protocol version 4) uses 32-bit addresses expressed as four decimal numbers separated by dots, like 192.168.1.1. This allows for about 4.3 billion unique addresses — a number that has been exhausted as internet-connected devices have proliferated. IPv6 uses 128-bit addresses expressed as eight groups of four hexadecimal digits separated by colons, like 2001:0db8:85a3:0000:0000:8a2e:0370:7334. This allows for approximately 340 undecillion addresses — effectively unlimited. IPv6 was designed to replace IPv4, but both coexist on the modern internet...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to look up my own IP address?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — when you open the tool, it automatically detects and displays your current public IP address. This is the IP address that websites and servers see when you connect to them — it's assigned by your ISP and is different from your local network address (which starts with 192.168., 10., or 172.16–31.). If you're connected through a VPN, the tool will show the VPN's exit IP rather than your true IP. If you're on a mobile network, the IP shown may change as you move between cell towers or network segments...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the IP Address Lookup",
  description:
    "Step-by-step guide to using the free IP Address Lookup on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free IP Address Lookup on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The IP Address Lookup provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function IpAddressLookupPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              IP Address Lookup
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          IP Address Lookup — Geolocation &amp; Network Info for Any IP, Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Look up geolocation, ISP, ASN, and network info for any IP address
          instantly — detects your own IP automatically.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="IP Address Lookup tool">
          <IpAddressLookupClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="ip-address-lookup"
          toolName="IP Address Lookup"
        />
      </SidebarAdLayout>
    </>
  );
}
