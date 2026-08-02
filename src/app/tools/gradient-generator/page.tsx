// src/app/tools/gradient-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const GradientGeneratorClient = dynamic(
  () => import("./GradientGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "gradient-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Free CSS Gradient Generator — Linear, Radial & Conic",
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
    title: "Free CSS Gradient Generator — Linear, Radial & Conic",
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
    title: "Free CSS Gradient Generator — Linear, Radial & Conic",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between linear, radial, and conic gradients in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A linear-gradient transitions colors along a straight line at a specified angle (e.g. 135deg transitions from top-left to bottom-right). A radial-gradient emanates from a center point outward in a circle or ellipse — useful for spotlight and glow effects. A conic-gradient transitions colors around a center point like the hands of a clock — useful for pie charts, color wheels, and angular backgrounds. All three are supported natively in all modern browsers without any prefixes.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add multiple color stops to a gradient?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add as many stops as needed by clicking Add stop. Each stop has a color and a percentage position (0% = start, 100% = end). The positions do not need to be evenly spaced — placing two stops at the same percentage creates a hard edge rather than a smooth transition. Example: linear-gradient(90deg, red 0%, red 50%, blue 50%, blue 100%) creates a hard split halfway.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use gradients as text colors in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — combine background: linear-gradient(...) with background-clip: text and color: transparent on the element. This clips the gradient to the text shape, making the text itself render the gradient colors. Note that -webkit-background-clip is still needed for Safari compatibility alongside the standard background-clip property.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a gradient repeat across the background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use repeating-linear-gradient or repeating-radial-gradient instead of the standard versions. Specify the total size of one repetition by setting the last color stop position: repeating-linear-gradient(45deg, #6366f1 0px, #6366f1 10px, transparent 10px, transparent 20px) creates diagonal stripes repeating every 20px. This technique is used for stripe patterns, hazard tape effects, and loading indicators.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my gradient look different in Safari compared to Chrome?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safari uses a slightly different colour interpolation method for CSS gradients, which can cause mid-gradient hues to appear different — particularly for gradients passing through hues on opposite sides of the color wheel (e.g. blue to red). For production, always test gradients in Safari explicitly and consider adjusting mid-stop colors if the difference is visually significant.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the CSS Gradient Generator",
  description: "Step-by-step guide to using the free CSS Gradient Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free CSS Gradient Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The CSS Gradient Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function GradientGeneratorPage() {
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
            <a href="/" className="hover:text-fuchsia-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/design"
              className="hover:text-fuchsia-600 transition-colors"
            >
              Design Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Gradient Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-fuchsia-600 uppercase tracking-widest mb-1">
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          CSS Gradient Generator — Linear, Radial & Conic Gradient Tool
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Create beautiful CSS gradients visually — pick colors, set direction,
          copy the CSS. Linear, radial, and conic supported.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="CSS Gradient Generator tool">
          <GradientGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="gradient-generator"
          toolName="CSS Gradient Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
