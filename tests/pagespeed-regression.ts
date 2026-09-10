import {
  pageSpeedBudgetFailures,
  readPageSpeedMetrics,
  type PageSpeedResult,
} from "./pagespeed-budget";

async function main() {
  const target = process.env.PAGESPEED_URL ?? "https://www.utilvia.com";
  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  endpoint.searchParams.set("url", target);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.set("category", "performance");
  if (process.env.PAGESPEED_API_KEY)
    endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);

  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    const quotaHint =
      response.status === 429
        ? " Set PAGESPEED_API_KEY to use authenticated quota."
        : "";
    throw new Error(
      `PageSpeed request failed with HTTP ${response.status}.${quotaHint}`,
    );
  }

  const result = (await response.json()) as PageSpeedResult;
  const metrics = readPageSpeedMetrics(result);
  const failures = pageSpeedBudgetFailures(metrics);

  console.log(
    JSON.stringify({
      ...metrics,
      target,
    }),
  );
  if (failures.length)
    throw new Error(`PageSpeed regression: ${failures.join(", ")}.`);
}

void main();
