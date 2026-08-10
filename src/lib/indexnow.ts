// src/lib/indexnow.ts
//
// Complete IndexNow implementation for Next.js App Router.
//
// What this does:
//   - Submits single URLs or batches to api.indexnow.org (fans out to Bing,
//     Yandex, Naver, Seznam, Yep automatically — one call covers all engines)
//   - Two ways to submit:
//       submitUrl(s)  — sends immediately, one request per call (chunked
//                       internally if you pass more than 10,000 URLs)
//       queueUrl(s)   — coalesces calls made within a short window (default
//                       2s) into a single request, so e.g. five pages
//                       revalidating back-to-back become one API call
//   - Validates every URL resolves to this site's own host before sending —
//     IndexNow rejects (and Bing may penalize) requests mixing hosts
//   - Skips non-production environments so dev/preview never pollutes the index
//   - Full TypeScript, zero dependencies beyond Node fetch
//
// Usage:
//   import { submitUrl, submitUrls, queueUrl, submitAllTools, submitAllBlogPosts } from "@/lib/indexnow";
//
//   // Send right away (e.g. after a full-site deploy):
//   await submitUrl("/tools/bmi-calculator");
//   await submitUrls(["/tools/bmi-calculator", "/tools/password-generator"]);
//
//   // Queue + coalesce (e.g. from an ISR revalidation webhook that may fire
//   // several times in quick succession):
//   await queueUrl("/blog/how-to-create-a-strong-password");
//
//   // All blog posts (e.g. after publishing new posts):
//   await submitAllBlogPosts();
//
//   // Full site submit (e.g. first deploy or major update):
//   await submitFullSite();

import { tools } from "@/lib/tools";
import { blogPosts } from "@/app/blog/blog-posts";

// ─── Config ───────────────────────────────────────────────────────────────────

const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.onlinetoolbase.com"
).replace(/\/$/, "");
const SITE_HOST = new URL(SITE_URL).hostname;
const INDEX_KEY = process.env.INDEXNOW_KEY ?? "";
const KEY_FILE = `${SITE_URL}/${INDEX_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// Prefer the platform's own env→environment signal when available (Vercel
// preview deploys run with NODE_ENV=production too, so NODE_ENV alone can't
// tell a preview branch from the real production deploy).
const IS_PROD = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

const MAX_URLS_PER_REQUEST = 10_000;
const QUEUE_FLUSH_DELAY_MS = 2_000;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IndexNowResult {
  /** Count of URLs that were actually accepted (HTTP 200/202) across all requests made. */
  submitted: number;
  /** Every URL that was in scope for this call, after resolving + host validation. */
  urls: string[];
  /** True only if every request made succeeded. False if any chunk failed. */
  ok: boolean;
  /** HTTP status per request made (more than one entry only if >10,000 URLs were sent). -1 means a network-level failure, not an HTTP response. */
  statuses: number[];
  skipped?: string;
}

const EMPTY_RESULT: IndexNowResult = {
  submitted: 0,
  urls: [],
  ok: true,
  statuses: [],
};

// ─── Path resolution + validation ─────────────────────────────────────────────

/**
 * Resolve relative paths to absolute URLs against SITE_URL, and drop
 * anything that doesn't parse or doesn't belong to this site's host.
 * IndexNow requires every URL in a request to share the submitted `host`.
 */
function resolvePaths(paths: string[]): string[] {
  const out: string[] = [];
  for (const p of paths) {
    const absolute = p.startsWith("http")
      ? p
      : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;

    let hostname: string;
    try {
      hostname = new URL(absolute).hostname;
    } catch {
      console.warn(`[IndexNow] Skipping unparseable URL: ${p}`);
      continue;
    }

    if (hostname !== SITE_HOST) {
      console.warn(
        `[IndexNow] Skipping cross-host URL (expected ${SITE_HOST}): ${absolute}`,
      );
      continue;
    }

    out.push(absolute);
  }
  return Array.from(new Set(out));
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ─── Core send (no queueing, no dedup beyond this call) ───────────────────────

async function sendBatch(resolved: string[]): Promise<IndexNowResult> {
  if (resolved.length === 0) return EMPTY_RESULT;

  if (!IS_PROD) {
    console.log(
      `[IndexNow] Skipped (not production) — would have submitted ${resolved.length} URL(s)`,
    );
    return { ...EMPTY_RESULT, urls: resolved, skipped: "not production" };
  }

  if (!INDEX_KEY) {
    console.warn(
      "[IndexNow] INDEXNOW_KEY env var not set — skipping submission",
    );
    return {
      submitted: 0,
      urls: resolved,
      ok: false,
      statuses: [],
      skipped: "no key configured",
    };
  }

  const chunks = chunkArray(resolved, MAX_URLS_PER_REQUEST);
  const statuses: number[] = [];
  let submitted = 0;
  let ok = true;

  for (const chunk of chunks) {
    const body = {
      host: SITE_HOST,
      key: INDEX_KEY,
      keyLocation: KEY_FILE,
      urlList: chunk,
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });

      statuses.push(res.status);
      const chunkOk = res.status === 200 || res.status === 202;
      ok = ok && chunkOk;

      if (chunkOk) {
        submitted += chunk.length;
        console.log(
          `[IndexNow] Submitted ${chunk.length} URL(s) — HTTP ${res.status}`,
        );
      } else {
        console.error(
          `[IndexNow] Submission failed — HTTP ${res.status}`,
          chunk,
        );
      }
    } catch (err) {
      ok = false;
      statuses.push(-1);
      console.error("[IndexNow] Network error during submission", err);
    }
  }

  return { submitted, urls: resolved, ok, statuses };
}

// ─── Immediate submit (one request per call, chunked only if >10k URLs) ──────

/**
 * Submit a batch of absolute or relative URLs to IndexNow right away.
 * Returns a result object — never throws.
 */
export async function submitUrls(paths: string[]): Promise<IndexNowResult> {
  return sendBatch(resolvePaths(paths));
}

/**
 * Submit a single URL right away.
 */
export async function submitUrl(path: string): Promise<IndexNowResult> {
  return submitUrls([path]);
}

// ─── Queued submit (coalesces calls within QUEUE_FLUSH_DELAY_MS) ─────────────

const pendingQueue = new Set<string>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let pendingResolvers: Array<(result: IndexNowResult) => void> = [];

// Debounced: each call resets the window. Every caller within the window
// gets the same eventual result, from one flush, once the window elapses
// with no further calls.
function scheduleFlush(): Promise<IndexNowResult> {
  const promise = new Promise<IndexNowResult>((resolve) => {
    pendingResolvers.push(resolve);
  });

  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(async () => {
    const batch = Array.from(pendingQueue);
    const resolvers = pendingResolvers;
    pendingQueue.clear();
    pendingResolvers = [];
    flushTimer = null;

    const result = await sendBatch(resolvePaths(batch));
    for (const resolve of resolvers) resolve(result);
  }, QUEUE_FLUSH_DELAY_MS);

  return promise;
}

/**
 * Queue one or more URLs for submission. Multiple calls made within the
 * flush window (default 2s) are coalesced into a single IndexNow request —
 * useful for revalidation webhooks or edits that may fire several times in
 * quick succession for the same page.
 */
export function queueUrls(paths: string[]): Promise<IndexNowResult> {
  for (const p of paths) pendingQueue.add(p);
  return scheduleFlush();
}

/**
 * Queue a single URL for coalesced submission.
 */
export function queueUrl(path: string): Promise<IndexNowResult> {
  return queueUrls([path]);
}

// ─── Convenience bulk submitters ──────────────────────────────────────────────

/**
 * Submit every tool page in the tools lib.
 * Use after bulk tool updates.
 */
export async function submitAllTools(): Promise<IndexNowResult> {
  const paths = tools.map((t) => `/tools/${t.slug}`);
  return submitUrls(paths);
}

/**
 * Submit every blog post in the blog-posts registry.
 * Use after publishing a new batch of posts.
 */
export async function submitAllBlogPosts(): Promise<IndexNowResult> {
  const paths = blogPosts.map((p) => `/blog/${p.slug}`);
  return submitUrls(paths);
}

/**
 * Submit a single blog post by slug.
 * Use immediately after publishing or updating one post.
 *
 * @example
 * await submitBlogPost("how-to-create-a-strong-password");
 */
export async function submitBlogPost(slug: string): Promise<IndexNowResult> {
  return submitUrl(`/blog/${slug}`);
}

/**
 * Submit all static + tool + blog pages (full site crawl hint).
 * Use sparingly — only on major deployments or first launch.
 */
export async function submitFullSite(): Promise<IndexNowResult> {
  const staticPaths = [
    "/",
    "/tools",
    "/blog",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/contact",
  ];

  const toolPaths = tools.map((t) => `/tools/${t.slug}`);

  const categoryPaths = Array.from(
    new Set(
      tools.map(
        (t) =>
          `/tools/category/${t.category.toLowerCase().replace(/\s+/g, "-")}`,
      ),
    ),
  );

  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);

  return submitUrls([
    ...staticPaths,
    ...toolPaths,
    ...categoryPaths,
    ...blogPaths,
  ]);
}