"use client";
// src/app/tools/profile-picture-resizer/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL = process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD = process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/profile-picture-resizer";
const TOOL_NAME = "Profile Picture Resizer";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, { width: 220, margin: 2, color: { dark: "#831843", light: "#fdf2f8" } });
    });
    return () => { cancelled = true; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">✕</button>
        <h3 className="text-lg font-black text-gray-900 mb-1">Take it with you</h3>
        <p className="text-sm text-gray-400 mb-5">Scan to open the {TOOL_NAME} on mobile</p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-pink-100 shadow-inner mb-5"><canvas ref={canvasRef} /></div>
        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent("Free profile picture resizer — resize profile photos for Instagram, LinkedIn, Twitter/X, TikTok, Discord, and more. Runs in your browser. No signup.");
  const shareUrl = encodeURIComponent(TOOL_URL);
  const copyLink = () => { navigator.clipboard.writeText(TOOL_URL); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const SHARES = [
    { label: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, bg: "bg-black hover:bg-gray-800" },
    { label: "LinkedIn",    href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,     bg: "bg-[#0A66C2] hover:bg-[#004182]" },
    { label: "Facebook",    href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,             bg: "bg-[#1877F2] hover:bg-[#0c5ab9]" },
    { label: "WhatsApp",    href: `https://wa.me/?text=${shareText}%20${shareUrl}`,                       bg: "bg-[#25D366] hover:bg-[#1da851]" },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><p className="text-sm font-bold text-gray-900 mb-0.5">Found this useful?</p><p className="text-xs text-gray-400">Share the tool or scan to open on your phone</p></div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg }) => (<a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}>{label}</a>))}
            <button onClick={copyLink} className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold">{copied ? <span className="text-pink-600">✓ Copied!</span> : "Copy link"}</button>
            <button onClick={() => setQrOpen(true)} className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all">Scan QR</button>
          </div>
        </div>
      </div>
    </>
  );
}

const PLATFORM_SIZES = [
  ["Instagram",  "110×110px",  "Displays at 110px on desktop; source renders at higher resolution on retina screens. Safe minimum is 320×320px source."],
  ["Facebook",   "170×170px",  "Profile photo displays at 170px on desktop, 128px on mobile. Uploads are cropped to square and stored at 720px."],
  ["Twitter / X","400×400px",  "Displays at 48px in the timeline but stored at 400px for sharp display on high-DPI screens. Use at least 400×400px source."],
  ["LinkedIn",   "400×400px",  "Profile photo minimum is 200×200px; 400×400px is recommended for sharp retina display on desktop and app."],
  ["YouTube",    "800×800px",  "Channel icon displays as a circle; minimum 98×98px but 800×800px recommended for all display contexts."],
  ["TikTok",     "200×200px",  "Profile photo minimum is 20×20px but 200×200px recommended. Displays as a circle in the feed and on profile."],
  ["Discord",    "128×128px",  "Avatar displays at 32–128px depending on context. 128px is the recommended upload size for sharpness everywhere."],
  ["WhatsApp",   "192×192px",  "Profile photo displays at small sizes in chat lists; 192×192px provides sufficient quality for all display sizes."],
  ["Slack",      "512×512px",  "Workspace profile photo; minimum 128×128px but 512×512px recommended for retina display and emoji-size icons."],
  ["GitHub",     "460×460px",  "Avatar used in repositories, pull requests, and comments. 460×460px is the standard stored size."],
];

const FAQS = [
  {
    q: "What size should my profile picture be?",
    a: "Each platform has different recommended profile picture sizes. Instagram displays profile photos at 110×110 pixels but recommends uploading at 320×320 or larger for sharp retina display. Facebook stores photos at 720×720 and displays at 170×170 on desktop. Twitter/X recommends 400×400 pixels. LinkedIn recommends 400×400 pixels with a minimum of 200×200. YouTube recommends 800×800 pixels for channel icons. TikTok displays at 200×200 pixels. Discord recommends 128×128. WhatsApp uses 192×192. Slack recommends 512×512. GitHub uses 460×460 pixels. All platforms use square (1:1 ratio) profile photos displayed as circles on most platforms, though the underlying image is always stored as a square. The general rule is to upload the highest-resolution version you have — platforms scale down automatically, but they cannot scale up without quality loss.",
  },
  {
    q: "Why does my profile picture appear blurry after uploading?",
    a: "Profile picture blurriness after uploading is almost always caused by one of three things. First, the source image is too small — if you upload a 100×100 pixel image to a platform that displays it at 170×170, it will be upscaled and appear blurry. Always start with a source image at least 800×800 pixels. Second, the image was compressed on upload — some platforms, particularly Facebook and WhatsApp, apply aggressive JPEG compression to uploaded photos, which can reduce sharpness, especially around edges and text. Uploading a PNG instead of a JPEG can help, as PNGs are sometimes compressed less aggressively on these platforms. Third, the image contains very fine details that look sharp at full size but disappear at smaller profile photo sizes — simple, bold designs with strong contrast hold up better at small sizes than complex or detailed images.",
  },
  {
    q: "Should profile pictures be PNG or JPEG?",
    a: "PNG is generally the better choice for profile pictures, particularly for logos, text-based graphics, or illustrations with flat colours and sharp edges. PNG uses lossless compression, which means no quality is lost when saving, and it supports transparent backgrounds (though most platforms replace transparency with a white or platform-specific background colour for profile photos). JPEG is appropriate for photographic profile pictures (actual photos of people) where the file size benefit of JPEG compression outweighs the minor quality loss — most social platforms apply their own JPEG compression on upload anyway, so starting with a PNG photograph won't necessarily preserve quality better than a high-quality JPEG source. For logos and designed graphics: use PNG. For actual photos: either works, with PNG being marginally safer.",
  },
  {
    q: "How do I crop a profile picture to a square?",
    a: "This tool automatically centre-crops your image to a square when resizing — you don't need to pre-crop it. The tool takes the largest square from the centre of your image (using whichever dimension is shorter as the square size) and then resizes that to the target platform dimensions. For example, if you upload a landscape photo that is 1200×800 pixels, the tool will centre-crop it to an 800×800 square (taking equal amounts from the left and right) before resizing to the platform size. If the important subject in your photo is off-centre, you may get better results by pre-cropping the image in a photo editor before uploading — position your subject centrally in a square crop, then upload the pre-cropped square image.",
  },
  {
    q: "Is my photo uploaded to a server when I use this tool?",
    a: "No — all image processing in this tool happens entirely within your browser using the Canvas API. When you select an image, it is read locally by your browser's FileReader API and stored in browser memory. The resizing is performed by drawing the image onto an HTML Canvas element at the target dimensions. The result is exported back to your browser as a PNG data URL and offered as a download. Your image is never transmitted to any server. This makes the tool safe to use with personal photos, professional headshots, and confidential brand assets.",
  },
  {
    q: "Why do profile pictures display as circles on most platforms?",
    a: "Most social media platforms display profile photos cropped to a circle using CSS border-radius (a simple CSS property that rounds the corners of a square image into a circle shape). The underlying stored image is always a square — the circular display is purely a presentation layer applied by each platform's interface. This means the corners of your profile photo are hidden behind the circular mask in most views. When choosing or designing a profile photo, ensure the main subject (your face, your logo, or your key graphic) is centred in the square, with enough padding around it so the circular crop doesn't cut into important content. The circular mask typically fits tightly to the edges of the square, so anything very close to the corners will be hidden.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-pink-600 text-lg shrink-0">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</div>}
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
        <div className="hidden sm:block"><AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} /></div>
        <div className="block sm:hidden"><AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} /></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
        <AdSlot variant="leaderboard" slotId={SLOT_LEADERBOARD} className="hidden sm:flex" />
        <AdSlot variant="mediumrectangle" slotId={SLOT_LEADERBOARD} className="flex sm:hidden" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"><ShareBar /></div>

      <section id="how-to-use" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How to Use the Profile Picture Resizer</h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">Upload your photo, select the platform, click Resize, and download the correctly sized PNG — your image never leaves your browser.</p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Upload your source image",
              body: "Click the upload area or drag your image onto it. The tool accepts PNG, JPG, and WEBP formats up to 10 MB. For best results, start with the highest-resolution image you have — at least 800×800 pixels, ideally 1200×1200 or larger. The tool will scale down from a larger source, but cannot recover detail from a small source image. Ensure the main subject (your face or logo) is roughly centred in the original image, as the tool applies a centre-crop when the source is not already square.",
              enrich: <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed"><strong>Source quality tip:</strong> If you're using a photo taken on a smartphone, use the original full-resolution file rather than a compressed or shared version — shared photos are often resized and compressed before sharing. For logos, use the highest-resolution PNG from your design files. Starting with a high-quality source is the single most important factor in getting a sharp profile picture at any platform size.</div>,
            },
            {
              n: 2,
              title: "Select your target platform",
              body: "Click the platform button that matches where you'll upload the profile picture. The tool supports Instagram, Facebook, Twitter/X, LinkedIn, YouTube, TikTok, Discord, WhatsApp, Slack, and GitHub — each at their platform-specific recommended pixel dimensions. You can also click any row in the Platform Size Reference table to select that platform. The selected platform is highlighted in the button grid.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50"><tr><th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">Platform</th><th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">Resized to</th><th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">Note</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                      {PLATFORM_SIZES.map(([platform, size, note]) => (
                        <tr key={platform} className="hover:bg-pink-50">
                          <td className="px-3 py-2 font-bold text-pink-700 text-xs whitespace-nowrap">{platform}</td>
                          <td className="px-3 py-2 text-xs font-mono text-gray-700">{size}</td>
                          <td className="px-3 py-2 text-xs text-gray-500">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Click Resize and download",
              body: "Click the 'Resize for [Platform]' button to process the image. The tool centre-crops the source to a square (taking the shorter dimension as the crop size) and scales it to the platform dimensions. The result appears as a circular preview — showing exactly how it will look on most platforms. Click 'Download PNG' to save the resized image to your device.",
              enrich: <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed"><strong>Centre-crop note:</strong> The tool automatically crops from the centre of your image. If your subject is off-centre (for example, you're standing to one side of a landscape photo), pre-crop your image in a photo editor first — position the subject centrally in a square crop — then upload the pre-cropped image for the best result.</div>,
            },
            {
              n: 4,
              title: "Resize for multiple platforms",
              body: "After downloading for one platform, click a different platform button and click Resize again — your uploaded source image stays in place so you can resize for all 10 platforms in one session without re-uploading. Each download is named with the platform and pixel dimensions (e.g. 'profile-linkedin-400px.png') for easy organisation. There's no limit on how many times you can resize the same source image.",
              enrich: <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed"><strong>Batch workflow:</strong> Upload once, then click through each platform in turn — Instagram, Facebook, LinkedIn, Twitter/X — clicking Resize and Download for each. All files are saved to your device's default download folder with platform-specific names. You can then upload the correct file for each platform without confusion.</div>,
            },
          ].map(({ n, title, body, enrich }) => (
            <div key={n} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 text-white font-black text-lg flex items-center justify-center">{n}</div>
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3><p className="text-gray-600 leading-relaxed mb-3">{body}</p>{enrich}</div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Common use cases</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            { emoji: "👤", title: "Personal rebranding", desc: "Update your profile picture across all platforms at once — resize one source photo to all 10 platform sizes in a single session." },
            { emoji: "🏢", title: "Brand and business profiles", desc: "Resize your logo or brand graphic for consistent visual identity across Instagram, LinkedIn, Twitter/X, YouTube, and Discord." },
            { emoji: "🎙️", title: "Podcast and creator profiles", desc: "Resize a headshot or show artwork for use across YouTube, Spotify, podcast directories, and social media profiles." },
            { emoji: "💼", title: "Professional LinkedIn update", desc: "Resize a professional headshot specifically to LinkedIn's recommended 400×400px dimensions for sharp display on desktop and mobile." },
            { emoji: "🎮", title: "Discord and gaming community", desc: "Resize an avatar or character art to Discord's 128×128 recommended size for sharp display across all server contexts." },
            { emoji: "🔄", title: "Consistent multi-platform presence", desc: "Use the same source photo for all platforms — ensuring your profile is recognisable across every network where you have a presence." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:-translate-y-1 transition-all duration-200">
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🖼️</div>
          <h3 className="text-xl font-bold mb-3">Your profile picture is the first thing every visitor sees — the right size makes it sharp on every screen</h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">A blurry or poorly cropped profile photo is one of the most noticeable signs of an unpolished social media presence — and one of the easiest to fix. Each platform has specific size requirements that ensure your photo displays sharply on both standard and high-DPI (Retina) screens. Uploading the wrong size means the platform scales your image up or applies its own cropping, which often cuts off your face or logo in unexpected places. This tool resizes and centre-crops to the exact dimensions each platform expects — process your source once, download for all platforms, and upload the correct file everywhere.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Free Image Tools</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/image-cropper-resizer", label: "Image Cropper & Resizer", desc: "Crop and resize images with custom dimensions — set exact pixel width and height for any use." },
              { href: "/tools/image-compressor", label: "Image Compressor", desc: "Reduce image file size without visible quality loss — useful before uploading to social platforms." },
              { href: "/tools/favicon-generator", label: "Favicon Generator", desc: "Generate favicons in all standard sizes from any image — download PNGs, ICO, and webmanifest." },
            ].map(({ href, label, desc }) => (
              <a key={href} href={href} className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-pink-200 hover:-translate-y-1 transition-all duration-200 p-5">
                <div className="font-bold text-gray-900 text-sm mb-1">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}