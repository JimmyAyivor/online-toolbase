// src/components/logos/canva-logo.tsx

import Image from "next/image";

export default function CanvaLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/canva-logo.png"
        alt="Canva Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}