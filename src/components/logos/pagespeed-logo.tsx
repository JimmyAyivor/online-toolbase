// src/components/logos/pagespeed-logo.tsx

import Image from "next/image";

export default function PageSpeedLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/pagespeed-logo.png"
        alt="PageSpeed Insights Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
