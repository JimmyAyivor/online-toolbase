"use client";

import { useState } from "react";
import JSZip from "jszip";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  getPdfjs,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "extract-images-from-pdf");

export default function ExtractImagesFromPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extract = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    setCount(null);
    try {
      const pdfjsLib = await getPdfjs();
      const pdf = await pdfjsLib.getDocument({
        data: await files[0].arrayBuffer(),
      }).promise;
      const zip = new JSZip();
      let found = 0;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setProgress(`Scanning page ${pageNum} of ${pdf.numPages}…`);
        const page = await pdf.getPage(pageNum);
        const opList = await page.getOperatorList();
        const { OPS } = pdfjsLib;

        for (let i = 0; i < opList.fnArray.length; i++) {
          const isImageOp = opList.fnArray[i] === OPS.paintImageXObject;
          if (!isImageOp) continue;

          const objId = opList.argsArray[i][0];
          const img: any = await new Promise((resolve) => {
            page.objs.get(objId, resolve);
          });
          if (!img || !img.data) continue;

          // Draw the raw image data onto a canvas so we can export it as a PNG,
          // regardless of the source image's internal encoding.
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          const imageData = ctx.createImageData(img.width, img.height);

          if (
            img.kind === 3 /* RGBA_32BPP */ ||
            img.data.length === img.width * img.height * 4
          ) {
            imageData.data.set(img.data);
          } else if (img.data.length === img.width * img.height * 3) {
            // RGB -> RGBA
            for (let p = 0, q = 0; p < img.data.length; p += 3, q += 4) {
              imageData.data[q] = img.data[p];
              imageData.data[q + 1] = img.data[p + 1];
              imageData.data[q + 2] = img.data[p + 2];
              imageData.data[q + 3] = 255;
            }
          } else {
            continue; // unsupported encoding (e.g. indexed/CMYK) — skip rather than corrupt output
          }

          ctx.putImageData(imageData, 0, 0);
          const blob: Blob = await new Promise((resolve) =>
            canvas.toBlob((b) => resolve(b!), "image/png"),
          );
          found++;
          zip.file(
            `page-${String(pageNum).padStart(2, "0")}-image-${found}.png`,
            blob,
          );
        }
      }

      setCount(found);
      if (found === 0) {
        setError("No extractable raster images were found in this PDF.");
        return;
      }
      setProgress("Zipping…");
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBytes(
        zipBlob,
        `${stripExtension(files[0].name)}-images.zip`,
        "application/zip",
      );
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="Extract Images from PDF"
          description="Pull every embedded photo or image out of a PDF as separate PNG files."
          useCases={[
            "Recover the original photos embedded in a PDF report",
            "Pull product images out of a supplier's PDF catalog",
            "Extract figures or charts from a PDF for reuse elsewhere",
          ]}
          faq={[
            {
              q: "Does this work on a scanned PDF?",
              a: "A scanned PDF is usually one full-page image per page — this tool will extract that page image, but it won't separate individual photos within a scan.",
            },
            {
              q: "What formats are supported?",
              a: "Extracted images are exported as PNG regardless of their original encoding, so quality is preserved even for JPEG-compressed sources.",
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
            <div className="mt-6 space-y-4">
              <button
                onClick={extract}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? (progress ?? "Extracting…") : "Extract Images"}
              </button>
              {count !== null && count > 0 && (
                <p className="text-center text-sm text-slate-600">
                  Found {count} image{count === 1 ? "" : "s"}.
                </p>
              )}
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="extract-images-from-pdf" />
      </SidebarAdLayout>
    </>
  );
}
