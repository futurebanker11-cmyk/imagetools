"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Maximize2, Lock, Layers } from "lucide-react";
import {
  fileToImage, drawOnCanvas, canvasToBlob,
  resolveFormat, resolveExtension, replaceExtension,
  toPx, fromPx,
  type OutputFormat,
} from "@/lib/imageUtils";
import JSZip from "jszip";

type Unit = "px" | "cm" | "inch";

const PRESETS = [
  { label: "Instagram Square", w: 1080, h: 1080 },
  { label: "IG Story", w: 1080, h: 1920 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "Facebook Post", w: 1200, h: 630 },
  { label: "Twitter/X Post", w: 1600, h: 900 },
  { label: "LinkedIn Cover", w: 1584, h: 396 },
];

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function ImageResizerPage() {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [unit, setUnit] = useState<Unit>("px");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [percent, setPercent] = useState("");
  const [format, setFormat] = useState<OutputFormat>("keep");
  const [quality, setQuality] = useState(92);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Populate width/height from first file
  const handleFiles = useCallback(async (dropped: DroppedFile[]) => {
    setFiles(dropped);
    setResults([]);
    if (dropped.length > 0) {
      const img = await fileToImage(dropped[0].file);
      setWidth(String(fromPx(img.naturalWidth, unit)));
      setHeight(String(fromPx(img.naturalHeight, unit)));
    }
  }, [unit]);

  const onWidthChange = (v: string) => {
    setWidth(v);
    if (lockAspect && files.length > 0) {
      fileToImage(files[0].file).then((img) => {
        const ratio = img.naturalHeight / img.naturalWidth;
        const wPx = toPx(parseFloat(v) || 0, unit);
        setHeight(String(fromPx(Math.round(wPx * ratio), unit)));
      });
    }
  };

  const onHeightChange = (v: string) => {
    setHeight(v);
    if (lockAspect && files.length > 0) {
      fileToImage(files[0].file).then((img) => {
        const ratio = img.naturalWidth / img.naturalHeight;
        const hPx = toPx(parseFloat(v) || 0, unit);
        setWidth(String(fromPx(Math.round(hPx * ratio), unit)));
      });
    }
  };

  const applyPreset = (w: number, h: number) => {
    setUnit("px");
    setWidth(String(w));
    setHeight(String(h));
  };

  const process = async () => {
    if (files.length === 0) { setError("Please upload at least one image."); return; }
    const wPx = toPx(parseFloat(width) || 0, unit);
    const hPx = toPx(parseFloat(height) || 0, unit);
    if (wPx < 1 || hPx < 1) { setError("Width and height must be greater than 0."); return; }
    setError(null);
    setProcessing(true);
    try {
      const pica = (await import("pica")).default;
      const picaInstance = pica();
      const out: Result[] = [];
      for (const { file } of files) {
        const img = await fileToImage(file);
        // Use percent if set, otherwise use explicit w/h
        let targetW = wPx, targetH = hPx;
        if (percent) {
          const p = parseFloat(percent) / 100;
          targetW = Math.round(img.naturalWidth * p);
          targetH = Math.round(img.naturalHeight * p);
        }

        const srcCanvas = drawOnCanvas(img, img.naturalWidth, img.naturalHeight);
        const dstCanvas = document.createElement("canvas");
        dstCanvas.width = targetW;
        dstCanvas.height = targetH;
        await picaInstance.resize(srcCanvas, dstCanvas, { quality: 3 });

        const mime = resolveFormat(file, format);
        const blob = await canvasToBlob(dstCanvas, mime, quality / 100);
        const ext = resolveExtension(mime);
        out.push({ blob, filename: replaceExtension(file.name, ext), originalSize: file.size });
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
    a.href = url;
    a.download = "resized-images.zip";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPageLayout
      title="Image Resizer"
      description="Resize images to exact dimensions in pixels, centimeters, or inches. Batch resize up to 30 images at once."
      relatedTools={[
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Image Cropper", href: "/image-cropper", description: "Crop to any ratio" },
        { label: "Rotate Image", href: "/rotate-image", description: "Rotate & flip" },
        { label: "PNG to JPG", href: "/png-to-jpg", description: "Convert format" },
      ]}
    >
      <FileDropzone onFilesChange={handleFiles} multiple />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          {/* Unit toggle */}
          <div className="flex gap-2">
            {(["px", "cm", "inch"] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${unit === u ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* W / H inputs */}
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width ({unit})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => onWidthChange(e.target.value)}
                className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <button
              onClick={() => setLockAspect((v) => !v)}
              aria-label={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
              className={`mb-0.5 p-2 rounded-lg border transition-colors ${lockAspect ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-400"}`}
            >
              <Lock size={16} aria-hidden="true" />
            </button>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height ({unit})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => onHeightChange(e.target.value)}
                className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
          </div>

          {/* Percent scaler */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Or scale by percentage</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="e.g. 50"
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="500"
              />
              <span className="text-sm text-gray-500">% (overrides width/height if set)</span>
            </div>
          </div>

          {/* Presets */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.w, p.h)}
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 rounded-lg transition-colors"
                >
                  {p.label} ({p.w}×{p.h})
                </button>
              ))}
            </div>
          </div>

          {/* Format + Quality */}
          <div className="flex flex-wrap gap-5 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Output format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as OutputFormat)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="keep">Keep original</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WEBP</option>
              </select>
            </div>
            {format !== "image/png" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality: <span className="text-blue-600 font-bold">{quality}%</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-40"
                  aria-label="Output quality"
                />
              </div>
            )}
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Resizing…" : `Resize ${files.length > 1 ? `${files.length} Images` : "Image"}`}
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
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">{results.length} images resized successfully.</p>
              <DownloadButton mode="zip" onDownload={downloadZip} count={results.length} />
            </div>
          )}
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload images", description: "Drop your images or click to select. Supports JPG, PNG, WEBP, and more." },
          { title: "Set dimensions", description: "Enter width and height in px, cm, or inch. Lock aspect ratio to avoid distortion." },
          { title: "Download", description: "Click Resize and download your resized images instantly." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: Maximize2, title: "Any dimension", description: "Resize in pixels, centimeters, or inches with precise control." },
          { icon: Lock, title: "Aspect ratio lock", description: "Automatically keeps proportions correct when you change one dimension." },
          { icon: Layers, title: "Batch resize", description: "Process up to 30 images at once and download as a ZIP." },
        ]}
      />
    </ToolPageLayout>
  );
}
