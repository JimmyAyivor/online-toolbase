"use client";
// src/app/tools/ip-address-lookup/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/ip-address-lookup";
const TOOL_NAME = "IP Address Lookup";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#eef2ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
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
    "Free IP address lookup — get geolocation, ISP, ASN, and network info for any IP instantly, no signup",
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
                <span className="text-indigo-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What information does an IP lookup return?",
    a: "An IP address lookup queries a geolocation database and returns several categories of information. Geographic data includes the country, region (state or province), city, and approximate latitude and longitude coordinates. Network data includes the Internet Service Provider (ISP) or hosting company that owns the IP address block, the Autonomous System Number (ASN) and name (a unique identifier for each network on the internet), and the IP range (CIDR block) that contains the address. Additional data may include the timezone associated with the geographic location, whether the IP is flagged as a hosting provider, VPN, or proxy, and the IP version (IPv4 or IPv6). The accuracy of geographic data varies — country-level geolocation is typically 95–99% accurate, while city-level accuracy is closer to 60–80%.",
  },
  {
    q: "How accurate is IP geolocation?",
    a: "IP geolocation accuracy depends on the granularity of the location being estimated. Country-level accuracy is very high — typically 95–99% — because regional internet registries (RIRs) assign IP blocks to specific countries and this information is public. State or region accuracy is lower, typically 55–80%, because IP blocks within a country can be used anywhere in that country. City-level accuracy is lower still, typically 50–75%, and the coordinates shown often represent the centre of the city or the ISP's registered location rather than the physical location of the device. Mobile networks make geolocation particularly unreliable — a mobile user in one city may have an IP registered to a carrier exchange point in a completely different city. VPN users will see the location of the VPN exit node, not their actual location.",
  },
  {
    q: "What is an ASN (Autonomous System Number)?",
    a: "An Autonomous System Number (ASN) is a unique identifier assigned to each network on the internet that independently routes traffic. Each ISP, cloud provider, university, government network, or large enterprise typically has one or more ASNs. For example, Google has ASN 15169, Amazon AWS has AS16509, and Cloudflare has AS13335. ASNs are used by the Border Gateway Protocol (BGP) to route traffic between networks — each AS announces the IP address prefixes it controls to its peers. When you look up an IP address, the ASN tells you which organisation owns and operates the network that controls that IP block. This is useful for identifying whether an IP belongs to a residential ISP, a cloud hosting provider, a content delivery network, or a known VPN provider.",
  },
  {
    q: "Why does my IP show the wrong location?",
    a: "There are several common reasons an IP address shows an inaccurate location. The most common is that your ISP registered its IP blocks at a central location (their headquarters or a major exchange point) rather than in each city where they have customers — so your IP may show as your ISP's home city rather than your actual city. If you're using a VPN, the location shown will be the VPN server's exit location, not your physical location. Corporate networks that route all traffic through a central office will show the office location. Mobile networks may show a major city rather than your actual location. Finally, the geolocation database used by the tool may simply have outdated or incorrect data for your specific IP range — geolocation databases are updated regularly but are never perfectly accurate.",
  },
  {
    q: "What is the difference between IPv4 and IPv6?",
    a: "IPv4 (Internet Protocol version 4) uses 32-bit addresses expressed as four decimal numbers separated by dots, like 192.168.1.1. This allows for about 4.3 billion unique addresses — a number that has been exhausted as internet-connected devices have proliferated. IPv6 uses 128-bit addresses expressed as eight groups of four hexadecimal digits separated by colons, like 2001:0db8:85a3:0000:0000:8a2e:0370:7334. This allows for approximately 340 undecillion addresses — effectively unlimited. IPv6 was designed to replace IPv4, but both coexist on the modern internet. Most ISPs, mobile carriers, and large networks now support both. This tool supports lookups for both IPv4 and IPv6 addresses.",
  },
  {
    q: "Can I use this to look up my own IP address?",
    a: "Yes — when you open the tool, it automatically detects and displays your current public IP address. This is the IP address that websites and servers see when you connect to them — it's assigned by your ISP and is different from your local network address (which starts with 192.168., 10., or 172.16–31.). If you're connected through a VPN, the tool will show the VPN's exit IP rather than your true IP. If you're on a mobile network, the IP shown may change as you move between cell towers or network segments. The automatically detected IP is your public-facing IP — the one that identifies your connection on the public internet.",
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
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-indigo-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {f.a}
              </div>
            )}
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
          How to Use the IP Address Lookup
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter any IP address to get geolocation, ISP, ASN, timezone, and
          network details instantly — or check your own IP automatically.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Check your own IP or enter any address",
              body: "When the tool loads, it automatically detects and displays your current public IP address with its full geolocation and network details. To look up a different IP, click one of the recent lookups or type any IPv4 or IPv6 address into the search field and press Enter or click the Lookup button. Results appear immediately — country, region, city, coordinates, ISP, ASN, and timezone.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Field
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What it shows
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Country / Region / City",
                          "Geographic location of the IP block's registered owner",
                        ],
                        [
                          "Coordinates",
                          "Approximate latitude/longitude (often the city centre or ISP location)",
                        ],
                        [
                          "ISP",
                          "Internet service provider or company that owns the IP range",
                        ],
                        [
                          "ASN",
                          "Autonomous System Number — the network's unique routing identifier",
                        ],
                        [
                          "Timezone",
                          "Timezone associated with the geographic region",
                        ],
                      ].map(([f, w]) => (
                        <tr key={f} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs">
                            {f}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {w}
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
              title: "Read the location and network details",
              body: "The results panel shows two sections. The Location section displays the country (with flag), region, city, and approximate coordinates. The Network section displays the ISP name, ASN (formatted as AS##### followed by the network name), and the IP block's CIDR range. These details are drawn from regional internet registry (RIR) records and commercial geolocation databases, which are updated regularly.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>ISP vs hosting provider:</strong> If the ISP field
                  shows a cloud provider name (Amazon, Google Cloud,
                  DigitalOcean, Hetzner, OVH, etc.) rather than a residential
                  ISP, the IP belongs to a server or VPN exit node hosted in a
                  data centre — not a home or office connection. This is useful
                  for distinguishing real user traffic from bot traffic or VPN
                  users in web analytics and server logs.
                </div>
              ),
            },
            {
              n: 3,
              title: "Use the map to visualise the location",
              body: "The interactive map shows a pin at the approximate geographic coordinates associated with the IP address. Zoom in or out to get context for the location. Remember that the coordinates shown are approximate — they typically represent the city centre or the ISP's registered location rather than the device's precise physical location. For residential IPs, the accuracy is typically within the correct city; for mobile IPs, accuracy may be lower.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>VPN detection:</strong> If you're using a VPN and look
                  up your own IP, the location shown will be the VPN server's
                  exit location — not your physical location. This is expected
                  behaviour: your public IP changes when you connect to a VPN,
                  so geolocation of that IP returns data about the VPN
                  provider's server, not you personally.
                </div>
              ),
            },
            {
              n: 4,
              title: "Look up multiple IPs with the history list",
              body: "The tool maintains a list of recent lookups in the session. Click any previous IP in the recent lookups list to reload its results without re-entering the address. This is useful when comparing multiple IPs from logs, investigating a list of addresses from an access log, or checking several IPs during a network investigation. Use the Copy button to copy the current IP address to your clipboard.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Reading server logs:</strong> When investigating
                  unusual traffic in web server access logs or cloud firewall
                  logs, paste suspicious IP addresses into this tool to quickly
                  determine their country of origin, ISP, and whether they
                  belong to a known hosting provider or residential connection.
                  This is a fast first step in identifying potentially automated
                  or malicious traffic.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🔒",
              title: "Security investigation",
              desc: "Identify the origin country, ISP, and network of suspicious IPs from server logs, firewall alerts, or failed login attempts.",
            },
            {
              emoji: "📊",
              title: "Web analytics",
              desc: "Understand where your users are connecting from — distinguish residential users from data centre IPs that may represent bots or VPN users.",
            },
            {
              emoji: "🌍",
              title: "Content geo-targeting",
              desc: "Verify that IP-based geo-targeting is returning the expected country or region for specific IP addresses before deploying.",
            },
            {
              emoji: "🛡️",
              title: "Fraud prevention",
              desc: "Check whether a transaction or login IP is associated with a known VPN, proxy, or hosting provider — high-risk signals for certain types of fraud.",
            },
            {
              emoji: "🔧",
              title: "Network troubleshooting",
              desc: "Identify which ISP or AS owns a problem IP during network debugging — useful when tracing routing issues or investigating latency.",
            },
            {
              emoji: "📋",
              title: "Access log analysis",
              desc: "Quickly resolve IPs from web server or application access logs to their geographic origin and ISP for reporting or investigation.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="text-xl font-bold mb-3">
            City-level accuracy is approximately 50–75% — country-level is
            95–99%
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            IP geolocation is most reliable at the country level. City-level
            coordinates often represent the ISP's registered address or a major
            network exchange point rather than the device's physical location.
            Mobile users, VPN users, and corporate networks routing through
            central offices will show locations that differ significantly from
            physical reality. Use IP geolocation as a signal — not as a precise
            location source.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/email-validator",
                label: "Email Validator",
                desc: "Validate single or bulk email addresses — format, domain, TLD, and common issue checks.",
              },
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URLs for safe web transmission — handles special characters, spaces, and Unicode.",
              },
              {
                href: "/tools/regex-tester",
                label: "Regex Tester",
                desc: "Test and debug regular expressions in real time — live match highlighting, capture groups, and flags.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
