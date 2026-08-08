// src/components/logos/screaming-frog-logo.tsx

import Image from "next/image";

export default function ScreamingFrogLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/screamingfrog-logo.png"
        alt="Screaming Frog Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
