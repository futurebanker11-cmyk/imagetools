"use client";

import { useState, useCallback } from "react";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Upload, Film, Shield, Layers, X } from "lucide-react";
import { replaceExtension } from "@/lib/imageUtils";
import JSZip from "jszip";

const MAX_FILES = 30;

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

interface PickedFile {
  file: File;
  name: string;
}

export default function HeicToJpgPage() {
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((incoming: File[]) => {
    setError(null);
    const valid = incoming.filter((f) =>
      f.type === "image/heic" || f.type === "image/heif" ||
      f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif")
    );
    if (valid.length === 0 && incoming.length > 0) {
      setError("Please upload HEIC or HEIF files.");
      return;
    }
    const newPicked: PickedFile[] = valid.map((f) => ({ file: f, name: f.name }));
    const combined: PickedFile[] = [...files, ...newPicked].slice(0, MAX_FILES);
    if (files.length + valid.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
    }
    setFiles(combined);
    setResults([]);
  }, [files]);

  const removeFile = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setResults([]);
  };

  const process = async () => {
    if (files.length === 0) { setError("Please upload at least one HEIC file."); return; }
    setError(null);
    setProcessing(true);
    try {
      // Dynamic import — only loaded on this page
      const heic2any = (await import("heic2any")).default;
      const out: Result[] = [];
      for (const { file } of files) {
        try {
          const result = await heic2any({ blob: file, toType: "image/jpeg", quality });
          const blob = Array.isArray(result) ? result[0] : result;
          out.push({ blob, filename: replaceExtension(file.name, "jpg"), originalSize: file.size });
        } catch {
          throw new Error(
            `Failed to convert ${file.name}. If conversion fails, your HEIC file may be in a newer format. ` +
            "Try opening in Photos/Preview and re-exporting as JPG, then use this tool."
          );
        }
      }
      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
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
    a.href = url; a.download = "converted-jpg.zip"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPageLayout
      title="HEIC to JPG Converter"
      description="Convert iPhone HEIC photos to JPG format. Works entirely in your browser — no upload required."
      relatedTools={[
        { label: "PNG to JPG", href: "/png-to-jpg", description: "Convert PNG to JPG" },
        { label: "JPG to PNG", href: "/jpg-to-png", description: "Convert JPG to PNG" },
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Image Resizer", href: "/image-resizer", description: "Change dimensions" },
      ]}
    >
      {/* Upload area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(Array.from(e.dataTransfer.files)); }}
        onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = ".heic,.heif"; i.multiple = true; i.onchange = (e) => addFiles(Array.from((e.target as HTMLInputElement).files ?? [])); i.click(); }}
        role="button"
        tabIndex={0}
        aria-label="Upload HEIC files"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { const i = document.createElement("input"); i.type = "file"; i.accept = ".heic,.heif"; i.multiple = true; i.onchange = (ev) => addFiles(Array.from((ev.target as HTMLInputElement).files ?? [])); i.click(); } }}
        className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <Upload size={36} className="mx-auto mb-3 text-gray-400" aria-hidden="true" />
        <p className="text-gray-700 font-medium text-lg">Drop HEIC files here or click to upload</p>
        <p className="text-gray-400 text-sm mt-1">Up to 30 files · .heic and .heif formats</p>
      </div>

      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}

      {/* Fallback notice */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        <strong>Note:</strong> If conversion fails, your HEIC file may be in a newer format. Try opening in Photos/Preview and re-exporting as JPG, then use this tool.
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          {/* File list */}
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                <span className="text-gray-700 truncate">{f.name}</span>
                <button onClick={() => removeFile(i)} aria-label={`Remove ${f.name}`} className="text-red-400 hover:text-red-600 ml-3">
                  <X size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JPG Quality: <span className="text-blue-600 font-bold">{Math.round(quality * 100)}%</span>
            </label>
            <input
              type="range" min={10} max={100} value={Math.round(quality * 100)}
              onChange={(e) => setQuality(Number(e.target.value) / 100)}
              className="w-full max-w-sm"
              aria-label="Output quality"
            />
          </div>

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
          { title: "Upload HEIC files", description: "Drop .heic or .heif files from your iPhone or Mac. Batch convert up to 30 at once." },
          { title: "Set quality", description: "Adjust JPG quality. Higher quality = larger file, lower = smaller file." },
          { title: "Download JPGs", description: "Click Convert and download your JPG files. Opens instantly in any app." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: Film, title: "iPhone HEIC support", description: "Converts the HEIC format used by iPhones to universally compatible JPG." },
          { icon: Layers, title: "Batch convert", description: "Convert up to 30 HEIC files at once and download as a ZIP." },
          { icon: Shield, title: "100% private", description: "All conversion happens in your browser. Your photos are never uploaded." },
        ]}
      />
    </ToolPageLayout>
  );
}
