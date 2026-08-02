// src/app/sitemap-visual/page.tsx
// SERVER COMPONENT — reads tools.ts at build time, passes data to client.
// Zero hardcoded tool data. Automatically stays in sync with tools.ts.

import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import SitemapClient from "./SitemapClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";

export const metadata: Metadata = {
  title: "Visual Sitemap — Calculators, Pdf Tools & More",
  description: `Interactive visual sitemap of all ${tools.length} Calculators, Pdf Tools & More across ${new Set(tools.map((t) => t.category)).size} categories.`,
  alternates: { canonical: `${SITE_URL}/site-map` },
  robots: { index: true, follow: true },
};

// ── Category display config (icon + colour only — everything else from tools.ts) ──

export const CATEGORY_CONFIG: Record<string, { icon: string; color: string }> =
  {
    Developer: { icon: "💻", color: "#6366F1" },
    Writing: { icon: "✍️", color: "#8B5CF6" },
    Calculator: { icon: "🔢", color: "#06B6D4" },
    Health: { icon: "❤️", color: "#10B981" },
    "Social Media": { icon: "📱", color: "#F59E0B" },
    Finance: { icon: "💰", color: "#3B82F6" },
    Image: { icon: "🖼️", color: "#EC4899" },
    Productivity: { icon: "⏱️", color: "#14B8A6" },
    Fun: { icon: "🎲", color: "#F97316" },
    Design: { icon: "🎨", color: "#A855F7" },
    Marketing: { icon: "📣", color: "#EF4444" },
    Business: { icon: "💼", color: "#84CC16" },
    Security: { icon: "🔒", color: "#F43F5E" },
    Document: { icon: "📄", color: "#64748B" },
    Education: { icon: "🎓", color: "#0EA5E9" },
    Analytics: { icon: "📊", color: "#D946EF" },
  };

// ── Shape the data server-side so the client gets clean props ──────────────

export type CategoryData = {
  id: string;
  label: string;
  icon: string;
  color: string;
  tools: { slug: string; name: string; description: string }[];
};

export default function SitemapPage() {
  // Group tools by category — preserves tools.ts order within each group
  const categoryMap = new Map<string, CategoryData>();

  for (const tool of tools) {
    if (!categoryMap.has(tool.category)) {
      const cfg = CATEGORY_CONFIG[tool.category] ?? {
        icon: "🔧",
        color: "#6366F1",
      };
      categoryMap.set(tool.category, {
        id: tool.category,
        label: tool.category,
        icon: cfg.icon,
        color: cfg.color,
        tools: [],
      });
    }
    categoryMap.get(tool.category)!.tools.push({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
    });
  }

  // Sort categories by tool count descending so biggest categories come first
  const categories = Array.from(categoryMap.values()).sort(
    (a, b) => b.tools.length - a.tools.length,
  );

  return (
    <SitemapClient
      categories={categories}
      totalTools={tools.length}
      siteUrl={SITE_URL}
    />
  );
}
