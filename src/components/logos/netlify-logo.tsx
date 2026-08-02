// src/components/logos/netlify-logo.tsx

import Image from "next/image";

export default function NetlifyLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/netlify-logo.png"
        alt="Netlify Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}