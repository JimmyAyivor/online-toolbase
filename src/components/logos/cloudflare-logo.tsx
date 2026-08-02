// src/components/logos/cloudflare-logo.tsx

import Image from "next/image";

export default function CloudflareLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/cloudflare-logo.png"
        alt="Cloudflare Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}