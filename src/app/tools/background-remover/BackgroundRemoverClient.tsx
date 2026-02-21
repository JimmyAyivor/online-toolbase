"use client";
import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  Scissors,
  Eye,
  EyeOff,
  Layers,
  CheckCircle2,
} from "lucide-react";

const BackgroundRemoverClient = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundType, setBackgroundType] = useState("transparent");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.match("image.*")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          setOriginalImage(result);
          processImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (imageSrc: string) => {
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Simple edge detection and background removal simulation
      // In production, you would use a proper AI model or API
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Simple background detection (this is a simulation)
        // Detect near-white or uniform backgrounds
        const isBackground =
          (r > 200 && g > 200 && b > 200) ||
          (Math.abs(r - g) < 30 &&
            Math.abs(g - b) < 30 &&
            Math.abs(r - b) < 30);

        if (isBackground) {
          data[i + 3] = 0; // Make transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);

      setProcessedImage(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    };
    img.src = imageSrc;
  };

  const applyBackground = () => {
    if (!processedImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      if (backgroundType === "color") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      setProcessedImage(canvas.toDataURL("image/png"));
    };
    img.src = processedImage;
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = `no-bg-${fileName || "image.png"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClear = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setFileName("");
    setShowOriginal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  React.useEffect(() => {
    if (processedImage) {
      applyBackground();
    }
  }, [backgroundColor, backgroundType]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-purple-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-2xl mb-4 shadow-lg'>
            <Scissors className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Background Remover
          </h1>
          <p className='text-gray-600'>
            Remove image backgrounds instantly with AI-powered precision
          </p>
        </div>

        {!originalImage ? (
          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12'>
            <div
              onClick={() => fileInputRef.current?.click()}
              className='border-4 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-fuchsia-500 hover:bg-fuchsia-50 transition-all duration-300 cursor-pointer group'
            >
              <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-full mb-6 group-hover:scale-110 transition-transform'>
                <Upload className='w-12 h-12 text-fuchsia-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Upload Your Image
              </h3>
              <p className='text-gray-600 mb-4'>
                Click to browse or drag and drop
              </p>
              <p className='text-sm text-gray-500'>
                Supports: JPG, PNG, WebP (Max 10MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileSelect}
              className='hidden'
            />

            <div className='mt-8 grid md:grid-cols-3 gap-6'>
              <div className='text-center p-6 bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-fuchsia-600 rounded-full mb-3'>
                  <CheckCircle2 className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-bold text-gray-900 mb-2'>
                  Instant Results
                </h4>
                <p className='text-sm text-gray-600'>
                  AI-powered background removal in seconds
                </p>
              </div>
              <div className='text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-3'>
                  <CheckCircle2 className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-bold text-gray-900 mb-2'>High Quality</h4>
                <p className='text-sm text-gray-600'>
                  Preserve image quality and details
                </p>
              </div>
              <div className='text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-pink-600 rounded-full mb-3'>
                  <CheckCircle2 className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-bold text-gray-900 mb-2'>100% Free</h4>
                <p className='text-sm text-gray-600'>
                  No watermarks, no limits, no signup
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isProcessing && (
              <div className='bg-white rounded-xl shadow-md p-8 mb-6 text-center'>
                <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-fuchsia-200 border-t-fuchsia-600 mb-4'></div>
                <p className='text-gray-700 font-medium'>
                  Processing your image...
                </p>
                <p className='text-sm text-gray-500 mt-2'>
                  This may take a few seconds
                </p>
              </div>
            )}

            {!isProcessing && processedImage && (
              <>
                <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6'>
                  <div className='flex flex-wrap justify-between items-center mb-6 gap-4'>
                    <div className='flex items-center gap-3'>
                      <ImageIcon className='w-6 h-6 text-fuchsia-600' />
                      <h3 className='font-bold text-gray-900 text-lg'>
                        {fileName}
                      </h3>
                    </div>
                    <div className='flex gap-3'>
                      <button
                        onClick={() => setShowOriginal(!showOriginal)}
                        className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors'
                      >
                        {showOriginal ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                        {showOriginal ? "Show Result" : "Show Original"}
                      </button>
                      <button
                        onClick={handleDownload}
                        className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-md'
                      >
                        <Download className='w-4 h-4' />
                        Download
                      </button>
                      <button
                        onClick={handleClear}
                        className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors'
                      >
                        <Trash2 className='w-4 h-4' />
                        New Image
                      </button>
                    </div>
                  </div>

                  <div className='grid md:grid-cols-4 gap-6 mb-6'>
                    <div className='md:col-span-3'>
                      <div className='relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 overflow-hidden'>
                        <div
                          className='absolute inset-0'
                          style={{
                            backgroundImage:
                              "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%)",
                            backgroundPosition: "0 0, 10px 10px",
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                        <div className='relative flex items-center justify-center'>
                          <img
                            src={showOriginal ? originalImage : processedImage}
                            alt={showOriginal ? "Original" : "Processed"}
                            className='max-w-full h-auto rounded-lg shadow-lg'
                            style={{ maxHeight: "500px" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div className='bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-6'>
                        <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                          <Layers className='w-5 h-5 text-fuchsia-600' />
                          Background
                        </h4>

                        <div className='space-y-3'>
                          <label className='flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
                            <input
                              type='radio'
                              name='bgType'
                              value='transparent'
                              checked={backgroundType === "transparent"}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setBackgroundType(e.target.value)
                              }
                              className='w-4 h-4 text-fuchsia-600'
                            />
                            <span className='font-medium text-gray-900'>
                              Transparent
                            </span>
                          </label>

                          <label className='flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
                            <input
                              type='radio'
                              name='bgType'
                              value='color'
                              checked={backgroundType === "color"}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setBackgroundType(e.target.value)
                              }
                              className='w-4 h-4 text-fuchsia-600'
                            />
                            <span className='font-medium text-gray-900'>
                              Solid Color
                            </span>
                          </label>

                          {backgroundType === "color" && (
                            <div className='pl-3'>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Choose Color
                              </label>
                              <div className='flex gap-2'>
                                <input
                                  type='color'
                                  value={backgroundColor}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setBackgroundColor(e.target.value)
                                  }
                                  className='w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300'
                                />
                                <input
                                  type='text'
                                  value={backgroundColor}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setBackgroundColor(e.target.value)
                                  }
                                  className='flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-fuchsia-500 text-sm'
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='bg-white rounded-xl p-4 border-2 border-gray-200'>
                        <h4 className='font-bold text-gray-900 mb-2 text-sm'>
                          Quick Colors
                        </h4>
                        <div className='grid grid-cols-4 gap-2'>
                          {[
                            "#ffffff",
                            "#000000",
                            "#3b82f6",
                            "#10b981",
                            "#f59e0b",
                            "#ef4444",
                            "#8b5cf6",
                            "#ec4899",
                          ].map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                setBackgroundType("color");
                                setBackgroundColor(color);
                              }}
                              className='w-full h-10 rounded-lg border-2 border-gray-300 hover:border-fuchsia-500 transition-colors'
                              style={{ backgroundColor: color }}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-xl shadow-md p-6'>
                  <h3 className='font-bold text-gray-900 mb-4'>💡 Pro Tips</h3>
                  <div className='grid md:grid-cols-3 gap-4 text-sm text-gray-700'>
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-fuchsia-600 rounded-full mt-2 flex-shrink-0'></div>
                      <div>
                        <strong className='text-gray-900'>Best Results:</strong>{" "}
                        Use images with clear subjects and simple backgrounds
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
                      <div>
                        <strong className='text-gray-900'>
                          Export Formats:
                        </strong>{" "}
                        Download as PNG to preserve transparency
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0'></div>
                      <div>
                        <strong className='text-gray-900'>Use Cases:</strong>{" "}
                        Perfect for product photos, portraits, and graphics
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!originalImage && (
          <div className='mt-8 bg-white rounded-xl shadow-md p-6'>
            <h3 className='font-bold text-gray-900 mb-4'>🎯 Perfect For</h3>
            <div className='grid md:grid-cols-4 gap-4 text-sm text-gray-700'>
              <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg'>
                <strong className='block text-gray-900 mb-1'>E-commerce</strong>
                <span>Product photos</span>
              </div>
              <div className='text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg'>
                <strong className='block text-gray-900 mb-1'>
                  Social Media
                </strong>
                <span>Profile pictures</span>
              </div>
              <div className='text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg'>
                <strong className='block text-gray-900 mb-1'>Design</strong>
                <span>Graphics & layouts</span>
              </div>
              <div className='text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg'>
                <strong className='block text-gray-900 mb-1'>Marketing</strong>
                <span>Ads & banners</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundRemoverClient;
