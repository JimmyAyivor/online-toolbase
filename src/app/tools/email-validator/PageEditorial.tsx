"use client";
// src/app/tools/email-validator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/email-validator";
const TOOL_NAME = "Email Validator";

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
    "Free email validator — check single or bulk email addresses instantly for format, domain, and TLD validity, no signup",
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
    q: "What does the email validator check?",
    a: "The validator performs a series of syntax checks based on the email address format rules defined in RFC 5321 and RFC 5322. It checks that the address contains exactly one @ symbol; that the local part (before @) is non-empty and uses only permitted characters; that the domain part (after @) contains at least one dot and has valid characters; that the top-level domain (TLD) is at least two characters long; that there are no consecutive dots in the local or domain parts; that the address doesn't start or end with a dot or hyphen; and that the overall length of the address doesn't exceed 254 characters. The validator also identifies and explains specific formatting problems rather than just returning a pass/fail result.",
  },
  {
    q: "Does the validator check if an email address actually exists?",
    a: "No — this tool performs syntax validation only. It checks whether an email address is correctly formatted, not whether the mailbox actually exists or is active. To verify whether an email address truly exists and can receive mail, you would need to either send an email and confirm receipt, or use an SMTP verification service (which connects to the mail server and checks whether the mailbox exists without sending a message). Syntax validation is the first and most important filter — an address that fails syntax validation will never work regardless of whether the mailbox exists. But a syntactically valid address may still bounce if the domain doesn't exist or the mailbox has been deleted.",
  },
  {
    q: "What email formats are considered valid?",
    a: "A valid email address has the form local@domain.tld. The local part can contain letters (a-z, A-Z), digits (0-9), and the special characters . + - _ (but not starting or ending with a dot, and no consecutive dots). The domain part consists of one or more labels separated by dots — each label can contain letters, digits, and hyphens (but not starting or ending with a hyphen). The TLD (the final label after the last dot) must be at least two characters. Examples of valid formats: user@example.com, first.last@company.org, user+tag@domain.co.uk, 123@numbers.io. Examples of invalid formats: @nodomain.com (missing local part), user@.com (domain starts with a dot), user@domain (no TLD), user..name@domain.com (consecutive dots in local part).",
  },
  {
    q: "How do I use the bulk validation mode?",
    a: "Switch to the Bulk tab in the tool, then paste a list of email addresses — one per line, or separated by commas. The tool processes all addresses simultaneously and displays a results table showing each address's validation status, the specific checks that passed or failed, and a summary of how many valid and invalid addresses were found. You can copy the full results. This is useful for cleaning email lists before import into a CRM, email marketing platform, or database — removing invalid addresses reduces bounce rates and protects sender reputation.",
  },
  {
    q: "Why does a valid-looking email address fail validation?",
    a: "Some email addresses that look correct to human eyes fail validation for specific technical reasons. Common causes: double dots (user..name@domain.com has consecutive dots in the local part, which is not permitted); starting or ending with a dot (user.@domain.com or .user@domain.com); an @ in the local part without proper quoting (only quoted local parts can contain @); IP address domains without brackets (user@192.168.1.1 requires the IP to be in brackets: user@[192.168.1.1]); very long addresses (total length over 254 characters, or local part over 64 characters); or domain labels with hyphens at the start or end (-domain.com). If an address appears valid but fails, check the specific error message displayed — it identifies the exact rule that was violated.",
  },
  {
    q: "Can I use this to validate emails for GDPR or marketing compliance?",
    a: "Syntax validation is one component of email list hygiene for marketing and compliance purposes, but it is not sufficient on its own for GDPR or marketing compliance. For compliance, you additionally need: confirmed opt-in (proof the person consented to receive emails), active deliverability verification (confirming the mailbox currently exists), suppression list management (removing unsubscribes and bounces), and records of consent. This tool handles the first filter — removing addresses with incorrect formatting that would definitely never work — but the broader compliance requirements need dedicated email marketing tools, consent management platforms, and your organisation's own data governance processes.",
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
              <span className="text-cyan-600 text-lg shrink-0">
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
          How to Use the Email Validator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Validate single or bulk email addresses instantly — get detailed
          checks on format, local part, domain, and TLD with specific error
          messages.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Validate a single email address",
              body: "Select the Single tab (active by default) and type or paste an email address into the input field. Validation runs live as you type — the result card shows immediately whether the address is valid or invalid, and if invalid, lists each specific check that failed with a plain-language explanation. Valid addresses show a breakdown of the local part, domain, and TLD components.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Check
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What it verifies
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["@ symbol", "Exactly one @ present"],
                        [
                          "Local part",
                          "Non-empty, valid characters, no consecutive dots",
                        ],
                        [
                          "Domain",
                          "Present, has at least one dot, valid characters",
                        ],
                        ["TLD", "At least 2 characters, letters only"],
                        ["Length", "Total ≤ 254 chars, local part ≤ 64 chars"],
                        [
                          "Start/end chars",
                          "Doesn't start or end with dot or hyphen",
                        ],
                      ].map(([check, what]) => (
                        <tr key={check} className="hover:bg-cyan-50">
                          <td className="px-4 py-2 font-bold text-cyan-700 text-xs">
                            {check}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {what}
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
              title: "Validate a list of email addresses in bulk",
              body: "Switch to the Bulk tab and paste a list of email addresses, one per line or separated by commas. The tool processes all addresses simultaneously and displays a results table with the validation status for each one. A summary row at the top shows the total count, how many are valid, and how many are invalid — useful for getting a quick sense of list quality before cleaning.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Email list cleaning tip:</strong> Run your email list
                  through bulk validation before importing it into an email
                  marketing platform (Mailchimp, Klaviyo, HubSpot, etc.). Most
                  platforms penalise high bounce rates — if more than 2–5% of
                  emails in a campaign bounce, your account may be flagged or
                  suspended. Removing syntactically invalid addresses before
                  sending is the first and easiest step to protecting your
                  sender reputation.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read the validation breakdown",
              body: "For each address, the result card shows whether it passed or failed each individual check — not just an overall pass/fail. This makes it easy to understand exactly why an address failed: a missing TLD, consecutive dots in the local part, an invalid domain character, or an address that's too long. Each failed check shows a plain-language description of the problem.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Common failures and what they mean:</strong> 'No @
                  symbol' — the @ was omitted or replaced with (at).
                  'Consecutive dots' — email clients do not permit two dots in a
                  row (user..name is invalid). 'Domain starts with dot' —
                  happens when an extra dot is added before the domain. 'TLD too
                  short' — single-character TLDs are not assigned; the minimum
                  is 2 characters (e.g. .io, .uk, .com).
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy results and use them",
              body: "Use the Copy button to copy validation results to your clipboard for pasting into a spreadsheet, CRM, or documentation. For bulk validation, the full results table can be copied. Use the Reset button to clear the input and start a new validation. Remember: a passing result means the address is correctly formatted — it doesn't guarantee the mailbox exists or is active.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Syntax vs deliverability:</strong> Syntax validation
                  (what this tool does) catches formatting errors.
                  Deliverability validation (whether mail will actually arrive)
                  requires DNS lookups to verify the domain has an MX record,
                  and optionally SMTP probing to check whether the mailbox
                  exists. For high-volume email campaigns, consider a dedicated
                  email verification service for deliverability checking in
                  addition to syntax validation.
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
              emoji: "📋",
              title: "CRM data cleaning",
              desc: "Validate email addresses in exported CRM records before re-importing — catch typos and formatting errors that were entered manually.",
            },
            {
              emoji: "📧",
              title: "Email campaign hygiene",
              desc: "Clean mailing lists before campaign sends — invalid addresses inflate your bounce rate, damaging sender reputation and deliverability.",
            },
            {
              emoji: "🛠️",
              title: "Form validation testing",
              desc: "Test email validation regex patterns in your codebase against edge cases — check that your validator accepts valid addresses and rejects invalid ones.",
            },
            {
              emoji: "📥",
              title: "Lead list verification",
              desc: "Verify email addresses in imported lead lists from events, webinars, or third-party sources before adding them to your marketing workflows.",
            },
            {
              emoji: "⚙️",
              title: "Database record auditing",
              desc: "Bulk-check email fields in exported database records to identify rows with corrupt, malformed, or placeholder email addresses.",
            },
            {
              emoji: "👩‍💻",
              title: "Developer testing",
              desc: "Generate and validate test email addresses for staging environments — confirm that test data conforms to the same format rules as production data.",
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
          <div className="text-3xl mb-3">✉️</div>
          <h3 className="text-xl font-bold mb-3">
            Syntax validation is the first filter — not the last
          </h3>
          <p className="text-cyan-100 leading-relaxed max-w-xl mx-auto text-sm">
            An email that passes syntax validation is correctly formatted but
            may still bounce if the domain doesn't exist, the MX record is
            missing, or the mailbox has been deleted. For production systems,
            combine syntax validation (this tool) with MX record checking and,
            for high-stakes use cases, SMTP verification. Never rely on a single
            validation step for critical email delivery.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/regex-tester",
                label: "Regex Tester",
                desc: "Test and debug regular expressions in real time — useful for building and verifying your own email validation patterns.",
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
