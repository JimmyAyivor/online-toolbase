export default function TinyStartUpsLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="rg"
          x1="8"
          y1="58"
          x2="56"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EC4899"></stop>
          <stop offset="50%" stopColor="#8B5CF6"></stop>
          <stop offset="100%" stopColor="#38BDF8"></stop>
        </linearGradient>
      </defs>
      <g
        stroke="url(#rg)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 6 C38 12,42 20,42 28 L42 42 C42 46,39 49,36 49 L28 49 C25 49,22 46,22 42 L22 28 C22 20,26 12,32 6 Z"></path>
        <circle cx="32" cy="26" r="4"></circle>
        <path d="M22 38 L42 38"></path>
        <path d="M22 34 L14 40 L14 50 L22 46 Z"></path>
        <path d="M42 34 L50 40 L50 50 L42 46 Z"></path>
        <path d="M28 49 C28 54,30 57,32 60 C34 57,36 54,36 49"></path>
      </g>
    </svg>
  );
}
