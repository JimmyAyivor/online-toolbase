// src/components/MobileStickyAd.tsx
// Zone J: sticky footer banner for mobile (320×50 or 320×100).
// - Only renders on screens < lg (Tailwind breakpoint 1024px)
// - Has a close button (required by AdSense anchored-ad policy)
// - Adds padding-bottom to <body> so it doesn't cover page content
// - Self-dismisses after user closes it; dismissed state is NOT persisted
//   (refreshes on next page load — standard for AdSense anchor ads)
//
// Usage: import into layout.tsx and place inside <body>
//
//   import MobileStickyAd from "@/components/MobileStickyAd";
//   ...
//   <body>
//     {children}
//     <MobileStickyAd />
//   </body>

"use client";

import { usePathname } from "next/navigation";

import AdPlacement from "./advertising/AdPlacement";

export default function MobileStickyAd() {
  const pathname = usePathname();
  const placement = pathname.startsWith("/tools/")
    ? "mobile-sticky"
    : pathname === "/blog" || pathname.startsWith("/blog/")
      ? "blog-mobile-sticky"
      : null;
  if (!placement) return null;
  return (
    <div className="lg:hidden">
      <AdPlacement placement={placement} sticky />
    </div>
  );
}
