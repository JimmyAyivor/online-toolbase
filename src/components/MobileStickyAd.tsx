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

import AdSlot from "./AdSlot";

// Slot ID — replace with your real AdSense slot ID
const MOBILE_STICKY_SLOT_ID = process.env.NEXT_PUBLIC_AD_SLOT_MOBILE_STICKY ?? "0000000000";

export default function MobileStickyAd() {
  return (
    // lg:hidden — only rendered when viewport is < 1024px
    // The AdSlot itself handles close state and position:fixed
    <div className="lg:hidden">
      <AdSlot
        variant="mobilebanner"
        slotId={MOBILE_STICKY_SLOT_ID}
        sticky
      />
    </div>
  );
}
