// src/lib/abuse.ts
// Abuse prevention utilities for tool engagement routes.
// No external dependencies — everything runs against the existing Postgres pool.

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// ─── Config ───────────────────────────────────────────────────────────────────

export const ABUSE_CONFIG = {
  // How many submissions (reviews OR comments) allowed per IP per window
  rateLimitMax: 5,
  rateLimitWindowMinutes: 60,

  // Max one review per tool per IP (reviews only)
  oneReviewPerToolPerIp: true,

  // Max one helpful vote per review per IP
  oneHelpfulPerReviewPerIp: true,

  // Minimum word count for review body (if provided)
  reviewBodyMinWords: 3,

  // Block if the same body text was submitted recently (exact duplicate)
  blockDuplicateContent: true,
} as const;

// ─── IP extraction ────────────────────────────────────────────────────────────
// Handles proxies (Cloudflare, Vercel, Nginx) correctly.

export function getIp(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ?? // Cloudflare
    req.headers.get("x-real-ip") ?? // Nginx proxy
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

// ─── Rate limiter ─────────────────────────────────────────────────────────────
// Checks both tables combined — 5 submissions of any kind per hour per IP.

export async function isRateLimited(ip: string): Promise<boolean> {
  if (ip === "unknown") return false; // can't rate-limit without an IP

  const windowStart = new Date(
    Date.now() - ABUSE_CONFIG.rateLimitWindowMinutes * 60 * 1000,
  ).toISOString();

  const rows = await query<{ total: string }>(
    `select (
       (select count(*) from tool_reviews  where ip_address = $1 and created_at > $2) +
       (select count(*) from tool_comments where ip_address = $1 and created_at > $2)
     )::text as total`,
    [ip, windowStart],
  );

  const total = parseInt(rows[0]?.total ?? "0", 10);
  return total >= ABUSE_CONFIG.rateLimitMax;
}

// ─── Duplicate review check ───────────────────────────────────────────────────
// Prevents the same IP from reviewing the same tool twice.

export async function hasAlreadyReviewed(
  ip: string,
  toolSlug: string,
): Promise<boolean> {
  if (!ABUSE_CONFIG.oneReviewPerToolPerIp) return false;

  const rows = await query<{ exists: boolean }>(
    `select exists(
       select 1 from tool_reviews
       where ip_address = $1 and tool_slug = $2
     ) as exists`,
    [ip, toolSlug],
  );

  return rows[0]?.exists === true;
}

// ─── Duplicate helpful vote check ─────────────────────────────────────────────

export async function hasAlreadyVotedHelpful(
  ip: string,
  reviewId: string,
): Promise<boolean> {
  if (!ABUSE_CONFIG.oneHelpfulPerReviewPerIp) return false;

  const rows = await query<{ exists: boolean }>(
    `select exists(
       select 1 from tool_helpful_votes
       where ip_address = $1 and review_id = $2
     ) as exists`,
    [ip, reviewId],
  );

  return rows[0]?.exists === true;
}

export async function recordHelpfulVote(
  ip: string,
  reviewId: string,
): Promise<void> {
  await query(
    `insert into tool_helpful_votes (ip_address, review_id)
     values ($1, $2)
     on conflict do nothing`,
    [ip, reviewId],
  );
}

// ─── Duplicate content check ──────────────────────────────────────────────────
// Blocks identical body text submitted in the last 24 hours.

export async function isDuplicateContent(
  body: string,
  table: "tool_reviews" | "tool_comments",
): Promise<boolean> {
  if (!ABUSE_CONFIG.blockDuplicateContent || body.trim().length === 0)
    return false;

  const rows = await query<{ exists: boolean }>(
    `select exists(
       select 1 from ${table}
       where lower(trim(body)) = lower(trim($1))
         and created_at > now() - interval '24 hours'
     ) as exists`,
    [body],
  );

  return rows[0]?.exists === true;
}

// ─── Basic spam heuristics ────────────────────────────────────────────────────

const SPAM_PATTERNS = [
  /https?:\/\//i, // URLs in short content
  /\b(casino|viagra|crypto|nft|click here|buy now|free money)\b/i,
  /(.)\1{6,}/, // same character 7+ times in a row e.g. "aaaaaaa"
];

export function looksLikeSpam(text: string): boolean {
  if (text.trim().length === 0) return false;
  const wordCount = text.trim().split(/\s+/).length;
  for (const pattern of SPAM_PATTERNS) {
    // Only flag URLs if the content is short (legitimate reviews may include URLs)
    if (pattern.source.startsWith("https") && wordCount > 20) continue;
    if (pattern.test(text)) return true;
  }
  return false;
}

// ─── Honeypot validator ───────────────────────────────────────────────────────
// The client sends a `_hp` field that must be empty.
// Bots that fill in all fields will be caught here.

export function honeypotTripped(hp: unknown): boolean {
  return typeof hp === "string" && hp.trim().length > 0;
}

// ─── Shared rate-limit response ───────────────────────────────────────────────

export function tooManyRequests() {
  return NextResponse.json(
    { error: "Too many submissions. Please wait a while before trying again." },
    { status: 429 },
  );
}

export function forbidden(reason = "Submission rejected.") {
  return NextResponse.json({ error: reason }, { status: 403 });
}
