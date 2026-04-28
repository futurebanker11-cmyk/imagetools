"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import type { RelatedTool } from "@/components/ToolPageLayout";
import { FileDown, Target, Shield } from "lucide-react";
import { fileToImage, drawOnCanvas, compressToTarget, replaceExtension, formatBytes } from "@/lib/imageUtils";
import JSZip from "jszip";

interface Props {
  targetKB: number;
  title: string;
  description: string;
  relatedTools: RelatedTool[];
}

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
  achievedSize: number;
  reachedTarget: boolean;
}

export default function CompressToTargetTool({ targetKB, title, description, relatedTools }: Props) {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
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
      const targetBytes = targetKB * 1024;
      for (const { file } of files) {
        const img = await fileToImage(file);
        const canvas = drawOnCanvas(img, img.naturalWidth, img.naturalHeight);
        const { blob } = await compressToTarget(canvas, format, targetBytes);
        const ext = format === "image/jpeg" ? "jpg" : "png";
        out.push({
          blob,
          filename: replaceExtension(file.name, ext),
          originalSize: file.size,
          achievedSize: blob.size,
          reachedTarget: blob.size <= targetBytes,
        });
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
    a.href = url; a.download = `compressed-${targetKB}kb.zip`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPageLayout title={title} description={description} relatedTools={relatedTools}>
      <FileDropzone onFilesChange={handleFiles} multiple />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output format</label>
            <div className="flex gap-2">
              {(["image/jpeg", "image/png"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setFormat(m)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${format === m ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}
                >
                  {m === "image/jpeg" ? "JPG" : "PNG"}
                </button>
              ))}
            </div>
          </div>

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${r.reachedTarget ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
                  <span className={`font-semibold ${r.reachedTarget ? "text-green-700" : "text-amber-700"}`}>
                    {r.reachedTarget ? `✓ ${formatBytes(r.achievedSize)}` : `⚠ ${formatBytes(r.achievedSize)} (could not reach ${targetKB}KB)`}
                  </span>
                  <span className="text-gray-500">from {formatBytes(r.originalSize)}</span>
                </div>
              ))}
            </div>
          )}

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? `Compressing to ${targetKB}KB…` : `Compress to ${targetKB}KB`}
          </button>

          {results.length === 1 && (
            <DownloadButton
              mode="single"
              blob={results[0].blob}
              filename={results[0].filename}
              originalSize={results[0].originalSize}
              processedSize={results[0].achievedSize}
            />
          )}
          {results.length > 1 && (
            <DownloadButton mode="zip" onDownload={downloadZip} count={results.length} />
          )}
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload images", description: "Drop your images or click to browse. Batch process up to 30 at once." },
          { title: "Choose format", description: "Select JPG (smaller) or PNG. JPG usually achieves the target more reliably." },
          { title: "Download", description: `Click Compress and get your images at or under ${targetKB}KB.` },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: Target, title: `${targetKB}KB target`, description: `Automatically finds the right quality to get your image under ${targetKB}KB.` },
          { icon: FileDown, title: "Binary search", description: "Iterates quality settings intelligently to hit the target without guessing." },
          { icon: Shield, title: "100% private", description: "All compression runs in your browser. Files never leave your device." },
        ]}
      />
    </ToolPageLayout>
  );
}
