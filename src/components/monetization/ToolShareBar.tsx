"use client";
// src/components/monetization/ToolShareBar.tsx
//
// Appears after a user uses a tool, prompting them to share it.
// Organic shares drive free traffic — every share is a micro-acquisition.
// The bar appears with a delay, can be dismissed, and tracks shares in analytics.
//
// Usage — add to any tool page below the tool component:
//   import ToolShareBar from "@/components/monetization/ToolShareBar";
//   <ToolShareBar
//     toolSlug="sales-tax-calculator"
//     toolName="Sales Tax Calculator"
//     toolDescription="Free sales tax calculator for all 50 US states"
//   />

import { useState, useEffect } from "react";

const SITE_URL = "https://onlinetoolbase.com";

interface Props {
  toolSlug: string;
  toolName: string;
  toolDescription?: string;
  /** Delay before the bar appears — lets user see their result first */
  delayMs?: number;
}

type SharePlatform = "twitter" | "linkedin" | "whatsapp" | "copy";

function buildShareUrl(
  platform: SharePlatform,
  toolUrl: string,
  toolName: string,
  toolDescription: string,
) {
  const text = `Just used ${toolName} — free, no signup needed.`;
  const encoded = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(toolUrl);
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encoded}%20${encodedUrl}`;
    default:
      return toolUrl;
  }
}

export default function ToolShareBar({
  toolSlug,
  toolName,
  toolDescription = "",
  delayMs = 2000,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shared, setShared] = useState(false);

  const toolUrl = `${SITE_URL}/tools/${toolSlug}`;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  const handleShare = (platform: SharePlatform) => {
    if (platform === "copy") {
      navigator.clipboard.writeText(toolUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      window.open(
        buildShareUrl(platform, toolUrl, toolName, toolDescription),
        "_blank",
        "noopener,noreferrer",
      );
    }
    setShared(true);
  };

  if (dismissed || !visible) return null;

  const SHARE_BUTTONS: {
    id: SharePlatform;
    label: string;
    icon: React.ReactNode;
    style: string;
  }[] = [
    {
      id: "twitter",
      label: "X / Twitter",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      style: "bg-black hover:bg-gray-800 text-white",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      style: "bg-[#0A66C2] hover:bg-[#004182] text-white",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      style: "bg-[#25D366] hover:bg-[#1da851] text-white",
    },
    {
      id: "copy",
      label: copied ? "Copied!" : "Copy link",
      icon: copied ? (
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      style: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    },
  ];

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Copy */}
          <div className="flex-1 min-w-0">
            {shared ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm font-semibold">Thanks for sharing!</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-900">
                  Found this useful? Share it.
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Free tools are better when more people know about them.
                </p>
              </>
            )}
          </div>

          {/* Share buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {SHARE_BUTTONS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleShare(btn.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm ${btn.style}`}
              >
                {btn.icon}
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            ))}

            <button
              onClick={() => setDismissed(true)}
              className="text-xs text-gray-400 hover:text-gray-500 transition-colors ml-1"
              aria-label="Dismiss share bar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
