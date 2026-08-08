// src/components/logos/betalist-logo.tsx

export default function BetaListLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <div
      className={`${className} grid grid-cols-5`}
      aria-label="BetaList Logo"
      role="img"
    >
      <div className="col-span-3 bg-black dark:bg-black rounded-sm" />

      <div className="col-span-full" />

      <div className="col-span-full bg-black dark:bg-black rounded-sm" />

      <div className="col-span-full" />

      <div className="col-span-full bg-black dark:bg-black rounded-sm" />
    </div>
  );
}
