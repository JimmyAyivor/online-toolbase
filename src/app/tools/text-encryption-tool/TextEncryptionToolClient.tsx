"use client";
import React, { useState } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  Eye,
  EyeOff,
  ShieldAlert,
  KeyRound,
} from "lucide-react";
import { toArrayBuffer } from "@/lib/crypto";
// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "encrypt" | "decrypt";

// ─── Crypto helpers (AES-GCM, key derived with PBKDF2) ─────────────────────

const SALT_BYTES = 16;
const IV_BYTES = 12;
const PBKDF2_ITERATIONS = 150_000;

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(
  passphrase: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: toArrayBuffer(salt),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function encryptText(
  plaintext: string,
  passphrase: string,
): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(passphrase, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext),
  );
  const combined = new Uint8Array(
    salt.length + iv.length + ciphertext.byteLength,
  );
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
  return bufferToBase64(combined);
}

async function decryptText(
  payload: string,
  passphrase: string,
): Promise<string> {
  const combined = base64ToBuffer(payload.trim());
  if (combined.length < SALT_BYTES + IV_BYTES + 1) {
    throw new Error("This doesn't look like a valid encrypted payload.");
  }
  const salt = combined.slice(0, SALT_BYTES);
  const iv = combined.slice(SALT_BYTES, SALT_BYTES + IV_BYTES);
  const ciphertext = combined.slice(SALT_BYTES + IV_BYTES);
  const key = await deriveKey(passphrase, salt);
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );
  return new TextDecoder().decode(plaintextBuffer);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TextEncryptionToolClient() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState<string>("");
  const [passphrase, setPassphrase] = useState<string>("");
  const [showPassphrase, setShowPassphrase] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const switchMode = (next: Mode): void => {
    setMode(next);
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  const handleRun = async (): Promise<void> => {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError(
        mode === "encrypt"
          ? "Enter some text to encrypt."
          : "Paste the encrypted text to decrypt.",
      );
      return;
    }
    if (!passphrase) {
      setError("Enter a passphrase.");
      return;
    }
    setIsProcessing(true);
    try {
      const result =
        mode === "encrypt"
          ? await encryptText(input, passphrase)
          : await decryptText(input, passphrase);
      setOutput(result);
    } catch {
      setError(
        mode === "encrypt"
          ? "Something went wrong while encrypting. Please try again."
          : "Couldn't decrypt — check that the passphrase and encrypted text are both correct.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (): void => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-700 rounded-2xl mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Text Encryption Tool
          </h2>
          <p className="text-gray-600">
            Encrypt or decrypt text with a passphrase — AES-256, entirely in
            your browser
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => switchMode("encrypt")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                mode === "encrypt"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Lock className="w-4 h-4" /> Encrypt
            </button>
            <button
              onClick={() => switchMode("decrypt")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                mode === "decrypt"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Unlock className="w-4 h-4" /> Decrypt
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {mode === "encrypt" ? "Text to encrypt" : "Encrypted text"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encrypt"
                  ? "Type or paste the text you want to encrypt…"
                  : "Paste the encrypted text here…"
              }
              rows={5}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Passphrase
            </label>
            <div className="relative">
              <input
                type={showPassphrase ? "text" : "password"}
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="A passphrase only you and the recipient know"
                autoComplete="off"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pr-12 font-mono text-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent"
              />
              <button
                onClick={() => setShowPassphrase((s) => !s)}
                aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassphrase ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {mode === "decrypt" && (
              <p className="text-xs text-gray-400 mt-1.5">
                Must be the exact passphrase used to encrypt this text.
              </p>
            )}
          </div>

          <button
            onClick={handleRun}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 mb-6"
          >
            {mode === "encrypt" ? (
              <Lock className="w-5 h-5" />
            ) : (
              <Unlock className="w-5 h-5" />
            )}
            {isProcessing
              ? "Working…"
              : mode === "encrypt"
                ? "Encrypt Text"
                : "Decrypt Text"}
          </button>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl mb-6">
              <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {output && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {mode === "encrypt" ? "Encrypted output" : "Decrypted text"}
              </label>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  rows={5}
                  className="w-full border-2 border-emerald-200 bg-emerald-50 rounded-xl px-4 py-3 pr-12 font-mono text-sm resize-none"
                />
                <button
                  onClick={handleCopy}
                  aria-label="Copy result"
                  className="absolute right-3 top-3 p-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-violet-600" />
            How this works
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your passphrase is run through PBKDF2 (150,000 iterations,
            SHA-256) with a random salt to derive a 256-bit key, which
            encrypts your text with AES-GCM — the same authenticated
            encryption used in modern secure messaging. A fresh salt and IV
            are generated every time you encrypt, so encrypting the same text
            twice produces different output. Everything happens locally via
            your browser's Web Crypto API; nothing is sent to a server. This
            is well-suited for protecting a note or message you'll share
            through another channel — it's not a replacement for a dedicated
            encrypted messaging app for ongoing conversations.
          </p>
        </div>
      </div>
    </div>
  );
}
