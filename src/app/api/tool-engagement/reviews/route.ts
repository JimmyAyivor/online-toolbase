// src/app/api/tool-engagement/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  getIp,
  isRateLimited,
  hasAlreadyReviewed,
  isDuplicateContent,
  looksLikeSpam,
  honeypotTripped,
  tooManyRequests,
  forbidden,
} from "@/lib/abuse";

const PAGE_SIZE = 5;
const MAX_NAME = 50;
const MAX_BODY = 1000;

// ── GET /api/tool-engagement/reviews?slug=...&page=0 ─────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));

  if (!slug)
    return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const offset = page * PAGE_SIZE;

  const [reviews, summaryRows] = await Promise.all([
    query<{
      id: string;
      name: string;
      rating: number;
      body: string;
      helpful: number;
      created_at: string;
    }>(
      `select id, name, rating, body, helpful, created_at
       from tool_reviews
       where tool_slug = $1
       order by created_at desc
       limit $2 offset $3`,
      [slug, PAGE_SIZE + 1, offset],
    ),
    query<{ total: string; avg_rating: string; dist: Record<string, string> }>(
      `select
         count(*)::text                                                   as total,
         coalesce(avg(rating), 0)::text                                  as avg_rating,
         jsonb_object_agg(rating, cnt) filter (where rating is not null) as dist
       from (
         select rating, count(*) as cnt
         from tool_reviews
         where tool_slug = $1
         group by rating
       ) t`,
      [slug],
    ),
  ]);

  const hasMore = reviews.length > PAGE_SIZE;
  if (hasMore) reviews.pop();

  const raw = summaryRows[0];
  const distMap: Record<string, string> = raw?.dist ?? {};
  const distribution = [1, 2, 3, 4, 5].map((s) =>
    parseInt(distMap[String(s)] ?? "0", 10),
  );

  return NextResponse.json({
    reviews,
    hasMore,
    summary: {
      total: parseInt(raw?.total ?? "0", 10),
      average: parseFloat(parseFloat(raw?.avg_rating ?? "0").toFixed(2)),
      distribution,
    },
  });
}

// ── POST /api/tool-engagement/reviews ────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { slug, name, rating, reviewBody, _hp } = body as {
    slug?: string;
    name?: string;
    rating?: number;
    reviewBody?: string;
    _hp?: string;
  };

  // Honeypot — silently succeed to fool bots
  if (honeypotTripped(_hp))
    return NextResponse.json({ ok: true }, { status: 201 });

  // Input validation
  if (!slug || typeof slug !== "string")
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  if (!name || typeof name !== "string" || !name.trim())
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  if (!rating || rating < 1 || rating > 5)
    return NextResponse.json({ error: "rating must be 1–5" }, { status: 400 });

  const cleanBody =
    typeof reviewBody === "string" ? reviewBody.trim().slice(0, MAX_BODY) : "";
  if (cleanBody.length > 0 && cleanBody.length < 10)
    return NextResponse.json(
      { error: "Review must be at least 10 characters, or leave it blank." },
      { status: 422 },
    );

  // Abuse checks
  if (looksLikeSpam(name) || looksLikeSpam(cleanBody))
    return forbidden("Your submission was flagged as spam.");
  if (await isRateLimited(ip)) return tooManyRequests();
  if (await hasAlreadyReviewed(ip, slug))
    return forbidden("You have already reviewed this tool.");
  if (cleanBody && (await isDuplicateContent(cleanBody, "tool_reviews")))
    return forbidden("This review has already been submitted.");

  await query(
    `insert into tool_reviews (tool_slug, name, rating, body, ip_address)
     values ($1, $2, $3, $4, $5)`,
    [slug, name.trim().slice(0, MAX_NAME), rating, cleanBody, ip],
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
