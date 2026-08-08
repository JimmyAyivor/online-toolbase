"use client";

import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  getPdfjs,
  renderPageThumbnail,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "sign-pdf");

export default function SignPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageThumbs, setPageThumbs] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [position, setPosition] = useState({ xPct: 0.65, yPct: 0.12 }); // from bottom-left, as % of page
  const [sigWidthPt, setSigWidthPt] = useState(160);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    if (files.length === 0) {
      setPageThumbs([]);
      return;
    }
    (async () => {
      try {
        const pdfjsLib = await getPdfjs();
        const pdf = await pdfjsLib.getDocument({
          data: await files[0].arrayBuffer(),
        }).promise;
        const thumbs: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++)
          thumbs.push(await renderPageThumbnail(pdf, i, 120));
        setPageThumbs(thumbs);
      } catch (err) {
        setError(describeError(err));
      }
    })();
  }, [files]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(null);
  };

  const pointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pointerPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const endDraw = () => {
    if (!drawing.current) return;
    drawing.current = false;
    setSignatureDataUrl(canvasRef.current!.toDataURL("image/png"));
  };

  const onUploadSignature = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setSignatureDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const apply = async () => {
    if (files.length === 0 || !signatureDataUrl) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pngBytes = await (await fetch(signatureDataUrl)).arrayBuffer();
      const sigImage = await doc.embedPng(pngBytes);
      const ratio = sigImage.height / sigImage.width;
      const w = sigWidthPt;
      const h = w * ratio;

      const page = doc.getPages()[selectedPage];
      const { width, height } = page.getSize();
      page.drawImage(sigImage, {
        x: position.xPct * width,
        y: position.yPct * height,
        width: w,
        height: h,
      });

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-signed.pdf`,
        "application/pdf",
      );
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="Sign PDF"
          description="Draw or upload a signature and place it on any page — no account or e-signature service needed."
          useCases={[
            "Sign a form or agreement before emailing it back",
            "Add a signature to a lease, invoice, or NDA",
            "Place a scanned signature image onto a specific document page",
          ]}
          faq={[
            {
              q: "Is this a legally binding e-signature service?",
              a: "No — this places a signature image onto the PDF for convenience. For contracts requiring certified e-signatures with an audit trail, use a dedicated e-signature service.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a PDF here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Page to sign
                </label>
                <div className="flex flex-wrap gap-2">
                  {pageThumbs.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPage(i)}
                      className={`rounded border p-0.5 ${selectedPage === i ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200"}`}
                    >
                      <img
                        src={t}
                        alt={`Page ${i + 1}`}
                        className="h-16 w-auto"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Draw your signature
                </label>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={140}
                  onPointerDown={startDraw}
                  onPointerMove={draw}
                  onPointerUp={endDraw}
                  onPointerLeave={endDraw}
                  className="touch-none rounded-lg border border-slate-300 bg-white"
                />
                <div className="mt-2 flex gap-2 text-sm">
                  <button
                    onClick={clearCanvas}
                    className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50"
                  >
                    Clear
                  </button>
                  <label className="cursor-pointer rounded border border-slate-300 px-3 py-1 hover:bg-slate-50">
                    Upload image instead
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        onUploadSignature(e.target.files[0])
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Horizontal position
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={0.85}
                    step={0.01}
                    value={position.xPct}
                    onChange={(e) =>
                      setPosition((p) => ({
                        ...p,
                        xPct: Number(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Vertical position
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={0.9}
                    step={0.01}
                    value={position.yPct}
                    onChange={(e) =>
                      setPosition((p) => ({
                        ...p,
                        yPct: Number(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Signature width: {sigWidthPt}pt
                </label>
                <input
                  type="range"
                  min={60}
                  max={320}
                  value={sigWidthPt}
                  onChange={(e) => setSigWidthPt(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={apply}
                disabled={busy || !signatureDataUrl}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Placing signature…" : "Sign & Download"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="sign-pdf" />
      </SidebarAdLayout>
    </>
  );
}
