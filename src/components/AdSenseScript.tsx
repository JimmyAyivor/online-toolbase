// src/components/AdSenseScript.tsx
// Loads the Google AdSense script exactly once, in the <head>, asynchronously.
// Import this into src/app/layout.tsx.
// Only renders the script tag when NEXT_PUBLIC_ADSENSE_PUB_ID is set,
// so dev builds stay completely ad-free.

import Script from "next/script";

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

export default function AdSenseScript() {
  if (!PUB_ID) return null;

  return (
    <Script
      id="adsense-init"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
      // "afterInteractive" — defers until after hydration, protecting LCP/FCP
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
