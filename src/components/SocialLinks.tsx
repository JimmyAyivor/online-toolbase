// src/components/SocialLinks.tsx
//
// Social media links for building authority.
// Three variants:
//   <SocialLinks />                  — icon-only row (navbar / footer)
//   <SocialLinks variant="badges" /> — icon + label pills (sidebar / about page)
//   <SocialLinks variant="card" />   — full follow card (blog sidebar, homepage)
//
// Update PROFILES below with your actual handles/URLs.

import Link from "next/link";

// ─── Update these with your real social profiles ───────────────────────────────
const PROFILES = [
  {
    id: "twitter",
    label: "X / Twitter",
    handle: "@onlinetoolbase",
    href: "https://twitter.com/onlinetoolbase",
    followers: "Follow for tips",
    color: "#000000",
    hoverBg: "hover:bg-black/5",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Online Tool Base",
    href: "https://linkedin.com/company/onlinetoolbase",
    followers: "Connect with us",
    color: "#0A66C2",
    hoverBg: "hover:bg-blue-50",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "OnlineToolBase",
    href: "https://facebook.com/onlinetoolbase",
    followers: "Like our page",
    color: "#1877F2",
    hoverBg: "hover:bg-blue-50",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "pinterest",
    label: "Pinterest",
    handle: "OnlineToolBase",
    href: "https://pinterest.com/onlinetoolbase",
    followers: "Save ideas",
    color: "#E60023",
    hoverBg: "hover:bg-red-50",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "OnlineToolBase",
    href: "https://youtube.com/@onlinetoolbase",
    followers: "Watch guides",
    color: "#FF0000",
    hoverBg: "hover:bg-red-50",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ─── Icon-only variant (default — for navbar/footer) ──────────────────────────
function IconRow() {
  return (
    <div className="flex items-center gap-1">
      {PROFILES.map((p) => (
        <a
          key={p.id}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${p.label}`}
          title={p.label}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 ${p.hoverBg} hover:text-slate-700 transition-all duration-200`}
          style={{ "--hover-color": p.color } as React.CSSProperties}
        >
          {p.icon}
        </a>
      ))}
    </div>
  );
}

// ─── Badge pills variant (sidebar / about page) ────────────────────────────────
function Badges() {
  return (
    <div className="flex flex-wrap gap-2">
      {PROFILES.map((p) => (
        <a
          key={p.id}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${p.label}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm text-slate-600 hover:text-slate-900 text-xs font-medium transition-all duration-200"
        >
          <span style={{ color: p.color }}>{p.icon}</span>
          {p.label}
        </a>
      ))}
    </div>
  );
}

// ─── Full card variant (blog sidebar, homepage section) ────────────────────────
function Card() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
          Follow Us
        </p>
      </div>
      <div className="p-3 space-y-0.5">
        {PROFILES.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white"
              style={{ backgroundColor: p.color }}
            >
              <span className="scale-75">{p.icon}</span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors leading-none mb-0.5">
                {p.label}
              </p>
              <p className="text-xs text-slate-400">{p.followers}</p>
            </div>
            <svg
              className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

interface Props {
  variant?: "icons" | "badges" | "card";
}

export default function SocialLinks({ variant = "icons" }: Props) {
  if (variant === "badges") return <Badges />;
  if (variant === "card") return <Card />;
  return <IconRow />;
}

// Named export of the profiles array so other components can use it
export { PROFILES };