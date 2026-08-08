// src/components/logos/gtmetrix-logo.tsx

import Image from "next/image";

export default function GTmetrixLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/gtmetrics-logo.png"
        alt="GTmetrix Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
