"use client";
// src/app/tools/signature-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/signature-generator";
const TOOL_NAME = "Signature Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#881337", light: "#fff1f2" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500'
        >
          ✕
        </button>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5'>
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-rose-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free online signature generator — create a handwritten-style digital signature and download as transparent PNG. No signup.",
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
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold'
            >
              {copied ? (
                <span className='text-rose-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const USE_CASES = [
  [
    "PDF documents",
    "Insert a PNG signature into PDFs using Adobe Acrobat, Preview (Mac), or any PDF editor that supports image insertion.",
  ],
  [
    "Email signatures",
    "Add the PNG to your email client's signature settings (Gmail, Outlook, Apple Mail) as an image below your name.",
  ],
  [
    "Google Docs / Slides",
    "Insert → Image → Upload from computer. Resize and position above your typed name for a professional appearance.",
  ],
  [
    "Microsoft Word",
    "Insert → Pictures → This Device. Use a transparent PNG so the signature sits cleanly over any document background.",
  ],
  [
    "Contracts and letters",
    "Insert the PNG signature image on the signature line of formal correspondence documents before converting to PDF.",
  ],
  [
    "Online forms",
    "Download and upload your PNG signature wherever an image-based signature is accepted in lieu of a drawn one.",
  ],
];

const FAQS = [
  {
    q: "Is a digitally generated signature legally valid?",
    a: "The legal validity of a digital signature depends on the jurisdiction and the type of document. In the US, the Electronic Signatures in Global and National Commerce (ESIGN) Act and the Uniform Electronic Transactions Act (UETA) give electronic signatures the same legal standing as handwritten signatures for most commercial and personal documents. In the UK, the Electronic Communications Act 2000 and subsequent EU eIDAS regulation (retained in UK law post-Brexit) similarly recognise electronic signatures. However, certain documents — including wills, trusts, court orders, family law documents, and some real estate transactions — may require a wet ink signature regardless of jurisdiction. A typed-name or stylised-font digital signature (as created by this tool) is legally considered a 'simple electronic signature' — the lowest tier of electronic signature. It is sufficient for most everyday business documents, contracts, offer letters, and agreements. For higher-value or legally sensitive documents, a qualified electronic signature (QES) using a digital certificate may be required.",
  },
  {
    q: "What is the difference between a digital signature and an electronic signature?",
    a: "These terms are often used interchangeably but have distinct technical meanings. An electronic signature (e-signature) is any electronic process that indicates acceptance of an agreement or document — this includes typing your name, checking a box, or inserting a stylised image of your signature. It's the broad legal category. A digital signature is a specific technical implementation of an electronic signature that uses cryptographic technology to verify the identity of the signer and ensure the document hasn't been altered after signing. Digital signatures create a verifiable, tamper-evident record tied to a specific certificate authority. Platforms like DocuSign and Adobe Sign use digital signature technology. The signature created by this tool is an electronic signature — a stylised image representation of your handwritten signature — appropriate for most everyday documents but not cryptographically verifiable.",
  },
  {
    q: "How do I add my signature to a PDF?",
    a: "There are several ways to add a signature image to a PDF depending on your software. In Adobe Acrobat Reader (free): open the PDF, select Tools → Fill & Sign → Sign Yourself → Add Signature → Image, then upload your PNG signature. In Preview on Mac: open the PDF, click the markup toolbar pen icon, select Signature from the toolbar, then drag your signature to the correct position. In Google Chrome: open the PDF in Chrome, use the annotation tools if available, or right-click and select Open with, then use the built-in editor. For most documents, the cleanest method is to insert the signature image in a word processor or Google Docs version of the document first, then export or print to PDF. A transparent background PNG from this tool will sit cleanly on the signature line without a white rectangle around it.",
  },
  {
    q: "How do I add my signature to an email?",
    a: "Adding a signature image to your email signature depends on your email client. In Gmail: go to Settings → See all settings → Signature → Create new signature. In the signature editor, click the Insert Image button and upload your PNG signature file. Position it below your name and contact details. In Outlook (desktop): File → Options → Mail → Signatures → New. In the signature editor, use Insert → Pictures to add your signature image. In Apple Mail: Mail → Settings → Signatures → New signature. Paste your signature image into the text area. Note that some email clients and corporate spam filters strip or block external images in email signatures. For the most reliable result across all email clients, keep your email signature simple — plain text with your name and contact details is more universally displayed than image-heavy signatures.",
  },
  {
    q: "Why should I download as a transparent PNG rather than a white background?",
    a: "A transparent PNG background means the signature image has no visible background — it shows only the signature strokes themselves, not a white rectangle around them. When you place a transparent PNG signature on a document, form, or email, it sits cleanly on whatever background is beneath it — white paper, coloured document backgrounds, or any other surface. A white-background signature, by contrast, places a visible white rectangle on the page wherever the image is positioned, which looks unprofessional on anything other than a pure white background. Transparent PNG is the standard format for signature images used in documents and digital contexts. This tool generates transparent PNG signatures by default, which is why they're suitable for insertion into PDFs, Word documents, Google Docs, and email signatures.",
  },
  {
    q: "Can I use this signature for official documents?",
    a: "For most everyday business purposes — signing contracts, offer letters, NDAs, service agreements, purchase orders, and general business correspondence — a digitally generated signature image is legally acceptable and widely used. For documents with specific legal requirements around signature authenticity — such as wills, certain property transactions, sworn affidavits, and court filings — a wet ink signature or a cryptographically verified digital signature may be required. If you're unsure whether a specific document requires a wet signature, consult the issuing party (the other company, solicitor, or authority) or a legal professional. This tool is appropriate for general professional and personal document signing, not for documents where signature verification and non-repudiation are legally required.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-3'>
        {FAQS.map((f, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className='font-semibold text-gray-900 text-sm'>{f.q}</span>
              <span className='text-rose-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>
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
      <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
        <div className='hidden sm:block'>
          <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className='block sm:hidden'>
          <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot
          variant='leaderboard'
          slotId={SLOT_LEADERBOARD}
          className='hidden sm:flex'
        />
        <AdSlot
          variant='mediumrectangle'
          slotId={SLOT_LEADERBOARD}
          className='flex sm:hidden'
        />
      </div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <ShareBar />
      </div>

      <section
        id='how-to-use'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'
      >
        <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
          How to Use the Signature Generator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Type your name, choose a font style and colour, adjust size and line
          weight, preview your signature, and download it as a transparent PNG.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Type your name",
              body: "Enter the name you want to use for your signature — typically your first and last name, or first name only for an informal style. You can type your full legal name for formal documents or a shortened version for everyday use. The signature preview updates in real time as you type. Try different versions of your name (initials only, first name, full name with middle initial) to see which produces the most visually appealing signature.",
              enrich: (
                <div className='bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed'>
                  <strong>Style tip:</strong> Shorter names (first name or
                  initials) often look better in cursive styles because they
                  have fewer characters to flow through the script font. Longer
                  names can look equally impressive but may need a smaller size
                  to fit comfortably. Try both your full name and an abbreviated
                  version before deciding on your final signature.
                </div>
              ),
            },
            {
              n: 2,
              title: "Choose a font style",
              body: "Select from the available cursive and script font styles — ranging from formal calligraphic styles to casual flowing scripts. Each font creates a distinctly different character and personality for your signature. Formal styles (classic calligraphy, italic scripts) suit professional documents and contracts. More flowing, expressive styles suit personal correspondence and creative contexts. Preview each style before downloading to find the one that feels most natural as a representation of your name.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Use context
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Recommended style
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "Legal contracts and formal documents",
                          "Classic, formal calligraphy script — legible and professional",
                        ],
                        [
                          "Business correspondence and emails",
                          "Clean italic or semi-formal cursive — polished but approachable",
                        ],
                        [
                          "Personal letters and cards",
                          "Flowing, expressive script — relaxed and personal",
                        ],
                        [
                          "Creative or design work",
                          "Stylised or decorative script — personality-forward",
                        ],
                        [
                          "Online forms and digital use",
                          "Any style that scans clearly at small sizes — avoid very thin strokes",
                        ],
                      ].map(([ctx, rec]) => (
                        <tr key={ctx} className='hover:bg-rose-50'>
                          <td className='px-4 py-2 font-medium text-rose-700 text-xs'>
                            {ctx}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-500'>
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
              title: "Adjust colour, size, and line weight",
              body: "Use the colour picker to select your signature ink colour. Classic black is appropriate for most formal documents. Dark navy or deep blue is a popular alternative that looks distinct from printed text (helpful when scanning documents). Dark colours work best for printed or high-contrast documents; avoid very light colours that may not reproduce well when photocopied or scanned. Adjust the font size and line weight to create the visual weight and presence you want — a slightly heavier line weight can add authority to a formal signature.",
              enrich: (
                <div className='bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed'>
                  <strong>Colour for professional use:</strong> For most
                  professional and legal documents, stick to black or very dark
                  navy. Coloured signatures (red, blue, green) can look
                  unprofessional in formal contexts and may not photocopy well.
                  If your signature will primarily be used in digital documents
                  (PDFs, Google Docs, online forms), a dark ink colour with a
                  transparent background gives the cleanest result across all
                  document types.
                </div>
              ),
            },
            {
              n: 4,
              title: "Download as transparent PNG",
              body: "Click 'Download PNG' to save your signature as a transparent PNG file. The transparent background means the signature sits cleanly on any document background without a visible white rectangle around it. Save the file in a memorable location — you'll likely reuse this signature file frequently. Common uses are shown below. If you need to use the signature regularly, consider adding it to a folder in your cloud storage (Google Drive, Dropbox, iCloud) for easy access across devices.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Where to use
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          How to insert
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {USE_CASES.map(([place, method]) => (
                        <tr key={place} className='hover:bg-rose-50'>
                          <td className='px-4 py-2 font-bold text-rose-700 text-xs whitespace-nowrap'>
                            {place}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-500'>
                            {method}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-rose-600 text-white font-black text-lg flex items-center justify-center'>
                {n}
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {title}
                </h3>
                <p className='text-gray-600 leading-relaxed mb-3'>{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Common use cases
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "📄",
              title: "Business contracts",
              desc: "Add a professional signature image to contracts, NDAs, offer letters, and service agreements before converting to PDF.",
            },
            {
              emoji: "📧",
              title: "Email signature",
              desc: "Insert the PNG as an image in Gmail, Outlook, or Apple Mail signatures — displays your handwritten name below your contact details.",
            },
            {
              emoji: "📝",
              title: "Google Docs and Word",
              desc: "Add to documents, letters, and proposals as a positioned image on the signature line — transparent background sits cleanly on the page.",
            },
            {
              emoji: "🏠",
              title: "Forms and applications",
              desc: "Use wherever online forms accept an image upload for a signature field in place of a physically drawn signature.",
            },
            {
              emoji: "🎨",
              title: "Creative work and portfolios",
              desc: "Sign digital artwork, design files, or creative portfolios with a personalised handwritten-style signature.",
            },
            {
              emoji: "📑",
              title: "Invoices and quotes",
              desc: "Add a personal touch to invoices and quotes by including your signature — reinforces the professional, personal nature of your business.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-rose-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-rose-600 to-pink-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>✍️</div>
          <h3 className='text-xl font-bold mb-3'>
            A transparent PNG signature works across every document format —
            create yours once and reuse it everywhere
          </h3>
          <p className='text-rose-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Unlike a physical signature that requires printing, signing, and
            scanning — a digital signature PNG can be inserted into any document
            in seconds and reused indefinitely. Create your signature once, save
            it to your cloud storage, and you have a professional
            handwritten-style signature available on any device, in any document
            format, at any time. The transparent background means it works
            cleanly on white documents, coloured forms, and email signatures
            without any visible background box. For everyday professional use —
            contracts, invoices, letters, emails — a well-made digital signature
            file is one of the most useful assets you can create for yourself.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Business Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/invoice-generator",
                label: "Invoice Generator",
                desc: "Create professional invoices with itemised billing, automatic totals, and PDF download.",
              },
              {
                href: "/tools/resume-builder",
                label: "Resume Builder",
                desc: "Build a professional resume with live preview and PDF download — no signup required.",
              },
              {
                href: "/tools/pdf-merger-splitter",
                label: "PDF Merger & Splitter",
                desc: "Merge multiple PDFs into one or split a PDF into separate pages — runs in your browser.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-rose-200 hover:-translate-y-1 transition-all duration-200 p-5'
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {label}
                </div>
                <div className='text-xs text-gray-500'>{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
