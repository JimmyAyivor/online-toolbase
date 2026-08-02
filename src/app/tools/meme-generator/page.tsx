// src/app/tools/meme-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const MemeGeneratorClient = dynamic(
  () => import("./MemeGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "meme-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Free Meme Generator — Add Text to Any Image Online",
  description:
    "Create custom memes in your browser — upload any image or choose a classic template, add top and bottom text with custom font size and colour, and download. All processing is local, no upload required. Free, no signup.",
  keywords:
    "meme generator, meme maker, create meme online, add text to image, meme template, custom meme, free meme generator, online meme creator, impact font meme",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/meme-generator` },
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
    url: `${SITE_URL}/tools/meme-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Meme Generator — Add Text to Any Image Online",
    description:
      "Upload any image or pick a classic template, add top and bottom text, customise font size and colour, download your meme. Runs in your browser. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Meme Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Meme Generator — Add Text to Any Image Online",
    description:
      "Upload any image or pick a classic template, add text, and download. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meme Generator",
  description:
    "Create custom memes in the browser — upload your own image or choose from classic meme templates, add top and bottom text with adjustable font size, font colour, and stroke width, preview in real time on the canvas, and download as a PNG. No server upload required.",
  url: `${SITE_URL}/tools/meme-generator`,
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
      name: "Fun Tools",
      item: `${SITE_URL}/tools/category/fun`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Meme Generator",
      item: `${SITE_URL}/tools/meme-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does this tool upload my images to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — all meme creation happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device: they are not uploaded to any server, stored in a database, or transmitted over the internet. The tool reads your image locally, draws it onto a canvas element, overlays the text, and generates a downloadable PNG — entirely within your browser tab. This means the tool is completely private, works offline once loaded, and there are no file size limits beyond your device's available memory.",
      },
    },
    {
      "@type": "Question",
      name: "What is the classic 'Impact font with white text and black outline' meme style?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The iconic meme text style originated in the early internet era (2000s–2010s) and became the defining visual language of image macros. It uses Impact, a heavy condensed sans-serif typeface designed specifically to take up a lot of visual space while remaining legible. The text is set in white with a thick black stroke outline, which makes it readable over any background — light or dark. This style is associated with classic memes like Lolcat ('I can has cheezburger'), Advice Animals, and the Rage Comics era...",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good meme text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effective meme text is short, punchy, and immediately understandable — the joke or observation should land in under two seconds. Most successful meme captions are 1–8 words per line at most. The classic structure is a setup on top and a punchline on the bottom, though many modern memes use only bottom text or break from this format entirely. Good meme text relates directly to the image in an unexpected, subverted, or relatable way. Avoid overly wordy explanations: if you have to explain the joke, it usually doesn't work as a meme...",
      },
    },
    {
      "@type": "Question",
      name: "What image formats work best for memes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For creating memes, the input image format matters less than the output. JPG and PNG are both fine inputs. The meme generator outputs PNG, which is generally preferable for sharing text-heavy images because PNG uses lossless compression that preserves sharp edges on text without the blurry artefacts that JPEG compression can introduce around high-contrast areas. When sharing memes, most social platforms will re-compress the image anyway — but starting with a high-quality input and PNG output gives the best result...",
      },
    },
    {
      "@type": "Question",
      name: "What are the most popular classic meme templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Classic meme templates that remain widely recognised include: Drake Hotline Bling (disapproving vs approving two-panel), Distracted Boyfriend (looking away from girlfriend), Two Buttons (person sweating over a choice), This Is Fine (dog in burning room), Expanding Brain (increasingly absurd tiers of intelligence), Change My Mind (Steven Crowder at a table), Surprised Pikachu (wide-eyed shock reaction), Epic Handshake (two hands clasping over a shared trait), and Woman Yelling at Cat...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use memes I create here commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The meme text you write and overlay is your own creation. However, the underlying image may be subject to copyright. If you upload your own original photo, you can use the resulting meme however you like. If you use a template image you found online, the underlying photo or artwork may be owned by someone else — using it commercially (for advertising, products, or monetised content) could infringe copyright. Most internet meme templates are widely shared with an implicit permissive culture for non-commercial personal sharing, but this does not constitute a legal licence...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Meme Generator",
  description: "Step-by-step guide to using the free Meme Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Meme Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Meme Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function MemeGeneratorPage() {
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
            <a href="/" className="hover:text-yellow-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/fun"
              className="hover:text-yellow-600 transition-colors"
            >
              Fun Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Meme Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-1">
          Free Fun Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Meme Generator — Add Text to Any Image, Free Online Meme Maker
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Upload any image or pick a classic template, add top and bottom text,
          customise font size and colour, and download your meme. Runs entirely
          in your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Meme Generator tool">
          <MemeGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="meme-generator" toolName="Meme Generator" />
      </SidebarAdLayout>
    </>
  );
}
