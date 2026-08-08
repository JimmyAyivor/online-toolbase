// src/components/logos/search-engine-land-logo.tsx

import Image from "next/image";

export default function SearchEngineLandLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/searchengineland-logo.png"
        alt="Search Engine Land Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
