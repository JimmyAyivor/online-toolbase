type LighthouseAudit = { numericValue?: number };

export type PageSpeedResult = {
  lighthouseResult?: {
    audits?: Record<string, LighthouseAudit>;
    categories?: { performance?: { score?: number } };
  };
};

export type PageSpeedMetrics = {
  cls: number;
  lcpMs: number;
  performanceScore: number;
  tbtMs: number;
};

export function readPageSpeedMetrics(
  result: PageSpeedResult,
): PageSpeedMetrics {
  const lighthouse = result.lighthouseResult;
  const performanceScore = lighthouse?.categories?.performance?.score;
  const lcpMs = lighthouse?.audits?.["largest-contentful-paint"]?.numericValue;
  const cls = lighthouse?.audits?.["cumulative-layout-shift"]?.numericValue;
  const tbtMs = lighthouse?.audits?.["total-blocking-time"]?.numericValue;

  if (
    typeof performanceScore !== "number" ||
    typeof lcpMs !== "number" ||
    typeof cls !== "number" ||
    typeof tbtMs !== "number"
  ) {
    throw new Error("PageSpeed response did not contain the required metrics.");
  }

  return { cls, lcpMs, performanceScore, tbtMs };
}

export function pageSpeedBudgetFailures(metrics: PageSpeedMetrics) {
  return [
    metrics.performanceScore < 0.8
      ? `performance score ${metrics.performanceScore}`
      : null,
    metrics.lcpMs > 2_500 ? `LCP ${Math.round(metrics.lcpMs)}ms` : null,
    metrics.cls > 0.1 ? `CLS ${metrics.cls}` : null,
    metrics.tbtMs > 300 ? `TBT ${Math.round(metrics.tbtMs)}ms` : null,
  ].filter((failure): failure is string => Boolean(failure));
}
