// src/app/api/cb-click/route.ts
//
// Tracks ClickBank affiliate clicks and redirects to the hoplink.
//
// Called by ClickBankOffer component:
//   /api/cb-click?key=customKeto&tool=bmi-calculator
//
// Flow:
//   1. Validate product key
//   2. Log click to DB (non-blocking)
//   3. Redirect to hoplink with tool slug as tid tracking param

import { NextRequest, NextResponse } from "next/server";
import { CLICKBANK_PRODUCTS, buildHopLink } from "@/ads/clickbank-config";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const key = searchParams.get("key") ?? "";
  const toolSlug = searchParams.get("tool") ?? "";

  const product = CLICKBANK_PRODUCTS[key];

  if (!product || !product.active) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const affiliateId = process.env.CLICKBANK_AFFILIATE_ID ?? "";

  if (!affiliateId) {
    // No affiliate ID set — redirect to vendor homepage without hoplink
    // so you don't lose the click entirely during setup
    console.warn("[cb-click] CLICKBANK_AFFILIATE_ID not set in .env");
    return NextResponse.redirect(
      `https://hop.clickbank.net/?affiliate=otbase&vendor=GENIUSBR&tid=grammar-spell-checker`,
      { status: 302 },
    );
  }

  const hopLink = buildHopLink(product.vendorId, affiliateId, toolSlug);

  // Log click non-blocking
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const userAgent = req.headers.get("user-agent") ?? "";

  query(
    `insert into clickbank_clicks (product_key, vendor_id, tool_slug, ip, user_agent)
     values ($1, $2, $3, $4, $5)`,
    [key, product.vendorId, toolSlug, ip, userAgent],
  ).catch(() => {});

  return NextResponse.redirect(hopLink, { status: 302 });
}
