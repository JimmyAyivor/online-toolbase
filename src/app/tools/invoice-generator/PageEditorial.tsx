"use client";
// src/app/tools/invoice-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/invoice-generator";
const TOOL_NAME = "Invoice Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e293b", light: "#f8fafc" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-slate-100 shadow-inner mb-5">
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
    "Free online invoice generator — create professional invoices with itemised billing, automatic totals, and PDF download. No signup, no data stored.",
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
                <span className="text-slate-700">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-slate-700 to-gray-900 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const INVOICE_FIELDS = [
  [
    "Invoice number",
    "A unique sequential reference number — used to track invoices and required for your own bookkeeping records.",
  ],
  [
    "Issue date",
    "The date the invoice was created and sent. This is the date from which payment terms are calculated.",
  ],
  [
    "Due date",
    "The date payment is expected. Derived from issue date + payment terms (e.g. Net 30 = 30 days after issue date).",
  ],
  [
    "From (your info)",
    "Your business name, address, and contact details. Add your tax ID or VAT number if applicable.",
  ],
  [
    "To (client info)",
    "Client name, company, and billing address. Ensure this is accurate — incorrect billing addresses can delay payment.",
  ],
  [
    "Line items",
    "Each product or service billed separately with description, quantity, unit rate, and line total.",
  ],
  [
    "Tax rate",
    "Applied as a percentage to the subtotal. Use your jurisdiction's standard rate (e.g. 20% VAT in the UK, sales tax in the US).",
  ],
  [
    "Payment terms",
    "The agreed timeframe for payment: Net 7, Net 14, Net 30, or Due on receipt. State these clearly on every invoice.",
  ],
  [
    "Notes",
    "Payment instructions, bank details, thank-you notes, or any project-specific terms.",
  ],
];

const FAQS = [
  {
    q: "What information must a legally valid invoice include?",
    a: "Invoice requirements vary by country and whether you're VAT/GST registered, but a standard professional invoice should include: a unique invoice number, the invoice issue date and payment due date, your full business name and address, your client's full name and address, a clear description of each product or service provided, quantity and unit price for each line item, subtotal, any applicable tax (with your tax registration number if VAT/GST registered), the total amount due, and payment instructions including accepted payment methods and bank details where applicable. In the UK, VAT-registered businesses must issue a VAT invoice for all taxable supplies — this requires your VAT registration number to be shown. In the US, there is no federal requirement for a specific invoice format, but invoices are important for your own tax records.",
  },
  {
    q: "What is Net 30 and what payment terms should I use?",
    a: "Net 30 means payment is due within 30 calendar days of the invoice issue date. Common payment terms include: Due on Receipt (payment expected immediately upon receiving the invoice), Net 7 (due within 7 days — suitable for small amounts or clients with fast payment cycles), Net 14 (due within 14 days — common for freelancers and small businesses), Net 30 (due within 30 days — the standard for most B2B invoices), and Net 60 or Net 90 (used in some industries for larger corporate clients). The right payment terms depend on your cash flow needs, industry norms, and your relationship with the client. For new clients, shorter terms (Net 7 or Net 14) protect your cash flow. For established clients with good payment history, Net 30 is typically acceptable. Always agree on payment terms before starting work and state them clearly on every invoice.",
  },
  {
    q: "Should I include my bank details on the invoice?",
    a: "Yes — including complete payment details on the invoice removes friction from the payment process and reduces the need for follow-up. For bank transfers, include your account name, bank name, sort code/routing number, and account number. If you accept PayPal, include your PayPal email. If you accept credit cards, include your payment link or note that card payments are available on request. In the UK, BACS bank transfer is the most common B2B payment method and should always be included. In the US, ACH bank transfer details are standard for B2B invoices. Be aware of invoice fraud (where fraudsters intercept invoices and replace bank details) — if you change your bank details, notify clients verbally or via a separate channel in addition to the invoice.",
  },
  {
    q: "How should I number invoices?",
    a: "Invoice numbering should be sequential, unique, and consistent. The simplest system is a number sequence starting at 001 and incrementing with each invoice (001, 002, 003…). A more structured approach includes the year (2024-001, 2024-002) which makes filing and searching easier. Some businesses include a client code (CLIENT-001, CLIENT-002) to group invoices by client. The format doesn't matter as long as it's sequential — never skip numbers, never reuse numbers, and never issue two invoices with the same number. Your accounting software, tax authority, and any auditors may need to trace invoices by number, so gaps or duplicates in the sequence can cause issues. This tool auto-generates sequential invoice numbers that you can customise to match your own numbering convention.",
  },
  {
    q: "What's the difference between a quote, a proforma invoice, and a tax invoice?",
    a: "A quote (or estimate) is a document sent before work begins that states the price you propose to charge. It is not a request for payment and has no legal payment obligation. A proforma invoice is a preliminary invoice that looks like a real invoice but is sent before goods or services are delivered — often used to request a deposit or upfront payment, or to satisfy import/export documentation requirements. It does not create a legal payment obligation on its own. A tax invoice (also called a sales invoice, final invoice, or commercial invoice) is a formal request for payment issued after goods or services have been delivered. It creates a legal payment obligation and is the document your client needs for their accounts and VAT/tax reclaims. This tool generates final tax invoices appropriate for requesting payment after delivery.",
  },
  {
    q: "How do I follow up on an unpaid invoice?",
    a: "Unpaid invoice follow-up should be structured and timely. Send a polite payment reminder on or just after the due date — a brief, professional email referencing the invoice number, amount, and due date is usually sufficient for a first reminder. If the invoice remains unpaid after 7–14 days, send a firmer second reminder that states you will charge a late payment fee if applicable (include this possibility in your original payment terms). After 30 days overdue, consider a formal letter or phone call. In the UK, the Late Payment of Commercial Debts Act entitles you to charge statutory interest (8% + Bank of England base rate) on overdue B2B invoices. In most countries, unpaid invoices can be pursued through small claims court for amounts under a threshold (typically £5,000–£10,000 in the UK, $10,000–$25,000 in US small claims courts depending on state). Prevention is more effective than chasing: shorter payment terms, upfront deposits for new clients, and clear payment instructions reduce late payments significantly.",
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
              <span className="text-slate-700 text-lg shrink-0">
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
          How to Use the Invoice Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Fill in your business and client details, add line items with
          automatic calculations, set payment terms, and download your invoice
          as a PDF — all in your browser.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Fill in your business and client details",
              body: "Enter your business name, address, and contact information in the 'From' section. Enter your client's name and billing address in the 'To' section. Add your invoice number (sequential — the tool generates one automatically), issue date, and due date. If you're VAT or GST registered, include your tax registration number. Accuracy here matters: incorrect client billing addresses can delay payment and cause problems with your client's accounts payable process.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Field
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What to include
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {INVOICE_FIELDS.map(([field, desc]) => (
                        <tr key={field} className="hover:bg-slate-50">
                          <td className="px-4 py-2 font-bold text-slate-700 text-xs whitespace-nowrap">
                            {field}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {desc}
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
              title: "Add line items",
              body: "Click 'Add Item' to add each product or service as a separate line. Enter a description, quantity, and unit rate — the line total is calculated automatically. Add as many line items as needed. Group related services under a single line item if you prefer a cleaner invoice, or itemise separately for detailed billing. The subtotal, tax, and total update automatically as you add or edit items.",
              enrich: (
                <div className="bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-700 leading-relaxed">
                  <strong>Itemisation tip:</strong> More detailed line items are
                  generally better — they make it clear exactly what the client
                  is paying for and reduce payment disputes. If you have a
                  single project with multiple components, consider separate
                  lines for each deliverable (e.g. 'Logo design', 'Brand
                  guidelines', 'Business card design') rather than a single
                  'Branding project' line. Detailed invoices are also useful for
                  your own tax records.
                </div>
              ),
            },
            {
              n: 3,
              title: "Set tax rate and payment terms",
              body: "Enter your applicable tax rate as a percentage — the tool applies this to the subtotal and shows the tax amount and grand total separately. Set your payment terms (Due on Receipt, Net 7, Net 14, Net 30, or Net 60) and add any payment instructions, bank details, or notes in the notes field. Clear payment instructions on the invoice itself significantly reduce the time between sending and receiving payment.",
              enrich: (
                <div className="bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-700 leading-relaxed">
                  <strong>Payment terms tip:</strong> Include your complete bank
                  transfer details in the Notes field — account name, sort code,
                  and account number (UK) or routing number and account number
                  (US). Clients shouldn't have to contact you to find out how to
                  pay. Also state your late payment policy if you charge
                  interest on overdue invoices, as this discourages late
                  payment.
                </div>
              ),
            },
            {
              n: 4,
              title: "Preview and download as PDF",
              body: "Use the live preview panel to check how your invoice will appear before downloading. Click 'Download PDF' to save the invoice as a PDF file to your device. The PDF is ready to email to your client or print. All invoice data stays in your browser — nothing is sent to or stored on our servers. Save a copy of the PDF for your own records as part of your bookkeeping system.",
              enrich: (
                <div className="bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-700 leading-relaxed">
                  <strong>Record-keeping tip:</strong> Save every invoice PDF in
                  a folder organised by year and client — e.g. '2024 / Client
                  Name / INV-001.pdf'. Keep these alongside any purchase orders,
                  contracts, or client emails related to the work. Most
                  countries require businesses to retain financial records for a
                  minimum of 5–7 years. For UK businesses, HMRC requires records
                  to be kept for at least 5 years after the 31 January
                  submission deadline for the relevant tax year.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "💻",
              title: "Freelancers and consultants",
              desc: "Create professional invoices for project work, retainers, and hourly billing — itemise deliverables clearly and set Net 14 or Net 30 payment terms.",
            },
            {
              emoji: "🏢",
              title: "Small business owners",
              desc: "Generate invoices for products, services, or a mix of both — track what you've invoiced and maintain PDF records for your bookkeeping.",
            },
            {
              emoji: "🎨",
              title: "Designers and creatives",
              desc: "Invoice for project phases (concept, design, revisions, delivery) as separate line items to show clients exactly what each stage covers.",
            },
            {
              emoji: "🏗️",
              title: "Contractors and tradespeople",
              desc: "Bill for materials and labour as separate line items with quantities and rates — apply the appropriate tax rate for your jurisdiction.",
            },
            {
              emoji: "📸",
              title: "Photographers and videographers",
              desc: "Invoice for shoot day, editing hours, licensing fees, and travel expenses as separate line items for transparent, professional billing.",
            },
            {
              emoji: "🧑‍💼",
              title: "Agencies and studios",
              desc: "Create invoices for retainer agreements, project milestones, and ad hoc work — maintain a clean invoice number sequence for your accounts.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-slate-300 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-gray-900 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🧾</div>
          <h3 className="text-xl font-bold mb-3">
            A professional invoice is more than a payment request — it's a legal
            document and your most important client communication
          </h3>
          <p className="text-slate-300 leading-relaxed max-w-xl mx-auto text-sm">
            An invoice establishes a legal claim to payment, provides your
            client with the documentation they need for their own accounts and
            tax returns, and forms part of your own bookkeeping records. A
            poorly formatted or incomplete invoice — missing due dates, unclear
            payment instructions, or no invoice number — creates friction in the
            payment process and can delay when you actually get paid. A clear,
            complete, professional invoice signals that you run a well-organised
            business and gives your client everything they need to process
            payment quickly. This tool produces invoices that include all
            standard fields required for professional billing — download and
            send with confidence.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Business Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/resume-builder",
                label: "Resume Builder",
                desc: "Build a professional resume with customisable templates — downloadable as PDF.",
              },
              {
                href: "/tools/pdf-merger-splitter",
                label: "PDF Merger & Splitter",
                desc: "Merge multiple PDFs into one or split a PDF into separate pages — no upload required.",
              },
              {
                href: "/tools/signature-generator",
                label: "Signature Generator",
                desc: "Create a custom digital signature in stylish fonts for use in documents and emails.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-slate-300 hover:-translate-y-1 transition-all duration-200 p-5"
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
