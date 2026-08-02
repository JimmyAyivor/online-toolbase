// src/components/logos/startupbase-logo.tsx

import Image from "next/image";

export default function StartupBaseLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/startupbase.svg"
        alt="StartupBase Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}