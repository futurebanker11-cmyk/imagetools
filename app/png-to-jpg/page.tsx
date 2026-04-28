"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ArrowRightLeft, Shield, Layers } from "lucide-react";
import { fileToImage, drawOnCanvas, canvasToBlob, replaceExtension } from "@/lib/imageUtils";
import JSZip from "jszip";

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function PngToJpgPage() {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [quality, setQuality] = useState(92);
  const [whiteBackground, setWhiteBackground] = useState(true);
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
        const canvas = drawOnCanvas(img, img.naturalWidth, img.naturalHeight, whiteBackground, "#ffffff");
        const blob = await canvasToBlob(canvas, "image/jpeg", quality / 100);
        out.push({ blob, filename: replaceExtension(file.name, "jpg"), originalSize: file.size });
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
    a.href = url; a.download = "converted-images.zip"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPageLayout
      title="PNG to JPG Converter"
      description="Convert PNG images to JPG format. White background fill option for transparent PNGs. Batch convert up to 30 files."
      relatedTools={[
        { label: "JPG to PNG", href: "/jpg-to-png", description: "Convert the other way" },
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Image Resizer", href: "/image-resizer", description: "Change dimensions" },
        { label: "HEIC to JPG", href: "/heic-to-jpg", description: "Convert iPhone photos" },
      ]}
    >
      <FileDropzone
        onFilesChange={handleFiles}
        multiple
        accept={["image/png", "image/webp", "image/gif", "image/bmp"]}
        label="Drop PNG files here or click to upload"
      />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          {/* White background option */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={whiteBackground}
              onChange={(e) => setWhiteBackground(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <div>
              <span className="text-sm font-medium text-gray-800">Fill transparent areas with white</span>
              <p className="text-xs text-gray-500">Recommended — JPG doesn&apos;t support transparency</p>
            </div>
          </label>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JPG Quality: <span className="text-blue-600 font-bold">{quality}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full max-w-sm"
              aria-label="JPG output quality"
            />
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Converting…" : `Convert ${files.length > 1 ? `${files.length} Files` : "to JPG"}`}
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
          { title: "Upload PNGs", description: "Drop your PNG files or click to browse. Batch convert up to 30 at once." },
          { title: "Choose options", description: "Set white background fill for transparent images and adjust JPG quality." },
          { title: "Download JPGs", description: "Click Convert and download your JPG files instantly — single or as ZIP." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: ArrowRightLeft, title: "Fast conversion", description: "Instant PNG to JPG conversion with no quality loss beyond what you set." },
          { icon: Shield, title: "Transparency handled", description: "Transparent PNG areas are filled with white so JPGs look correct." },
          { icon: Layers, title: "Batch convert", description: "Convert up to 30 PNG files to JPG in one click." },
        ]}
      />
    </ToolPageLayout>
  );
}
