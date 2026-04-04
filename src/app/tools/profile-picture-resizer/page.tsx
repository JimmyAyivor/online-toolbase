// src/app/tools/profile-picture-resizer/page.tsx
import type { Metadata } from "next";
import ProfilePictureResizerClient from "./ProfilePictureResizerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Profile Picture Resizer — Resize Profile Photos for Every Social Platform Free",
  description: "Resize and centre-crop profile pictures for Instagram, Facebook, Twitter/X, LinkedIn, YouTube, TikTok, Discord, WhatsApp, Slack, and GitHub. Download as PNG. Runs in your browser — nothing uploaded. Free, no signup.",
  keywords: "profile picture resizer, profile photo resize, instagram profile picture size, linkedin photo size, twitter profile picture, facebook profile photo, resize profile image, square crop, social media photo tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/profile-picture-resizer` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/profile-picture-resizer`, siteName: SITE_NAME, locale: "en_US", title: "Profile Picture Resizer — Resize Profile Photos for Every Social Platform Free", description: "Resize profile pictures for Instagram, LinkedIn, Twitter/X, YouTube, TikTok, Discord, and more. Auto-crops to square. Download as PNG. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Profile Picture Resizer" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Profile Picture Resizer — Resize Profile Photos for Every Social Platform Free", description: "Resize profile photos for 10 platforms. Auto-crops to square. Download PNG. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Profile Picture Resizer", description: "Resizes and centre-crops uploaded images to the correct square pixel dimensions for 10 social media platforms: Instagram (110px), Facebook (170px), Twitter/X (400px), LinkedIn (400px), YouTube (800px), TikTok (200px), Discord (128px), WhatsApp (192px), Slack (512px), and GitHub (460px). Processing uses the Canvas API in the browser — no upload occurs. Output is downloadable as a PNG.", url: `${SITE_URL}/tools/profile-picture-resizer`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${SITE_URL}/tools/category/image` }, { "@type": "ListItem", position: 3, name: "Profile Picture Resizer", item: `${SITE_URL}/tools/profile-picture-resizer` }] };

export default function ProfilePictureResizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-pink-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/image" className="hover:text-pink-600 transition-colors">Image Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Profile Picture Resizer</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">Free Image Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Profile Picture Resizer — Resize Profile Photos for Every Social Platform Free</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Resize and centre-crop profile photos for Instagram, LinkedIn, Twitter/X, YouTube, TikTok, Discord, and more — all in your browser.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Profile Picture Resizer tool"><ProfilePictureResizerClient /></main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}