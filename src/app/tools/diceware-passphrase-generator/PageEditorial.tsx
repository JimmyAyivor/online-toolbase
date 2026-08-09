import { Dices, ListChecks, HelpCircle, Link2 } from "lucide-react";

const steps = [
  {
    title: "Set your options",
    text: "Choose how many words, a separator style, and add-ons like capitalization or a trailing number.",
  },
  {
    title: "Generate a passphrase",
    text: "A new random passphrase appears instantly, with an entropy estimate.",
  },
  {
    title: "Copy and store it safely",
    text: "Copy it and save it in a password manager rather than reusing it elsewhere.",
  },
];

const faqs = [
  {
    q: "What is a Diceware passphrase?",
    a: "Diceware is a method for building passphrases by rolling dice to randomly pick words from a numbered list — e.g. 'correct horse battery staple'. This tool does the same thing, using your browser's cryptographically secure random generator instead of physical dice.",
  },
  {
    q: "Why are passphrases better than complex short passwords?",
    a: "Length matters more than complexity for resisting brute-force attacks, and passphrases are far easier to remember. A five-word random passphrase can carry more entropy than a 10-character password packed with symbols, while being much easier to type and recall.",
  },
  {
    q: "How many words should I use?",
    a: "Five to six words is a solid default for most accounts. Use 7-8 words for something high-value, like a password manager's master password or an encryption key.",
  },
  {
    q: "Is the word selection really random?",
    a: "Yes — words are chosen with crypto.getRandomValues(), the Web Crypto API's cryptographically secure random number generator, using rejection sampling to avoid bias.",
  },
];

const useCases = [
  "Creating a master password for a password manager",
  "Setting up a memorable Wi-Fi network password",
  "Generating a passphrase for full-disk encryption",
  "Choosing a strong but typeable password for shared devices",
  "Building a recovery phrase-style backup passphrase",
  "Teaching passphrase best practices in a workshop",
];

const relatedTools = [
  { name: "Password Generator", href: "/tools/password-generator" },
  { name: "Password Strength Checker", href: "/tools/password-strength-checker" },
  { name: "Text Encryption Tool", href: "/tools/text-encryption-tool" },
];

export default function PageEditorial() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-teal-600" />
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-7 h-7 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center mb-3">
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
          <Dices className="w-5 h-5 text-teal-600" />
          Where this is useful
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start gap-2 bg-teal-50 border border-teal-100 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              <span className="text-teal-500 mt-0.5">•</span>
              {useCase}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-teal-600" />
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
          <Link2 className="w-5 h-5 text-teal-600" />
          Related tools
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-teal-300 hover:text-teal-700 transition-colors"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
