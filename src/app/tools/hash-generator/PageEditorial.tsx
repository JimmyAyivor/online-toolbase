"use client";
// src/app/tools/hash-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/hash-generator";
const TOOL_NAME = "Hash Generator";

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
    "Free hash generator — generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly in your browser, no signup",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is a cryptographic hash function?",
    a: "A cryptographic hash function is a mathematical algorithm that converts any input data — text, a file, or binary data — into a fixed-length string of characters called a hash or digest. Hash functions have three critical properties that make them useful for security applications. First, they are deterministic: the same input always produces the same output. Second, they are one-way: it is computationally infeasible to reverse a hash back to the original input. Third, they are collision-resistant: it should be computationally infeasible to find two different inputs that produce the same hash output. These properties make hashes useful for data integrity verification, password storage, digital signatures, and identifying data without exposing its contents.",
  },
  {
    q: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
    a: "These are four different hash algorithms that produce hashes of different lengths and offer different levels of security. MD5 produces a 128-bit (32 character) hash — it was once widely used but is now considered cryptographically broken and should not be used for security purposes. SHA-1 produces a 160-bit (40 character) hash — also considered weak since 2005, when theoretical attacks were demonstrated, and a full collision was demonstrated in 2017. SHA-256 (part of the SHA-2 family) produces a 256-bit (64 character) hash and is currently the recommended standard for most security applications including TLS certificates, code signing, and password hashing. SHA-384 and SHA-512 produce 384-bit (96 character) and 512-bit (128 character) hashes respectively — they offer higher security margins than SHA-256 but are slower and produce larger outputs. For new applications, SHA-256 or SHA-512 are the recommended choices.",
  },
  {
    q: "Can I use SHA-256 to hash passwords?",
    a: "SHA-256 alone is not suitable for password hashing in production systems, even though it is a strong hash function. The problem is that SHA-256 is designed to be fast — it can hash billions of passwords per second on modern GPUs, making brute-force and dictionary attacks practical. Password hashing requires a slow, computationally expensive algorithm specifically designed to resist this type of attack. The recommended algorithms for password storage are bcrypt, Argon2 (the winner of the Password Hashing Competition), and scrypt — all of which include a configurable work factor that makes them slow by design and can be tuned as hardware becomes faster. SHA-256 is appropriate for generating checksums, building digital signatures, and other integrity verification tasks where speed is desirable rather than a liability.",
  },
  {
    q: "What are hashes used for in practice?",
    a: "Hash functions have many practical applications. Data integrity: software distributions include SHA-256 checksums alongside download links so users can verify the downloaded file hasn't been corrupted or tampered with. Digital signatures: signing a hash of a document (rather than the document itself) is far more efficient — RSA-signed SHA-256 hashes are the foundation of TLS certificates, code signing, and document signing. Git version control: every commit, file, and tree in Git is identified by its SHA-1 hash (Git is migrating to SHA-256). Deduplication: storage systems use hashes to identify duplicate files without comparing their full contents. Blockchain: Bitcoin uses SHA-256 as its proof-of-work hash function. Password storage: systems store hashes of passwords (ideally using bcrypt or Argon2) rather than the passwords themselves.",
  },
  {
    q: "What does it mean for a hash function to be 'broken'?",
    a: "A hash function is considered broken when researchers have demonstrated a practical collision attack — the ability to find two different inputs that produce the same hash output. A collision breaks the third security property of hash functions and can be exploited in specific attack scenarios. For MD5, practical collision attacks have been known since 2004, and by 2008 researchers used MD5 collisions to create a fraudulent SSL certificate — demonstrating a real-world security impact. For SHA-1, a theoretical collision attack was found in 2005, and in 2017 Google's Project Zero team published 'SHAttered' — the first practical SHA-1 collision, producing two different PDF files with identical SHA-1 hashes. Neither MD5 nor SHA-1 are suitable for any new security application. They remain safe for non-security uses like file deduplication, where collisions are not a concern.",
  },
  {
    q: "Is the hash generated the same regardless of the browser or device?",
    a: "Yes — hash functions are deterministic algorithms with standardised specifications. The same input text will always produce the same SHA-256 hash regardless of which browser, operating system, device, or programming language is used to generate it. This is one of the most useful properties of hash functions: you can generate a hash in a browser and compare it to a hash generated by a server-side Python script, a mobile app, or a command-line tool, and they will all match for the same input. One exception to be aware of: line endings differ between operating systems (Windows uses CRLF \\r\\n, Unix uses LF \\n). If the same text is hashed on Windows and Unix systems with different line endings, the hashes will differ because the underlying bytes are different.",
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
          How to Use the Hash Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Type or paste text — or upload a file — to generate MD5, SHA-1,
          SHA-256, SHA-384, and SHA-512 hashes simultaneously.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter text or upload a file",
              body: "Type or paste any text into the input area and all five hashes generate automatically as you type — there's no button to click. For files, click 'Upload File' to select a .txt, .json, .xml, or .csv file; the file's text content is loaded into the input and hashed immediately. Click 'Load Example' to hash the classic 'Hello, World!' string and see what the hash output looks like before entering your own data.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Hash sensitivity:</strong> Hash functions are
                  extremely sensitive to even the smallest change in input — a
                  single character difference produces a completely different
                  hash output. This is called the avalanche effect, and it is an
                  intentional design property. Try hashing 'Hello' and 'hello' —
                  the outputs share no resemblance despite differing by only one
                  character's case.
                </div>
              ),
            },
            {
              n: 2,
              title: "Read the results and security ratings",
              body: "Each hash algorithm shows its output alongside a security rating badge: Strong (SHA-256, SHA-384, SHA-512), Weak (SHA-1), or Deprecated (MD5). MD5 shows a message explaining it is not available in browsers — the Web Crypto API used by this tool does not include MD5 because it is cryptographically broken. The comparison table below the results shows output size, security rating, and recommended use cases for each algorithm at a glance.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Algorithm
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Output
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Rating
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Recommend?
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "MD5",
                          "128-bit / 32 chars",
                          "Broken",
                          "❌ No — legacy only",
                        ],
                        [
                          "SHA-1",
                          "160-bit / 40 chars",
                          "Weak",
                          "❌ No — legacy systems",
                        ],
                        [
                          "SHA-256",
                          "256-bit / 64 chars",
                          "Strong",
                          "✅ Yes — most uses",
                        ],
                        [
                          "SHA-384",
                          "384-bit / 96 chars",
                          "Strong",
                          "✅ Yes — higher security",
                        ],
                        [
                          "SHA-512",
                          "512-bit / 128 chars",
                          "Strong",
                          "✅ Yes — maximum security",
                        ],
                      ].map(([a, o, r, rec]) => (
                        <tr key={a} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700 text-xs font-mono">
                            {a}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {o}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {r}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {rec}
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
              title: "Copy the hash you need",
              body: "Click the Copy button on any hash card to copy that algorithm's output to your clipboard — a green checkmark confirms the copy. Use SHA-256 for the vast majority of applications: TLS/SSL certificate generation, code signing, file integrity verification, and data deduplication. Use SHA-512 when you need a larger hash space or are working with systems that specifically require it. Avoid SHA-1 for any new implementation, and never use MD5 for security purposes.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Which algorithm to choose:</strong> If you're
                  verifying a software download, check which algorithm the
                  publisher used — most modern software uses SHA-256. If you're
                  implementing a system yourself, use SHA-256 unless you have a
                  specific reason to need SHA-512. If a legacy system requires
                  MD5 or SHA-1 checksums, use them only for that legacy
                  compatibility — not for any new security requirement.
                </div>
              ),
            },
            {
              n: 4,
              title: "Verify file integrity with the upload feature",
              body: "Click 'Upload File' to load a text file and generate its hashes. To verify a file's integrity, compare the SHA-256 hash shown here against the checksum published by the file's provider. If the hashes match exactly (every character), the file is identical to the original — it hasn't been corrupted in transit or tampered with. If they differ by even one character, the file has been modified. Note: this tool reads files as text — for binary file hashing, use a dedicated checksum utility like sha256sum on the command line.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Command-line verification:</strong> On macOS/Linux,
                  verify a SHA-256 checksum with{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    sha256sum filename
                  </code>{" "}
                  or{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    shasum -a 256 filename
                  </code>
                  . On Windows PowerShell, use{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    Get-FileHash filename -Algorithm SHA256
                  </code>
                  . The output should match the hash shown by this tool for the
                  same text content.
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
              emoji: "✅",
              title: "File integrity verification",
              desc: "Compare a downloaded file's SHA-256 hash against the checksum published by the software provider to confirm the file hasn't been tampered with.",
            },
            {
              emoji: "🔐",
              title: "Digital signatures",
              desc: "Hash functions are the foundation of digital signatures — sign the hash of a document rather than the document itself to create tamper-evident signatures.",
            },
            {
              emoji: "⛓️",
              title: "Blockchain & crypto",
              desc: "Bitcoin uses SHA-256 as its proof-of-work function. SHA-256 hashes are used to link blocks in the chain and to derive Bitcoin addresses from public keys.",
            },
            {
              emoji: "🗄️",
              title: "Deduplication",
              desc: "Hash file contents to quickly identify duplicate files in storage systems — files with identical hashes are guaranteed to have identical content.",
            },
            {
              emoji: "🔑",
              title: "API key & token generation",
              desc: "Hash combined inputs (user ID + timestamp + secret) to generate deterministic, reproducible tokens for API authentication and HMAC signatures.",
            },
            {
              emoji: "🧪",
              title: "Test data fingerprinting",
              desc: "Hash test inputs and expected outputs to create compact fingerprints — useful for regression testing and detecting unintended changes to data processing logic.",
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
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="text-xl font-bold mb-3">
            Use SHA-256 for new applications — never MD5 or SHA-1
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            MD5 and SHA-1 have known collision vulnerabilities and should not be
            used in any new security application. SHA-256 is the current
            standard: it is used in TLS certificates, Bitcoin, Git (migrating
            from SHA-1), code signing, and most modern cryptographic systems. If
            you're building something new, SHA-256 is the right choice for
            almost all use cases. For password hashing specifically, use bcrypt,
            Argon2, or scrypt — not SHA-256 — because password hashing requires
            slowness by design.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/password-strength-checker",
                label: "Password Strength Checker",
                desc: "Analyse password strength, entropy, and crack-time estimates — identify weak passwords before deployment.",
              },
              {
                href: "/tools/base64-encoder-decoder",
                label: "Base64 Encoder/Decoder",
                desc: "Encode or decode Base64 strings instantly — useful for JWT tokens, image encoding, and API authentication.",
              },
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URLs for safe web transmission — handles special characters, spaces, and Unicode.",
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
