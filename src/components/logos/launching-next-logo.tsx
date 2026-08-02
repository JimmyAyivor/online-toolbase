// src/components/logos/launching-next-logo.tsx

import Image from "next/image";

export default function LaunchingNextLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/launching-next-logo-square.png"
        alt="Launching Next Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}