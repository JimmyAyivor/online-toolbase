// src/app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GlobalMonetization from "@/components/GlobalMonetization";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";
const TWITTER = "@onlinetoolbase";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Fallback title — individual pages override this with their own title.
  // Template appends site name: "Age Calculator — Free Online Tool | Calculators, Pdf Tools & More"
  title: {
    default: `${SITE_NAME} : Free Online Calculators - Math, Fitness, Finance, Science, Pdf Tools`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Free Online Calculators, Pdf Tools & More — free calculators, converters, generators and more. BMI calculator, QR code generator, password generator, currency converter, and hundreds more. No signup, no download, 100% free.",

  keywords:
    "Free Online Calculators, Pdf Tools & More, free calculators, free converters, free generators, online utilities, BMI calculator, currency converter, QR code generator, password generator, word counter, unit converter",

  alternates: { canonical: SITE_URL },

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
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — 162+ Free Calculators, Converters & Generators`,
    description:
      "130+ free browser-based tools. No signup, no download, no cost — ever.",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Calculators, Pdf Tools & More`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: TWITTER,
    creator: TWITTER,
    title: `${SITE_NAME} — 162+ Free Calculators, Pdf Tools, Converters & Generators`,
    description: "162+ Calculators, Pdf Tools & More. No signup required.",
  },

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // Uncomment and fill in once you verify in Google Search Console:
  // verification: {
  //   google: "your-google-site-verification-token",
  //   yandex: "your-yandex-token",
  //   bing:   "your-bing-token",
  // },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        <SiteHeader />
        {children}
        <SiteFooter />
        <GlobalMonetization />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <CookieBanner />
      </body>
    </html>
  );
}
