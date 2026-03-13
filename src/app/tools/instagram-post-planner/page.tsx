// src/app/tools/instagram-post-planner/page.tsx
import type { Metadata } from "next";
import InstagramPostPlannerClient from "./InstagramPostPlannerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Instagram Post Planner — Plan Captions, Hashtags & Post Schedule Free Online",
  description:
    "Plan and organise Instagram posts with captions, hashtags, post type, status, and scheduled date — all in a visual content grid or list view. Export your plan as CSV. Free, no signup, runs in your browser.",
  keywords:
    "instagram post planner, instagram content calendar, instagram caption planner, social media content planner, instagram scheduler, plan instagram posts, content grid instagram, free instagram planner",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/instagram-post-planner` },
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
    url: `${SITE_URL}/tools/instagram-post-planner`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Instagram Post Planner — Plan Captions, Hashtags & Post Schedule Free Online",
    description:
      "Plan Instagram posts with captions, hashtags, post type, status, and scheduled date. Visual content grid, list view, CSV export. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Instagram Post Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Instagram Post Planner — Plan Captions, Hashtags & Post Schedule Free Online",
    description:
      "Plan Instagram captions, hashtags, and post schedules in a visual content grid. CSV export. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Instagram Post Planner",
  description:
    "Plan and organise Instagram posts with captions, hashtags, post type (photo, video, carousel, story, reel), status (idea, draft, scheduled, posted), scheduled date, and colour labels. View as a visual content grid or list. Export the plan as a CSV file. All data is stored in the browser — no account required.",
  url: `${SITE_URL}/tools/instagram-post-planner`,
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
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Instagram Post Planner",
      item: `${SITE_URL}/tools/instagram-post-planner`,
    },
  ],
};

export default function InstagramPostPlannerPage() {
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
            <a href='/' className='hover:text-pink-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/social-media'
              className='hover:text-pink-600 transition-colors'
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Instagram Post Planner
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1'>
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Instagram Post Planner — Plan Captions, Hashtags &amp; Post Schedule
          Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Plan Instagram posts with captions, hashtags, post type, status, and
          scheduled date — visual content grid or list view, CSV export.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Instagram Post Planner tool'>
          <InstagramPostPlannerClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
