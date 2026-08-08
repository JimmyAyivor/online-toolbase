// src/components/logos/futurepedia-logo.tsx

import Image from "next/image";

export default function FuturepediaLogo({
  className = "h-7 w-7`",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/futurepedia-logo.png"
        alt="Futurepedia Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
