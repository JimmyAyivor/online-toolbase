"use client";
// src/components/GlobalMonetization.tsx
//
// Single client component to mount in layout.tsx.
// Keeps layout.tsx as a server component while enabling client-side monetization.
//
// Add to src/app/layout.tsx:
//   import GlobalMonetization from "@/components/GlobalMonetization";
//   // Inside <body>, after <SiteFooter />:
//   <GlobalMonetization />

import ExitIntentPopup from "@/components/monetization/ExitIntentPopup";
import UsageStreakPrompt from "@/components/monetization/UsageStreakPrompt";

export default function GlobalMonetization() {
  return (
    <>
      <ExitIntentPopup />
      <UsageStreakPrompt />
    </>
  );
}