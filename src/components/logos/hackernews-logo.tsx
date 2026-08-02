// src/components/logos/hackernews-logo.tsx

import Image from "next/image";

export default function HackerNewsLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/hackernews-logo.png"
        alt="Hacker News Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}