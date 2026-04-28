"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { FileText, Layers, Shield } from "lucide-react";

type PageSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";

const PAGE_DIMS: Record<PageSize, { w: number; h: number }> = {
  a4: { w: 210, h: 297 },       // mm
  letter: { w: 215.9, h: 279.4 }, // mm
};

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState(10);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((dropped: DroppedFile[]) => {
    setFiles(dropped);
  }, []);

  const generate = async () => {
    if (files.length === 0) { setError("Please upload at least one image."); return; }
    setError(null);
    setProcessing(true);
    try {
      // Dynamic import — only loaded on this page
      const { jsPDF } = await import("jspdf");
      const dims = PAGE_DIMS[pageSize];
      const pgW = orientation === "portrait" ? dims.w : dims.h;
      const pgH = orientation === "portrait" ? dims.h : dims.w;
      const doc = new jsPDF({ orientation, unit: "mm", format: pageSize });

      for (let i = 0; i < files.length; i++) {
        if (i > 0) doc.addPage();
        const { file } = files[i];
        const dataUrl = await fileToDataUrl(file);
        const imgW = pgW - margin * 2;
        const imgH = pgH - margin * 2;
        // Fit image within page while preserving aspect ratio
        const imgEl = await loadImageEl(dataUrl);
        const srcAspect = imgEl.naturalWidth / imgEl.naturalHeight;
        let drawW = imgW, drawH = imgW / srcAspect;
        if (drawH > imgH) { drawH = imgH; drawW = imgH * srcAspect; }
        const x = margin + (imgW - drawW) / 2;
        const y = margin + (imgH - drawH) / 2;
        const ext = file.type === "image/png" ? "PNG" : "JPEG";
        doc.addImage(dataUrl, ext, x, y, drawW, drawH);
      }

      doc.save("images.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF generation failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Image to PDF"
      description="Combine multiple images into a single PDF. Choose page size, orientation, and margins. All processing in your browser."
      relatedTools={[
        { label: "Image Resizer", href: "/image-resizer", description: "Resize before converting" },
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Rotate Image", href: "/rotate-image", description: "Fix orientation" },
        { label: "PNG to JPG", href: "/png-to-jpg", description: "Convert format" },
      ]}
    >
      <FileDropzone onFilesChange={handleFiles} multiple label="Drop images here — each becomes one PDF page" />

      {files.length > 0 && (
        <div className="mt-6 space-y-5">
          <p className="text-sm text-gray-600">{files.length} image{files.length > 1 ? "s" : ""} will become {files.length} PDF page{files.length > 1 ? "s" : ""}.</p>

          {/* Page size */}
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page size</label>
              <div className="flex gap-2">
                {(["a4", "letter"] as PageSize[]).map((s) => (
                  <button key={s} onClick={() => setPageSize(s)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${pageSize === s ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
              <div className="flex gap-2">
                {(["portrait", "landscape"] as Orientation[]).map((o) => (
                  <button key={o} onClick={() => setOrientation(o)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize ${orientation === o ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Margin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Margin: <span className="text-blue-600 font-bold">{margin}mm</span>
            </label>
            <input type="range" min={0} max={30} value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full max-w-sm"
              aria-label="Page margin in mm" />
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={generate}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {processing ? "Generating PDF…" : `Generate PDF (${files.length} page${files.length > 1 ? "s" : ""})`}
          </button>
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload images", description: "Drop your images in the order you want them to appear in the PDF. Up to 30 images." },
          { title: "Configure layout", description: "Choose page size (A4 or Letter), orientation, and margin." },
          { title: "Download PDF", description: "Click Generate PDF and your file downloads directly — no server involved." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: FileText, title: "Multi-image PDF", description: "Each image becomes one page. Up to 30 images per PDF." },
          { icon: Layers, title: "Layout control", description: "A4 or Letter size, portrait or landscape, adjustable margin." },
          { icon: Shield, title: "100% private", description: "PDF is generated in your browser. Images and the PDF are never uploaded." },
        ]}
      />
    </ToolPageLayout>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImageEl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
