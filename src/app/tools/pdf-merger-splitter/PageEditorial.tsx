"use client";
// src/app/tools/pdf-merger-splitter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/pdf-merger-splitter";
const TOOL_NAME = "PDF Merger & Splitter";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7f1d1d", light: "#fff7ed" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-red-100 shadow-inner mb-5'>
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
    "Free online PDF merger & splitter — merge PDFs or split into pages, all in your browser. No upload, no signup.",
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
                <span className='text-red-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "Are my PDF files uploaded to any server when I use this tool?",
    a: "No — all PDF processing in this tool happens entirely within your browser using the pdf-lib JavaScript library. Your files are read locally by your browser and processed in memory. No data is transmitted to any server, stored remotely, or accessible by anyone other than you. This makes the tool safe to use with confidential, sensitive, or proprietary documents — contracts, financial records, medical documents, and legal files — since the contents never leave your device. This browser-based approach also means the tool works offline once the page has loaded.",
  },
  {
    q: "Is there a file size limit for merging or splitting PDFs?",
    a: "There is no strict server-imposed file size limit since all processing happens in your browser. Practical limits depend on your device's available memory (RAM). On most modern laptops and desktop computers, PDFs up to 100–200 MB can be processed without issue. Very large PDFs (over 300 MB) or merging many large files simultaneously may slow down or run out of browser memory on older or low-spec devices. If you encounter performance issues, try processing in smaller batches — merge files in groups of 5–10 rather than all at once, or use a desktop PDF editor like Adobe Acrobat or Preview (Mac) for very large files.",
  },
  {
    q: "Will merging PDFs affect the quality or formatting of the original files?",
    a: "No — merging PDFs with this tool combines them at the document level without re-encoding, compressing, or re-rendering the content. The text, images, fonts, and formatting in each original PDF are preserved exactly as they were. This is different from tools that convert PDFs to images and back (which degrades quality) — this tool operates on the native PDF structure, so the merged output maintains the original quality of all input files. Page size, orientation (portrait/landscape), and margins are preserved per page. If input PDFs have mixed page sizes or orientations, the merged output will reflect this mixed layout.",
  },
  {
    q: "Can I reorder pages before merging?",
    a: "Yes — once you've uploaded multiple PDF files in merge mode, you can reorder them using the arrow buttons before generating the merged output. The final merged PDF will contain pages in the order shown in the tool. This is useful when combining a cover page, main document, and appendices that were created as separate files and need to be merged in a specific sequence. For reordering individual pages within a single large PDF (rather than reordering entire documents), use the split function to extract individual pages, then re-merge them in the desired order.",
  },
  {
    q: "What happens to password-protected PDFs?",
    a: "This tool cannot open, process, or bypass password-protected PDFs. If you upload a password-protected PDF, the tool will not be able to read its content and the operation will fail. To merge or split a password-protected PDF, you first need to remove the password protection using the PDF's original password in a PDF editor such as Adobe Acrobat (File → Properties → Security → No Security) or Preview on Mac (open with password, then export without password). Never share your password with third-party online tools to remove PDF passwords — use only trusted software you control.",
  },
  {
    q: "What is the difference between merging and combining PDFs?",
    a: "Merging and combining are the same operation — both terms describe taking multiple separate PDF files and joining them into a single PDF document. 'Merging' is more commonly used in the context of document management tools and enterprise software; 'combining' is used by Adobe in its product marketing. The end result is identical: all pages from all input PDFs, in the specified order, in a single output PDF file. This is distinct from 'stitching' (sometimes used for combining scanned images into a PDF) and from 'appending' (adding pages to the end of an existing PDF), though the practical outcome of all three is the same — a single PDF with content from multiple sources.",
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
              <span className='text-red-600 text-lg shrink-0'>
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
          How to Use the PDF Merger &amp; Splitter
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Select Merge or Split mode, upload your PDF files, reorder if needed,
          and download the result — all processing happens in your browser.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Choose Merge or Split mode",
              body: "Select 'Merge PDFs' to combine multiple separate PDF files into a single document. Select 'Split PDF' to break a single PDF into its individual pages, each downloadable as a separate file. The two modes are independent — switch between them using the mode selector tabs at the top of the tool.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Mode
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          What it does
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Common use
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "Merge",
                          "Combines 2 or more PDFs into one file",
                          "Joining a cover page, report, and appendix into a single document to send",
                        ],
                        [
                          "Split",
                          "Extracts each page of a PDF as a separate file",
                          "Extracting individual pages from a multi-page contract, report, or scan",
                        ],
                      ].map(([mode, desc, use]) => (
                        <tr key={mode} className='hover:bg-red-50'>
                          <td className='px-4 py-2 font-bold text-red-700 text-xs'>
                            {mode}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-700'>
                            {desc}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-500'>
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
              n: 2,
              title: "Upload your PDF files",
              body: "Click the upload area or drag and drop your PDF files onto it. For Merge mode, upload all the PDFs you want to combine — you can add multiple files at once. For Split mode, upload the single PDF you want to split into pages. File reading happens immediately in your browser — nothing is sent to any server at any point. The tool displays each uploaded file with its name and page count.",
              enrich: (
                <div className='bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed'>
                  <strong>Privacy note:</strong> All PDF processing happens
                  entirely in your browser using the pdf-lib library. Your files
                  never leave your device — they are not uploaded to, stored on,
                  or accessible by any server. This makes the tool safe for
                  confidential documents including contracts, financial records,
                  medical files, and legal documents.
                </div>
              ),
            },
            {
              n: 3,
              title: "Reorder files before merging (Merge mode)",
              body: "In Merge mode, use the up and down arrow buttons next to each file to reorder them before merging. The final PDF will contain all pages in the order shown. This is essential when combining documents that need to be in a specific sequence — for example: cover page first, main document second, appendices last. Review the order carefully before proceeding, as page order cannot be changed after the merged PDF is generated (you would need to re-merge with the correct order).",
              enrich: (
                <div className='bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed'>
                  <strong>Reordering individual pages:</strong> To reorder
                  individual pages within a single PDF (rather than reordering
                  entire documents), use Split mode to extract all pages as
                  individual files, then re-merge them in the desired order
                  using Merge mode. This gives you full control over the final
                  page sequence.
                </div>
              ),
            },
            {
              n: 4,
              title: "Download your result",
              body: "In Merge mode, click 'Merge PDFs' to generate the combined document, then download it. In Split mode, click 'Split PDF' to extract all pages, then download individual pages or all pages as a ZIP file. The generated files are saved directly to your device's default download location. Original quality, fonts, and formatting are preserved in all output files.",
              enrich: (
                <div className='bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed'>
                  <strong>Quality preservation:</strong> This tool merges and
                  splits PDFs at the document structure level — it does not
                  re-render, re-encode, or compress PDF content. Text, images,
                  fonts, and formatting are preserved exactly as in the original
                  files. Output quality is identical to the input quality,
                  unlike tools that convert to images and back.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "📑",
              title: "Combine contract documents",
              desc: "Merge a cover letter, main contract, and appendices into a single PDF to send to clients or solicitors.",
            },
            {
              emoji: "📊",
              title: "Assemble reports",
              desc: "Combine individually created report sections — executive summary, data analysis, charts — into one complete document.",
            },
            {
              emoji: "🏥",
              title: "Extract medical or legal pages",
              desc: "Split a multi-page scanned document to extract specific pages — useful for medical records, legal filings, or tax documents.",
            },
            {
              emoji: "📚",
              title: "Merge study materials",
              desc: "Combine multiple lecture slides, handout PDFs, or research papers into a single document for easier reference.",
            },
            {
              emoji: "🧾",
              title: "Separate invoice pages",
              desc: "Split a PDF containing multiple invoices into individual files — one per invoice — for organised filing and sending.",
            },
            {
              emoji: "📋",
              title: "Reorganise scanned documents",
              desc: "Split a large scanned batch, extract the pages you need, and re-merge in the correct order for a clean final document.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-red-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-red-600 to-orange-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>🔒</div>
          <h3 className='text-xl font-bold mb-3'>
            Your files never leave your browser — this is the most private way
            to process PDF documents online
          </h3>
          <p className='text-red-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Most online PDF tools — even well-known ones — upload your files to
            their servers for processing, store them temporarily (sometimes
            permanently), and process them using server-side software. This
            creates real privacy risks for sensitive documents. This tool uses
            pdf-lib, a JavaScript PDF library that runs entirely in your
            browser. When you upload a PDF, it is read directly by your browser,
            processed in browser memory, and the result is returned to you as a
            download — your files are never transmitted anywhere. For
            confidential contracts, personal identification documents, financial
            records, medical files, or proprietary business documents,
            browser-based processing is the only genuinely private option.
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
                href: "/tools/signature-generator",
                label: "Signature Generator",
                desc: "Create a handwritten-style digital signature and download as a transparent PNG.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
