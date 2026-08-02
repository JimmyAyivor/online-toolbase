// src/components/logos/seobility-logo.tsx

import Image from "next/image";

export default function SeobilityLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/seobility-logo.webp"
        alt="Seobility Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}