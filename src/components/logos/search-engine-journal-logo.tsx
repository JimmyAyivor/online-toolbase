// src/components/logos/search-engine-journal-logo.tsx

import Image from "next/image";

export default function SearchEngineJournalLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/searchenginejournal_logo.webp"
        alt="Search Engine Journal Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
