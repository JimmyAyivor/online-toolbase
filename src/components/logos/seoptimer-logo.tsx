// src/components/logos/seoptimer-logo.tsx

import Image from "next/image";

export default function SEOptimerLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/seoptimer-logo.png"
        alt="SEOptimer Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}