// src/components/logos/notion-logo.tsx

import Image from "next/image";

export default function NotionLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/notion-logo.png"
        alt="Notion Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}