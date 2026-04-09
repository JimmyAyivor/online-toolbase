// src/app/HomepageAds.tsx
// Drop-in ad placements for the homepage.
// These are separate from HomeClient.tsx so they stay server-renderable
// (AdSlot is "use client" but can be imported into a server component fine —
// Next.js only makes the subtree client when the component itself needs state).
//
// Zone A — below hero stats, above category section
// Zone B — between category section and tools grid
// Zone D — above FAQ section
// Zone E — above footer

import AdSlot from "@/components/AdSlot";

const SLOT_A = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_A ?? "0000000000";
const SLOT_B = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_B ?? "0000000000";
const SLOT_D = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_D ?? "0000000000";
const SLOT_E = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_E ?? "0000000000";

// ─── Zone A: below hero stats, above categories ───────────────────────────────
export function HomepageAdA() {
  return (
    <div className="flex justify-center px-4 py-4">
      <AdSlot
        variant="leaderboard"
        slotId={SLOT_A}
        className="hidden sm:flex"
      />
      <AdSlot
        variant="mediumrectangle"
        slotId={SLOT_A}
        className="flex sm:hidden"
      />
    </div>
  );
}

// ─── Zone B: between category section and tools grid ─────────────────────────
export function HomepageAdB() {
  return (
    <div className="flex justify-center px-4 py-6">
      <AdSlot variant="rectangle" slotId={SLOT_B} className="hidden sm:flex" />
      <AdSlot
        variant="mediumrectangle"
        slotId={SLOT_B}
        className="flex sm:hidden"
      />
    </div>
  );
}

// ─── Zone D: above FAQ section ────────────────────────────────────────────────
export function HomepageAdD() {
  return (
    <div className="flex justify-center px-4 py-4">
      <AdSlot
        variant="leaderboard"
        slotId={SLOT_D}
        className="hidden sm:flex"
      />
      <AdSlot
        variant="mediumrectangle"
        slotId={SLOT_D}
        className="flex sm:hidden"
      />
    </div>
  );
}

// ─── Zone E: above footer ─────────────────────────────────────────────────────
export function HomepageAdE() {
  return (
    <div className="flex justify-center px-4 py-4 bg-gray-900">
      <AdSlot
        variant="leaderboard"
        slotId={SLOT_E}
        className="hidden sm:flex"
      />
      {/* No mobile variant here — mobile already has Zone J sticky footer */}
    </div>
  );
}
