import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  AD_PLACEMENTS,
  MAX_AD_PLACEMENTS_PER_PAGE,
} from "../src/ads/placements";
import { buildReviveFrameUrl, getReviveDeliveryUrl } from "../src/ads/revive";
import {
  pageSpeedBudgetFailures,
  readPageSpeedMetrics,
} from "./pagespeed-budget";

describe("publisher ad registry", () => {
  it("defines every Ad Studio placement without duplicate configured zones", () => {
    assert.deepEqual(Object.keys(AD_PLACEMENTS).sort(), [
      "below-tool",
      "blog-content-leaderboard",
      "blog-footer-leaderboard",
      "blog-header-leaderboard",
      "blog-mobile-sticky",
      "blog-sidebar",
      "blog-sponsored-card",
      "category-page-leaderboard",
      "homepage-leaderboard",
      "mobile-sticky",
      "sponsored-tool-card",
      "tool-footer-leaderboard",
      "tool-inline-card",
      "tool-page-leaderboard",
      "tool-sidebar",
    ]);
    const configured = Object.values(AD_PLACEMENTS)
      .map(({ zoneId }) => zoneId)
      .filter((zoneId): zoneId is string => Boolean(zoneId));
    assert.equal(new Set(configured).size, configured.length);
    assert.equal(MAX_AD_PLACEMENTS_PER_PAGE, 5);
  });

  it("accepts HTTPS delivery origins and rejects unsafe configuration", () => {
    assert.equal(
      getReviveDeliveryUrl("https://ads.example.com/www/delivery/")?.href,
      "https://ads.example.com/www/delivery",
    );
    assert.equal(
      getReviveDeliveryUrl("http://ads.example.com/www/delivery"),
      null,
    );
    assert.equal(
      getReviveDeliveryUrl(
        "https://user:password@ads.example.com/www/delivery",
      ),
      null,
    );
  });

  it("builds a scoped iframe request and sanitizes publisher context", () => {
    const result = buildReviveFrameUrl(
      "42",
      { category: "PDF Tools", toolSlug: "merge/pdf" },
      "https://ads.example.com/www/delivery",
    );
    assert.ok(result);
    const url = new URL(result);
    assert.equal(url.pathname, "/www/delivery/afr.php");
    assert.equal(url.searchParams.get("zoneid"), "42");
    assert.equal(url.searchParams.get("source"), "PDF-Tools/merge-pdf");
  });
});

describe("PageSpeed regression budget", () => {
  const passingResult = {
    lighthouseResult: {
      audits: {
        "cumulative-layout-shift": { numericValue: 0.05 },
        "largest-contentful-paint": { numericValue: 2_100 },
        "total-blocking-time": { numericValue: 180 },
      },
      categories: { performance: { score: 0.9 } },
    },
  };

  it("accepts a report inside every mobile performance budget", () => {
    assert.deepEqual(
      pageSpeedBudgetFailures(readPageSpeedMetrics(passingResult)),
      [],
    );
  });

  it("reports every exceeded budget", () => {
    const metrics = readPageSpeedMetrics(passingResult);
    assert.deepEqual(
      pageSpeedBudgetFailures({
        ...metrics,
        cls: 0.2,
        lcpMs: 3_000,
        performanceScore: 0.7,
        tbtMs: 450,
      }),
      ["performance score 0.7", "LCP 3000ms", "CLS 0.2", "TBT 450ms"],
    );
  });

  it("rejects incomplete PageSpeed reports", () => {
    assert.throws(
      () => readPageSpeedMetrics({ lighthouseResult: {} }),
      /required metrics/,
    );
  });
});
