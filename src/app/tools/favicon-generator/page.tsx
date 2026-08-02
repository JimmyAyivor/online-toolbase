// src/app/tools/favicon-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const FaviconGeneratorClient = dynamic(
  () => import("./FaviconGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "favicon-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title:
    "Free Favicon Generator — PNG & ICO from Any Image",
  description:
    "Generate favicons in all required sizes (16×16, 32×32, 180×180, 192×192, 512×512) from any image. Download individual PNGs, a favicon.ico, or the full set with HTML code and site.webmanifest. Free, no signup.",
  keywords:
    "favicon generator, favicon creator, favicon from image, favicon ico, apple touch icon, web manifest icon, favicon sizes, create favicon, free favicon tool, png to favicon",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/favicon-generator` },
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
    url: `${SITE_URL}/tools/favicon-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Favicon Generator — PNG & ICO from Any Image",
    description:
      "Upload any image and generate favicons in all required sizes — 16×16, 32×32, 180×180, 192×192, 512×512. Includes HTML code and site.webmanifest. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Favicon Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Favicon Generator — PNG & ICO from Any Image",
    description:
      "Generate favicons in all sizes from any image. Download PNGs, ICO, HTML code, and webmanifest. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Favicon Generator",
  description:
    "Generates favicon PNG files in all standard sizes (16×16, 32×32, 48×48, 64×64, 128×128, 180×180 Apple Touch Icon, 192×192 and 512×512 Android Chrome) from an uploaded image. Also outputs a favicon.ico (32×32 PNG renamed), ready-to-paste HTML link tags, and a site.webmanifest JSON file. All processing runs in the browser using the Canvas API.",
  url: `${SITE_URL}/tools/favicon-generator`,
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
      name: "Image Tools",
      item: `${SITE_URL}/tools/category/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Favicon Generator",
      item: `${SITE_URL}/tools/favicon-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a favicon and why does every website need one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A favicon (short for 'favourite icon') is the small image displayed in browser tabs, bookmarks, and search results to visually identify a website. It appears in the browser tab next to the page title, in the browser's bookmark list, in search engine results on some browsers, and as the icon when a page is saved to a mobile home screen. Without a favicon, browsers display a generic grey icon in the tab, which looks unprofessional and makes it harder for users with multiple tabs open to identify your site...",
      },
    },
    {
      "@type": "Question",
      name: "What favicon sizes do I need for my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A complete favicon implementation requires multiple sizes for different contexts. The minimum recommended set includes: 16×16 (standard browser tab), 32×32 (high-DPI tabs and taskbar), 180×180 apple-touch-icon.png (iOS Safari home screen), 192×192 android-chrome-192x192.png (Android Chrome PWA icon), and 512×512 android-chrome-512x512.png (Android Chrome splash screen). Optional additional sizes include 48×48 (Windows site icons), 64×64 (some app contexts), and 128×128 (Chrome Web Store). This generator produces all 8 standard sizes plus a favicon.ico file from a single uploaded image.",
      },
    },
    {
      "@type": "Question",
      name: "What is a favicon.ico file and is it still needed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "favicon.ico is the original favicon format, introduced by Internet Explorer in the late 1990s. It can contain multiple bitmap images at different sizes in a single file. Modern browsers support PNG favicons specified via HTML link tags and don't require a favicon.ico file. However, placing a favicon.ico in your website's root directory (/favicon.ico) is still recommended as a fallback because many older browsers, web crawlers, RSS readers, and bookmarking tools automatically look for /favicon.ico without reading your HTML meta tags...",
      },
    },
    {
      "@type": "Question",
      name: "What is a site.webmanifest and why do I need it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A site.webmanifest (also called a Web App Manifest) is a JSON file that tells browsers how to display your website when it's installed as a Progressive Web App (PWA) or saved to a home screen. It specifies the app name, short name, icon locations and sizes, theme colour, background colour, and display mode (standalone, fullscreen, or browser). Chrome on Android, Samsung Internet, and other modern browsers use the manifest to generate the splash screen, app icon, and name shown when a user installs your website as an app...",
      },
    },
    {
      "@type": "Question",
      name: "What type of image should I use as the source for my favicon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For best results, use a square image (equal width and height) in PNG format with a transparent background. The recommended minimum size is 512×512 pixels — larger source images produce sharper results when scaled down to small sizes. Simple, bold designs with strong contrast work best at small sizes: a full-colour illustration or detailed photo becomes indistinct at 16×16 and 32×32 pixels. If your logo is complex, consider creating a simplified version specifically for favicon use — many companies use just their initial or a single simplified icon shape rather than their full logo...",
      },
    },
    {
      "@type": "Question",
      name: "How do I add the generated favicons to my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After downloading the favicon files, place them in your website's root public directory (the same folder as your index.html). Add the HTML link tags generated by this tool inside the &lt;head&gt; section of your HTML. The standard implementation includes: a link tag for the 32×32 PNG, a link tag for the 16×16 PNG, a link tag for the Apple Touch Icon (180×180), and a link tag referencing your site.webmanifest. Also place your favicon.ico file in the root directory — browsers will find it automatically without a link tag...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Favicon Generator",
  description: "Step-by-step guide to using the free Favicon Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Favicon Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Favicon Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function FaviconGeneratorPage() {
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
            <a href="/" className="hover:text-orange-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/image"
              className="hover:text-orange-600 transition-colors"
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Favicon Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1">
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Favicon Generator — Create Favicon PNG &amp; ICO from Any Image Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Upload any image and generate favicons in all standard sizes —
          download individual PNGs, favicon.ico, the full set, HTML code, and
          site.webmanifest.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Favicon Generator tool">
          <FaviconGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="favicon-generator"
          toolName="Favicon Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
