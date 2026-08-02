// src/app/tools/instagram-post-planner/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const InstagramPostPlannerClient = dynamic(
  () => import("./InstagramPostPlannerClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "instagram-post-planner");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title:
    "Free Instagram Post Planner — Captions & Hashtags",
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
      "Free Instagram Post Planner — Captions & Hashtags",
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
      "Free Instagram Post Planner — Captions & Hashtags",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a content calendar and why do creators use one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A content calendar (also called a content plan or editorial calendar) is a scheduled plan of what content to create and publish, and when. For Instagram creators and brands, it serves several purposes. Consistency: The Instagram algorithm rewards accounts that post regularly — a plan ensures you never miss a posting day or run dry on content ideas. Quality: Planning ahead lets you shoot, edit, and write captions thoughtfully rather than rushing a post together at the last minute...",
      },
    },
    {
      "@type": "Question",
      name: "What are the best times to post on Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best posting time varies significantly by audience, niche, and time zone. General research suggests that weekdays between 9 AM and 11 AM in your audience's local time tend to perform well for reach, with Tuesday, Wednesday, and Thursday being the strongest days. Evening slots around 7–9 PM also see good engagement as people browse before bed. However, these are averages across all accounts — your own audience's behaviour is what matters most...",
      },
    },
    {
      "@type": "Question",
      name: "How many hashtags should I use on Instagram posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instagram officially recommends using 3–5 highly relevant hashtags per post, a significant shift from the earlier advice of using 20–30 hashtags. The algorithm change in 2021–2022 moved away from volume-based hashtag reach toward topic-based content distribution — Instagram now uses the post content itself (image analysis and caption text) to determine who to show it to, with hashtags playing a supporting role. Relevance matters more than quantity: using 5 highly specific hashtags that precisely describe your content outperforms 30 generic hashtags...",
      },
    },
    {
      "@type": "Question",
      name: "What is the ideal caption length for Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caption length depends on your content type and strategy. Instagram truncates captions after the first 125 characters with a 'more' tap required to expand, so your hook — the opening line — is critical. Short captions (under 125 characters) work well for visually self-explanatory content, quotes, product shots, and entertainment posts where the image does the heavy lifting. Medium captions (125–300 characters) are versatile and suit most use cases...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Instagram Reels and regular video posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instagram Reels are short-form vertical videos (up to 90 seconds) that are shown in the Reels feed, the Explore tab, and can be shared to your main feed. Reels receive priority distribution from Instagram's algorithm — they are more likely to be shown to non-followers, making them the highest organic reach format on the platform. The Reels format uses a full-screen 9:16 aspect ratio (1080×1920 px). Regular feed videos (now called Instagram Videos) are also shown in the main feed and on your profile grid but do not get the same algorithmic push to non-followers...",
      },
    },
    {
      "@type": "Question",
      name: "How do I plan an Instagram content strategy for a new account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Building a strategy from scratch involves a few key decisions. First, define your niche and content pillars — 3–5 core topics you'll consistently post about. This gives your account a clear identity and makes it easier for Instagram's algorithm to categorise and recommend your content to relevant audiences. Second, choose your content mix: most successful accounts use a rough formula like 40% educational/informational, 30% entertaining, 20% promotional, and 10% personal/behind-the-scenes...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Instagram Post Planner",
  description: "Step-by-step guide to using the free Instagram Post Planner on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Instagram Post Planner on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Instagram Post Planner provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function InstagramPostPlannerPage() {
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
              href="/tools/category/social-media"
              className="hover:text-pink-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Instagram Post Planner
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Instagram Post Planner — Plan Captions, Hashtags &amp; Post Schedule
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Plan Instagram posts with captions, hashtags, post type, status, and
          scheduled date — visual content grid or list view, CSV export.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Instagram Post Planner tool">
          <InstagramPostPlannerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="instagram-post-planner"
          toolName="Instagram Post Planner"
        />
      </SidebarAdLayout>
    </>
  );
}
