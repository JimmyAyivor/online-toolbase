// src/app/tools/profile-picture-resizer/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "profile-picture-resizer");
const ProfilePictureResizerClient = dynamic(
  () => import("./ProfilePictureResizerClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title:
    "Free Profile Picture Resizer — All Social Platforms",
  description:
    "Resize and centre-crop profile pictures for Instagram, Facebook, Twitter/X, LinkedIn, YouTube, TikTok, Discord, WhatsApp, Slack, and GitHub. Download as PNG. Runs in your browser — nothing uploaded. Free, no signup.",
  keywords:
    "profile picture resizer, profile photo resize, instagram profile picture size, linkedin photo size, twitter profile picture, facebook profile photo, resize profile image, square crop, social media photo tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/profile-picture-resizer` },
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
    url: `${SITE_URL}/tools/profile-picture-resizer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Profile Picture Resizer — All Social Platforms",
    description:
      "Resize profile pictures for Instagram, LinkedIn, Twitter/X, YouTube, TikTok, Discord, and more. Auto-crops to square. Download as PNG. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Profile Picture Resizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Profile Picture Resizer — All Social Platforms",
    description:
      "Resize profile photos for 10 platforms. Auto-crops to square. Download PNG. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Profile Picture Resizer",
  description:
    "Resizes and centre-crops uploaded images to the correct square pixel dimensions for 10 social media platforms: Instagram (110px), Facebook (170px), Twitter/X (400px), LinkedIn (400px), YouTube (800px), TikTok (200px), Discord (128px), WhatsApp (192px), Slack (512px), and GitHub (460px). Processing uses the Canvas API in the browser — no upload occurs. Output is downloadable as a PNG.",
  url: `${SITE_URL}/tools/profile-picture-resizer`,
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
      name: "Profile Picture Resizer",
      item: `${SITE_URL}/tools/profile-picture-resizer`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size should my profile picture be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each platform has different recommended profile picture sizes. Instagram displays profile photos at 110×110 pixels but recommends uploading at 320×320 or larger for sharp retina display. Facebook stores photos at 720×720 and displays at 170×170 on desktop. Twitter/X recommends 400×400 pixels. LinkedIn recommends 400×400 pixels with a minimum of 200×200. YouTube recommends 800×800 pixels for channel icons. TikTok displays at 200×200 pixels. Discord recommends 128×128. WhatsApp uses 192×192. Slack recommends 512×512. GitHub uses 460×460 pixels...",
      },
    },
    {
      "@type": "Question",
      name: "Why does my profile picture appear blurry after uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Profile picture blurriness after uploading is almost always caused by one of three things. First, the source image is too small — if you upload a 100×100 pixel image to a platform that displays it at 170×170, it will be upscaled and appear blurry. Always start with a source image at least 800×800 pixels. Second, the image was compressed on upload — some platforms, particularly Facebook and WhatsApp, apply aggressive JPEG compression to uploaded photos, which can reduce sharpness, especially around edges and text...",
      },
    },
    {
      "@type": "Question",
      name: "Should profile pictures be PNG or JPEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG is generally the better choice for profile pictures, particularly for logos, text-based graphics, or illustrations with flat colours and sharp edges. PNG uses lossless compression, which means no quality is lost when saving, and it supports transparent backgrounds (though most platforms replace transparency with a white or platform-specific background colour for profile photos)...",
      },
    },
    {
      "@type": "Question",
      name: "How do I crop a profile picture to a square?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool automatically centre-crops your image to a square when resizing — you don't need to pre-crop it. The tool takes the largest square from the centre of your image (using whichever dimension is shorter as the square size) and then resizes that to the target platform dimensions. For example, if you upload a landscape photo that is 1200×800 pixels, the tool will centre-crop it to an 800×800 square (taking equal amounts from the left and right) before resizing to the platform size...",
      },
    },
    {
      "@type": "Question",
      name: "Is my photo uploaded to a server when I use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — all image processing in this tool happens entirely within your browser using the Canvas API. When you select an image, it is read locally by your browser's FileReader API and stored in browser memory. The resizing is performed by drawing the image onto an HTML Canvas element at the target dimensions. The result is exported back to your browser as a PNG data URL and offered as a download. Your image is never transmitted to any server. This makes the tool safe to use with personal photos, professional headshots, and confidential brand assets.",
      },
    },
    {
      "@type": "Question",
      name: "Why do profile pictures display as circles on most platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most social media platforms display profile photos cropped to a circle using CSS border-radius (a simple CSS property that rounds the corners of a square image into a circle shape). The underlying stored image is always a square — the circular display is purely a presentation layer applied by each platform's interface. This means the corners of your profile photo are hidden behind the circular mask in most views...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Profile Picture Resizer",
  description: "Step-by-step guide to using the free Profile Picture Resizer on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Profile Picture Resizer on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Profile Picture Resizer provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function ProfilePictureResizerPage() {
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
            <a href="/" className="hover:text-pink-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/image"
              className="hover:text-pink-600 transition-colors"
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Profile Picture Resizer
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Profile Picture Resizer — Resize Profile Photos for Every Social
          Platform Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Resize and centre-crop profile photos for Instagram, LinkedIn,
          Twitter/X, YouTube, TikTok, Discord, and more — all in your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Profile Picture Resizer tool">
          <ProfilePictureResizerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="profile-picture-resizer"
          toolName="Profile Picture Resizer"
        />
      </SidebarAdLayout>
    </>
  );
}
