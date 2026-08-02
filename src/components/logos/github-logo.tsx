// src/components/logos/github-logo.tsx

import Image from "next/image";

export default function GitHubLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/github-logo.png"
        alt="GitHub Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}