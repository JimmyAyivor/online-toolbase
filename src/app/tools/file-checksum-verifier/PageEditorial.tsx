import { FileCheck2, ListChecks, HelpCircle, Link2 } from "lucide-react";

const steps = [
  {
    title: "Choose a file",
    text: "Drag a file in or click to browse. It's read locally in your browser — never uploaded.",
  },
  {
    title: "Pick an algorithm",
    text: "Switch between MD5, SHA-1, SHA-256, and SHA-512 to see each hash.",
  },
  {
    title: "Compare the hash",
    text: "Paste the expected hash from the publisher to instantly confirm a match.",
  },
];

const faqs = [
  {
    q: "Why would I check a file's checksum?",
    a: "A checksum is a fingerprint of a file's exact contents. Comparing it against the hash a publisher lists confirms the file wasn't corrupted during download or tampered with along the way.",
  },
  {
    q: "Which algorithm should I use?",
    a: "Use whatever the publisher listed, since that's what you need to compare against. For security-sensitive verification, prefer SHA-256 or SHA-512 — MD5 and SHA-1 are still fine for catching accidental corruption but aren't collision-resistant.",
  },
  {
    q: "Does my file get uploaded anywhere?",
    a: "No. It's hashed locally using the Web Crypto API (and a local MD5 implementation for MD5). Nothing is sent to a server, so very large files may take a moment as your device does all the work.",
  },
  {
    q: "The hashes don't match — what now?",
    a: "Re-download the file first, since a mismatch is usually caused by an incomplete download. If it still doesn't match, don't run the file — get it from the official source and double-check the expected hash was copied correctly.",
  },
];

const useCases = [
  "Verifying a software download matches the publisher's hash",
  "Confirming a large file transferred without corruption",
  "Checking that a backup or archive wasn't altered",
  "Comparing two copies of a file for exact equality",
  "Validating a disk image before flashing it",
  "Spot-checking files in a security review",
];

const relatedTools = [
  { name: "Text Encryption Tool", href: "/tools/text-encryption-tool" },
  { name: "Password Breach Checker", href: "/tools/password-breach-checker" },
  { name: "TOTP / 2FA Code Generator", href: "/tools/totp-code-generator" },
];

export default function PageEditorial() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-indigo-600" />
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-indigo-600" />
          Where this is useful
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              <span className="text-indigo-500 mt-0.5">•</span>
              {useCase}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white border border-gray-200 rounded-xl p-4"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-indigo-600" />
          Related tools
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
