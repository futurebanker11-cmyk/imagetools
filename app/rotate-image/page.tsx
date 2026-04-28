"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { RotateCw, FlipHorizontal, Layers } from "lucide-react";
import { fileToImage, rotateCanvas, canvasToBlob, resolveExtension, replaceExtension } from "@/lib/imageUtils";
import JSZip from "jszip";

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function RotateImagePage() {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
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
        const canvas = rotateCanvas(img, angle, flipH, flipV);
        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        const blob = await canvasToBlob(canvas, mime, 0.92);
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
    a.href = url; a.download = "rotated-images.zip"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPageLayout
      title="Rotate Image"
      description="Rotate images by 90°, 180°, 270°, or any custom angle. Flip horizontally or vertically. Batch support included."
      relatedTools={[
        { label: "Image Cropper", href: "/image-cropper", description: "Crop to any ratio" },
        { label: "Image Resizer", href: "/image-resizer", description: "Change dimensions" },
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Add Watermark", href: "/add-watermark", description: "Brand your images" },
      ]}
    >
      <FileDropzone onFilesChange={handleFiles} multiple />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          {/* Quick rotate buttons */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Quick rotate</p>
            <div className="flex flex-wrap gap-2">
              {[90, 180, 270].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setAngle(deg)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${angle === deg ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}
                >
                  {deg}°
                </button>
              ))}
              <button
                onClick={() => setAngle(0)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${angle === 0 ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}
              >
                0° (no rotation)
              </button>
            </div>
          </div>

          {/* Custom angle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom angle: <span className="text-blue-600 font-bold">{angle}°</span>
            </label>
            <input
              type="range"
              min={0}
              max={359}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full max-w-sm"
              aria-label="Rotation angle"
            />
          </div>

          {/* Flip buttons */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Flip</p>
            <div className="flex gap-3">
              <button
                onClick={() => setFlipH((v) => !v)}
                aria-pressed={flipH}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${flipH ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}
              >
                <FlipHorizontal size={16} aria-hidden="true" />
                Flip Horizontal
              </button>
              <button
                onClick={() => setFlipV((v) => !v)}
                aria-pressed={flipV}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${flipV ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}
              >
                <FlipHorizontal size={16} className="rotate-90" aria-hidden="true" />
                Flip Vertical
              </button>
            </div>
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Processing…" : `Apply to ${files.length > 1 ? `${files.length} Images` : "Image"}`}
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
          { title: "Upload images", description: "Drop your images or click to browse. Batch process up to 30 at once." },
          { title: "Set rotation", description: "Choose 90°/180°/270° or use the custom angle slider. Add flips if needed." },
          { title: "Download", description: "Click Apply and download your rotated images instantly." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: RotateCw, title: "Any angle", description: "Rotate from 0° to 359° using the custom slider for precise corrections." },
          { icon: FlipHorizontal, title: "Flip options", description: "Flip horizontally, vertically, or combine both with rotation." },
          { icon: Layers, title: "Batch rotate", description: "Apply the same rotation and flip settings to up to 30 images at once." },
        ]}
      />
    </ToolPageLayout>
  );
}
