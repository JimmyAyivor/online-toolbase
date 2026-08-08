// src/components/logos/backlinko-logo.tsx

import Image from "next/image";

export default function BacklinkoLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/backlinko-logo.png"
        alt="Backlinko Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
