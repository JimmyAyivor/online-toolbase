"use client";
// src/app/tools/qr-code-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/qr-code-generator";
const TOOL_NAME = "QR Code Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#164e63", light: "#ecfeff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-cyan-100 shadow-inner mb-5">
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
    "Free QR code generator — create QR codes for URLs, WiFi, email, vCard, and more with custom colours, no signup",
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
                <span className="text-cyan-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAQS = [
  {
    q: "What types of QR code can I generate?",
    a: "This tool supports eight QR code content types. Website URL generates a QR code that opens a web address when scanned. Plain Text encodes any text string — useful for short messages, codes, or identifiers. Email generates a mailto: link that opens the user's email client pre-addressed to the specified address. Phone generates a tel: link that prompts the user to call the number. SMS generates an sms: link that opens a text message pre-addressed to the number with an optional pre-filled message body. WiFi generates a WIFI: formatted string that allows phones to join a WiFi network by scanning — no typing the password required. Location generates a geo: link that opens the coordinates in the user's maps application. Contact Card generates a vCard 3.0 format that allows the recipient to save a contact to their phone's address book by scanning.",
  },
  {
    q: "How do I generate a WiFi QR code?",
    a: "Select the WiFi type and enter your network details in the format NetworkName:Password:SecurityType. For example: MyHomeWiFi:mysecretpassword:WPA. The security type is typically WPA (for WPA2 and WPA3 networks), WEP (for older networks), or nopass (for open networks with no password). When someone scans the QR code with their phone camera, they'll be prompted to join the network automatically — no need to type the password. This is particularly useful for guest networks in homes, cafés, offices, and events. Print the QR code and display it near your router or at a reception desk for easy guest access.",
  },
  {
    q: "What size should I make my QR code?",
    a: "The right size depends on how the QR code will be displayed and scanned. For digital use (websites, emails, presentations) a size of 200–300 pixels is sufficient — phones scan QR codes from screens easily at close range. For print materials like business cards, a minimum physical size of 2 × 2 cm (about 0.8 inches) is recommended for reliable scanning. For posters and signage that will be scanned from a distance of 1–2 metres, the QR code should be at least 10 × 10 cm. A general rule: the scanning distance should be no more than 10 times the QR code's physical size. Download the QR code at a higher pixel resolution (400–500px) when printing to ensure sharp edges — low-resolution QR codes print blurry and may fail to scan.",
  },
  {
    q: "Can I customise the colours of my QR code?",
    a: "Yes — the foreground (module) colour and background colour can both be customised using the colour pickers. The foreground colour is the dark modules that form the QR code pattern; the background colour is the light areas. For reliable scanning, the foreground must be significantly darker than the background — high contrast is required. The QR code specification assumes dark-on-light, so avoid inverting this relationship (light foreground on dark background) as it may cause scanning failures on some devices or in poor lighting. Branded QR codes often use a dark brand colour as the foreground and white or a very light tint of the brand colour as the background.",
  },
  {
    q: "What file format does the downloaded QR code use?",
    a: "The downloaded file is a PNG image, which is the most universally compatible format for QR codes. PNG is a lossless format — unlike JPEG, it does not introduce compression artifacts that could blur the sharp edges of QR code modules and cause scanning failures. PNG files can be placed in Word documents, PowerPoint presentations, PDF files, web pages, and printed materials. If you need a vector format (SVG) for large-format printing or print design work, this tool does not currently support SVG output — for those use cases, a desktop QR code tool or a dedicated commercial QR code platform would be more appropriate.",
  },
  {
    q: "How do I format a vCard QR code?",
    a: "Select the Contact Card (vCard) type and enter the contact details in the format Name:Phone:Email — for example: Jane Smith:+447911123456:jane@example.com. The tool encodes this as a vCard 3.0 format, which is the most widely supported contact card standard. When someone scans the QR code, their phone will prompt them to save the contact to their address book with the name, phone number, and email address pre-filled. vCard QR codes are commonly used on business cards as a quick way to share contact details without manual entry. For more complex vCards with multiple fields (address, company, website), you would need to construct the full vCard syntax manually and use the Plain Text type.",
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
              <span className="text-cyan-600 text-lg shrink-0">
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
          How to Use the QR Code Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Choose a content type, enter your data, customise colours and size —
          the QR code generates live and can be downloaded as a PNG.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select a QR code type",
              body: "Choose from eight content types using the type selector buttons: Website URL, Plain Text, Email, Phone, SMS, WiFi, Location, or Contact Card (vCard). Each type formats the encoded data differently — for example, a Phone QR code prefixes the number with tel: so that phones launch the dialler when scanned, while a WiFi QR code uses the WIFI: format that triggers automatic network joining. Switching type clears the current input so you start fresh for the new format.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Input format
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What it opens
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["URL", "https://example.com", "Browser → web page"],
                        [
                          "WiFi",
                          "NetworkName:Password:WPA",
                          "Prompt to join network",
                        ],
                        ["Email", "user@example.com", "Email client"],
                        ["Phone", "+447911123456", "Phone dialler"],
                        [
                          "SMS",
                          "+447911123456:Hi there",
                          "SMS app with pre-filled message",
                        ],
                        ["vCard", "Name:Phone:Email", "Contact save prompt"],
                      ].map(([t, i, o]) => (
                        <tr key={t} className="hover:bg-cyan-50">
                          <td className="px-4 py-2 font-bold text-cyan-700 text-xs">
                            {t}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs font-mono text-[10px]">
                            {i}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {o}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your content",
              body: "Type or paste the content into the textarea. The QR code preview on the right updates automatically after a short delay as you type. Each type shows a placeholder example of the expected format — follow this exactly for special types like WiFi (SSID:Password:WPA), SMS (Number:Message), Location (Latitude,Longitude), and vCard (Name:Phone:Email). For URL QR codes, include the full address starting with https:// for best compatibility.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>WiFi QR code tip:</strong> The security type in the
                  WiFi format (WPA, WEP, or nopass) must match your router's
                  actual security setting. WPA covers both WPA2 and WPA3 — use
                  WPA for almost all modern routers. For open networks with no
                  password, use nopass and leave the password field empty:{" "}
                  <span className="font-mono bg-white px-1 rounded">
                    MyNetwork::nopass
                  </span>
                  . Test the QR code on your own phone before printing.
                </div>
              ),
            },
            {
              n: 3,
              title: "Customise size and colours",
              body: "Use the size slider to set the QR code dimensions from 150 × 150 to 500 × 500 pixels. For digital use, 300px is a good default. For print materials that require physical sizing above 10cm, use 400–500px to ensure sharp output. Use the foreground and background colour pickers to customise the QR code colours — enter a hex colour code directly or use the colour picker. Always maintain high contrast between foreground and background to ensure reliable scanning.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Colour contrast rule:</strong> QR code modules must be
                  significantly darker than the background for reliable
                  scanning. The foreground luminance should be at least 4:1
                  relative to the background. Safe combinations: black on white,
                  dark navy on white, dark brand colour on white or very light
                  tint. Avoid: light colours on white, dark on dark, or
                  inverting the pattern (light modules on dark background) —
                  these cause scanning failures especially in variable lighting.
                </div>
              ),
            },
            {
              n: 4,
              title: "Download and use your QR code",
              body: "Click the Download QR Code button to save the current QR code as a PNG file. The file is named with a timestamp. Use this PNG in print materials, presentations, websites, email signatures, signage, or anywhere else you need to display the QR code. Test the QR code by scanning it with your phone before distributing it — use the phone's native camera app rather than a third-party scanner for the most representative test.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Before printing:</strong> Always scan and test the QR
                  code before committing it to print materials. Check that it
                  opens the correct content on at least two different devices.
                  For WiFi QR codes, verify the network joins successfully. For
                  URL QR codes, verify the page loads correctly. QR codes in
                  print cannot be updated once distributed — if the destination
                  changes after printing, the QR code becomes broken.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📇",
              title: "Business cards",
              desc: "Add a vCard QR code to your business card — recipients scan to save your contact instantly without typing.",
            },
            {
              emoji: "📶",
              title: "Guest WiFi access",
              desc: "Print a WiFi QR code for your home, café, or office — guests scan to join the network without seeing the password.",
            },
            {
              emoji: "📢",
              title: "Marketing materials",
              desc: "Add URL QR codes to flyers, posters, and packaging — link directly to landing pages, product pages, or promotions.",
            },
            {
              emoji: "🎫",
              title: "Events & tickets",
              desc: "Use QR codes on event tickets and badges — link to schedules, venue maps, or check-in confirmation pages.",
            },
            {
              emoji: "🛍️",
              title: "Product packaging",
              desc: "Link to product manuals, warranty registration pages, or video tutorials directly from physical product packaging.",
            },
            {
              emoji: "📋",
              title: "Forms & surveys",
              desc: "Generate URL QR codes for online forms and surveys — participants scan instead of typing a long URL.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📱</div>
          <h3 className="text-xl font-bold mb-3">
            Always test before printing — QR codes in print cannot be updated
          </h3>
          <p className="text-cyan-100 leading-relaxed max-w-xl mx-auto text-sm">
            Unlike digital QR codes (on screens or websites), printed QR codes
            are permanent. Once printed on business cards, packaging, signage,
            or brochures, the encoded content is fixed. Always scan and verify
            your QR code on at least two devices before sending to print. Use a
            short, clean URL — long URLs make larger, denser QR codes that are
            harder to scan in poor lighting or at an angle.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/uuid-guid-generator",
                label: "UUID/GUID Generator",
                desc: "Generate Version 4 UUIDs instantly — bulk generation, multiple formats, copy all or download.",
              },
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URLs for safe web transmission — handles special characters, spaces, and Unicode.",
              },
              {
                href: "/tools/hash-generator",
                label: "Hash Generator",
                desc: "Generate SHA-256, SHA-512, and other cryptographic hashes for any string or file instantly.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
