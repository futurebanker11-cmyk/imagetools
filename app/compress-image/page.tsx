"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { FileDown, Shield, Zap } from "lucide-react";
import { fileToImage, drawOnCanvas, canvasToBlob, resolveExtension, replaceExtension, formatBytes } from "@/lib/imageUtils";
import JSZip from "jszip";

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function CompressImagePage() {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [quality, setQuality] = useState(80);
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
        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        const canvas = drawOnCanvas(img, img.naturalWidth, img.naturalHeight);
        const blob = await canvasToBlob(canvas, mime, quality / 100);
        out.push({ blob, filename: replaceExtension(file.name, resolveExtension(mime)), originalSize: file.size });
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
    a.href = url; a.download = "compressed-images.zip"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const totalSaved = results.reduce((acc, r) => acc + (r.originalSize - r.blob.size), 0);

  return (
    <ToolPageLayout
      title="Compress Image"
      description="Reduce image file size with a simple quality slider. Your images stay in your browser — nothing is uploaded."
      relatedTools={[
        { label: "Compress to 50KB", href: "/compress-image-to-50kb", description: "Auto-hit 50KB target" },
        { label: "Compress to 100KB", href: "/compress-image-to-100kb", description: "Auto-hit 100KB target" },
        { label: "Image Resizer", href: "/image-resizer", description: "Change dimensions" },
        { label: "PNG to JPG", href: "/png-to-jpg", description: "Convert for smaller size" },
      ]}
    >
      <FileDropzone onFilesChange={handleFiles} multiple />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality: <span className="text-blue-600 font-bold">{quality}%</span>
              <span className="ml-2 text-xs text-gray-400">
                {quality >= 85 ? "High quality" : quality >= 60 ? "Good balance" : "Smaller file"}
              </span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => { setQuality(Number(e.target.value)); setResults([]); }}
              className="w-full max-w-sm"
              aria-label="Compression quality"
            />
            <div className="flex justify-between text-xs text-gray-400 max-w-sm mt-1">
              <span>Smallest file</span>
              <span>Best quality</span>
            </div>
          </div>

          {/* Live preview of size estimate */}
          {results.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 font-semibold text-sm">
                Saved {formatBytes(totalSaved)} across {results.length} file{results.length > 1 ? "s" : ""}
              </p>
              {results.length === 1 && (
                <p className="text-green-700 text-sm mt-1">
                  {formatBytes(results[0].originalSize)} → {formatBytes(results[0].blob.size)}
                  {" "}({Math.round((1 - results[0].blob.size / results[0].originalSize) * 100)}% smaller)
                </p>
              )}
            </div>
          )}

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Compressing…" : `Compress ${files.length > 1 ? `${files.length} Images` : "Image"}`}
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
          { title: "Upload images", description: "Drop one or multiple images. Supports JPG, PNG, WEBP, and more." },
          { title: "Set quality", description: "Drag the quality slider. Lower = smaller file, higher = better quality." },
          { title: "Download", description: "Click Compress and download. Single file or ZIP for batches." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: FileDown, title: "Smart compression", description: "Adjustable quality from 10% to 100% for fine-grained control." },
          { icon: Shield, title: "100% private", description: "All compression happens in your browser. Images never leave your device." },
          { icon: Zap, title: "Batch compress", description: "Compress up to 30 images at once and download as a single ZIP." },
        ]}
      />
    </ToolPageLayout>
  );
}
