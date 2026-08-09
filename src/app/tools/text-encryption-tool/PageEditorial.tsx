import { Lock, ListChecks, HelpCircle, Link2 } from "lucide-react";

const steps = [
  {
    title: "Choose Encrypt or Decrypt",
    text: "Select the mode you need at the top of the tool.",
  },
  {
    title: "Enter your text and passphrase",
    text: "Type or paste the text, then choose a strong passphrase.",
  },
  {
    title: "Copy the result",
    text: "Copy the encrypted or decrypted output to use elsewhere.",
  },
];

const faqs = [
  {
    q: "What encryption does this use?",
    a: "AES-256-GCM, an authenticated encryption algorithm used in modern secure protocols. Your passphrase is stretched into a 256-bit key with PBKDF2 (150,000 iterations, random salt), so the same passphrase produces different ciphertext every time.",
  },
  {
    q: "How do I share the encrypted text with someone?",
    a: "Copy the encrypted output and send it through whatever channel you'd normally use, then share the passphrase separately through a different channel — a phone call, for instance — so one intercepted message doesn't expose both.",
  },
  {
    q: "What happens if I lose the passphrase?",
    a: "The text is unrecoverable — there's no backdoor or password reset. Make sure both sender and recipient have a reliable way to remember or store the passphrase.",
  },
  {
    q: "Is this a replacement for an encrypted messaging app?",
    a: "It's well suited to encrypting a single note you'll share through another channel. For ongoing encrypted conversations, a dedicated app like Signal handles key exchange and forward secrecy in ways a one-off text tool doesn't.",
  },
];

const useCases = [
  "Sharing a sensitive note or credential over an insecure channel",
  "Storing a private note in a place others might see",
  "Sending a password or API key to a teammate securely",
  "Protecting personal notes before pasting them into a cloud doc",
  "Learning how AES-GCM and PBKDF2 work together",
  "Encrypting a message before posting it somewhere public as a puzzle",
];

const relatedTools = [
  { name: "File Checksum Verifier", href: "/tools/file-checksum-verifier" },
  { name: "TOTP / 2FA Code Generator", href: "/tools/totp-code-generator" },
  { name: "Diceware Passphrase Generator", href: "/tools/diceware-passphrase-generator" },
];

export default function PageEditorial() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-violet-600" />
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center mb-3">
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
          <Lock className="w-5 h-5 text-violet-600" />
          Where this is useful
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              <span className="text-violet-500 mt-0.5">•</span>
              {useCase}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-600" />
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
          <Link2 className="w-5 h-5 text-violet-600" />
          Related tools
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
