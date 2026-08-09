// src/app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GlobalMonetization from "@/components/GlobalMonetization";
import CookieBanner from "@/components/CookieBanner";
import { tools } from "@/lib/tools";
import "./globals.css";

const TOOL_COUNT = tools.length;
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";
const TWITTER = "@onlinetoolbase";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      `${SITE_NAME} : Free Online Calculators - Math, Fitness, Finance, Science, PDF Tools`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Free Online Calculators, PDF Tools & More — free calculators, converters, generators and more. BMI calculator, QR code generator, password generator, currency converter, and hundreds more. No signup, no download, 100% free.",

  keywords:
    "Free Online Calculators, PDF Tools & More, free calculators, free converters, free generators, online utilities, BMI calculator, currency converter, QR code generator, password generator, word counter, unit converter",

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
    title: `${SITE_NAME} — ${TOOL_COUNT}+ Free Calculators, Converters & Generators`,
    description:
      `${TOOL_COUNT} free browser-based tools. No signup, no download, no cost — ever.`,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Calculators, PDF Tools & More`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: TWITTER,
    creator: TWITTER,
    title: `${SITE_NAME} — ${TOOL_COUNT}+ Free Calculators, PDF Tools, Converters & Generators`,
    description:
      `${TOOL_COUNT}+ Calculators, PDF Tools & More. No signup required.`,
  },

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />

        <main>{children}</main>

        <SiteFooter />

        <GlobalMonetization />

        <CookieBanner />

        {/* Google Analytics — intentionally delayed until browser idle */}
        {GA_ID && (
          <>
            <Script
              id="google-analytics"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />

            <Script
              id="google-analytics-config"
              strategy="lazyOnload"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}

        {/* AdSense — delayed until browser idle */}
        {ADSENSE_PUB_ID && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}