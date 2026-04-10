// src/app/api/subscribe/route.ts
// Server-side Mailchimp subscription handler.
// Keeps the API key off the client and avoids the Mailchimp CORS block.
//
// Required env vars (server-side only — no NEXT_PUBLIC_ prefix):
//   MAILCHIMP_API_KEY=05b221c55a2d3bd1d481f4b7816d42fa-us15
//   MAILCHIMP_SERVER_PREFIX=us15
//   MAILCHIMP_AUDIENCE_ID=6e5b305961

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const API_KEY    = process.env.MAILCHIMP_API_KEY ?? "";
const SERVER     = process.env.MAILCHIMP_SERVER_PREFIX ?? "";
const AUDIENCE   = process.env.MAILCHIMP_AUDIENCE_ID ?? "";

function md5(email: string) {
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  // ── Parse body ─────────────────────────────────────────────────────────────
  const body = await req.json().catch(() => null);
  const email: string = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  // ── Config guard ───────────────────────────────────────────────────────────
  if (!API_KEY || !SERVER || !AUDIENCE) {
    console.error("[subscribe] Mailchimp env vars not set.");
    return NextResponse.json({ error: "Newsletter not configured." }, { status: 500 });
  }

  // ── Upsert member via Mailchimp Marketing API ──────────────────────────────
  // PUT to the member hash endpoint — adds new subscribers and re-subscribes
  // unsubscribed ones without throwing an error for existing members.
  const memberHash = md5(email);
  const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE}/members/${memberHash}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Mailchimp ignores the username — any string works
      Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",   // new subscribers → subscribed (no double opt-in)
      // status left unset so existing members keep their current status
    }),
  });

  const data = await res.json();

  // ── Handle Mailchimp errors ────────────────────────────────────────────────
  if (!res.ok) {
    // Member unsubscribed themselves — don't forcibly re-subscribe
    if (data?.title === "Member In Compliance State") {
      return NextResponse.json(
        { error: "This email has previously unsubscribed. Please contact us to re-subscribe." },
        { status: 400 },
      );
    }

    console.error("[subscribe] Mailchimp error:", data);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}