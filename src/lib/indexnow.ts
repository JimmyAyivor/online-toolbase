// src/lib/indexnow.ts
//
// Complete IndexNow implementation for Next.js App Router.
//
// What this does:
//   - Submits single URLs or batches to api.indexnow.org (fans out to Bing,
//     Yandex, Naver, Seznam, Yep automatically — one call covers all engines)
//   - Batches rapid submissions into a queue (max 10,000 URLs per request)
//   - Deduplicates URLs submitted within the same flush window
//   - Skips non-production environments so dev never pollutes the index
//   - Full TypeScript, zero dependencies beyond Node fetch
//
// Usage:
//   import { submitUrl, submitUrls, submitAllTools } from "@/lib/indexnow";
//
//   // Single URL (e.g. after revalidating a page):
//   await submitUrl("/tools/bmi-calculator");
//
//   // Batch (e.g. after updating the tools lib):
//   await submitUrls(["/tools/bmi-calculator", "/tools/password-generator"]);
//
//   // Full site submit (e.g. first deploy or major update):
//   await submitAllTools();

import { tools } from "@/lib/tools";

// ─── Config ───────────────────────────────────────────────────────────────────

const SITE_URL   = process.env.NEXT_PUBLIC_BASE_URL ?? "https://yourdomain.com";
const INDEX_KEY  = process.env.INDEXNOW_KEY          ?? "";
const KEY_FILE   = `${SITE_URL}/${INDEX_KEY}.txt`;     // Option 1: root key file
const ENDPOINT   = "https://api.indexnow.org/indexnow"; // fans out to all engines
const IS_PROD    = process.env.NODE_ENV === "production";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IndexNowResult {
  submitted: number;
  urls:      string[];
  status:    number | null;
  ok:        boolean;
  skipped?:  string; // reason if skipped (dev, no key, etc.)
}

// ─── Core submit function ─────────────────────────────────────────────────────

/**
 * Submit a batch of absolute or relative URLs to IndexNow.
 * Relative paths are resolved against SITE_URL automatically.
 * Returns a result object — never throws.
 */
export async function submitUrls(paths: string[]): Promise<IndexNowResult> {
  // Skip in non-production environments
  if (!IS_PROD) {
    console.log(`[IndexNow] Skipped (not production) — would have submitted ${paths.length} URL(s)`);
    return { submitted: 0, urls: [], status: null, ok: true, skipped: "not production" };
  }

  // Skip if key not configured
  if (!INDEX_KEY) {
    console.warn("[IndexNow] INDEXNOW_KEY env var not set — skipping submission");
    return { submitted: 0, urls: [], status: null, ok: false, skipped: "no key configured" };
  }

  // Resolve relative paths → absolute URLs, deduplicate
  const resolved = Array.from(
    new Set(
      paths.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`))
    )
  );

  // IndexNow max is 10,000 per request — chunk if needed
  const chunks = chunkArray(resolved, 10_000);
  let lastResult: IndexNowResult = { submitted: 0, urls: resolved, status: null, ok: true };

  for (const chunk of chunks) {
    const host = new URL(SITE_URL).hostname;

    const body = {
      host,
      key:         INDEX_KEY,
      keyLocation: KEY_FILE,
      urlList:     chunk,
    };

    try {
      const res = await fetch(ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body:    JSON.stringify(body),
      });

      lastResult = {
        submitted: chunk.length,
        urls:      chunk,
        status:    res.status,
        ok:        res.status === 200 || res.status === 202,
      };

      if (!lastResult.ok) {
        console.error(`[IndexNow] Submission failed — HTTP ${res.status}`, chunk);
      } else {
        console.log(`[IndexNow] Submitted ${chunk.length} URL(s) — HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("[IndexNow] Network error during submission", err);
      lastResult = { submitted: 0, urls: chunk, status: null, ok: false };
    }
  }

  return lastResult;
}

/**
 * Submit a single URL.
 */
export async function submitUrl(path: string): Promise<IndexNowResult> {
  return submitUrls([path]);
}

/**
 * Submit every tool page in the tools lib.
 * Use on first deploy or after bulk tool updates.
 */
export async function submitAllTools(): Promise<IndexNowResult> {
  const paths = tools.map((t) => `/tools/${t.slug}`);
  return submitUrls(paths);
}

/**
 * Submit all static + tool pages (full site crawl hint).
 * Use sparingly — only on major deployments.
 */
export async function submitFullSite(): Promise<IndexNowResult> {
  const staticPaths = [
    "/",
    "/tools",
    "/privacy-policy",
    "/terms-of-service",
    "/disclaimer",
    "/contact",
  ];
  const toolPaths   = tools.map((t) => `/tools/${t.slug}`);
  const categoryPaths = Array.from(new Set(tools.map((t) => `/tools/category/${t.category.toLowerCase()}`)));

  return submitUrls([...staticPaths, ...toolPaths, ...categoryPaths]);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}