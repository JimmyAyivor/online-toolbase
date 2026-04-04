import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET reviews
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tool_slug = searchParams.get("tool_slug");

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("tool_slug", tool_slug)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

// POST review
export async function POST(req: Request) {
  const body = await req.json();
  const ip =
    req.headers.get("x-forwarded-for") ||
    "unknown";

  const ipHash = crypto
    .createHash("sha256")
    .update(ip)
    .digest("hex");

  const { error } = await supabase.from("reviews").insert({
    tool_slug: body.tool_slug,
    rating: body.rating,
    comment: body.comment,
    ip_hash: ipHash,
  });

  if (error) {
    return NextResponse.json({ error: "Already reviewed" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}