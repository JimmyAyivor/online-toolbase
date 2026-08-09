"use client";
// src/app/tools/image-cropper-resizer/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/image-cropper-resizer";
const TOOL_NAME = "Image Cropper & Resizer";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#134e4a", light: "#f0fdfa" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-teal-100 shadow-inner mb-5">
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
    "Free image cropper & resizer — crop, resize, rotate, and flip images in your browser. Social media presets, aspect ratio lock. No upload, no signup.",
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
                <span className="text-teal-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const SOCIAL_SIZES = [
  [
    "Twitter / X header",
    "1500 × 500",
    "3:1",
    "Profile page banner behind avatar",
  ],
  ["Twitter / X post", "1200 × 675", "16:9", "Inline image in tweet feed"],
  ["Instagram square", "1080 × 1080", "1:1", "Standard grid post"],
  [
    "Instagram portrait",
    "1080 × 1350",
    "4:5",
    "Portrait grid post (takes more feed space)",
  ],
  [
    "Instagram Story / Reel",
    "1080 × 1920",
    "9:16",
    "Full-screen vertical format",
  ],
  ["Facebook cover", "820 × 312", "~2.6:1", "Page cover photo on desktop"],
  ["Facebook post", "1200 × 630", "~1.9:1", "Shared link preview image"],
  ["LinkedIn banner", "1584 × 396", "4:1", "Profile background banner"],
  [
    "YouTube thumbnail",
    "1280 × 720",
    "16:9",
    "Video thumbnail (minimum 640 × 360)",
  ],
  [
    "Open Graph / OG image",
    "1200 × 630",
    "~1.9:1",
    "Link preview for Facebook, Slack, iMessage",
  ],
];

const FAQS = [
  {
    q: "Does this tool upload my images to a server?",
    a: "No — all processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device: they are not uploaded to any server, stored in a database, or transmitted over the internet. The tool reads your image file locally, draws it onto an off-screen HTML canvas element, applies the crop and resize operations, and then generates a downloadable file from the canvas — all within your browser tab. This means the tool works offline once the page has loaded, is completely private, and there are no file size limits imposed by server upload restrictions. The only limit is your browser's memory, which is typically sufficient for images up to 50–100 MB.",
  },
  {
    q: "What is the difference between cropping and resizing?",
    a: "Cropping and resizing are two distinct operations that are often confused. Resizing changes the dimensions of the entire image — the full image content is scaled up or down to fit new width and height values. If you maintain the aspect ratio, the image proportions stay the same; if you don't, the image will be stretched or squashed. Resizing does not remove any content — it scales everything. Cropping, in contrast, removes part of the image — it selects a rectangular area of the original image and discards everything outside that area. The selected area is not scaled; it's extracted at its original pixel dimensions (unless you also specify output dimensions). You can combine both: crop an area from the original image and then resize that cropped area to specific output dimensions.",
  },
  {
    q: "What does 'lock aspect ratio' mean and when should I use it?",
    a: "The aspect ratio is the proportional relationship between width and height — for example, 16:9, 4:3, or 1:1. Locking the aspect ratio means that when you change one dimension (width or height), the other adjusts automatically to maintain the same proportion. This prevents distortion — the image content won't be stretched or squashed. Enable aspect ratio lock when you need to make an image smaller or larger while keeping it looking correct, or when a platform requires a specific aspect ratio (like 1:1 for Instagram or 16:9 for YouTube). Disable it when you intentionally need different proportions — for example, converting a 4:3 photo to a 16:9 video thumbnail, where you accept that some content may need to be cropped.",
  },
  {
    q: "What are the standard image sizes for social media profiles and posts?",
    a: "Social media platforms have specific recommended image dimensions. Profile pictures are typically square: 400×400 px for Twitter/X, 170×170 px for Facebook, 110×110 px for Instagram (displayed as a circle). For cover/banner photos: Twitter/X header is 1500×500 px; Facebook cover is 820×312 px on desktop; LinkedIn profile banner is 1584×396 px. For post images: Instagram square posts are 1080×1080 px; Instagram portrait posts are 1080×1350 px; Twitter/X post images are 1200×675 px (16:9); Facebook shared images are 1200×630 px. For stories and vertical formats: Instagram, Facebook, and TikTok Stories are all 1080×1920 px (9:16 aspect ratio). Note that these recommendations change periodically — always verify current guidelines on the platform's help centre.",
  },
  {
    q: "What output formats are supported and which should I choose?",
    a: "This tool outputs JPEG, PNG, and WebP. Choose JPEG for photographs and images with many colours and gradients — it offers good quality at small file sizes using lossy compression, but does not support transparency. JPEG is the standard for photos shared on social media and the web. Choose PNG when you need lossless quality (no compression artefacts), transparency (transparent backgrounds), or for screenshots and graphics with text and sharp edges. PNG files are larger than JPEGs at equivalent dimensions. Choose WebP for the best balance: it offers better compression than both JPEG and PNG, supports transparency like PNG, and is supported by all modern browsers. WebP is ideal for web use but may have limited support in some older software. If you're unsure, JPEG is the safest default for photos; PNG for graphics with transparency.",
  },
  {
    q: "How do I resize an image for email without it being too large to send?",
    a: "Email attachments are typically limited to 10–25 MB by most providers (Gmail, Outlook), and email clients may display large images at reduced quality anyway. For email images: resize photos to a maximum of 1200 pixels wide for inline images, or 800 pixels wide if the email will be viewed primarily on mobile. A good target file size is under 500 KB per image. Use JPEG format with quality set to 70–80% for the best size-to-quality ratio. For a typical 12-megapixel phone photo (4000×3000 px, ~4–8 MB), resizing to 1200×900 px as a JPEG typically produces a file of 100–300 KB — suitable for email. If you need to share full-resolution photos, use cloud storage (Google Drive, Dropbox, WeTransfer) and share a link rather than attaching the file directly.",
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
              <span className="text-teal-600 text-lg shrink-0">
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
          How to Use the Image Cropper & Resizer
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Upload an image, set your dimensions or pick a social media preset,
          optionally rotate or flip, preview the result, and download — all in
          your browser with no upload to any server.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Upload your image",
              body: "Click 'Click to Upload Image' or drag and drop a file onto the upload area. Supported formats are JPG/JPEG, PNG, WebP, and GIF. The tool loads the image locally in your browser — it is never sent to a server. Once uploaded, the original image dimensions are shown (width × height in pixels) alongside the file name and size. You can upload a new image at any time by clicking the upload area again.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Privacy note:</strong> All processing is done locally
                  using the HTML5 Canvas API. Your image never leaves your
                  device — it is not uploaded, stored, or transmitted anywhere.
                  The tool works entirely offline once the page has loaded. This
                  makes it safe for confidential images, personal photos, and
                  sensitive documents.
                </div>
              ),
            },
            {
              n: 2,
              title: "Set dimensions or select a social media preset",
              body: "Enter the target width and height in pixels, or click one of the social media preset buttons to auto-fill the recommended dimensions for that platform. Available presets include Twitter/X header (1500×500), Twitter/X post (1200×675), Instagram square (1080×1080), Instagram Story (1080×1920), Facebook cover (820×312), YouTube thumbnail (1280×720), and others. Toggle the aspect ratio lock (🔒) to maintain proportions — when locked, changing one dimension adjusts the other automatically.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Platform
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Size (px)
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Ratio
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {SOCIAL_SIZES.map(([platform, size, ratio, use]) => (
                        <tr key={platform} className="hover:bg-teal-50">
                          <td className="px-4 py-2 font-medium text-gray-900 text-xs">
                            {platform}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono font-bold text-teal-700">
                            {size}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {ratio}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
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
              title: "Rotate or flip (optional)",
              body: "Use the Transform buttons to rotate the image 90° left or right, or to flip it horizontally or vertically before resizing. Rotate applies before the resize operation — the rotated dimensions become the new source for the width/height calculation. Flip is non-destructive: flipping horizontally mirrors the image left-to-right, while flipping vertically mirrors it top-to-bottom. These transforms are useful for correcting orientation issues (EXIF rotation data is not always respected by browsers) or creating mirrored versions of graphics.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>EXIF orientation note:</strong> Many phone cameras
                  store photos with EXIF orientation metadata — the image data
                  is saved sideways, with a flag telling software to display it
                  rotated. Some browsers and tools respect this flag
                  automatically; others don't, leading to images appearing
                  sideways. If your uploaded image appears rotated incorrectly,
                  use the Rotate button to correct it before resizing — the
                  exported image will embed the correct orientation.
                </div>
              ),
            },
            {
              n: 4,
              title: "Preview and download",
              body: "The Preview panel shows a live preview of how your image will look at the specified dimensions. Click 'Download Resized Image' to save the result. The download format defaults to the same format as the uploaded file (JPEG for .jpg files, PNG for .png files, etc.). The downloaded file reflects all applied transformations — dimensions, rotation, and flips. The output uses the browser's default canvas quality settings, which produce good results for web use.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>File format tip:</strong> For photographs, download as
                  JPEG for the smallest file size. For graphics, logos, or
                  images with transparency, use PNG to preserve sharp edges and
                  transparent areas. WebP offers the best compression ratio and
                  supports transparency, but may not open in all older
                  applications. If you need the image for social media or a
                  website, JPEG or WebP are usually optimal; for print or
                  archival use, PNG preserves the most quality.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📱",
              title: "Social media images",
              desc: "Resize photos to exact platform requirements — Instagram 1:1, Twitter header 3:1, YouTube thumbnail 16:9, and more.",
            },
            {
              emoji: "📧",
              title: "Email attachments",
              desc: "Reduce large phone photos to a reasonable size before emailing — resize to 1200px wide for a fraction of the original file size.",
            },
            {
              emoji: "🌐",
              title: "Website and blog images",
              desc: "Resize images to the exact pixel dimensions your website or CMS requires for featured images, hero banners, or thumbnails.",
            },
            {
              emoji: "🖼️",
              title: "Profile pictures",
              desc: "Crop and resize a photo to the square format required for profile pictures across social networks and workplace tools.",
            },
            {
              emoji: "📄",
              title: "Document and presentation images",
              desc: "Resize images to specific dimensions needed for Word documents, PowerPoint slides, or PDF layouts.",
            },
            {
              emoji: "🎮",
              title: "Game and app assets",
              desc: "Resize and crop sprites, icons, and screenshots to the exact pixel dimensions required for game or app development.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-teal-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your images never leave your device — all processing happens in your
            browser
          </h3>
          <p className="text-teal-100 leading-relaxed max-w-xl mx-auto text-sm">
            Unlike many online image tools that upload your files to a server
            for processing, this tool uses the browser's built-in HTML5 Canvas
            API to perform all crop and resize operations locally. Nothing is
            transmitted, stored, or logged. This approach is not only more
            private — it's also faster, works offline once loaded, and has no
            file size limits beyond your device's available memory. It's
            particularly valuable for sensitive images like scanned documents,
            identification photos, medical images, or confidential business
            materials that you wouldn't want to upload to a third-party server.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Image Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/image-compressor",
                label: "Image Compressor",
                desc: "Compress JPG, PNG, and WebP images to reduce file size without losing visible quality.",
              },
              {
                href: "/tools/image-format-converter",
                label: "Image Format Converter",
                desc: "Convert images between PNG, JPG, WebP, and other formats online — no upload required.",
              },
              {
                href: "/tools/background-remover",
                label: "Background Remover",
                desc: "Remove image backgrounds automatically with AI — create transparent PNGs in seconds.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-teal-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
