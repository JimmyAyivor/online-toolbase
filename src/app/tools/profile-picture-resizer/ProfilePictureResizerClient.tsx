"use client";
import React, { useRef, useState } from "react";
import { ImageIcon, Download, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Platform {
  name: string;
  size: number;
  ratio: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
  { name: "Instagram", size: 110, ratio: "1:1" },
  { name: "Facebook", size: 170, ratio: "1:1" },
  { name: "Twitter / X", size: 400, ratio: "1:1" },
  { name: "LinkedIn", size: 400, ratio: "1:1" },
  { name: "YouTube", size: 800, ratio: "1:1" },
  { name: "TikTok", size: 200, ratio: "1:1" },
  { name: "Discord", size: 128, ratio: "1:1" },
  { name: "WhatsApp", size: 192, ratio: "1:1" },
  { name: "Slack", size: 512, ratio: "1:1" },
  { name: "GitHub", size: 460, ratio: "1:1" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resizeImage(
  src: string,
  size: number,
  onDone: (dataUrl: string) => void,
): void {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const min = Math.min(img.width, img.height);
    const sx = (img.width - min) / 2;
    const sy = (img.height - min) / 2;
    ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
    onDone(canvas.toDataURL("image/png"));
  };
  img.src = src;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProfilePictureResizerClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<string | null>(null);
  const [selected, setSelected] = useState<Platform>(PLATFORMS[0]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setOriginal(src);
      setPreview(null);
    };
    reader.readAsDataURL(file);
  };

  const process = (): void => {
    if (!original) return;
    setLoading(true);
    resizeImage(original, selected.size, (dataUrl) => {
      setPreview(dataUrl);
      setLoading(false);
    });
  };

  const download = (): void => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = `profile-${selected.name.toLowerCase().replace(/\s/g, "-")}-${selected.size}px.png`;
    a.click();
  };

  const reset = (): void => {
    setOriginal(null);
    setPreview(null);
    setLoading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg'>
              <ImageIcon className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Profile Picture Resizer
            </h2>
            <p className='text-gray-500'>
              Resize and crop profile pictures for every social platform —
              processed entirely in your browser
            </p>
          </div>

          <div className='space-y-6'>
            {/* Upload */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Upload Your Image
              </label>
              <div
                className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors'
                onClick={() => fileRef.current?.click()}
              >
                {original ? (
                  <img
                    src={original}
                    alt='Original'
                    className='max-h-48 mx-auto rounded-lg object-contain'
                  />
                ) : (
                  <div className='text-gray-500'>
                    <ImageIcon className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p className='font-medium'>Click to upload an image</p>
                    <p className='text-sm mt-1'>PNG, JPG, WEBP up to 10 MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type='file'
                accept='image/*'
                onChange={handleFile}
                className='hidden'
              />
            </div>

            {/* Platform selector */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='flex items-center gap-2 mb-3'>
                <ImageIcon className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-700'>Select Platform</h3>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
                {PLATFORMS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setSelected(p);
                      setPreview(null);
                    }}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${
                      selected.name === p.name
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {p.name}
                    <div
                      className={`text-xs font-normal ${
                        selected.name === p.name
                          ? "text-indigo-200"
                          : "text-gray-400"
                      }`}
                    >
                      {p.size}×{p.size}px
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={process}
                disabled={!original || loading}
                className='flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors'
              >
                {loading ? "Processing…" : `Resize for ${selected.name}`}
              </button>
              <button
                onClick={reset}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>

            {/* Result */}
            {preview && (
              <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Result — {selected.name} ({selected.size}×{selected.size}px)
                </h3>
                <div className='grid md:grid-cols-2 gap-6 items-start'>
                  <img
                    src={preview}
                    alt='Resized preview'
                    className='rounded-full w-48 h-48 mx-auto object-cover border-4 border-white shadow-lg'
                  />
                  <div className='space-y-3'>
                    <div className='grid grid-cols-2 gap-3'>
                      {[
                        { label: "Width", value: `${selected.size}px` },
                        { label: "Height", value: `${selected.size}px` },
                        { label: "Ratio", value: selected.ratio },
                        { label: "Platform", value: selected.name },
                      ].map(({ label, value }) => (
                        <div key={label} className='bg-white rounded-lg p-3'>
                          <div className='text-xs text-gray-500'>{label}</div>
                          <div className='font-semibold text-gray-900 text-sm'>
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={download}
                      className='w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors'
                    >
                      <Download className='w-4 h-4' />
                      Download PNG
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Platform reference */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Platform Size Reference
              </h3>
              <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-gray-100 sticky top-0'>
                    <tr>
                      {["Platform", "Recommended Size", "Aspect Ratio"].map(
                        (h) => (
                          <th
                            key={h}
                            className='px-4 py-3 text-left text-sm font-semibold text-gray-700'
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {PLATFORMS.map((p) => (
                      <tr
                        key={p.name}
                        className='hover:bg-gray-50 cursor-pointer'
                        onClick={() => {
                          setSelected(p);
                          setPreview(null);
                        }}
                      >
                        <td className='px-4 py-3 text-sm font-medium text-gray-900'>
                          {p.name}
                        </td>
                        <td className='px-4 py-3 text-sm text-gray-600'>
                          {p.size}×{p.size}px
                        </td>
                        <td className='px-4 py-3 text-sm text-gray-600'>
                          {p.ratio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Your image is processed entirely in the browser — nothing is
                uploaded to any server
              </li>
              <li>
                The tool automatically centre-crops your image to a square
                before resizing
              </li>
              <li>
                For best quality, start with a high-resolution square image of
                at least 800×800px
              </li>
              <li>
                Click any platform row in the table to quickly switch to that
                size
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}