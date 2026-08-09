"use client";
// src/app/tools/image-compressor/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/image-compressor";
const TOOL_NAME = "Image Compressor";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#3b0764", light: "#faf5ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-violet-100 shadow-inner mb-5">
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
    "Free image compressor — compress JPG, PNG, WebP in your browser. Adjustable quality, before/after comparison. No upload, no signup.",
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
                <span className="text-violet-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const QUALITY_TABLE = [
  [
    "90–100%",
    "High Quality",
    "~20–40% reduction",
    "Print, archival, professional photography",
  ],
  [
    "70–89%",
    "Balanced",
    "~40–60% reduction",
    "General web use, social media, email",
  ],
  [
    "50–69%",
    "Medium",
    "~60–75% reduction",
    "Blog thumbnails, preview images, low-bandwidth",
  ],
  [
    "30–49%",
    "High Compression",
    "~75–85% reduction",
    "Tiny previews, placeholder images",
  ],
  [
    "10–29%",
    "Maximum Compression",
    "~85–95% reduction",
    "Lowest quality — noticeable artefacts",
  ],
];

const FAQS = [
  {
    q: "Does this tool upload my images to a server?",
    a: "No. All compression processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device — they are not uploaded to any server, stored in any database, or transmitted over the internet. The tool reads your image file locally, draws it to an off-screen canvas, re-encodes it as JPEG at the selected quality level, and produces a downloadable file — all within your browser tab. This means the tool is completely private, works offline once loaded, and has no file size limits imposed by upload restrictions. It is safe to use with sensitive, confidential, or personal images.",
  },
  {
    q: "What quality setting should I use?",
    a: "The optimal quality setting depends on your use case. For images displayed on websites or shared on social media, 70–80% quality typically produces files 40–60% smaller than the original with no visually perceptible quality loss to most viewers — this is the standard range used by major platforms like Facebook and Instagram when they re-compress uploaded images. For professional photography or print, use 90%+. For small preview images or thumbnails, 50–65% is fine. For maximum file size reduction where quality is not critical (e.g., loading placeholders), go as low as 30–40%. The quality slider in this tool lets you find the right balance — adjust it and watch the file size and preview update in real time.",
  },
  {
    q: "Why is the compressed file sometimes larger than the original?",
    a: "This can happen in a few specific situations. If the original image was already heavily compressed (e.g., a JPEG saved at quality 60%), re-encoding it as JPEG at quality 80–100% may produce a larger file because you're encoding a lossy-compressed source at higher quality than the original. Additionally, PNG files use lossless compression — converting a well-optimised PNG to JPEG at high quality can sometimes be larger than the original PNG, depending on the image content. If you're seeing larger output, try a lower quality setting (60–75% is often ideal) or check whether the original file was already optimised. For PNG-to-PNG compression, a dedicated lossless PNG tool (like pngquant) would be more effective.",
  },
  {
    q: "What is the difference between lossy and lossless compression?",
    a: "Lossy compression permanently discards some image data to achieve smaller file sizes. JPEG uses lossy compression — at lower quality settings, the algorithm discards fine detail, colour gradients, and sharp edges, producing visible artefacts (blockiness, blurring) at extreme settings. The advantage is dramatically smaller files: a 5 MB JPEG photo might compress to 200–500 KB at quality 75 with minimal visible difference. Lossless compression reduces file size without discarding any data — the decompressed image is pixel-for-pixel identical to the original. PNG and WebP (in lossless mode) support lossless compression. Lossless files are larger than lossy but preserve every pixel perfectly — important for logos, screenshots, text-heavy images, and graphics where artefacts would be visible. This tool uses JPEG lossy compression for output.",
  },
  {
    q: "What image formats does this tool support?",
    a: "This tool accepts JPG/JPEG, PNG, and WebP as input. The output is always JPEG, which is the most universally compatible format for sharing and displaying photos on the web, via email, and in documents. JPEG is ideal for photographs and images with smooth colour gradients. If you need lossless output (preserving transparency or avoiding any quality loss), a different tool would be needed, as JPEG does not support transparency and always applies lossy compression. For PNG-to-PNG lossless compression or WebP output, dedicated tools like Squoosh (by Google) or pngquant offer additional format flexibility.",
  },
  {
    q: "How much will my image actually be reduced in size?",
    a: "The reduction depends on the original image's content, its existing compression level, and your chosen quality setting. A typical uncompressed or lightly-compressed JPEG photo at quality 80% will be reduced by 40–60% — a 4 MB photo might compress to 1.5–2.5 MB. At quality 60%, reductions of 65–75% are common. PNG files, which use lossless compression, often compress more dramatically when converted to JPEG: a 2 MB PNG screenshot might become a 200 KB JPEG at quality 80%. Images with lots of flat colour, simple graphics, or text compress more than photos with complex textures. The tool shows you the actual before/after sizes and percentage saved so you can see the real-world result for your specific image.",
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
              <span className="text-violet-600 text-lg shrink-0">
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
          How to Use the Image Compressor
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Upload a JPG, PNG, or WebP image, adjust the quality slider, compare
          the before and after sizes, and download — all in your browser with no
          file upload to any server.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Upload your image",
              body: "Click the upload area or drag and drop a JPG, PNG, or WebP image onto it. The tool loads the file locally in your browser — it is never sent to any server. Once loaded, the tool immediately compresses the image at the default quality of 80% and shows you the original file size, compressed file size, and the percentage reduction achieved. You can upload a new image at any time by clicking 'Clear & Upload New'.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Privacy note:</strong> All compression is performed
                  locally using the HTML5 Canvas API. Your images never leave
                  your device — not uploaded, not stored, not logged. The tool
                  works offline once the page has loaded. Safe for sensitive
                  documents, personal photos, and confidential business images.
                </div>
              ),
            },
            {
              n: 2,
              title: "Adjust the quality slider",
              body: "The quality slider runs from 10% (maximum compression, smallest file) to 100% (no compression). The slider is colour-coded: red at the low end, yellow in the middle, green at the high end. As you drag the slider, the tool immediately recompresses the image and updates the compressed file size, percentage saved, and the compressed preview image. The slider label shows whether you're in 'High Compression', 'Medium', 'Balanced', or 'High Quality' territory. For most web and email use, 70–80% is the ideal balance of quality and file size reduction.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Quality
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Label
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Typical reduction
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {QUALITY_TABLE.map(([q, label, reduction, use]) => (
                        <tr key={q} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700 text-xs font-mono">
                            {q}
                          </td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">
                            {label}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">
                            {reduction}
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
              title: "Compare original vs compressed",
              body: "The tool shows the original and compressed images side-by-side so you can visually compare quality at your chosen setting. Above the images, three stat cards show the Original Size, Compressed Size, and the Saved percentage in bold. Use the visual comparison to judge whether the quality difference is acceptable for your use case — at quality 70–80%, most viewers cannot distinguish the compressed image from the original for typical photos. At quality 50% and below, some artefacts (blockiness or colour banding) may be visible in detailed areas.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>What to look for in the comparison:</strong> Smooth
                  gradients (sky, skin tones) compress well even at low quality.
                  Areas with fine text, sharp geometric edges (logos, icons), or
                  high-contrast detail show artefacts first at lower quality
                  settings. If you see visible blockiness or 'smearing' in the
                  compressed preview, increase the quality by 5–10% and recheck.
                </div>
              ),
            },
            {
              n: 4,
              title: "Download the compressed image",
              body: "Click 'Download Compressed Image' to save the result. The file is saved as a JPEG with a 'compressed_' prefix added to the original filename — for example, 'compressed_photo.jpg'. The download is generated directly from the browser's canvas and does not require any server round-trip. If you want to try a different quality level, adjust the slider and download again — you can download as many times as you like at different quality settings.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Output format note:</strong> This tool outputs JPEG
                  regardless of the input format. JPEG is the most compatible
                  format for web use, email, and document embedding. If your
                  original was a PNG with transparency, the transparent areas
                  will be filled with white in the JPEG output. For lossless
                  compression or transparency-preserving output, consider a
                  WebP-capable tool like Google's Squoosh.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-lg flex items-center justify-center">
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
              title: "Website performance",
              desc: "Reduce image file sizes to improve page load speed, Core Web Vitals scores, and search engine rankings.",
            },
            {
              emoji: "📧",
              title: "Email attachments",
              desc: "Compress photos before emailing so they come in well under attachment size limits and load quickly in the recipient's inbox.",
            },
            {
              emoji: "📱",
              title: "Social media uploads",
              desc: "Reduce file size before uploading to avoid double-compression by the platform's own recompression algorithms.",
            },
            {
              emoji: "☁️",
              title: "Cloud storage savings",
              desc: "Reduce the storage footprint of large photo libraries on Google Drive, Dropbox, or iCloud without visible quality loss.",
            },
            {
              emoji: "📝",
              title: "Document and presentation images",
              desc: "Compress photos embedded in Word, PowerPoint, or PDF files to keep document file sizes manageable.",
            },
            {
              emoji: "🛒",
              title: "E-commerce product images",
              desc: "Compress product photos to reduce page load time on product pages — critical for conversion rates and mobile shoppers.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your images never leave your device — compression happens entirely
            in your browser
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Unlike cloud-based image tools that require uploading your files to
            a remote server, this compressor uses the browser's built-in HTML5
            Canvas API to process everything locally. No files are transmitted,
            stored, logged, or accessible to anyone other than you. This makes
            it suitable for compressing sensitive documents, medical images,
            identification photos, confidential business materials, and any
            other images you wouldn't want to upload to a third-party service.
            The tool also works offline once the page has loaded, and there are
            no file size limits beyond your browser's available memory.
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
                desc: "Crop and resize images to exact pixel dimensions — social media presets, aspect ratio lock, rotate and flip.",
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
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
