"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import SpecBanner from "@/components/SpecBanner";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Globe, CreditCard, Shield } from "lucide-react";
import { fileToImage, drawOnCanvas, compressToTarget, formatBytes } from "@/lib/imageUtils";

// VERIFY SPECS — placeholder values. Confirm before launch.
const PASSPORT_SPECS = {
  india: {
    label: "India",
    // VERIFY SPECS
    widthPx: 276,
    heightPx: 354,
    maxKB: 200,
    dimensionLabel: "35×45 mm (276×354 px at 200 dpi)",
    fileSizeLabel: "≤ 200 KB",
    formatLabel: "JPG",
    note: "VERIFY SPECS — Confirm with official Indian passport application guidelines.",
  },
  us: {
    label: "United States",
    // VERIFY SPECS
    widthPx: 600,
    heightPx: 600,
    maxKB: 240,
    dimensionLabel: "2×2 inch (600×600 px at 300 dpi)",
    fileSizeLabel: "≤ 240 KB",
    formatLabel: "JPG",
    note: "VERIFY SPECS — Confirm with travel.state.gov before submitting.",
  },
  uk: {
    label: "United Kingdom",
    // VERIFY SPECS
    widthPx: 413,
    heightPx: 531,
    maxKB: 200,
    dimensionLabel: "35×45 mm (413×531 px at 300 dpi)",
    fileSizeLabel: "≤ 200 KB",
    formatLabel: "JPG",
    note: "VERIFY SPECS — Confirm with the UK government passport guidelines.",
  },
  schengen: {
    label: "Schengen / EU",
    // VERIFY SPECS
    widthPx: 413,
    heightPx: 531,
    maxKB: 200,
    dimensionLabel: "35×45 mm (413×531 px at 300 dpi)",
    fileSizeLabel: "≤ 200 KB",
    formatLabel: "JPG",
    note: "VERIFY SPECS — Requirements vary by country. Confirm with the specific embassy.",
  },
} as const;

type Country = keyof typeof PASSPORT_SPECS;

interface Result {
  blob: Blob;
  filename: string;
  originalSize: number;
}

export default function PassportPhotoMakerPage() {
  const [country, setCountry] = useState<Country>("india");
  const [file, setFile] = useState<DroppedFile | null>(null);
  const [whiteBackground, setWhiteBackground] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const spec = PASSPORT_SPECS[country];

  const handleFiles = useCallback((dropped: DroppedFile[]) => {
    setFile(dropped[0] ?? null);
    setResult(null);
  }, []);

  const process = async () => {
    if (!file) { setError("Please upload a photo."); return; }
    setError(null);
    setProcessing(true);
    try {
      const img = await fileToImage(file.file);
      const canvas = drawOnCanvas(img, spec.widthPx, spec.heightPx, whiteBackground, "#ffffff");
      const { blob } = await compressToTarget(canvas, "image/jpeg", spec.maxKB * 1024);
      const base = file.file.name.replace(/\.[^.]+$/, "");
      setResult({ blob, filename: `${base}-passport-${country}.jpg`, originalSize: file.file.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Passport Photo Maker"
      description="Create passport-size photos for India, US, UK, and Schengen countries. Correct dimensions and file size automatically."
      relatedTools={[
        { label: "PAN Card Photo", href: "/pan-card-photo-resizer", description: "For PAN card" },
        { label: "UPSC Photo", href: "/upsc-photo-resizer", description: "For UPSC exam" },
        { label: "Compress to 200KB", href: "/compress-image-to-100kb", description: "Compress images" },
        { label: "Image Resizer", href: "/image-resizer", description: "Custom dimensions" },
      ]}
    >
      {/* Country selector */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select country</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PASSPORT_SPECS) as Country[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCountry(c); setResult(null); }}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${country === c ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}
            >
              {PASSPORT_SPECS[c].label}
            </button>
          ))}
        </div>
      </div>

      <SpecBanner
        dimensions={spec.dimensionLabel}
        fileSize={spec.fileSizeLabel}
        format={spec.formatLabel}
        note={spec.note}
      />

      <FileDropzone onFilesChange={handleFiles} multiple={false} />

      {file && (
        <div className="mt-6 space-y-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={whiteBackground}
              onChange={(e) => setWhiteBackground(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <div>
              <span className="text-sm font-medium text-gray-800">White background</span>
              <p className="text-xs text-gray-500">Required for most passport photo standards</p>
            </div>
          </label>

          {result && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
              <span className="font-semibold text-green-700">
                ✓ {spec.widthPx}×{spec.heightPx}px · {formatBytes(result.blob.size)}
              </span>
              <span className="text-gray-500 ml-2">from {formatBytes(result.originalSize)}</span>
            </div>
          )}

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={process}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Creating photo…" : "Create Passport Photo"}
          </button>

          {result && (
            <DownloadButton
              mode="single"
              blob={result.blob}
              filename={result.filename}
              originalSize={result.originalSize}
              processedSize={result.blob.size}
            />
          )}
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Choose country", description: "Select your country to automatically load the correct photo specifications." },
          { title: "Upload photo", description: "Upload a clear, front-facing photo. White background is applied automatically." },
          { title: "Download", description: "Click Create Passport Photo and download the correctly sized JPG." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: Globe, title: "4 countries", description: "Supports India, US, UK, and Schengen photo specifications with extension points for more." },
          { icon: CreditCard, title: "Auto-resize & compress", description: "Hits both the required pixel dimensions and file size in one step." },
          { icon: Shield, title: "100% private", description: "Your photo never leaves your browser. All processing is local." },
        ]}
      />
    </ToolPageLayout>
  );
}
