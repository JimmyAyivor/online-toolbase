// src/components/logos/cloudways-logo.tsx

import Image from "next/image";

export default function CloudwaysLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/cloudways-logo.png"
        alt="Cloudways Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
