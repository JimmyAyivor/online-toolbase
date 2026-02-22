// src/app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
const TWITTER = "@onlinetoolbase";

export const metadata: Metadata = {
  // ── Titles ──────────────────────────────────────────────────────────────
  // Homepage overrides this via its own export const metadata.
  // This is the fallback for any page that doesn't set its own title.
  title: {
    default: `${SITE_NAME} — Free Calculators, Converters & Generators`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "50+ free online tools — BMI calculators, currency converters, QR code generators, password tools, and more. No signup, no download, 100% free.",

  // ── Canonical / alternates ───────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Crawl directives ────────────────────────────────────────────────────
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

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Free Calculators, Converters & Generators`,
    description: "50+ free online tools. Fast, private, no signup required.",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Online Tools`,
      },
    ],
  },

  // ── Twitter card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: TWITTER,
    creator: TWITTER,
    title: `${SITE_NAME} — Free Calculators, Converters & Generators`,
    description: "50+ free online tools. Fast, private, no signup required.",
  },

  // ── Authors / publisher ──────────────────────────────────────────────────
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ── Verification (add values when you verify in Search Console / Bing) ──
  // verification: {
  //   google: "your-google-site-verification-token",
  //   yandex: "your-yandex-token",
  // },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='font-sans antialiased bg-gray-50'>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
