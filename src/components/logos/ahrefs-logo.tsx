// src/components/logos/ahrefs-logo.tsx

import Image from "next/image";

export default function AhrefsLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative ${className} rounded-md flex items-center justify-center`}
      style={{ backgroundColor: "#3A57FC" }}
    >
      <Image
        src="/logos/ahrefs-logo.svg"
        alt="Ahrefs Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
