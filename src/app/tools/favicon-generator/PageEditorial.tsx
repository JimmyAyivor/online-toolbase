"use client";
// src/app/tools/favicon-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/favicon-generator";
const TOOL_NAME = "Favicon Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7c2d12", light: "#fff7ed" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-orange-100 shadow-inner mb-5">
          <canvas ref={canvasRef} />
        </div>
        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free favicon generator — create favicons in all sizes from any image. Download PNGs, ICO, HTML code, and webmanifest. No signup.",
  );
  const shareUrl = encodeURIComponent(TOOL_URL);
  const copyLink = () => {
    navigator.clipboard.writeText(TOOL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const SHARES = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
    },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">
              Found this useful?
            </p>
            <p className="text-xs text-gray-400">
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              {copied ? (
                <span className="text-orange-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAVICON_SIZES = [
  [
    "16×16",
    "favicon-16x16.png",
    "Browser tab icon — the most commonly displayed favicon size",
  ],
  ["32×32", "favicon-32x32.png", "Taskbar shortcut, high-DPI browser tabs"],
  ["48×48", "favicon-48x48.png", "Windows site icon shortcut"],
  ["64×64", "favicon-64x64.png", "Windows site icon and some app shortcuts"],
  ["128×128", "favicon-128x128.png", "Chrome Web Store listings"],
  ["180×180", "apple-touch-icon.png", "iOS Safari 'Add to Home Screen' icon"],
  [
    "192×192",
    "android-chrome-192x192.png",
    "Android Chrome PWA icon (required for web manifest)",
  ],
  [
    "512×512",
    "android-chrome-512x512.png",
    "Android Chrome splash screen, high-res PWA icon",
  ],
];

const FAQS = [
  {
    q: "What is a favicon and why does every website need one?",
    a: "A favicon (short for 'favourite icon') is the small image displayed in browser tabs, bookmarks, and search results to visually identify a website. It appears in the browser tab next to the page title, in the browser's bookmark list, in search engine results on some browsers, and as the icon when a page is saved to a mobile home screen. Without a favicon, browsers display a generic grey icon in the tab, which looks unprofessional and makes it harder for users with multiple tabs open to identify your site. A properly implemented favicon with all required sizes ensures your site is correctly represented across every browser, device, and operating system — from a 16×16 pixel tab icon on desktop to a 512×512 splash screen icon on Android.",
  },
  {
    q: "What favicon sizes do I need for my website?",
    a: "A complete favicon implementation requires multiple sizes for different contexts. The minimum recommended set includes: 16×16 (standard browser tab), 32×32 (high-DPI tabs and taskbar), 180×180 apple-touch-icon.png (iOS Safari home screen), 192×192 android-chrome-192x192.png (Android Chrome PWA icon), and 512×512 android-chrome-512x512.png (Android Chrome splash screen). Optional additional sizes include 48×48 (Windows site icons), 64×64 (some app contexts), and 128×128 (Chrome Web Store). This generator produces all 8 standard sizes plus a favicon.ico file from a single uploaded image.",
  },
  {
    q: "What is a favicon.ico file and is it still needed?",
    a: "favicon.ico is the original favicon format, introduced by Internet Explorer in the late 1990s. It can contain multiple bitmap images at different sizes in a single file. Modern browsers support PNG favicons specified via HTML link tags and don't require a favicon.ico file. However, placing a favicon.ico in your website's root directory (/favicon.ico) is still recommended as a fallback because many older browsers, web crawlers, RSS readers, and bookmarking tools automatically look for /favicon.ico without reading your HTML meta tags. The favicon.ico this tool generates is a 32×32 PNG saved as .ico — this works correctly in all modern browsers and covers the fallback use case without requiring a true multi-resolution ICO file.",
  },
  {
    q: "What is a site.webmanifest and why do I need it?",
    a: "A site.webmanifest (also called a Web App Manifest) is a JSON file that tells browsers how to display your website when it's installed as a Progressive Web App (PWA) or saved to a home screen. It specifies the app name, short name, icon locations and sizes, theme colour, background colour, and display mode (standalone, fullscreen, or browser). Chrome on Android, Samsung Internet, and other modern browsers use the manifest to generate the splash screen, app icon, and name shown when a user installs your website as an app. You reference the manifest in your HTML with a link tag: &lt;link rel='manifest' href='site.webmanifest'&gt;. This generator outputs a complete, ready-to-use site.webmanifest with your app name pre-filled and the correct 192×192 and 512×512 icon references.",
  },
  {
    q: "What type of image should I use as the source for my favicon?",
    a: "For best results, use a square image (equal width and height) in PNG format with a transparent background. The recommended minimum size is 512×512 pixels — larger source images produce sharper results when scaled down to small sizes. Simple, bold designs with strong contrast work best at small sizes: a full-colour illustration or detailed photo becomes indistinct at 16×16 and 32×32 pixels. If your logo is complex, consider creating a simplified version specifically for favicon use — many companies use just their initial or a single simplified icon shape rather than their full logo. Avoid white or light-coloured designs on transparent backgrounds, as they may be invisible in browsers that display tabs on light-coloured backgrounds.",
  },
  {
    q: "How do I add the generated favicons to my website?",
    a: "After downloading the favicon files, place them in your website's root public directory (the same folder as your index.html). Add the HTML link tags generated by this tool inside the &lt;head&gt; section of your HTML. The standard implementation includes: a link tag for the 32×32 PNG, a link tag for the 16×16 PNG, a link tag for the Apple Touch Icon (180×180), and a link tag referencing your site.webmanifest. Also place your favicon.ico file in the root directory — browsers will find it automatically without a link tag. For React/Next.js sites, place files in the /public directory and add link tags to your _document.js or layout.tsx head. For WordPress, use a favicon plugin or your theme's Customizer under Site Identity.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-orange-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="px-5 text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-200"
              style={{
                maxHeight: open === i ? "1000px" : "0px",
                paddingBottom: open === i ? "20px" : "0px",
                visibility: open === i ? "visible" : "hidden",
              }}
              aria-hidden={open !== i}
            >
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className="block sm:hidden">
          <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
        <AdSlot
          variant="leaderboard"
          slotId={SLOT_LEADERBOARD}
          className="hidden sm:flex"
        />
        <AdSlot
          variant="mediumrectangle"
          slotId={SLOT_LEADERBOARD}
          className="flex sm:hidden"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ShareBar />
      </div>

      <section
        id="how-to-use"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the Favicon Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Upload your logo or image, download all 8 favicon sizes as PNGs, grab
          the favicon.ico, copy the HTML code, and save the site.webmanifest —
          everything you need in one step.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Upload your logo or image",
              body: "Click the upload area or drag your image onto it. Use a square PNG image with a transparent background for best results — minimum 512×512 pixels recommended. The larger your source image, the sharper the scaled-down versions will be. Simple, bold designs with high contrast work best at the small sizes required for browser tabs (16×16 and 32×32 pixels).",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Source image tips:</strong> Use a square PNG (1:1
                  aspect ratio). Minimum 512×512px — 1024×1024px is ideal. Use a
                  transparent background if you want the favicon to sit cleanly
                  on any browser tab colour. Avoid very detailed images — they
                  become indistinct at 16×16. Consider creating a simplified
                  favicon version of your logo (initials, a single icon shape)
                  if your full logo is complex.
                </div>
              ),
            },
            {
              n: 2,
              title: "Download the generated favicons",
              body: "The tool generates 8 favicon sizes from your image. Click 'Download All' to save all sizes, or download individual sizes using the button below each preview. Also download the favicon.ico file (a 32×32 PNG saved as .ico for browser fallback compatibility). Place all downloaded files in your website's root public directory.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Size
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Filename
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Used for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {FAVICON_SIZES.map(([size, filename, use]) => (
                        <tr key={size} className="hover:bg-orange-50">
                          <td className="px-3 py-2 font-bold text-orange-700 text-xs whitespace-nowrap">
                            {size}
                          </td>
                          <td className="px-3 py-2 text-xs font-mono text-gray-700">
                            {filename}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {use}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Copy the HTML code",
              body: "Copy the generated HTML link tags from the 'HTML Code' panel. Paste them inside the &lt;head&gt; section of your website's HTML. This tells browsers which favicon files to use and where to find them. For React/Next.js apps, add them to your layout.tsx or _document.js head component. For WordPress, add them to your theme's header.php or use a plugin that supports custom favicon HTML.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Where to place the tags:</strong> The link tags must
                  be inside the &lt;head&gt; element of your HTML — not the
                  &lt;body&gt;. Place them after your &lt;title&gt; tag and
                  before any stylesheet links. In Next.js 13+, add them inside
                  the metadata export or as JSX in your root layout.tsx. In
                  plain HTML, paste directly after &lt;head&gt;.
                </div>
              ),
            },
            {
              n: 4,
              title: "Save and deploy the site.webmanifest",
              body: "Copy the site.webmanifest JSON from the manifest panel and save it as 'site.webmanifest' in your website's root directory (the same directory as your favicon files). This file is required for Progressive Web App (PWA) functionality and for Android Chrome to correctly show your app name and icons when users install your website to their home screen. The manifest is already pre-configured with your app name and the correct 192×192 and 512×512 icon file references.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>After deployment, test your favicon:</strong> Open
                  your site in Chrome and check the browser tab — your favicon
                  should appear within a few seconds of the page loading. Clear
                  your browser cache if you don't see it (Ctrl+Shift+R /
                  Cmd+Shift+R). Check the iOS home screen icon by visiting your
                  site in Safari on iPhone and using the 'Add to Home Screen'
                  option in the Share menu.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center">
                {n}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common use cases
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🌐",
              title: "New website launch",
              desc: "Generate the complete favicon set for a new site — all required sizes, HTML code, and manifest in one step before going live.",
            },
            {
              emoji: "⚛️",
              title: "React / Next.js apps",
              desc: "Generate favicons sized to Next.js's public folder conventions — 16, 32, 180, 192, and 512px sizes plus the webmanifest JSON.",
            },
            {
              emoji: "📱",
              title: "Progressive Web Apps",
              desc: "Generate the 192×192 and 512×512 sizes required for PWA installation icons and the site.webmanifest with correct icon entries.",
            },
            {
              emoji: "🔄",
              title: "Brand refresh",
              desc: "Regenerate all favicon sizes when updating a brand logo — replace the old files in your root directory and clear CDN cache.",
            },
            {
              emoji: "🏪",
              title: "Chrome Web Store extensions",
              desc: "Generate the 128×128 PNG required for Chrome extension listings alongside all other standard sizes.",
            },
            {
              emoji: "🍎",
              title: "iOS home screen icons",
              desc: "Generate the 180×180 apple-touch-icon.png for iOS Safari 'Add to Home Screen' — displays as the app icon on iPhone and iPad.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🌐</div>
          <h3 className="text-xl font-bold mb-3">
            A missing favicon is one of the easiest things to fix — and one of
            the most visible signs of an unfinished website
          </h3>
          <p className="text-orange-100 leading-relaxed max-w-xl mx-auto text-sm">
            When a site has no favicon, browsers display a generic grey icon in
            the tab — immediately signalling to visitors that the site is either
            unfinished or low-quality. It's a small detail that has an outsized
            impact on perceived professionalism, particularly for users who keep
            many tabs open and need to visually identify sites at a glance. A
            complete favicon implementation — covering browser tabs, bookmarks,
            mobile home screen icons, and PWA splash screens — takes less than
            two minutes with this tool. Generate once, deploy once, and your
            site presents correctly across every browser and device.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Image Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/image-cropper-resizer",
                label: "Image Cropper & Resizer",
                desc: "Crop and resize images quickly in your browser — no software installation required.",
              },
              {
                href: "/tools/image-format-converter",
                label: "Image Format Converter",
                desc: "Convert images between PNG, JPG, WebP, and other formats online — free and instant.",
              },
              {
                href: "/tools/hex-color-code-generator",
                label: "Hex Color Code Generator",
                desc: "Generate hex colour codes with a visual colour picker — shows HEX, RGB, and HSL values.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-orange-200 hover:-translate-y-1 transition-all duration-200 p-5"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {label}
                </div>
                <div className="text-xs text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
