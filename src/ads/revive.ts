import { REVIVE_DELIVERY_URL } from "./config";
import type { AdContext } from "./types";

function safeContextValue(value: string | undefined) {
  return (
    value
      ?.trim()
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 64) || null
  );
}

export function getReviveDeliveryUrl(value = REVIVE_DELIVERY_URL) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const localDevelopment =
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");
    if (url.protocol !== "https:" && !localDevelopment) return null;
    if (url.username || url.password || url.search || url.hash) return null;
    url.pathname = url.pathname.replace(/\/$/, "");
    return url;
  } catch {
    return null;
  }
}

export function buildReviveFrameUrl(
  zoneId: string,
  context?: AdContext,
  deliveryUrl = REVIVE_DELIVERY_URL,
) {
  if (!/^\d+$/.test(zoneId) || Number(zoneId) <= 0) return null;
  const base = getReviveDeliveryUrl(deliveryUrl);
  if (!base) return null;
  const url = new URL(`${base.pathname}/afr.php`, base.origin);
  url.searchParams.set("zoneid", zoneId);
  url.searchParams.set("target", "_blank");
  const source = [
    safeContextValue(context?.category),
    safeContextValue(context?.toolSlug),
  ]
    .filter(Boolean)
    .join("/");
  if (source) url.searchParams.set("source", source);
  return url.toString();
}
