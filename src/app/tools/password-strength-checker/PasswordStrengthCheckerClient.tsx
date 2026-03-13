"use client";
import React, { useState } from "react";
import { Eye, EyeOff, RotateCcw, Shield } from "lucide-react";

function analyse(pw: string) {
  const checks = {
    length8: pw.length >= 8,
    length12: pw.length >= 12,
    length16: pw.length >= 16,
    hasLower: /[a-z]/.test(pw),
    hasUpper: /[A-Z]/.test(pw),
    hasNumber: /\d/.test(pw),
    hasSpecial: /[^a-zA-Z0-9]/.test(pw),
    noRepeats: !/(.)\1{2,}/.test(pw),
    noCommon: ![
      "password",
      "qwerty",
      "123456",
      "abc123",
      "letmein",
      "monkey",
      "iloveyou",
    ].some((c) => pw.toLowerCase().includes(c)),
  };
  const score = [
    checks.length8,
    checks.length12,
    checks.length16,
    checks.hasLower,
    checks.hasUpper,
    checks.hasNumber,
    checks.hasSpecial,
    checks.noRepeats,
    checks.noCommon,
  ].filter(Boolean).length;
  return { checks, score };
}

const LEVELS = [
  {
    min: 0,
    max: 2,
    label: "Very weak",
    color: "bg-red-500",
    text: "text-red-600",
    width: "w-1/5",
  },
  {
    min: 3,
    max: 4,
    label: "Weak",
    color: "bg-orange-500",
    text: "text-orange-600",
    width: "w-2/5",
  },
  {
    min: 5,
    max: 6,
    label: "Fair",
    color: "bg-yellow-500",
    text: "text-yellow-600",
    width: "w-3/5",
  },
  {
    min: 7,
    max: 7,
    label: "Strong",
    color: "bg-blue-500",
    text: "text-blue-600",
    width: "w-4/5",
  },
  {
    min: 8,
    max: 9,
    label: "Very strong",
    color: "bg-emerald-500",
    text: "text-emerald-600",
    width: "w-full",
  },
];

function getLevel(score: number) {
  return LEVELS.find((l) => score >= l.min && score <= l.max) ?? LEVELS[0];
}

const SUGGESTIONS = [
  {
    key: "length8" as const,
    pos: "✓ At least 8 characters",
    neg: "Use at least 8 characters",
  },
  {
    key: "length12" as const,
    pos: "✓ At least 12 characters",
    neg: "Use 12+ characters for better security",
  },
  {
    key: "hasLower" as const,
    pos: "✓ Contains lowercase letters",
    neg: "Add lowercase letters (a–z)",
  },
  {
    key: "hasUpper" as const,
    pos: "✓ Contains uppercase letters",
    neg: "Add uppercase letters (A–Z)",
  },
  {
    key: "hasNumber" as const,
    pos: "✓ Contains numbers",
    neg: "Add numbers (0–9)",
  },
  {
    key: "hasSpecial" as const,
    pos: "✓ Contains special characters",
    neg: "Add special characters (!@#$%^&*)",
  },
  {
    key: "noRepeats" as const,
    pos: "✓ No repeated characters",
    neg: "Avoid repeating the same character 3+ times",
  },
  {
    key: "noCommon" as const,
    pos: "✓ Not a common password",
    neg: "Avoid common passwords and dictionary words",
  },
];

export default function PasswordStrengthCheckerClient() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const { checks, score } = analyse(pw);
  const level = getLevel(score);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full mb-4 shadow-lg'>
              <Shield className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Password Strength Checker
            </h2>
            <p className='text-gray-500'>
              100% private — your password never leaves your browser
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Enter your password
                </label>
                <div className='relative'>
                  <input
                    type={show ? "text" : "password"}
                    value={pw}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPw(e.target.value)
                    }
                    placeholder='Type your password here…'
                    autoComplete='off'
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-12 font-mono focus:ring-2 focus:ring-red-400 focus:border-transparent'
                  />
                  <button
                    onClick={() => setShow((s) => !s)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {show ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {pw && (
                <>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-sm font-semibold text-gray-700'>
                        Strength
                      </span>
                      <span className={`text-sm font-bold ${level.text}`}>
                        {level.label}
                      </span>
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-3'>
                      <div
                        className={`${level.color} ${level.width} h-3 rounded-full transition-all duration-500`}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-3'>
                    {[
                      { label: "Length", value: pw.length },
                      { label: "Score", value: `${score}/9` },
                      { label: "Level", value: level.label.split(" ")[0] },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className='bg-rose-50 border border-rose-100 rounded-xl p-3 text-center'
                      >
                        <p className={`text-lg font-black ${level.text}`}>
                          {value}
                        </p>
                        <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={() => setPw("")}
                className='flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors'
              >
                <RotateCcw className='w-4 h-4' />
                Clear
              </button>
            </div>

            <div>
              {pw ? (
                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3'>
                    Checklist
                  </p>
                  {SUGGESTIONS.map(({ key, pos, neg }) => {
                    const pass = checks[key];
                    return (
                      <div
                        key={key}
                        className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${pass ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}
                      >
                        <span
                          className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${pass ? "bg-emerald-500 text-white" : "bg-red-400 text-white"}`}
                        >
                          {pass ? "✓" : "✗"}
                        </span>
                        <span
                          className={`text-sm ${pass ? "text-emerald-700" : "text-red-700"}`}
                        >
                          {pass ? pos : neg}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='flex items-center justify-center h-64 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200'>
                  <div className='text-center text-rose-400'>
                    <Shield className='w-12 h-12 mx-auto mb-3 opacity-40' />
                    <p className='text-sm font-medium'>
                      Type a password to check its strength
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              🔒 Password security tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use a passphrase: 4 random words (e.g.
                correct-horse-battery-staple) beats most complex passwords
              </li>
              <li>
                Never reuse passwords across accounts — use a password manager
              </li>
              <li>
                Enable 2FA on all important accounts regardless of password
                strength
              </li>
              <li>
                This checker runs 100% in your browser — your password is never
                transmitted
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
