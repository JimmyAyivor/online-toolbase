// src/components/logos/nordvpn-logo.tsx

import Image from "next/image";

export default function NordVPNLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/nordvpn-logo.png"
        alt="NordVPN Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}