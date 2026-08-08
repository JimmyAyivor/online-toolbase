// src/components/logos/hashnode-logo.tsx

import Image from "next/image";

export default function HashnodeLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/hashnode-logo.webp"
        alt="Hashnode Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
