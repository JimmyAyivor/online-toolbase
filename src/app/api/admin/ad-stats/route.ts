// src/app/api/admin/ad-stats/route.ts
//
// Returns click statistics for all sponsored ads.
// Protected by ADMIN_SECRET env var — call with:
//   GET /api/admin/ad-stats?secret=YOUR_ADMIN_SECRET
//   GET /api/admin/ad-stats?secret=YOUR_ADMIN_SECRET&days=7
//

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { SPONSORED_ADS } from "@/ads/ad-config";

export async function GET(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = parseInt(req.nextUrl.searchParams.get("days") ?? "30", 10);

  // ── Total clicks per ad ──────────────────────────────────────────────────────
  const clicksResult = await query<{ ad_key: string; clicks: string }>(
    `select ad_key, count(*) as clicks
     from sponsored_ad_clicks
     where created_at > now() - interval '${days} days'
     group by ad_key
     order by clicks desc`
  );

  // ── Top tool pages per ad ────────────────────────────────────────────────────
  const topToolsResult = await query<{ ad_key: string; tool_slug: string; clicks: string }>(
    `select ad_key, tool_slug, count(*) as clicks
     from sponsored_ad_clicks
     where created_at > now() - interval '${days} days'
       and tool_slug != ''
     group by ad_key, tool_slug
     order by ad_key, clicks desc`
  );

  // ── Daily clicks (last 7 days for sparkline) ─────────────────────────────────
  const dailyResult = await query<{ day: string; ad_key: string; clicks: string }>(
    `select date_trunc('day', created_at)::date::text as day,
            ad_key,
            count(*) as clicks
     from sponsored_ad_clicks
     where created_at > now() - interval '7 days'
     group by day, ad_key
     order by day desc, clicks desc`
  );

  // ── Merge with config ────────────────────────────────────────────────────────
  const clickMap: Record<string, number> = {};
  for (const row of clicksResult) {
    clickMap[row.ad_key] = parseInt(row.clicks, 10);
  }

  const topToolsMap: Record<string, { tool: string; clicks: number }[]> = {};
  for (const row of topToolsResult) {
    if (!topToolsMap[row.ad_key]) topToolsMap[row.ad_key] = [];
    if (topToolsMap[row.ad_key].length < 5) {
      topToolsMap[row.ad_key].push({ tool: row.tool_slug, clicks: parseInt(row.clicks, 10) });
    }
  }

  const stats = Object.values(SPONSORED_ADS).map(ad => ({
    key:        ad.key,
    brandName:  ad.brandName,
    active:     ad.active,
    categories: ad.categories,
    clicks:     clickMap[ad.key] ?? 0,
    topTools:   topToolsMap[ad.key] ?? [],
  }));

  return NextResponse.json({
    period_days: days,
    total_clicks: Object.values(clickMap).reduce((a, b) => a + b, 0),
    ads: stats.sort((a, b) => b.clicks - a.clicks),
    daily: dailyResult,
  });
}