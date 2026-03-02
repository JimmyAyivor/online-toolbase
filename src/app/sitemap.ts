// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/app/blog/blog-posts";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com").replace(/\/$/, "");
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

// ─── Static pages ─────────────────────────────────────────────────────────────
const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url:             `${BASE_URL}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        1.0,
  },
  {
    url:             `${BASE_URL}/tools`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.9,
  },
  {
    url:             `${BASE_URL}/blog`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.8,
  },
  // ── Legal / policy pages ──────────────────────────────────────────────────
  {
    url:             `${BASE_URL}/privacy-policy`,
    lastModified:    new Date(),
    changeFrequency: "yearly" as const,
    priority:        0.4,
  },
  {
    url:             `${BASE_URL}/terms-of-service`,
    lastModified:    new Date(),
    changeFrequency: "yearly" as const,
    priority:        0.4,
  },
  {
    url:             `${BASE_URL}/disclaimer`,
    lastModified:    new Date(),
    changeFrequency: "yearly" as const,
    priority:        0.4,
  },
  {
    url:             `${BASE_URL}/contact`,
    lastModified:    new Date(),
    changeFrequency: "monthly" as const,
    priority:        0.5,
  },
];

// ─── New social media tools ───────────────────────────────────────────────────
// Tools built but not yet registered in @/lib/tools.
// Remove slugs from here once added to the tools library.
const UNREGISTERED_TOOL_SLUGS: string[] = [];

// ─── Sitemap export ───────────────────────────────────────────────────────────
export default function sitemap(): MetadataRoute.Sitemap {
  // All tools registered in @/lib/tools
  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url:             `${BASE_URL}/tools/${tool.slug}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.8,
  }));

  // Category index pages (e.g. /tools/category/calculator)
  const categoryUrls: MetadataRoute.Sitemap = Array.from(
    new Set(tools.map((tool) => tool.category.toLowerCase())),
  ).map((category) => ({
    url:             `${BASE_URL}/tools/category/${category.replace(/\s+/g, "-")}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.7,
  }));

  // Unregistered tools — temporary until added to lib
  const unregisteredUrls: MetadataRoute.Sitemap = UNREGISTERED_TOOL_SLUGS.map(
    (slug) => ({
      url:             `${BASE_URL}/tools/${slug}`,
      lastModified:    new Date(),
      changeFrequency: "weekly" as const,
      priority:        0.8,
    }),
  );

  // Blog posts — pulled from blog-posts.ts registry automatically
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url:             `${BASE_URL}/blog/${post.slug}`,
    lastModified:    new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority:        0.7,
  }));

  return [
    ...STATIC_PAGES,
    ...toolUrls,
    ...unregisteredUrls,
    ...categoryUrls,
    ...blogUrls,
  ];
}