"use client";
import React, { useState, useEffect } from "react";
import { Hash, Copy, CheckCircle, Download, RefreshCw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type UuidFormat =
  | "default"
  | "uppercase"
  | "braces"
  | "noDashes"
  | "uppercaseNoDashes";

interface UuidEntry {
  id: number;
  value: string;
  formatted: string;
  timestamp: string;
}

interface FormatOption {
  value: UuidFormat;
  label: string;
}

interface InfoItem {
  heading: string;
  items: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FORMAT_OPTIONS: FormatOption[] = [
  { value: "default", label: "Default (lowercase with dashes)" },
  { value: "uppercase", label: "Uppercase with dashes" },
  { value: "braces", label: "With braces" },
  { value: "noDashes", label: "No dashes (lowercase)" },
  { value: "uppercaseNoDashes", label: "No dashes (uppercase)" },
];

const QUICK_COUNTS = [1, 5, 10, 25] as const;

const INFO_BLOCKS: InfoItem[] = [
  {
    heading: "What is a UUID?",
    items: [
      "UUID = Universally Unique Identifier",
      "GUID = Globally Unique Identifier (same thing)",
      "128-bit number represented as 32 hexadecimal digits",
      "Displayed in groups: 8-4-4-4-12",
      "Version 4 UUIDs are randomly generated",
      "Probability of collision is astronomically low",
    ],
  },
  {
    heading: "Common Uses:",
    items: [
      "Database primary keys",
      "Session identifiers",
      "Transaction IDs",
      "File naming and tracking",
      "API request identifiers",
      "Distributed systems coordination",
    ],
  },
];

const EXAMPLE_UUID = "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f7a8";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatUUID(uuid: string, fmt: UuidFormat): string {
  switch (fmt) {
    case "uppercase":
      return uuid.toUpperCase();
    case "braces":
      return `{${uuid}}`;
    case "noDashes":
      return uuid.replace(/-/g, "");
    case "uppercaseNoDashes":
      return uuid.replace(/-/g, "").toUpperCase();
    default:
      return uuid;
  }
}

function buildEntry(uuid: string, fmt: UuidFormat, id: number): UuidEntry {
  return {
    id,
    value: uuid,
    formatted: formatUUID(uuid, fmt),
    timestamp: new Date().toLocaleString(),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function UuidGeneratorClient() {
  const [uuids, setUuids] = useState<UuidEntry[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [format, setFormat] = useState<UuidFormat>("default");
  const [copiedId, setCopiedId] = useState<number | "all" | "">("");

  useEffect(() => {
    generateMany(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generateMany = (count: number): void => {
    const now = Date.now();
    const newEntries = Array.from({ length: count }, (_, i) =>
      buildEntry(generateUUID(), format, now + i),
    );
    setUuids((prev) => [...newEntries, ...prev]);
  };

  const copyOne = (entry: UuidEntry): void => {
    navigator.clipboard.writeText(entry.formatted);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const copyAll = (): void => {
    navigator.clipboard.writeText(uuids.map((u) => u.formatted).join("\n"));
    setCopiedId("all");
    setTimeout(() => setCopiedId(""), 2000);
  };

  const downloadUuids = (): void => {
    const blob = new Blob([uuids.map((u) => u.formatted).join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuids.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4'>
              <Hash className='w-8 h-8 text-emerald-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              UUID/GUID Generator
            </h2>
            <p className='text-gray-600'>
              Generate unique identifiers instantly
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {/* Quantity + quick generate */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quantity to Generate
                </label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(100, parseInt(e.target.value) || 1),
                        ),
                      )
                    }
                    min={1}
                    max={100}
                    className='flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                  />
                  <button
                    onClick={() => generateMany(quantity)}
                    className='px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2'
                  >
                    <RefreshCw className='w-5 h-5' />
                    Generate
                  </button>
                </div>
                <input
                  type='range'
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(Number(e.target.value))
                  }
                  aria-label='Quantity slider'
                  className='w-full mt-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quick Generate
                </label>
                <div className='grid grid-cols-4 gap-2'>
                  {QUICK_COUNTS.map((num) => (
                    <button
                      key={num}
                      onClick={() => generateMany(num)}
                      className='py-2 bg-gray-100 hover:bg-emerald-100 border border-gray-200 hover:border-emerald-300 rounded-lg font-semibold transition-colors'
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Format options */}
            <div className='bg-teal-50 rounded-lg p-4 border border-teal-200'>
              <h3 className='font-semibold text-gray-800 mb-3'>
                Format Options
              </h3>
              <div className='space-y-2'>
                {FORMAT_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='format'
                      checked={format === value}
                      onChange={() => setFormat(value)}
                      className='text-emerald-600'
                    />
                    <span className='text-sm'>{label}</span>
                  </label>
                ))}
              </div>

              {uuids.length > 0 && (
                <div className='mt-4 pt-4 border-t border-teal-300'>
                  <div className='text-sm text-gray-600 mb-2'>Example:</div>
                  <div className='font-mono text-xs bg-white p-2 rounded border border-teal-200 break-all'>
                    {formatUUID(EXAMPLE_UUID, format)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* UUID list */}
          {uuids.length > 0 && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-gray-800'>
                  Generated UUIDs ({uuids.length})
                </h3>
                <div className='flex gap-2'>
                  <button
                    onClick={copyAll}
                    className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2'
                  >
                    {copiedId === "all" ? (
                      <>
                        <CheckCircle className='w-4 h-4' /> Copied All
                      </>
                    ) : (
                      <>
                        <Copy className='w-4 h-4' /> Copy All
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadUuids}
                    className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2'
                  >
                    <Download className='w-4 h-4' />
                    Download
                  </button>
                  <button
                    onClick={() => setUuids([])}
                    className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm'
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className='bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'>
                <div className='max-h-96 overflow-y-auto'>
                  {uuids.map((entry) => (
                    <div
                      key={entry.id}
                      className='flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors'
                    >
                      <div className='flex-1 mr-4'>
                        <div className='font-mono text-sm text-gray-800 break-all'>
                          {entry.formatted}
                        </div>
                        <div className='text-xs text-gray-500 mt-1'>
                          {entry.timestamp}
                        </div>
                      </div>
                      <button
                        onClick={() => copyOne(entry)}
                        className='px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 flex-shrink-0'
                      >
                        {copiedId === entry.id ? (
                          <>
                            <CheckCircle className='w-4 h-4' /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className='w-4 h-4' /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Info blocks */}
          <div className='mt-8 grid md:grid-cols-2 gap-6'>
            {INFO_BLOCKS.map(({ heading, items }) => (
              <div
                key={heading}
                className='p-4 bg-gray-50 rounded-lg text-sm text-gray-600'
              >
                <p className='font-semibold mb-2'>{heading}</p>
                <ul className='list-disc list-inside space-y-1'>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className='mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg'>
            <p className='text-sm text-gray-700'>
              <strong>Note:</strong> All UUIDs generated here are Version 4
              (random). They are cryptographically strong random numbers
              suitable for most identification purposes. Each UUID has a
              uniqueness guarantee of approximately 1 in 5.3 &times; 10³⁶.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
