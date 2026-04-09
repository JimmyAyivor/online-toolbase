// src/app/api/tool-engagement/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  getIp,
  isRateLimited,
  isDuplicateContent,
  looksLikeSpam,
  honeypotTripped,
  tooManyRequests,
  forbidden,
} from "@/lib/abuse";

const PAGE_SIZE = 5;
const MAX_NAME = 50;
const MAX_BODY = 500;

// ── GET /api/tool-engagement/comments?slug=...&page=0 ────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));

  if (!slug)
    return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const offset = page * PAGE_SIZE;

  const comments = await query<{
    id: string;
    name: string;
    body: string;
    created_at: string;
  }>(
    `select id, name, body, created_at
     from tool_comments
     where tool_slug = $1
     order by created_at desc
     limit $2 offset $3`,
    [slug, PAGE_SIZE + 1, offset],
  );

  const hasMore = comments.length > PAGE_SIZE;
  if (hasMore) comments.pop();

  return NextResponse.json({ comments, hasMore });
}

// ── POST /api/tool-engagement/comments ───────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { slug, name, commentBody, _hp } = body as {
    slug?: string;
    name?: string;
    commentBody?: string;
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
  if (
    !commentBody ||
    typeof commentBody !== "string" ||
    commentBody.trim().length < 3
  )
    return NextResponse.json(
      { error: "Comment is too short." },
      { status: 422 },
    );

  const cleanBody = commentBody.trim().slice(0, MAX_BODY);

  // Abuse checks
  if (looksLikeSpam(name) || looksLikeSpam(cleanBody))
    return forbidden("Your submission was flagged as spam.");
  if (await isRateLimited(ip)) return tooManyRequests();
  if (await isDuplicateContent(cleanBody, "tool_comments"))
    return forbidden("This comment has already been submitted.");

  await query(
    `insert into tool_comments (tool_slug, name, body, ip_address)
     values ($1, $2, $3, $4)`,
    [slug, name.trim().slice(0, MAX_NAME), cleanBody, ip],
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
