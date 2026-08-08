// src/components/logos/ubersuggest-logo.tsx

import Image from "next/image";

export default function UbersuggestLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/ubersuggest-logo.png"
        alt="Ubersuggest Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
