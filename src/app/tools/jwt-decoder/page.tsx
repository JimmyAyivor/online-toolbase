// src/app/tools/jwt-decoder/page.tsx
import type { Metadata } from "next";
import JwtDecoderClient from "./JwtDecoderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode & Inspect JWT Tokens Instantly, Free Online",
  description:
    "Decode JWT tokens in your browser — inspect the header, payload claims, expiry, and signature instantly. No data leaves your device. Free, no signup.",
  keywords:
    "jwt decoder, decode jwt, jwt token decoder, jwt inspector, jwt claims, jwt expiry checker, json web token decoder, jwt header payload, base64url decode, free jwt tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/jwt-decoder` },
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
    url: `${SITE_URL}/tools/jwt-decoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "JWT Decoder — Decode & Inspect JWT Tokens Instantly, Free Online",
    description:
      "Decode JWT tokens in your browser — inspect header, payload claims, expiry timestamps, and signature. Nothing leaves your device. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online JWT Decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "JWT Decoder — Decode & Inspect JWT Tokens Instantly, Free Online",
    description:
      "Decode JWT tokens instantly — inspect header, payload, expiry, and claims. Runs entirely in your browser. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JWT Decoder",
  description:
    "Decode and inspect JSON Web Tokens (JWT) entirely in your browser. Displays the decoded header, payload claims (including iat, exp, nbf, sub, iss), expiry status, and Base64URL-encoded signature. No data is sent to any server.",
  url: `${SITE_URL}/tools/jwt-decoder`,
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
      name: "JWT Decoder",
      item: `${SITE_URL}/tools/jwt-decoder`,
    },
  ],
};

export default function JwtDecoderPage() {
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
              JWT Decoder
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          JWT Decoder — Decode &amp; Inspect JWT Tokens Instantly, Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Decode JWT tokens in your browser — inspect header, payload claims,
          expiry, and signature. Nothing leaves your device.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='JWT Decoder tool'>
          <JwtDecoderClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
