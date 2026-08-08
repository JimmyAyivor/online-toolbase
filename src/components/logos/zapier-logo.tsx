// src/components/logos/zapier-logo.tsx

import Image from "next/image";

export default function ZapierLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/zapier-logo.png"
        alt="Zapier Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
