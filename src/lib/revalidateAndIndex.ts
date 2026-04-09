// src/lib/revalidateAndIndex.ts
//
// Drop-in wrapper around Next.js revalidatePath/revalidateTag that
// simultaneously submits the affected URL to IndexNow.
//
// Usage (in a Server Action or API route):
//
//   import { revalidateAndIndex } from "@/lib/revalidateAndIndex";
//
//   // Instead of:  revalidatePath("/tools/bmi-calculator");
//   // Use:
//   await revalidateAndIndex("/tools/bmi-calculator");
//
//   // Batch:
//   await revalidateAndIndex(["/tools/bmi-calculator", "/tools/password-generator"]);

import { revalidatePath } from "next/cache";
import { submitUrls } from "@/lib/indexnow";

/**
 * Revalidate one or more paths AND submit them to IndexNow in one call.
 * Safe to call from Server Actions, Route Handlers, and cron jobs.
 */
export async function revalidateAndIndex(
  paths: string | string[],
  type: "page" | "layout" = "page",
): Promise<void> {
  const pathList = Array.isArray(paths) ? paths : [paths];

  // Revalidate Next.js cache
  for (const p of pathList) {
    revalidatePath(p, type);
  }

  // Submit to IndexNow (non-blocking — don't await in UI paths)
  submitUrls(pathList).catch((err) => {
    console.error("[revalidateAndIndex] IndexNow submission failed", err);
  });
}
