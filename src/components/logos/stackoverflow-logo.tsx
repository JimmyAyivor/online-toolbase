// src/components/logos/stackoverflow-logo.tsx

import Image from "next/image";

export default function StackOverflowLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/stackoverflow-logo.png"
        alt="Stack Overflow Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}