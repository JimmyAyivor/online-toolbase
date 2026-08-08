// src/components/logos/answer-the-public-logo.tsx

import Image from "next/image";

export default function AnswerThePublicLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/answerthepublic-logo.png"
        alt="AnswerThePublic Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
