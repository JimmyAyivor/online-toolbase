// src/components/logos/smallseotools-logo.tsx

import Image from "next/image";

export default function SmallSEOToolsLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/smallseotools-logo.webp"
        alt="SmallSEOTools Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
