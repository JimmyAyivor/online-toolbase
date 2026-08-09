import { ShieldQuestion, ListChecks, HelpCircle, Link2 } from "lucide-react";

const steps = [
  {
    title: "Type a password",
    text: "Enter the password you want to check. It's hashed locally and never transmitted in full.",
  },
  {
    title: "Wait a moment",
    text: "The tool automatically checks a partial hash prefix against the breach database.",
  },
  {
    title: "Review the result",
    text: "See whether the password has appeared in known breaches, and act on it if it has.",
  },
];

const faqs = [
  {
    q: "Is it safe to type my real password into this tool?",
    a: "Your password never leaves your browser. It's hashed with SHA-1 locally, and only the first 5 characters of that hash — called a k-anonymity prefix — are sent to the Have I Been Pwned API. The match is found on your device.",
  },
  {
    q: "What does it mean if my password was found in a breach?",
    a: "That exact password has appeared in a publicly known data breach dump, meaning it's already in wordlists attackers use for credential-stuffing. Stop using it anywhere, including with small variations.",
  },
  {
    q: "What data does this check against?",
    a: "The Have I Been Pwned Pwned Passwords database, which aggregates hundreds of millions of passwords exposed in real-world breaches. It checks the password itself, not a specific account or email.",
  },
  {
    q: "My password wasn't found — does that mean it's strong?",
    a: "Not necessarily. A breach check only tells you if that exact password has leaked before, not whether it's long or hard to guess. Pair it with a strength check for the full picture.",
  },
];

const useCases = [
  "Checking a password before reusing it on a new account",
  "Auditing old passwords you suspect might be compromised",
  "Verifying a newly generated password isn't already known",
  "Teaching password hygiene in a security-awareness session",
  "Deciding which saved passwords in a manager need rotating",
  "Confirming a passphrase idea isn't already public",
];

const relatedTools = [
  { name: "Password Strength Checker", href: "/tools/password-strength-checker" },
  { name: "Password Generator", href: "/tools/password-generator" },
  { name: "Diceware Passphrase Generator", href: "/tools/diceware-passphrase-generator" },
];

export default function PageEditorial() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-purple-600" />
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center mb-3">
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
          <ShieldQuestion className="w-5 h-5 text-purple-600" />
          Where this is useful
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start gap-2 bg-purple-50 border border-purple-100 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              <span className="text-purple-500 mt-0.5">•</span>
              {useCase}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-600" />
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
          <Link2 className="w-5 h-5 text-purple-600" />
          Related tools
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
