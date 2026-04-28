"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import SpecBanner from "@/components/SpecBanner";
import type { RelatedTool } from "@/components/ToolPageLayout";
import { CreditCard, Target, Shield } from "lucide-react";
import { fileToImage, drawOnCanvas, compressToTarget, formatBytes } from "@/lib/imageUtils";

interface Spec {
  widthPx: number;   // VERIFY SPECS
  heightPx: number;  // VERIFY SPECS
  maxKB: number;     // VERIFY SPECS
  minKB?: number;    // VERIFY SPECS
  dimensionLabel: string;
  fileSizeLabel: string;
  formatLabel: string;
  specNote?: string;
}

interface Props {
  title: string;
  description: string;
  spec: Spec;
  relatedTools: RelatedTool[];
}

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function GovtPhotoTool({ title, description, spec, relatedTools }: Props) {
  const [files, setFiles] = useState<DroppedFile[]>([]);
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
        // Step 1: resize to exact dimensions
        const canvas = drawOnCanvas(img, spec.widthPx, spec.heightPx, true, "#ffffff");
        // Step 2: compress to hit KB target
        const { blob } = await compressToTarget(canvas, "image/jpeg", spec.maxKB * 1024);
        const base = file.name.replace(/\.[^.]+$/, "");
        out.push({ blob, filename: `${base}-${spec.widthPx}x${spec.heightPx}.jpg`, originalSize: file.size });
      }
      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout title={title} description={description} relatedTools={relatedTools}>
      <SpecBanner
        dimensions={spec.dimensionLabel}
        fileSize={spec.fileSizeLabel}
        format={spec.formatLabel}
        note={spec.specNote ?? "Always verify official specs before submission. Requirements can change."}
      />

      <FileDropzone onFilesChange={handleFiles} multiple />

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                  <span className="font-semibold text-green-700">
                    ✓ {spec.widthPx}×{spec.heightPx}px · {formatBytes(r.blob.size)}
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
            {processing ? "Processing…" : `Resize & Compress`}
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
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload your photo", description: "Drop your photo. Use a clear, front-facing photo against a light background." },
          { title: "Auto-process", description: `Click Resize & Compress. The tool automatically hits ${spec.dimensionLabel} and ${spec.fileSizeLabel}.` },
          { title: "Verify & download", description: "Check the output size shown. Download and verify before submitting." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: CreditCard, title: "Exact dimensions", description: `Automatically resizes to the required ${spec.dimensionLabel} with white background fill.` },
          { icon: Target, title: "File size target", description: `Compresses to stay within ${spec.fileSizeLabel} using smart binary search.` },
          { icon: Shield, title: "100% private", description: "Your photo never leaves your browser. No upload, no storage." },
        ]}
      />
    </ToolPageLayout>
  );
}
