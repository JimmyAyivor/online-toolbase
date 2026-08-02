// src/components/logos/toolify-logo.tsx

import Image from "next/image";

export default function ToolifyLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/toolifylogo.jpg"
        alt="Toolify Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}