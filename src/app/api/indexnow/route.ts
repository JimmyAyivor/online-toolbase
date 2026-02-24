// src/app/api/indexnow/route.ts
//
// Internal API route to trigger IndexNow submissions.
// Secured with INDEXNOW_API_SECRET — never exposed to the browser.
//
// Usage examples:
//
//   # Submit specific URLs (e.g. from a CMS webhook or deploy hook):
//   curl -X POST https://yourdomain.com/api/indexnow \
//     -H "Content-Type: application/json" \
//     -H "Authorization: Bearer YOUR_INDEXNOW_API_SECRET" \
//     -d '{"urls": ["/tools/bmi-calculator", "/tools/password-generator"]}'
//
//   # Submit all tool pages at once (full reindex):
//   curl -X POST https://yourdomain.com/api/indexnow \
//     -H "Authorization: Bearer YOUR_INDEXNOW_API_SECRET" \
//     -d '{"mode": "all-tools"}'
//
//   # Submit the full site:
//   curl -X POST https://yourdomain.com/api/indexnow \
//     -H "Authorization: Bearer YOUR_INDEXNOW_API_SECRET" \
//     -d '{"mode": "full-site"}'
//
// Vercel deploy hook integration:
//   In Vercel dashboard → Settings → Git → Deploy Hooks, create a hook.
//   Then add a post-deploy script that calls this endpoint.
//   See scripts/post-deploy.sh for a ready-made script.

import { NextRequest, NextResponse } from "next/server";
import { submitUrls, submitAllTools, submitFullSite } from "@/lib/indexnow";

const API_SECRET = process.env.INDEXNOW_API_SECRET ?? "";

export async function POST(req: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  const auth = req.headers.get("authorization");
  if (!API_SECRET || auth !== `Bearer ${API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: { urls?: string[]; mode?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine for mode-based calls
  }

  // ── Dispatch ─────────────────────────────────────────────────────────────────
  let result;

  if (body.mode === "all-tools") {
    result = await submitAllTools();
  } else if (body.mode === "full-site") {
    result = await submitFullSite();
  } else if (Array.isArray(body.urls) && body.urls.length > 0) {
    result = await submitUrls(body.urls);
  } else {
    return NextResponse.json(
      { error: "Provide either { urls: string[] } or { mode: 'all-tools' | 'full-site' }" },
      { status: 400 }
    );
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

// GET is intentionally not implemented — this endpoint should never be crawlable
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}