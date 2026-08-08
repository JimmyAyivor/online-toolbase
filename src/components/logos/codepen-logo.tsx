// src/components/logos/codepen-logo.tsx

import Image from "next/image";

export default function CodePenLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/codepen-logo.png"
        alt="CodePen Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
