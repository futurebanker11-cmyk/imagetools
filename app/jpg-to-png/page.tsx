"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ArrowRightLeft, Layers, Shield } from "lucide-react";
import { fileToImage, makeCanvas, canvasToBlob, replaceExtension } from "@/lib/imageUtils";
import JSZip from "jszip";

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function JpgToPngPage() {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [removeWhite, setRemoveWhite] = useState(false);
  const [threshold, setThreshold] = useState(30);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((dropped: DroppedFile[]) => {
    setFiles(dropped);
    setResults([]);
  }, []);

  const process = async () => {
    if (files.length === 0) { setError("Please upload at least one image."); return; }
    setError(null);
    setProcessing(true);
    try {
      const out: Result[] = [];
      for (const { file } of files) {
        const img = await fileToImage(file);
        const canvas = makeCanvas(img.naturalWidth, img.naturalHeight);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);

        if (removeWhite) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            if (r > 255 - threshold && g > 255 - threshold && b > 255 - threshold) {
              data[i + 3] = 0; // make transparent
            }
          }
          ctx.putImageData(imageData, 0, 0);
        }

        const blob = await canvasToBlob(canvas, "image/png");
        out.push({ blob, filename: replaceExtension(file.name, "png"), originalSize: file.size });
      }
      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    results.forEach((r) => zip.file(r.filename, r.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted-png.zip"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPageLayout
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG format with lossless quality. Optional white background removal for transparent PNGs."
      relatedTools={[
        { label: "PNG to JPG", href: "/png-to-jpg", description: "Convert the other way" },
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Image Resizer", href: "/image-resizer", description: "Change dimensions" },
        { label: "HEIC to JPG", href: "/heic-to-jpg", description: "Convert iPhone photos" },
      ]}
    >
      <FileDropzone
        onFilesChange={handleFiles}
        multiple
        accept={["image/jpeg", "image/webp", "image/bmp", "image/gif"]}
        label="Drop JPG files here or click to upload"
      />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={removeWhite}
              onChange={(e) => setRemoveWhite(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-blue-600"
            />
            <div>
              <span className="text-sm font-medium text-gray-800">Remove white background (make transparent)</span>
              <p className="text-xs text-gray-500">Turns near-white pixels transparent. Useful for logos on white backgrounds.</p>
            </div>
          </label>

          {removeWhite && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                White tolerance: <span className="text-blue-600 font-bold">{threshold}</span>
                <span className="ml-2 text-xs text-gray-400">(higher = removes more shades of white)</span>
              </label>
              <input
                type="range"
                min={5}
                max={80}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full max-w-sm"
                aria-label="White removal threshold"
              />
            </div>
          )}

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Converting…" : `Convert ${files.length > 1 ? `${files.length} Files` : "to PNG"}`}
          </button>

          {results.length === 1 && (
            <DownloadButton
              mode="single"
              blob={results[0].blob}
              filename={results[0].filename}
              originalSize={results[0].originalSize}
              processedSize={results[0].blob.size}
            />
          )}
          {results.length > 1 && (
            <DownloadButton mode="zip" onDownload={downloadZip} count={results.length} />
          )}
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload JPGs", description: "Drop your JPG or JPEG files. Batch convert up to 30 at once." },
          { title: "Choose options", description: "Optionally remove white background to get transparent PNGs for logos." },
          { title: "Download PNGs", description: "Click Convert and download your PNG files — single or as ZIP." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: ArrowRightLeft, title: "Lossless PNG output", description: "PNG format preserves every detail without compression artifacts." },
          { icon: Layers, title: "White removal", description: "Optional: turn white backgrounds transparent for use on any background." },
          { icon: Shield, title: "100% private", description: "Conversion runs entirely in your browser. Nothing is uploaded." },
        ]}
      />
    </ToolPageLayout>
  );
}
