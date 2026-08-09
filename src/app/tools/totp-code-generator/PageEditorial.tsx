import { Timer, ListChecks, HelpCircle, Link2 } from "lucide-react";

const steps = [
  {
    title: "Enter your Base32 secret",
    text: "Paste the secret key shown when a service set up two-factor authentication.",
  },
  {
    title: "Watch the live code",
    text: "A 6- or 8-digit code appears and refreshes automatically on the countdown.",
  },
  {
    title: "Copy the code",
    text: "Copy the current code to use before it expires.",
  },
];

const faqs = [
  {
    q: "What is a TOTP code?",
    a: "TOTP (Time-based One-Time Password) is the standard behind the six-digit codes from apps like Google Authenticator and Authy — computed from a shared secret and the current time, refreshing every 30 seconds by default, per RFC 6238.",
  },
  {
    q: "Where do I find my Base32 secret key?",
    a: "When a service sets up 2FA, it usually shows a QR code plus a 'can't scan this?' option that reveals the same secret as text. That text string is what you'd paste here.",
  },
  {
    q: "Is it safe to enter a 2FA secret here?",
    a: "The secret is processed entirely in your browser and never transmitted — codes are computed locally via the Web Crypto API. Still, treat it like a password: only enter secrets you own.",
  },
  {
    q: "Why doesn't my code match my authenticator app?",
    a: "The most common cause is a device clock out of sync, since TOTP depends on accurate time. Also check that digit count, period, and algorithm match what the service expects — most use 6 digits, 30 seconds, SHA-1.",
  },
];

const useCases = [
  "Verifying a 2FA secret works before finishing setup",
  "Testing a TOTP integration during development",
  "Generating a backup code when your phone isn't handy",
  "Debugging why an authenticator app shows the wrong code",
  "Learning how time-based one-time passwords are computed",
  "Cross-checking a code against multiple authenticator apps",
];

const relatedTools = [
  { name: "Password Breach Checker", href: "/tools/password-breach-checker" },
  { name: "Text Encryption Tool", href: "/tools/text-encryption-tool" },
  { name: "Password Generator", href: "/tools/password-generator" },
];

export default function PageEditorial() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-cyan-600" />
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-7 h-7 rounded-full bg-cyan-600 text-white text-sm font-bold flex items-center justify-center mb-3">
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
          <Timer className="w-5 h-5 text-cyan-600" />
          Where this is useful
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start gap-2 bg-cyan-50 border border-cyan-100 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              <span className="text-cyan-500 mt-0.5">•</span>
              {useCase}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-600" />
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
          <Link2 className="w-5 h-5 text-cyan-600" />
          Related tools
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-cyan-300 hover:text-cyan-700 transition-colors"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
