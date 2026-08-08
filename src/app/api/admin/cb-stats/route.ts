// src/app/api/admin/cb-stats/route.ts
//
// Returns ClickBank click statistics for all products.
//
// Usage:
//   GET /api/admin/cb-stats?secret=YOUR_SECRET
//   GET /api/admin/cb-stats?secret=YOUR_SECRET&days=7&key=customKeto

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { CLICKBANK_PRODUCTS } from "@/ads/clickbank-config";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = parseInt(req.nextUrl.searchParams.get("days") ?? "30", 10);
  const filterKey = req.nextUrl.searchParams.get("key");

  // Total clicks per product
  const clickRows = await query<{ product_key: string; clicks: string }>(
    `select product_key, count(*) as clicks
     from clickbank_clicks
     where created_at > now() - interval '${days} days'
     ${filterKey ? `and product_key = '${filterKey}'` : ""}
     group by product_key
     order by clicks desc`,
  );

  // Top tool pages per product
  const toolRows = await query<{
    product_key: string;
    tool_slug: string;
    clicks: string;
  }>(
    `select product_key, tool_slug, count(*) as clicks
     from clickbank_clicks
     where created_at > now() - interval '${days} days'
       and tool_slug != ''
     group by product_key, tool_slug
     order by product_key, clicks desc`,
  );

  // Daily trend (last 14 days)
  const dailyRows = await query<{
    day: string;
    product_key: string;
    clicks: string;
  }>(
    `select date_trunc('day', created_at)::date::text as day,
            product_key,
            count(*) as clicks
     from clickbank_clicks
     where created_at > now() - interval '14 days'
     group by day, product_key
     order by day desc, clicks desc`,
  );

  const clickMap: Record<string, number> = {};
  for (const r of clickRows) clickMap[r.product_key] = parseInt(r.clicks, 10);

  const toolMap: Record<string, { tool: string; clicks: number }[]> = {};
  for (const r of toolRows) {
    if (!toolMap[r.product_key]) toolMap[r.product_key] = [];
    if (toolMap[r.product_key].length < 5) {
      toolMap[r.product_key].push({
        tool: r.tool_slug,
        clicks: parseInt(r.clicks, 10),
      });
    }
  }

  const products = Object.values(CLICKBANK_PRODUCTS).map((p) => ({
    key: p.key,
    name: p.name,
    categories: p.categories,
    commissionPct: p.avgCommission,
    active: p.active,
    clicks: clickMap[p.key] ?? 0,
    topTools: toolMap[p.key] ?? [],
  }));

  return NextResponse.json({
    period_days: days,
    total_clicks: Object.values(clickMap).reduce((a, b) => a + b, 0),
    affiliate_id: process.env.CLICKBANK_AFFILIATE_ID ?? "(not set)",
    products: products.sort((a, b) => b.clicks - a.clicks),
    daily: dailyRows,
  });
}
