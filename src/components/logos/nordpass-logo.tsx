// src/components/logos/nordpass-logo.tsx

import Image from "next/image";

export default function NordPassLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/nordpass-logo.png"
        alt="NordPass Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}