// src/app/robots.ts
import type { MetadataRoute } from "next";

const baseUrl = "https://www.utilvia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block any internal/API routes that shouldn't be indexed
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
