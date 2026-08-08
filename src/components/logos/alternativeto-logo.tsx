// src/components/logos/alternativeto-logo.tsx

import Image from "next/image";

export default function AlternativeToLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative ${className} rounded-md flex items-center justify-center`}
      style={{ backgroundColor: "#7ec5ed" }}
    >
      <div className="relative h-5 w-5">
        <Image
          src="/logos/alternativeto.svg"
          alt="AlternativeTo Logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
