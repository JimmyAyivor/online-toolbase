// src/components/logos/semrush-logo.tsx

export default function SemrushLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      className={className}
      aria-label="Semrush Logo"
      role="img"
    >
      <path
        fill="currentColor"
        d="M20.57 0c5.03 0 9.14 4.2 9.14 9.22a9.2 9.2 0 0 1-8.9 9.21H7.72l7.9-4.25H0l14.2-7.64H6.37l9.54-5.12C17.62.52 19.16 0 20.57 0"
      />
    </svg>
  );
}
