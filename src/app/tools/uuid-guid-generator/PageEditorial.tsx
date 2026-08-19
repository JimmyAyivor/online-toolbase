"use client";
// src/app/tools/uuid-guid-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/uuid-guid-generator";
const TOOL_NAME = "UUID/GUID Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#064e3b", light: "#ecfdf5" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5">
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
    "Free UUID/GUID generator — generate Version 4 UUIDs instantly, bulk generation, multiple formats, copy all or download",
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
                <span className="text-emerald-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is a UUID and what does it stand for?",
    a: "UUID stands for Universally Unique Identifier. It is a 128-bit number used to identify information in computer systems without requiring a central registration authority to guarantee uniqueness. A UUID is typically represented as 32 hexadecimal digits displayed in five groups separated by hyphens in the format 8-4-4-4-12, for example: 550e8400-e29b-41d4-a716-446655440000. GUID stands for Globally Unique Identifier and is an alternative term for UUID used primarily in Microsoft systems — the two terms are interchangeable. UUIDs are standardised by RFC 4122, which defines several versions with different generation methods. The format and uniqueness guarantees are identical regardless of whether you call it a UUID or GUID.",
  },
  {
    q: "What is a Version 4 UUID?",
    a: "Version 4 is the most commonly used UUID type. It is generated entirely from random or pseudo-random numbers, with only two bits predetermined: the variant bits (identifying it as RFC 4122) and the version bits (identifying it as version 4). The version number appears as the first digit of the third group — in a V4 UUID, it is always 4. The variant bits appear in the fourth group — the first character is always 8, 9, a, or b. All other bits (122 out of 128) are random. The probability of generating two identical V4 UUIDs is approximately 1 in 5.3 × 10³⁶ — for practical purposes, V4 UUIDs can be treated as unique for any application. Other UUID versions use time-based (v1), name-based hashing (v3, v5), or time-ordered random (v7) generation methods.",
  },
  {
    q: "What is the difference between UUID and GUID?",
    a: "There is no technical difference. GUID (Globally Unique Identifier) is Microsoft's terminology for the same concept that the rest of the industry calls UUID (Universally Unique Identifier). Both are 128-bit identifiers following the same RFC 4122 standard. Microsoft introduced the term GUID in COM (Component Object Model) in the early 1990s. You'll see GUID used in Microsoft documentation, SQL Server, .NET, Windows APIs, and COM interfaces — and UUID in databases like PostgreSQL, MySQL, and SQLite, as well as in web standards and most non-Microsoft systems. When generating IDs for any system, a UUID generated by this tool can be used wherever a GUID is required and vice versa.",
  },
  {
    q: "Can two UUIDs ever be the same?",
    a: "In theory, yes — any random generation process can produce duplicates. In practice, the probability is so small that it is irrelevant for all real-world applications. A Version 4 UUID has 122 random bits, giving approximately 5.3 × 10³⁶ possible values. To have a 50% probability of at least one collision among randomly generated V4 UUIDs, you would need to generate approximately 2.7 × 10¹⁸ UUIDs — that's 2.7 quintillion. If you generated one billion UUIDs per second, it would take approximately 85 years to reach a 50% collision probability. For any practical application — database keys, session IDs, transaction identifiers — V4 UUIDs are effectively unique without any coordination between systems.",
  },
  {
    q: "Which UUID format should I use?",
    a: "The choice of format depends on your storage and application requirements. The default lowercase format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx) is the standard RFC 4122 representation and is the most widely compatible — use it unless you have a specific reason to choose otherwise. Uppercase with dashes is required by some legacy Windows APIs and COM interfaces that use GUIDs. The braces format ({xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}) is used in Windows registry entries and some Microsoft tools. No dashes (lowercase or uppercase) — a 32-character hex string without separators — is useful when storing in a fixed-length VARCHAR(32) column or when the database UUID type is not available. Most modern databases (PostgreSQL, MySQL 8+, SQL Server) have native UUID column types that store the value efficiently as 16 bytes regardless of the string representation used for input.",
  },
  {
    q: "Should I use UUIDs as primary keys in my database?",
    a: "UUIDs work well as primary keys in distributed systems where you need to generate IDs without coordinating with a central database — multiple servers, microservices, or offline clients can each generate unique IDs independently. The main trade-offs compared to auto-incrementing integer keys are: UUIDs are larger (16 bytes vs 4–8 bytes for integers), which increases index size; random V4 UUIDs cause index fragmentation in clustered indexes because new records insert in random positions rather than appending to the end; and UUIDs are harder to read and debug in logs. For read-heavy, single-server applications with sequential insert patterns, integers are often more efficient. For distributed systems, multi-tenant applications, or scenarios where you need to generate IDs before inserting into the database, UUIDs are a better fit. UUID v7 (time-ordered random) addresses the fragmentation issue by including a timestamp prefix.",
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
              <span className="text-emerald-600 text-lg shrink-0">
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
          How to Use the UUID/GUID Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Set the quantity, choose a format, generate — then copy individual
          UUIDs, copy all, or download the full list as a text file.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Set the quantity and generate",
              body: "Use the quantity input or slider to set how many UUIDs to generate — from 1 to 100. Click the Generate button or use one of the Quick Generate shortcuts (1, 5, 10, 25) to instantly generate that many UUIDs. Each click adds new UUIDs to the top of the list — existing UUIDs are preserved. The tool generates a single UUID automatically when it first loads.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Format
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example output
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Use for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Default",
                          "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f7a8",
                          "Most applications, APIs",
                        ],
                        [
                          "Uppercase",
                          "A1B2C3D4-E5F6-4789-A012-B3C4D5E6F7A8",
                          "Legacy Windows/COM APIs",
                        ],
                        [
                          "Braces",
                          "{a1b2c3d4-e5f6-4789-a012-b3c4d5e6f7a8}",
                          "Windows registry, .NET",
                        ],
                        [
                          "No dashes",
                          "a1b2c3d4e5f64789a012b3c4d5e6f7a8",
                          "VARCHAR(32) DB columns",
                        ],
                      ].map(([f, ex, u]) => (
                        <tr key={f} className="hover:bg-emerald-50">
                          <td className="px-4 py-2 font-bold text-emerald-700 text-xs">
                            {f}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs font-mono text-[10px]">
                            {ex}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {u}
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
              title: "Choose your output format",
              body: "Select one of five format options in the Format Options panel. The format applies to both new UUIDs generated after the selection and to the example preview shown below the options. The underlying UUID value is the same in all formats — only the string representation changes. Changing the format does not regenerate UUIDs; it reformats the existing list.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Format tip:</strong> If you're inserting UUIDs into a
                  PostgreSQL{" "}
                  <code className="bg-white px-1 rounded font-mono">uuid</code>{" "}
                  column, any standard RFC 4122 format (with or without dashes)
                  will be accepted. For MySQL, the{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    UUID()
                  </code>{" "}
                  function returns lowercase with dashes — use the Default
                  format to match. For SQL Server's{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    uniqueidentifier
                  </code>{" "}
                  type, any format works — SQL Server normalises the
                  representation internally.
                </div>
              ),
            },
            {
              n: 3,
              title: "Copy or download the results",
              body: "Click Copy next to any UUID to copy just that one to your clipboard. Click Copy All to copy every UUID in the list as a newline-separated text block — ready to paste into a spreadsheet, config file, or migration script. Click Download to save the full list as a uuids.txt file. Click Clear All to empty the list and start fresh.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Generating seed data:</strong> Use the bulk generation
                  feature to quickly produce UUID lists for database seed
                  scripts, test fixtures, or mock data files. Generate 25 or 50
                  UUIDs, click Copy All, then paste directly into your SQL
                  INSERT statements, JSON fixtures, or CSV seed files. Each UUID
                  includes a timestamp so you can track when it was generated
                  within the session.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use UUIDs in your application",
              body: "Copy and paste the generated UUIDs directly into your database migration files, test fixtures, API mocks, or configuration. For production code, generate UUIDs programmatically using your language's built-in or standard library UUID function — Node.js has crypto.randomUUID(), Python has uuid.uuid4(), Java has UUID.randomUUID(), and PostgreSQL has gen_random_uuid(). This tool is ideal for quickly generating IDs during development, testing, or data setup tasks.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Language quick reference:</strong> Node.js:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    crypto.randomUUID()
                  </code>{" "}
                  · Python:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    import uuid; str(uuid.uuid4())
                  </code>{" "}
                  · Java:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    UUID.randomUUID().toString()
                  </code>{" "}
                  · Go:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    github.com/google/uuid
                  </code>{" "}
                  · PHP:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    Str::uuid()
                  </code>{" "}
                  (Laravel) · PostgreSQL:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    gen_random_uuid()
                  </code>
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🗄️",
              title: "Database primary keys",
              desc: "Use UUIDs as primary keys in distributed databases — multiple services can generate unique IDs without coordinating with a central sequence generator.",
            },
            {
              emoji: "🔐",
              title: "Session & token identifiers",
              desc: "Generate session IDs, API tokens, and reset tokens — UUIDs provide sufficient randomness for most token use cases without a centralised ID server.",
            },
            {
              emoji: "📦",
              title: "Transaction & order IDs",
              desc: "Create unique transaction identifiers for payment processing, order tracking, and audit logs — UUIDs are human-safe and don't expose sequential ordering.",
            },
            {
              emoji: "🧪",
              title: "Test fixtures & seed data",
              desc: "Populate test databases and fixture files with stable UUID values — bulk generate 25 or 50 UUIDs at once and paste directly into seed scripts.",
            },
            {
              emoji: "📁",
              title: "File naming & tracking",
              desc: "Name uploaded files with UUIDs to prevent collisions and avoid exposing original filenames — UUID filenames are unguessable and collision-free.",
            },
            {
              emoji: "🔗",
              title: "Idempotency keys",
              desc: "Use UUIDs as idempotency keys in API requests — generate a UUID client-side and include it with each request to ensure safe retries without duplicate processing.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">#️⃣</div>
          <h3 className="text-xl font-bold mb-3">
            Version 4 UUIDs: 122 random bits, effectively zero collision
            probability
          </h3>
          <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
            A V4 UUID contains 122 random bits — enough to generate 2.7
            quintillion UUIDs before reaching a 50% chance of a single
            collision. In practice, this means multiple services, servers, and
            clients can generate UUIDs independently without any coordination
            and be confident the IDs will be globally unique. For distributed
            systems, this makes UUIDs far more practical than sequential integer
            IDs, which require a central authority to allocate.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/hash-generator",
                label: "Hash Generator",
                desc: "Generate SHA-256, SHA-512, and other cryptographic hashes for any string or file instantly.",
              },
              {
                href: "/tools/password-strength-checker",
                label: "Password Strength Checker",
                desc: "Analyse password strength, entropy, and estimated crack time — identify weak passwords before deployment.",
              },
              {
                href: "/tools/base64-encoder-decoder",
                label: "Base64 Encoder/Decoder",
                desc: "Encode or decode Base64 strings instantly — useful for JWT tokens, image encoding, and API auth.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
