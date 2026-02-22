// src/components/AdSlot.tsx
// Reusable AdSense ad slot with:
//   - CLS prevention via reserved min-height before ad loads
//   - Lazy loading via IntersectionObserver (ad script only runs when in viewport)
//   - "Advertisement" label above each slot (AdSense policy requirement)
//   - SSR-safe (no window access during server render)
//   - Zero layout shift on hydration
//   - Named slot variants for every placement zone

"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SlotVariant =
  | "leaderboard" // 728×90   — homepage A, B, D, E; tool page H
  | "rectangle" // 336×280  — tool page G desktop
  | "halfpage" // 300×600  — tool page F sidebar
  | "mediumrectangle" // 300×250  — tool page G mobile, homepage C in-feed
  | "mobilebanner" // 320×50   — tool page J mobile sticky
  | "mobilelarge" // 320×100  — tool page J mobile sticky (large)
  | "responsive"; // auto-size — works everywhere, Google picks best

interface SlotConfig {
  width: number | "100%";
  height: number; // reserved height for CLS prevention
  label: string; // for aria + debug
}

const SLOT_CONFIGS: Record<SlotVariant, SlotConfig> = {
  leaderboard: { width: 728, height: 90, label: "Leaderboard 728×90" },
  rectangle: { width: 336, height: 280, label: "Rectangle 336×280" },
  halfpage: { width: 300, height: 600, label: "Half Page 300×600" },
  mediumrectangle: {
    width: 300,
    height: 250,
    label: "Medium Rectangle 300×250",
  },
  mobilebanner: { width: 320, height: 50, label: "Mobile Banner 320×50" },
  mobilelarge: { width: 320, height: 100, label: "Mobile Large 320×100" },
  responsive: { width: "100%", height: 90, label: "Responsive" },
};

interface AdSlotProps {
  variant: SlotVariant;
  slotId: string; // AdSense data-ad-slot value, e.g. "1234567890"
  className?: string;
  // Set true only for the sticky mobile footer (Zone J)
  sticky?: boolean;
}

// ─── AdSense publisher ID — set via env var ───────────────────────────────────
// Add NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-XXXXXXXXXXXXXXXXX to .env.local
const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdSlot({
  variant,
  slotId,
  className = "",
  sticky = false,
}: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);

  const cfg = SLOT_CONFIGS[variant];

  // ── Only render ads in production and when PUB_ID is set ─────────────────
  const isEnabled = Boolean(PUB_ID) && process.env.NODE_ENV === "production";

  // ── Lazy-load: fire the AdSense push only when the slot enters the viewport
  useEffect(() => {
    if (!isEnabled || loaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // pre-load 200px before it scrolls into view
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isEnabled, loaded]);

  // ── Push the ad unit once visible ────────────────────────────────────────
  useEffect(() => {
    if (!visible || loaded) return;
    try {
      // AdSense global push
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
      setLoaded(true);
    } catch {
      // Silently fail — ad blocker or script not yet loaded
    }
  }, [visible, loaded]);

  // ── Don't render on server or in dev ─────────────────────────────────────
  if (!isEnabled) {
    return (
      <AdPlaceholder
        variant={variant}
        cfg={cfg}
        className={className}
        sticky={sticky}
      />
    );
  }

  if (closed) return null;

  // ── Kill switch until AdSense approved ──────────────────────────────────
  const ADSENSE_APPROVED = process.env.NEXT_PUBLIC_ADSENSE_APPROVED === "true";
  if (!ADSENSE_APPROVED) return null;

  return (
    <AdWrapper
      variant={variant}
      cfg={cfg}
      className={className}
      sticky={sticky}
      onClose={sticky ? () => setClosed(true) : undefined}
    >
      <div ref={containerRef}>
        <ins
          className='adsbygoogle'
          style={{
            display: "block",
            width: typeof cfg.width === "number" ? `${cfg.width}px` : cfg.width,
            height: `${cfg.height}px`,
          }}
          data-ad-client={PUB_ID}
          data-ad-slot={slotId}
          data-ad-format={variant === "responsive" ? "auto" : undefined}
          data-full-width-responsive={
            variant === "responsive" ? "true" : undefined
          }
          aria-label={cfg.label}
        />
      </div>
    </AdWrapper>
  );
}

// ─── Dev / preview placeholder (shown when NEXT_PUBLIC_ADSENSE_PUB_ID not set) ─

function AdPlaceholder({
  variant,
  cfg,
  className,
  sticky,
}: {
  variant: SlotVariant;
  cfg: SlotConfig;
  className: string;
  sticky: boolean;
}) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <AdWrapper
      variant={variant}
      cfg={cfg}
      className={className}
      sticky={sticky}
      onClose={sticky ? () => setClosed(true) : undefined}
    >
      <div
        style={{
          width: typeof cfg.width === "number" ? `${cfg.width}px` : "100%",
          height: `${cfg.height}px`,
        }}
        className='flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded text-gray-400 text-xs font-mono'
        aria-hidden='true'
      >
        Ad Slot — {cfg.label}
      </div>
    </AdWrapper>
  );
}

// ─── Shared wrapper (label + CLS reservation + sticky shell) ─────────────────

function AdWrapper({
  variant,
  cfg,
  className,
  sticky,
  onClose,
  children,
}: {
  variant: SlotVariant;
  cfg: SlotConfig;
  className: string;
  sticky: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  // Sticky mobile footer wrapper
  if (sticky) {
    return (
      <div
        className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex items-center justify-center'
        style={{ minHeight: `${cfg.height + 8}px` }}
        role='complementary'
        aria-label='Advertisement'
      >
        <div className='relative px-2 py-1'>
          <AdLabel />
          {children}
          {onClose && (
            <button
              onClick={onClose}
              className='absolute -top-1 -right-1 w-5 h-5 bg-gray-600 hover:bg-gray-800 text-white rounded-full text-xs flex items-center justify-center leading-none transition-colors'
              aria-label='Close advertisement'
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  }

  // Standard inline wrapper — reserves space to prevent CLS
  return (
    <div
      className={`flex flex-col items-center ${className}`}
      // Reserve exact height before ad loads — prevents layout shift
      style={{ minHeight: `${cfg.height + 20}px` }} // +20 for the label
      role='complementary'
      aria-label='Advertisement'
    >
      <AdLabel />
      {children}
    </div>
  );
}

// ─── "Advertisement" label (AdSense policy requires ads to be labelled) ───────

function AdLabel() {
  return (
    <p className='text-xs text-gray-400 uppercase tracking-widest mb-1 select-none'>
      Advertisement
    </p>
  );
}
