// src/components/logos/buffer-logo.tsx

import Image from "next/image";

export default function BufferLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/buffer-logo.png"
        alt="Buffer Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
