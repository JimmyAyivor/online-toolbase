/**
 * Shared client-side helpers for the PDF tool suite.
 *
 * Every tool in this package processes files entirely in the browser —
 * nothing is uploaded to a server.
 *
 * Dependencies:
 * "@cantoo/pdf-lib": "^2"
 * "pdfjs-dist": "^4"
 * "jszip": "^3"
 */

export const BYTES_IN_MB = 1024 * 1024;

/**
 * Formats a byte count into a human-readable value.
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < BYTES_IN_MB) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / BYTES_IN_MB).toFixed(2)} MB`;
}

/**
 * Reads a File into an ArrayBuffer.
 */
export async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return file.arrayBuffer();
}

/**
 * Converts Uint8Array data into a Blob.
 *
 * Newer TypeScript DOM typings distinguish ArrayBuffer
 * from ArrayBufferLike. PDF libraries commonly return
 * Uint8Array<ArrayBufferLike>, so we explicitly copy the
 * bytes into a guaranteed ArrayBuffer.
 */
export function bytesToBlob(
  data: Uint8Array,
  mimeType = "application/octet-stream",
): Blob {
  const buffer = new ArrayBuffer(data.byteLength);

  new Uint8Array(buffer).set(data);

  return new Blob([buffer], {
    type: mimeType,
  });
}

/**
 * Triggers a browser download for a Blob or Uint8Array.
 *
 * No network request is made.
 */
export function downloadBytes(
  data: Uint8Array | Blob,
  filename: string,
  mimeType = "application/octet-stream",
): void {
  const blob = data instanceof Blob ? data : bytesToBlob(data, mimeType);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  a.remove();

  // Give Safari and other browsers time to begin the download.
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Removes the final file extension from a filename.
 */
export function stripExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}

/**
 * Lazily configures pdf.js's worker.
 *
 * Uses the CDN worker matching the installed pdfjs-dist version
 * to avoid bundler worker-loading issues.
 *
 * If your CSP disallows third-party workers, replace this with
 * a self-hosted worker URL.
 */
export async function getPdfjs() {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  return pdfjsLib;
}

/**
 * Renders a single PDF page (1-indexed) to a PNG data URL.
 *
 * Used by PDF thumbnails/previews.
 */
export async function renderPageThumbnail(
  pdf: any,
  pageNumber: number,
  maxWidth = 160,
): Promise<string> {
  const page = await pdf.getPage(pageNumber);

  const unscaled = page.getViewport({
    scale: 1,
  });

  const scale = maxWidth / unscaled.width;

  const viewport = page.getViewport({
    scale,
  });

  const canvas = document.createElement("canvas");

  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new ToolError("Unable to create a canvas rendering context.");
  }

  await page.render({
    canvas,
    canvasContext: ctx,
    viewport,
  }).promise;

  return canvas.toDataURL("image/png");
}

/**
 * Standard error class used throughout the PDF tool suite.
 */
export class ToolError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ToolError";
  }
}

/**
 * Friendly error text for the most common failure modes
 * across the PDF tools.
 */
export function describeError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);

  if (/password|encrypted/i.test(message)) {
    return "This PDF is password-protected. Enter the password, or use Unlock PDF first.";
  }

  if (/invalid pdf|structure/i.test(message)) {
    return "That file doesn't look like a valid PDF. Try re-exporting it and uploading again.";
  }

  return (
    message || "Something went wrong processing this file. Please try again."
  );
}
