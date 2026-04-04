import { NextResponse } from "next/server";
import { affiliateOffers } from "@/affiliate/affiliate-map";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const offerKey = searchParams.get("offer");
  const tool = searchParams.get("tool");

  const offer = affiliateOffers[offerKey || ""];

  if (!offer) {
    return NextResponse.redirect("/");
  }

  const supabase = createServerSupabase();

  // Extract request metadata
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || "";
  const referrer = req.headers.get("referer") || "";

  // 🔥 Insert click (non-blocking safe)
  await supabase.from("affiliate_clicks").insert([
    {
      tool_slug: tool,
      offer_key: offerKey,
      ip,
      user_agent: userAgent,
      referrer,
    },
  ]);

  return NextResponse.redirect(offer.url);
}