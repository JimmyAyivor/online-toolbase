"use client";
import React, { useState, useEffect } from "react";
import { Shield, Copy, CheckCircle, FileText, Upload } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
type HashKey = "MD5" | HashAlgorithm;

interface HashEntry {
  description: string;
  length: string;
  security: string;
  color: string;
}

interface FileInfo {
  name: string;
  size: string;
  type: string;
}

type HashMap = Partial<Record<HashKey, string>>;

// ─── Constants ───────────────────────────────────────────────────────────────

const MD5_PLACEHOLDER = "MD5 not available in browser (use SHA-256 instead)";

const HASH_INFO: Record<HashKey, HashEntry> = {
  MD5: {
    description: "Not available in browsers. Use SHA-256 for similar purposes.",
    length: "N/A",
    security: "Deprecated",
    color: "bg-red-100 text-red-700",
  },
  "SHA-1": {
    description:
      "Legacy hash function, now considered weak for security purposes.",
    length: "160 bits (40 hex chars)",
    security: "Weak",
    color: "bg-orange-100 text-orange-700",
  },
  "SHA-256": {
    description:
      "Part of SHA-2 family. Recommended for most security applications.",
    length: "256 bits (64 hex chars)",
    security: "Strong",
    color: "bg-green-100 text-green-700",
  },
  "SHA-384": {
    description: "Part of SHA-2 family. Provides higher security than SHA-256.",
    length: "384 bits (96 hex chars)",
    security: "Strong",
    color: "bg-blue-100 text-blue-700",
  },
  "SHA-512": {
    description: "Part of SHA-2 family. Maximum security in SHA-2 series.",
    length: "512 bits (128 hex chars)",
    security: "Strong",
    color: "bg-purple-100 text-purple-700",
  },
};

const HASH_ALGORITHMS: HashAlgorithm[] = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];

const COMPARISON_ROWS: Array<{
  algo: string;
  bits: string;
  security: string;
  securityColor: string;
  useCase: string;
}> = [
  {
    algo: "MD5",
    bits: "128 bits",
    security: "Broken",
    securityColor: "text-red-600",
    useCase: "Legacy only, checksums",
  },
  {
    algo: "SHA-1",
    bits: "160 bits",
    security: "Weak",
    securityColor: "text-orange-600",
    useCase: "Legacy systems",
  },
  {
    algo: "SHA-256",
    bits: "256 bits",
    security: "Strong",
    securityColor: "text-green-600",
    useCase: "Recommended for most uses",
  },
  {
    algo: "SHA-384",
    bits: "384 bits",
    security: "Strong",
    securityColor: "text-blue-600",
    useCase: "Higher security needs",
  },
  {
    algo: "SHA-512",
    bits: "512 bits",
    security: "Strong",
    securityColor: "text-purple-600",
    useCase: "Maximum security",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function generateHash(
  algorithm: HashAlgorithm,
  data: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest(
    algorithm,
    encoder.encode(data),
  );
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HashGeneratorClient() {
  const [input, setInput] = useState<string>("");
  const [hashes, setHashes] = useState<HashMap>({});
  const [copiedHash, setCopiedHash] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }

    const calculateHashes = async (): Promise<void> => {
      try {
        const [sha1, sha256, sha384, sha512] = await Promise.all(
          HASH_ALGORITHMS.map((algo) => generateHash(algo, input)),
        );

        setHashes({
          MD5: MD5_PLACEHOLDER,
          "SHA-1": sha1,
          "SHA-256": sha256,
          "SHA-384": sha384,
          "SHA-512": sha512,
        });
      } catch (error) {
        console.error("Error generating hashes:", error);
      }
    };

    calculateHashes();
  }, [input]);

  const copyHash = (algorithm: string, hash: string): void => {
    if (hash === MD5_PLACEHOLDER) return;
    navigator.clipboard.writeText(hash);
    setCopiedHash(algorithm);
    setTimeout(() => setCopiedHash(""), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type || "unknown",
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") setInput(content);
    };
    reader.readAsText(file);
  };

  const loadExample = (): void => setInput("Hello, World!");

  const clearAll = (): void => {
    setInput("");
    setFileInfo(null);
    setHashes({});
  };

  const hashEntries = Object.entries(hashes) as [HashKey, string][];

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-4 shadow-lg'>
              <Shield className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Hash Generator
            </h2>
            <p className='text-gray-500'>
              Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes
            </p>
          </div>

          {/* Controls */}
          <div className='mb-6 flex flex-wrap gap-3 items-center justify-between'>
            <div className='flex gap-2'>
              <button
                onClick={loadExample}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors'
              >
                Load Example
              </button>
              <button
                onClick={clearAll}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors'
              >
                Clear
              </button>
            </div>

            <label className='px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2'>
              <Upload className='w-4 h-4' />
              Upload File
              <input
                type='file'
                onChange={handleFileUpload}
                className='hidden'
                accept='.txt,.json,.xml,.csv'
              />
            </label>
          </div>

          {/* File info */}
          {fileInfo && (
            <div className='mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <div className='flex items-center gap-3'>
                <FileText className='w-5 h-5 text-blue-600 flex-shrink-0' />
                <div className='flex-1'>
                  <div className='font-semibold text-gray-900'>
                    {fileInfo.name}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {fileInfo.size} · {fileInfo.type}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Input Text or Data
            </label>
            <textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              placeholder='Enter text to generate hashes...'
              className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none font-mono text-sm'
            />
            <div className='mt-2 text-sm text-gray-500'>
              {input.length} characters
            </div>
          </div>

          {/* Hash results */}
          {hashEntries.length > 0 && (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Generated Hashes
              </h3>

              {hashEntries.map(([algorithm, hash]) => {
                const info = HASH_INFO[algorithm];
                const isMd5 = hash === MD5_PLACEHOLDER;
                const isCopied = copiedHash === algorithm;

                return (
                  <div
                    key={algorithm}
                    className='bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'
                  >
                    <div className='bg-gray-100 px-4 py-3 flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <span className='font-bold text-gray-900'>
                          {algorithm}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded font-semibold ${info.color}`}
                        >
                          {info.security}
                        </span>
                      </div>

                      {!isMd5 && (
                        <button
                          onClick={() => copyHash(algorithm, hash)}
                          className='px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-xs rounded font-medium transition-colors flex items-center gap-1'
                          aria-label={`Copy ${algorithm} hash`}
                        >
                          {isCopied ? (
                            <>
                              <CheckCircle className='w-3 h-3' /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className='w-3 h-3' /> Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <div className='p-4'>
                      <div
                        className={`font-mono text-sm break-all ${
                          isMd5 ? "text-red-600 italic" : "text-gray-900"
                        }`}
                      >
                        {hash}
                      </div>
                      <div className='mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600'>
                        <div className='mb-1'>
                          <strong>Length:</strong> {info.length}
                        </div>
                        <div>{info.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Comparison table */}
          <div className='mt-8 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200'>
            <h3 className='font-semibold text-gray-900 mb-3'>
              Hash Function Comparison
            </h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-violet-200'>
                    {["Algorithm", "Output Size", "Security", "Use Case"].map(
                      (h) => (
                        <th
                          key={h}
                          className='text-left py-2 px-3 font-semibold text-gray-700'
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className='divide-y divide-violet-100'>
                  {COMPARISON_ROWS.map(
                    ({ algo, bits, security, securityColor, useCase }) => (
                      <tr key={algo}>
                        <td className='py-2 px-3 font-mono'>{algo}</td>
                        <td className='py-2 px-3'>{bits}</td>
                        <td className={`py-2 px-3 ${securityColor}`}>
                          {security}
                        </td>
                        <td className='py-2 px-3'>{useCase}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className='mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>⚡ Common Uses:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <strong>Data Integrity:</strong> Verify files haven&apos;t been
                tampered with
              </li>
              <li>
                <strong>Password Storage:</strong> Store hashed passwords (use
                bcrypt/argon2 for production)
              </li>
              <li>
                <strong>Digital Signatures:</strong> Create unique identifiers
                for data
              </li>
              <li>
                <strong>Checksums:</strong> Verify file downloads and transfers
              </li>
              <li>
                <strong>Blockchain:</strong> SHA-256 is used in Bitcoin and many
                cryptocurrencies
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
