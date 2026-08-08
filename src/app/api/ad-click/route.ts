// src/app/api/ad-click/route.ts
//
// Tracks sponsored ad clicks and redirects to the destination URL.
//
// Usage in SponsoredAd component:
//   href={`/api/ad-click?key=${ad.key}&tool=${toolSlug}`}
//
// This route:
//   1. Validates the ad key
//   2. Logs the click to Postgres (non-blocking)
//   3. Redirects to the destination URL
//
// SQL table (run once in your Postgres instance):
//   create table sponsored_ad_clicks (
//     id          uuid primary key default gen_random_uuid(),
//     ad_key      text not null,
//     tool_slug   text,
//     ip          text,
//     user_agent  text,
//     referrer    text,
//     created_at  timestamptz not null default now()
//   );
//   create index on sponsored_ad_clicks (ad_key, created_at desc);
//   create index on sponsored_ad_clicks (tool_slug, created_at desc);

import { NextRequest, NextResponse } from "next/server";
import { SPONSORED_ADS } from "@/ads/ad-config";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const key = searchParams.get("key") ?? "";
  const toolSlug = searchParams.get("tool") ?? "";

  const ad = SPONSORED_ADS[key];

  // Unknown or inactive ad — redirect to homepage
  if (!ad || !ad.active) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Log click asynchronously — never block the redirect
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const userAgent = req.headers.get("user-agent") ?? "";
  const referrer = req.headers.get("referer") ?? "";

  query(
    `insert into sponsored_ad_clicks (ad_key, tool_slug, ip, user_agent, referrer)
     values ($1, $2, $3, $4, $5)`,
    [key, toolSlug, ip, userAgent, referrer],
  ).catch(() => {
    /* non-critical — log silently */
  });

  // Redirect to the destination
  return NextResponse.redirect(ad.destinationUrl, { status: 302 });
}
