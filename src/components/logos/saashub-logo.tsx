// src/components/logos/saashub-logo.tsx

import Image from "next/image";

export default function SaaSHubLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/saashub-logo.png"
        alt="SaaSHub Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}