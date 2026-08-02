// src/components/logos/n8n-logo.tsx

import Image from "next/image";

export default function N8NLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/n8n-logo.png"
        alt="n8n Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}