// src/components/logos/moz-logo.tsx

import Image from "next/image";

export default function MozLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/moz-logo.webp"
        alt="Moz Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
