// src/components/logos/indie-hackers-logo.tsx

import Image from "next/image";

export default function IndieHackersLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/indiehackers-logo.png"
        alt="Indie Hackers Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
