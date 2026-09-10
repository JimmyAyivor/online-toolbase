import AdSlot from "@/components/AdSlot";
import type { NetworkFallback } from "@/ads/types";

export default function AdFallback({
  className,
  fallback,
  sticky,
}: {
  className?: string;
  fallback: NetworkFallback;
  sticky?: boolean;
}) {
  return (
    <AdSlot
      className={className}
      slotId={fallback.slotId}
      sticky={sticky}
      variant={fallback.variant}
    />
  );
}
