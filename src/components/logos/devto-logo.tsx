// src/components/logos/devto-logo.tsx

import Image from "next/image";

export default function DevToLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/devto-logo.webp"
        alt="DEV.to Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}