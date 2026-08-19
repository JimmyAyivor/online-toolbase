"use client";
// src/app/tools/jwt-decoder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/jwt-decoder";
const TOOL_NAME = "JWT Decoder";

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
    "Free JWT decoder — inspect header, payload claims, expiry timestamps, and signature entirely in your browser, no signup",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is a JWT and what are its three parts?",
    a: "JWT stands for JSON Web Token — a compact, URL-safe format for transmitting claims between two parties. A JWT consists of three Base64URL-encoded segments separated by dots: the header, the payload, and the signature. The header is a JSON object that identifies the token type (typ: JWT) and the signing algorithm used (alg: HS256, RS256, ES256, etc.). The payload is a JSON object containing claims — statements about an entity (typically a user) and additional metadata. Standard claims include sub (subject/user ID), iss (issuer), aud (audience), exp (expiry time), iat (issued at time), and nbf (not before time). Custom claims can be added freely. The signature is a cryptographic hash of the encoded header and payload, created using the algorithm specified in the header and a secret key — it proves the token hasn't been tampered with.",
  },
  {
    q: "Is it safe to decode a JWT in a browser tool?",
    a: "Yes — decoding a JWT does not require the secret key and poses no security risk. The header and payload are simply Base64URL-encoded, not encrypted, meaning anyone who has the token can read their contents. The sensitive part of a JWT is the signature, which is used for verification (proving the token is authentic and hasn't been modified) — but signature verification requires the secret key and is not performed by this decoder. This tool decodes the header and payload entirely within your browser, and no data is transmitted to any server. That said, you should still avoid pasting production tokens containing sensitive user data into any public online tool as a matter of general security hygiene, even if the tool is client-side only.",
  },
  {
    q: "What is the difference between decoding and verifying a JWT?",
    a: "Decoding a JWT means extracting and displaying the header and payload contents — this requires no secret key and anyone can do it. Verifying a JWT means checking that the signature is valid, which requires the secret key (for HMAC algorithms like HS256) or the public key (for asymmetric algorithms like RS256 and ES256). Verification confirms two things: the token was signed by a trusted party (authenticity), and the token has not been modified since it was signed (integrity). An application that trusts a JWT must always verify the signature before acting on the claims — accepting an unverified JWT is a critical security flaw. This tool only decodes; signature verification must be done in your application backend using a JWT library.",
  },
  {
    q: "What do the standard JWT claim fields mean?",
    a: "The JWT specification defines several registered claim names with specific meanings. sub (subject) — the principal that the JWT is about, typically a user ID. iss (issuer) — the entity that issued the token, such as your auth server's domain. aud (audience) — the intended recipient(s) of the token; your application should verify this matches its expected value. exp (expiration time) — a Unix timestamp (seconds since epoch) after which the token must be rejected. iat (issued at) — the Unix timestamp when the token was created. nbf (not before) — the Unix timestamp before which the token must not be accepted. jti (JWT ID) — a unique identifier for the token, used to prevent replay attacks. All timestamp claims (exp, iat, nbf) are integers representing seconds since the Unix epoch (January 1, 1970 UTC) — this tool converts them to human-readable local time automatically.",
  },
  {
    q: "What JWT signing algorithms are commonly used?",
    a: "JWT signing algorithms fall into two categories: symmetric (HMAC) and asymmetric (RSA, ECDSA). Symmetric algorithms use the same secret key for both signing and verification — HS256 (HMAC-SHA256), HS384 (HMAC-SHA384), and HS512 (HMAC-SHA512). These are simple and fast but require both parties to share the same secret securely, making them unsuitable when the verifier is a third party. Asymmetric algorithms use a private key to sign and a public key to verify — RS256 (RSA-PKCS1v1.5 with SHA-256), RS384, RS512, PS256 (RSA-PSS), ES256 (ECDSA with P-256), and EdDSA. Asymmetric algorithms are preferred for modern systems because the public key can be distributed freely (via a JWKS endpoint) allowing any party to verify tokens without access to the signing key. The algorithm is specified in the header's alg field.",
  },
  {
    q: "Why does the alg: none attack matter and how is it prevented?",
    a: "The alg: none attack is a well-known JWT vulnerability where an attacker modifies a JWT's header to set alg to none (indicating no signature), then removes the signature segment entirely. If the verifying server naively accepts alg: none as valid, the attacker can forge arbitrary tokens with any claims they want. This attack was a real vulnerability in several early JWT libraries. Modern JWT libraries prevent it by explicitly requiring the application to specify which algorithms are acceptable, and rejecting tokens with alg: none by default. As a developer, always use a maintained JWT library rather than decoding manually, always specify an explicit allow-list of accepted algorithms, and never accept alg: none in production. The alg field is shown in the header section of this decoder.",
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
              <span className="text-indigo-600 text-lg shrink-0">
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
          How to Use the JWT Decoder
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste a JWT token, click Decode, and instantly see the header
          algorithm, all payload claims, expiry status, and the raw signature —
          entirely in your browser.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your JWT token",
              body: "Copy a JWT from your application — from a browser cookie, an Authorization header in a network request, a local storage value, or a login response body — and paste it into the token input area. A JWT looks like three long Base64URL-encoded strings joined by dots (xxxxx.yyyyy.zzzzz). If you don't have a token handy, click 'Load sample token' to see the decoder in action with a well-known example token.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Part
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Contains
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Encoded as
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Header",
                          "Algorithm (alg), token type (typ)",
                          "Base64URL",
                        ],
                        [
                          "Payload",
                          "Claims: sub, iss, exp, iat, custom",
                          "Base64URL",
                        ],
                        [
                          "Signature",
                          "HMAC or RSA/ECDSA hash",
                          "Base64URL (raw bytes)",
                        ],
                      ].map(([p, c, e]) => (
                        <tr key={p} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs">
                            {p}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {c}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs font-mono">
                            {e}
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
              title: "Click Decode JWT",
              body: "Click the Decode JWT button to parse and display the token contents. The tool validates that the token has exactly three dot-separated parts and that the header and payload are valid JSON when decoded. If the token is malformed — missing a part, containing invalid Base64URL characters, or encoding invalid JSON — an error message is shown. An expiry status banner appears immediately below the button showing whether the token's exp claim is in the future (valid) or in the past (expired), along with the human-readable expiry timestamp.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Where to find a JWT:</strong> In Chrome DevTools →
                  Application → Cookies or Local Storage (look for a token key).
                  In the Network tab → find a login or API request → look for
                  Authorization: Bearer [token] in request headers, or find the
                  token in a JSON response body. In your app's source code —
                  look for calls to localStorage.getItem('token') or
                  document.cookie.
                </div>
              ),
            },
            {
              n: 3,
              title: "Inspect the Token Info panel",
              body: "The Token Info panel displays the most important claims as a quick-reference grid: Algorithm (the signing algorithm from the header), Type (JWT), Subject (the sub claim — typically a user ID), Issued At (iat converted to local time), Expires (exp converted to local time), and Issuer (iss — the auth server that issued the token). These six fields cover the most commonly needed values for debugging authentication issues.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Debugging auth issues:</strong> Check the exp
                  timestamp first — expired tokens are the most common cause of
                  401 Unauthorized errors. Check the iss value matches your
                  expected auth server URL if you're getting token validation
                  failures. Check the aud (audience) claim if present — many
                  libraries reject tokens where aud doesn't match the expected
                  value. Check the sub claim to confirm the token belongs to the
                  expected user.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read the full header and payload",
              body: "The Header section shows the raw decoded JSON — typically containing alg (signing algorithm) and typ (JWT). The Payload section shows all claims as pretty-printed JSON, including any custom claims your application adds (roles, permissions, email, username, etc.). Click the Copy button next to each section to copy the JSON to your clipboard — useful for pasting into logs, bug reports, or further analysis. The Signature section shows the raw Base64URL-encoded signature string for reference.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Security reminder:</strong> JWT payloads are
                  Base64URL-encoded, not encrypted — anyone who has the token
                  can read the claims. Never include passwords, payment card
                  data, social security numbers, or other sensitive personal
                  data in JWT payloads. Include only the minimum claims needed:
                  typically sub, exp, iat, and any role or permission claims
                  required for authorisation decisions.
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
              emoji: "🔍",
              title: "Debugging auth failures",
              desc: "Inspect the exp, iss, aud, and sub claims to diagnose 401 Unauthorized errors in your API.",
            },
            {
              emoji: "⏰",
              title: "Checking token expiry",
              desc: "Quickly verify whether a JWT has expired — the expiry status banner and human-readable timestamp make this instant.",
            },
            {
              emoji: "🧪",
              title: "Testing and development",
              desc: "Inspect JWTs generated by your auth system during development to verify the correct claims are being included.",
            },
            {
              emoji: "🔐",
              title: "Security audits",
              desc: "Check for overly broad claims, sensitive data in payloads, weak algorithms (HS256 vs RS256), or missing nbf/aud claims.",
            },
            {
              emoji: "📋",
              title: "Support and debugging",
              desc: "Paste a customer's token to quickly see their user ID, roles, and expiry without needing database access.",
            },
            {
              emoji: "🎓",
              title: "Learning JWT structure",
              desc: "Use the sample token to understand how JWTs are structured — see the three-part format and standard claims in action.",
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
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            JWT payload data is encoded, not encrypted — treat tokens as
            sensitive credentials
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            Base64URL encoding is reversible with no key — anyone who intercepts
            a JWT can read its payload claims in seconds. This makes JWTs
            unsuitable for carrying sensitive personal data (passwords, PII,
            financial data), but perfectly safe for carrying identity claims
            (user ID, roles) as long as the token itself is transmitted over
            HTTPS and stored securely. The signature prevents tampering but
            provides no confidentiality. For encrypted payloads, use JWE (JSON
            Web Encryption) instead of the standard JWT format.
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
                desc: "Generate SHA-256, SHA-512, MD5, and other cryptographic hashes for any string or file.",
              },
              {
                href: "/tools/base64-encoder-decoder",
                label: "Base64 Encoder/Decoder",
                desc: "Encode or decode Base64 and Base64URL strings — the same encoding used in JWT headers and payloads.",
              },
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URLs for safe transmission — useful when JWTs appear as query parameters.",
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
