// src/app/go/route.ts
import { NextResponse } from "next/server";
import { affiliateOffers } from "@/affiliate/affiliate-map";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const offerKey = searchParams.get("offer");
  const tool = searchParams.get("tool");

  const offer = affiliateOffers[offerKey || ""];

  if (!offer) {
    return NextResponse.redirect("/");
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const userAgent = req.headers.get("user-agent") ?? "";
  const referrer = req.headers.get("referer") ?? "";

  // Non-blocking insert — redirect happens immediately regardless
  query(
    `insert into affiliate_clicks (tool_slug, offer_key, ip, user_agent, referrer)
     values ($1, $2, $3, $4, $5)`,
    [tool, offerKey, ip, userAgent, referrer],
  ).catch((err) => {
    console.error("[affiliate_clicks] insert failed:", err);
  });

  return NextResponse.redirect(offer.url);
}