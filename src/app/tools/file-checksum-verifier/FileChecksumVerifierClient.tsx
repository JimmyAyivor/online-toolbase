"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  UploadCloud,
  File as FileIcon,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Algo = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

interface HashResults {
  MD5: string;
  "SHA-1": string;
  "SHA-256": string;
  "SHA-512": string;
}

// ─── MD5 (RFC 1321) ─────────────────────────────────────────────────────────
// Web Crypto's SubtleCrypto intentionally omits MD5 (it's cryptographically
// broken), but it's still the most common checksum vendors publish for file
// integrity checks, so it's implemented directly from the public RFC 1321
// specification here.

const MD5_K = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
  0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
  0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
  0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
  0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
  0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
];

const MD5_S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
  9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
  16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
  15, 21,
];

function rotl(x: number, c: number): number {
  return (x << c) | (x >>> (32 - c));
}

function md5Hex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const bitLenLow = (bytes.length * 8) >>> 0;
  const bitLenHigh = Math.floor((bytes.length * 8) / 0x100000000);

  const mod = bytes.length % 64;
  const padLen = mod < 56 ? 56 - mod : 120 - mod;
  const total = bytes.length + padLen + 8;
  const msg = new Uint8Array(total);
  msg.set(bytes);
  msg[bytes.length] = 0x80;
  const view = new DataView(msg.buffer);
  view.setUint32(total - 8, bitLenLow, true);
  view.setUint32(total - 4, bitLenHigh, true);

  let a0 = 0x67452301,
    b0 = 0xefcdab89,
    c0 = 0x98badcfe,
    d0 = 0x10325476;

  for (let chunkStart = 0; chunkStart < total; chunkStart += 64) {
    const M = new Int32Array(16);
    for (let j = 0; j < 16; j++) {
      M[j] = view.getInt32(chunkStart + j * 4, true);
    }
    let A = a0,
      B = b0,
      C = c0,
      D = d0;
    for (let i = 0; i < 64; i++) {
      let F: number, g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F + A + MD5_K[i] + M[g]) | 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, MD5_S[i])) | 0;
    }
    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  const toLE = (n: number): string => {
    const buf = new Uint8Array(4);
    new DataView(buf.buffer).setInt32(0, n, true);
    return Array.from(buf)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };
  return toLE(a0) + toLE(b0) + toLE(c0) + toLE(d0);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashFile(buffer: ArrayBuffer): Promise<HashResults> {
  const [sha1, sha256, sha512] = await Promise.all([
    crypto.subtle.digest("SHA-1", buffer),
    crypto.subtle.digest("SHA-256", buffer),
    crypto.subtle.digest("SHA-512", buffer),
  ]);
  return {
    MD5: md5Hex(buffer),
    "SHA-1": bufferToHex(sha1),
    "SHA-256": bufferToHex(sha256),
    "SHA-512": bufferToHex(sha512),
  };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = -1;
  do {
    value /= 1024;
    unitIndex++;
  } while (value >= 1024 && unitIndex < units.length - 1);
  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

const ALGOS: Algo[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function FileChecksumVerifierClient() {
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<HashResults | null>(null);
  const [isHashing, setIsHashing] = useState<boolean>(false);
  const [activeAlgo, setActiveAlgo] = useState<Algo>("SHA-256");
  const [expectedHash, setExpectedHash] = useState<string>("");
  const [copiedAlgo, setCopiedAlgo] = useState<Algo | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (selected: File): Promise<void> => {
    setFile(selected);
    setHashes(null);
    setIsHashing(true);
    try {
      const buffer = await selected.arrayBuffer();
      const result = await hashFile(buffer);
      setHashes(result);
    } finally {
      setIsHashing(false);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) processFile(dropped);
  };

  const clearFile = (): void => {
    setFile(null);
    setHashes(null);
    setExpectedHash("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyHash = (algo: Algo, value: string): void => {
    navigator.clipboard.writeText(value);
    setCopiedAlgo(algo);
    setTimeout(() => setCopiedAlgo((prev) => (prev === algo ? null : prev)), 2000);
  };

  const normalizedExpected = expectedHash.trim().toLowerCase().replace(/\s+/g, "");
  const activeHash = hashes?.[activeAlgo] ?? "";
  const comparisonState: "none" | "match" | "mismatch" =
    !normalizedExpected || !activeHash
      ? "none"
      : normalizedExpected === activeHash.toLowerCase()
        ? "match"
        : "mismatch";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full mb-4 shadow-lg">
              <FileIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              File Checksum Verifier
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Compute a file's MD5, SHA-1, SHA-256, or SHA-512 hash entirely
              in your browser — the file is never uploaded anywhere.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {!file ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center h-56 rounded-2xl border-2 border-dashed cursor-pointer transition-colors ${
                  isDragging
                    ? "bg-indigo-50 border-indigo-400"
                    : "bg-gray-50 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50"
                }`}
              >
                <UploadCloud className="w-10 h-10 text-indigo-400 mb-3" />
                <p className="text-sm font-semibold text-gray-700">
                  Drop a file here, or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Processed locally — nothing leaves your device
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileIcon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    aria-label="Remove file"
                    className="p-2 hover:bg-white rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {isHashing ? (
                  <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-center text-gray-500">
                      <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin" />
                      <p className="text-sm font-medium">Computing hashes…</p>
                    </div>
                  </div>
                ) : (
                  hashes && (
                    <>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {ALGOS.map((algo) => (
                          <button
                            key={algo}
                            onClick={() => setActiveAlgo(algo)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                              activeAlgo === algo
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {algo}
                          </button>
                        ))}
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                        <div className="flex items-center justify-between gap-3">
                          <code className="text-sm font-mono text-gray-800 break-all">
                            {hashes[activeAlgo]}
                          </code>
                          <button
                            onClick={() => copyHash(activeAlgo, hashes[activeAlgo])}
                            aria-label={`Copy ${activeAlgo} hash`}
                            className="p-2 hover:bg-white rounded-lg transition-colors flex-shrink-0"
                          >
                            {copiedAlgo === activeAlgo ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Compare against an expected hash (optional)
                        </label>
                        <input
                          type="text"
                          value={expectedHash}
                          onChange={(e) => setExpectedHash(e.target.value)}
                          placeholder={`Paste the published ${activeAlgo} checksum to verify…`}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                        />
                        {comparisonState === "match" && (
                          <div className="flex items-center gap-2 mt-3 text-emerald-700 text-sm font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            Hashes match — the file is intact
                          </div>
                        )}
                        {comparisonState === "mismatch" && (
                          <div className="flex items-center gap-2 mt-3 text-red-700 text-sm font-semibold">
                            <XCircle className="w-5 h-5" />
                            Hashes don't match — the file may be corrupted or
                            modified
                          </div>
                        )}
                      </div>
                    </>
                  )
                )}
              </div>
            )}
          </div>

          <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600 max-w-2xl mx-auto">
            <p className="font-semibold mb-2 text-gray-800">
              🔒 Why check a file's hash?
            </p>
            <p className="leading-relaxed">
              A checksum is a fingerprint of a file's exact contents.
              Comparing it against the hash a publisher lists (e.g. on a
              software download page) confirms the file downloaded correctly
              and wasn't corrupted or tampered with in transit. For security
              verification, prefer SHA-256 or SHA-512 — MD5 and SHA-1 are
              still common for basic integrity checks but are not
              collision-resistant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
