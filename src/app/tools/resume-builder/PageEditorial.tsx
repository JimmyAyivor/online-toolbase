"use client";
// src/app/tools/resume-builder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/resume-builder";
const TOOL_NAME = "Resume Builder";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5">
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
    "Free online resume builder — build a professional resume with live preview and PDF download. No signup, no data stored.",
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
                <span className="text-blue-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const RESUME_SECTIONS = [
  [
    "Contact details",
    "Name, email, phone, LinkedIn URL, location (city/country). Never include date of birth, nationality, or a photo (US/UK standard).",
  ],
  [
    "Professional summary",
    "3–5 sentence overview of your experience, key strengths, and career goal. Tailored to the role — not generic.",
  ],
  [
    "Work experience",
    "Reverse chronological order. Company, job title, dates. 3–5 bullet points per role using action verbs + quantified results.",
  ],
  [
    "Education",
    "Degree, institution, year. Include grades if strong. Only include high school if no tertiary education.",
  ],
  [
    "Skills",
    "Technical tools, software, languages, certifications. Keep it relevant — avoid listing obvious basics.",
  ],
  [
    "Optional sections",
    "Projects, volunteering, publications, awards, languages — add if relevant to the target role.",
  ],
];

const FAQS = [
  {
    q: "How long should a resume be?",
    a: "The standard resume length is one page for candidates with under 10 years of experience, and two pages for more experienced professionals with extensive relevant experience to show. Three-page resumes are rarely appropriate except in academic CV contexts (where the format is different from a standard resume) or very senior executive roles. The one-page rule is particularly important in the US and UK job markets for early-career and mid-career candidates — recruiters typically spend 6–10 seconds on an initial resume scan, and a tightly edited one-page resume with strong signal-to-noise ratio is more effective than a two-page version with filler. Cut ruthlessly: remove roles older than 10–15 years that aren't relevant, remove personal hobbies unless highly relevant, and remove generic skills (Microsoft Office, typing, email) that add no differentiation.",
  },
  {
    q: "What is an ATS and how do I make my resume ATS-friendly?",
    a: "ATS stands for Applicant Tracking System — software used by most medium and large employers to scan, parse, and rank resumes before a human recruiter sees them. ATS systems extract text from your resume and compare keywords, job titles, and skills against the job description requirements. An ATS-unfriendly resume gets filtered out before any human reads it. To make your resume ATS-compatible: use a clean, single-column layout with no tables or text boxes (which some ATS systems can't parse correctly); use standard section headings (Work Experience, Education, Skills) rather than creative alternatives (My Journey, What I've Done); include the exact keywords and phrases from the job description in your experience and skills sections; avoid headers and footers for critical information like your name and contact details; and save as a PDF (which preserves formatting) or a simple .docx file. This builder produces clean, ATS-friendly formatting.",
  },
  {
    q: "How should I format my work experience bullet points?",
    a: "Effective resume bullet points follow the CAR or STAR structure: start with a strong action verb, describe what you did, and quantify the result where possible. The formula is: '[Action verb] + [what you did] + [measurable outcome]'. For example: 'Reduced customer onboarding time by 40% by redesigning the welcome email sequence and automating key touchpoints.' Avoid weak, vague bullets like 'Responsible for managing the team' — replace with 'Led a team of 8 engineers to deliver a $2M infrastructure project 3 weeks ahead of schedule.' Use past tense for previous roles and present tense for your current role. Start every bullet with a different action verb — don't begin five bullets in a row with 'Managed'. Quantify wherever possible: percentages, revenue figures, team sizes, timelines, customer numbers.",
  },
  {
    q: "Should I include a professional summary on my resume?",
    a: "Yes — a 3–5 sentence professional summary at the top of your resume is valuable for most candidates, especially those with more than 3 years of experience. The summary gives recruiters an immediate snapshot of who you are and what you bring, without requiring them to read the entire document. It's also an opportunity to include targeted keywords for ATS systems and to address any context that the rest of your resume doesn't immediately convey (such as a career transition, a gap, or an unusual background). A weak summary is worse than none — avoid generic phrases like 'results-oriented professional' or 'dynamic team player'. Instead, be specific: mention your years of experience, industry, key skills, and one or two standout achievements. Tailor the summary to each job application.",
  },
  {
    q: "What is the difference between a resume and a CV?",
    a: "In the US and Canada, 'resume' and 'CV' are sometimes used interchangeably in casual conversation, but they refer to different documents in professional contexts. A resume is a concise 1–2 page document tailored to a specific job application, focused on relevant work experience, skills, and achievements. A CV (Curriculum Vitae) is a comprehensive, longer document (typically 2–5+ pages) that lists all academic qualifications, publications, presentations, awards, and research experience — primarily used for academic, research, and scientific positions in the US, and for all professional applications in the UK, Europe, Australia, and many other countries. In the UK, 'CV' is the standard term for what Americans call a resume — a 1–2 page job application document. This tool builds the standard professional resume / UK CV format appropriate for most job applications.",
  },
  {
    q: "Should I tailor my resume for each job application?",
    a: "Yes — tailoring your resume to each job application significantly improves your callback rate. Tailoring doesn't mean rewriting your entire resume from scratch; it means adjusting your professional summary, reordering or emphasising relevant bullet points, and ensuring your skills section mirrors the keywords and requirements in the specific job description. Many candidates submit an identical resume to every job — employers and ATS systems can tell. A resume that mirrors the job description's language and specifically addresses the role's key requirements consistently outperforms a generic one. The minimum level of tailoring: read the job description, identify the 3–5 most important skills or experiences they're looking for, and ensure those are clearly present and prominent in your resume. The professional summary is the easiest place to add role-specific tailoring without restructuring your entire document.",
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
              <span className="text-blue-600 text-lg shrink-0">
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
          How to Use the Resume Builder
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Fill in your details across each section, watch the live preview
          update, and download your completed resume as a print-ready PDF.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Fill in your personal details and professional summary",
              body: "Enter your full name, contact details (email, phone, LinkedIn URL, and location), and a professional summary. The summary is 3–5 sentences that capture your experience, key skills, and career direction. Write it last — after you've filled in your work experience — so you know which achievements and strengths to highlight. Keep it specific: mention your years of experience, your industry, and one or two standout results.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Section
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What to include
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {RESUME_SECTIONS.map(([section, desc]) => (
                        <tr key={section} className="hover:bg-blue-50">
                          <td className="px-4 py-2 font-bold text-blue-700 text-xs whitespace-nowrap">
                            {section}
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
              title: "Add your work experience",
              body: "Add each role in reverse chronological order (most recent first). For each position, enter your job title, company name, employment dates, and a set of bullet points describing your responsibilities and achievements. Use strong action verbs and quantify your results wherever possible — 'Increased sales by 23% over 6 months' is far stronger than 'Responsible for sales'. Aim for 3–5 bullets per role for your most recent positions and 2–3 bullets for older roles.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Bullet point formula:</strong> [Action verb] + [what
                  you did] + [measurable outcome]. Example: 'Redesigned the
                  client onboarding process, reducing time-to-activation by 35%
                  and increasing 90-day retention by 18%.' The quantified result
                  is what transforms a generic bullet into a compelling one —
                  even estimates or approximations are better than no numbers at
                  all.
                </div>
              ),
            },
            {
              n: 3,
              title: "Add education and skills",
              body: "Enter your education in reverse chronological order — degree, institution, and year. Add relevant skills, tools, technologies, and certifications to the skills section. Keep skills relevant to the role you're targeting: list the specific software, languages, frameworks, or competencies that match the job description. Avoid obvious basics (Microsoft Office, email) and generic soft skills (communication, teamwork) unless you can demonstrate them specifically in your experience bullets.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>ATS tip:</strong> Many employers use Applicant
                  Tracking Systems (ATS) to filter resumes by keywords before a
                  human sees them. Mirror the exact terminology used in the job
                  description — if the job says 'project management' don't only
                  write 'programme management'; if it says 'Salesforce CRM'
                  don't only write 'CRM'. Including the exact keywords from the
                  job posting in your skills and experience sections
                  dramatically improves your ATS ranking.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review the preview and download as PDF",
              body: "The live preview panel updates in real time as you type. Review it to check formatting, spacing, and that all sections read clearly. When you're satisfied, click 'Download PDF' to save your resume as a PDF file. The PDF is ready to attach to job applications. All your data stays in your browser — nothing is uploaded or stored. Save the PDF to your device and consider saving multiple versions tailored to different role types.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Tailoring tip:</strong> Create a 'master' version with
                  all your experience, then save separate tailored versions for
                  each job application. Update the professional summary and
                  reorder skills to match each specific job description.
                  Tailored resumes consistently achieve higher callback rates
                  than generic ones — the effort of a 10-minute targeted edit
                  per application is one of the highest-ROI activities in any
                  job search.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🎓",
              title: "Recent graduates",
              desc: "Build your first professional resume — structure education and internships effectively when you have limited full-time work experience.",
            },
            {
              emoji: "💼",
              title: "Career changers",
              desc: "Highlight transferable skills and reframe your experience to align with a new industry or role type — write a targeted summary that addresses the pivot.",
            },
            {
              emoji: "📈",
              title: "Professionals updating their CV",
              desc: "Refresh an outdated resume — add recent achievements, update your skills section, and sharpen your bullet points with quantified results.",
            },
            {
              emoji: "🌍",
              title: "International job seekers",
              desc: "Create a UK/US format resume when applying to companies in different countries — the standard format and expected sections vary by market.",
            },
            {
              emoji: "🔄",
              title: "Returning to work",
              desc: "Build a resume after a career break — address the gap in your summary and emphasise relevant skills, freelance work, or continuing education during the break.",
            },
            {
              emoji: "⚡",
              title: "Urgent applications",
              desc: "Create a clean, professional resume quickly when a role has a tight application deadline — the builder produces a well-formatted result in minutes.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📄</div>
          <h3 className="text-xl font-bold mb-3">
            Recruiters spend 6–10 seconds on a first resume scan — clarity and
            signal density matter more than design
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            Multiple eye-tracking studies of recruiter resume reviews show the
            initial scan averages 6–10 seconds and focuses on name, current role
            and company, current position dates, previous role and company,
            education, and a quick skim of the top bullet points. Resumes that
            bury key information in dense paragraphs, use creative layouts that
            break visual scanning patterns, or lead with sections that don't
            establish immediate credibility (like an 'About Me' section before
            work experience) consistently underperform against clean,
            conventional formats. A simple, well-structured resume with strong
            bullet points, quantified achievements, and role-relevant keywords
            in the right places outperforms elaborate designs every time. This
            builder produces exactly that format.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Business Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/invoice-generator",
                label: "Invoice Generator",
                desc: "Create professional invoices with itemised billing, automatic totals, and PDF download.",
              },
              {
                href: "/tools/signature-generator",
                label: "Signature Generator",
                desc: "Create a custom digital signature in stylish fonts for documents and emails.",
              },
              {
                href: "/tools/pdf-merger-splitter",
                label: "PDF Merger & Splitter",
                desc: "Merge multiple PDF files into one or split a PDF into separate pages.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
