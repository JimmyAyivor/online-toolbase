"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Copy,
  RefreshCw,
  Check,
  Eye,
  EyeOff,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type StrengthColor = "red" | "orange" | "green" | "emerald";

interface PasswordStrength {
  score: number;
  label: string;
  color: StrengthColor;
}

interface SecurityTip {
  icon: React.ElementType;
  text: string;
  color: string;
}

interface CharsetOption {
  label: string;
  subtext: string;
  value: boolean;
  set: (v: boolean) => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const STRENGTH_BAR_COLORS: Record<StrengthColor, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
};

const SECURITY_TIPS: SecurityTip[] = [
  {
    icon: CheckCircle2,
    text: "Use a unique password for each account",
    color: "text-blue-600",
  },
  {
    icon: CheckCircle2,
    text: "Include uppercase, lowercase, numbers and symbols",
    color: "text-green-600",
  },
  {
    icon: CheckCircle2,
    text: "Minimum 12 characters recommended",
    color: "text-purple-600",
  },
  {
    icon: AlertTriangle,
    text: "Never share your passwords with anyone",
    color: "text-orange-600",
  },
  {
    icon: AlertTriangle,
    text: "Avoid using personal information",
    color: "text-red-600",
  },
  {
    icon: CheckCircle2,
    text: "Use a password manager to store securely",
    color: "text-indigo-600",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildPassword(
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean,
): string {
  let charset = "";
  if (includeUppercase) charset += UPPERCASE;
  if (includeLowercase) charset += LOWERCASE;
  if (includeNumbers) charset += NUMBERS;
  if (includeSymbols) charset += SYMBOLS;
  if (!charset) charset = LOWERCASE;

  return Array.from({ length }, () =>
    charset.charAt(Math.floor(Math.random() * charset.length)),
  ).join("");
}

function calculateStrength(pwd: string): PasswordStrength {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  if (score <= 2) return { score, label: "Weak", color: "red" };
  if (score <= 4) return { score, label: "Medium", color: "orange" };
  if (score <= 5) return { score, label: "Strong", color: "green" };
  return { score, label: "Very Strong", color: "emerald" };
}

function lengthLabel(length: number): string {
  if (length < 8) return "Too short";
  if (length < 12) return "Good";
  if (length < 16) return "Better";
  return "Excellent";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    label: "",
    color: "red",
  });

  const regenerate = useCallback((): void => {
    const pwd = buildPassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    );
    setPassword(pwd);
    setStrength(calculateStrength(pwd));
    setCopied(false);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthBarColor = STRENGTH_BAR_COLORS[strength.color] ?? "bg-gray-300";
  const strengthBarWidth = `${(strength.score / 6) * 100}%`;

  // Charset checkboxes — defined at render time so setters are in scope
  const CHARSET_OPTIONS: CharsetOption[] = [
    {
      label: "Uppercase (A-Z)",
      subtext: "Include capital letters",
      value: includeUppercase,
      set: setIncludeUppercase,
    },
    {
      label: "Lowercase (a-z)",
      subtext: "Include small letters",
      value: includeLowercase,
      set: setIncludeLowercase,
    },
    {
      label: "Numbers (0-9)",
      subtext: "Include digits",
      value: includeNumbers,
      set: setIncludeNumbers,
    },
    {
      label: "Symbols (!@#$)",
      subtext: "Include special characters",
      value: includeSymbols,
      set: setIncludeSymbols,
    },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
            <Shield className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Password Generator
          </h2>
          <p className='text-gray-600'>
            Create strong, secure passwords in seconds
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6'>
          {/* Password display */}
          <div className='mb-6'>
            <label className='block text-sm font-bold text-gray-700 mb-3'>
              Generated Password
            </label>
            <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl'>
              <Lock className='w-5 h-5 text-blue-600 flex-shrink-0' />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className='flex-1 bg-transparent text-lg font-mono font-semibold text-gray-900 focus:outline-none'
              />
              <button
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className='p-2 hover:bg-white rounded-lg transition-colors'
              >
                {showPassword ? (
                  <EyeOff className='w-5 h-5 text-gray-600' />
                ) : (
                  <Eye className='w-5 h-5 text-gray-600' />
                )}
              </button>
            </div>
          </div>

          {/* Strength bar */}
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm font-bold text-gray-700'>
                Password Strength
              </span>
              <span className={`text-sm font-bold text-${strength.color}-600`}>
                {strength.label}
              </span>
            </div>
            <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className={`h-full ${strengthBarColor} transition-all duration-500 ease-out`}
                style={{ width: strengthBarWidth }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3 mb-8'>
            <button
              onClick={handleCopy}
              className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
            >
              {copied ? (
                <>
                  <Check className='w-5 h-5' /> Copied!
                </>
              ) : (
                <>
                  <Copy className='w-5 h-5' /> Copy Password
                </>
              )}
            </button>
            <button
              onClick={regenerate}
              className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
            >
              <RefreshCw className='w-5 h-5' />
              Regenerate
            </button>
          </div>

          {/* Settings */}
          <div className='space-y-6'>
            {/* Length slider */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <label className='text-sm font-bold text-gray-700'>
                  Password Length: {length}
                </label>
                <span className='text-xs text-gray-500'>
                  {lengthLabel(length)}
                </span>
              </div>
              <input
                type='range'
                min={4}
                max={32}
                value={length}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLength(parseInt(e.target.value))
                }
                className='w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-lg appearance-none cursor-pointer'
                aria-label='Password length'
              />
              <div className='flex justify-between text-xs text-gray-500 mt-2'>
                <span>4</span>
                <span>32</span>
              </div>
            </div>

            {/* Charset checkboxes */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {CHARSET_OPTIONS.map(({ label, subtext, value, set }) => (
                <label
                  key={label}
                  className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors'
                >
                  <input
                    type='checkbox'
                    checked={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.checked)
                    }
                    className='w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500'
                  />
                  <div>
                    <div className='font-semibold text-gray-900'>{label}</div>
                    <div className='text-xs text-gray-600'>{subtext}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Security tips */}
        <div className='bg-white rounded-xl shadow-md p-6'>
          <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <Zap className='w-5 h-5 text-blue-600' />
            Password Security Tips
          </h3>
          <div className='grid md:grid-cols-2 gap-4'>
            {SECURITY_TIPS.map(({ icon: Icon, text, color }) => (
              <div key={text} className='flex items-start gap-3'>
                <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
                <span className='text-sm text-gray-700'>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
