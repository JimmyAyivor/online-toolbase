// src/components/logos/seo-logo.tsx

import Image from "next/image";

export default function SEOLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/seo-logo.webp"
        alt="SEO.com Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
