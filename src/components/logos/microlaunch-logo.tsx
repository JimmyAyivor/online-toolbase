import Image from "next/image";

export default function MicroLaunchLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/microlaunch-logo.svg"
        alt="Microlaunch Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
