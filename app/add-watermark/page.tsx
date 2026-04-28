"use client";

import { useState, useCallback } from "react";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Droplets, Type, Image as ImageIcon } from "lucide-react";
import { fileToImage, canvasToBlob, replaceExtension, resolveExtension } from "@/lib/imageUtils";

type Mode = "text" | "logo";
type Position = "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br";

const POSITION_GRID: { pos: Position; label: string }[][] = [
  [{ pos: "tl", label: "↖" }, { pos: "tc", label: "↑" }, { pos: "tr", label: "↗" }],
  [{ pos: "ml", label: "←" }, { pos: "mc", label: "·" }, { pos: "mr", label: "→" }],
  [{ pos: "bl", label: "↙" }, { pos: "bc", label: "↓" }, { pos: "br", label: "↘" }],
];

function getXY(pos: Position, cw: number, ch: number, pw: number, ph: number, margin: number): [number, number] {
  const positions: Record<Position, [number, number]> = {
    tl: [margin, margin],
    tc: [(cw - pw) / 2, margin],
    tr: [cw - pw - margin, margin],
    ml: [margin, (ch - ph) / 2],
    mc: [(cw - pw) / 2, (ch - ph) / 2],
    mr: [cw - pw - margin, (ch - ph) / 2],
    bl: [margin, ch - ph - margin],
    bc: [(cw - pw) / 2, ch - ph - margin],
    br: [cw - pw - margin, ch - ph - margin],
  };
  return positions[pos];
}

interface Result { blob: Blob; filename: string; originalSize: number; }

export default function AddWatermarkPage() {
  const [file, setFile] = useState<DroppedFile | null>(null);
  const [mode, setMode] = useState<Mode>("text");
  // Text mode state
  const [text, setText] = useState("© My Brand");
  const [fontSize, setFontSize] = useState(40);
  const [color, setColor] = useState("#ffffff");
  const [textOpacity, setTextOpacity] = useState(80);
  // Logo mode state
  const [logoFile, setLogoFile] = useState<DroppedFile | null>(null);
  const [logoSize, setLogoSize] = useState(20); // % of image width
  const [logoOpacity, setLogoOpacity] = useState(80);
  // Shared
  const [position, setPosition] = useState<Position>("br");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((dropped: DroppedFile[]) => {
    setFile(dropped[0] ?? null);
    setResult(null);
  }, []);

  const handleLogo = useCallback((dropped: DroppedFile[]) => {
    setLogoFile(dropped[0] ?? null);
    setResult(null);
  }, []);

  const process = async () => {
    if (!file) { setError("Please upload an image to watermark."); return; }
    if (mode === "logo" && !logoFile) { setError("Please upload a logo image."); return; }
    setError(null);
    setProcessing(true);
    try {
      const img = await fileToImage(file.file);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const margin = Math.round(Math.min(img.naturalWidth, img.naturalHeight) * 0.03);

      if (mode === "text") {
        const px = Math.round((fontSize / 100) * Math.min(img.naturalWidth, img.naturalHeight) * 0.5);
        ctx.font = `bold ${px}px sans-serif`;
        ctx.fillStyle = color;
        ctx.globalAlpha = textOpacity / 100;
        const metrics = ctx.measureText(text);
        const tw = metrics.width;
        const th = px;
        const [x, y] = getXY(position, img.naturalWidth, img.naturalHeight, tw, th, margin);
        ctx.fillText(text, x, y + th);
      } else if (mode === "logo" && logoFile) {
        const logoImg = await fileToImage(logoFile.file);
        const lw = Math.round((logoSize / 100) * img.naturalWidth);
        const lh = Math.round(lw * (logoImg.naturalHeight / logoImg.naturalWidth));
        ctx.globalAlpha = logoOpacity / 100;
        const [x, y] = getXY(position, img.naturalWidth, img.naturalHeight, lw, lh, margin);
        ctx.drawImage(logoImg, x, y, lw, lh);
      }

      ctx.globalAlpha = 1;
      const mime = file.file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await canvasToBlob(canvas, mime, 0.92);
      const ext = resolveExtension(mime);
      setResult({ blob, filename: replaceExtension(file.file.name, ext), originalSize: file.file.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Add Watermark to Image"
      description="Add a text or logo watermark to your images. Control position, opacity, size, and color. 100% browser-based."
      relatedTools={[
        { label: "Image Resizer", href: "/image-resizer", description: "Resize first" },
        { label: "Image Cropper", href: "/image-cropper", description: "Crop first" },
        { label: "Compress Image", href: "/compress-image", description: "Compress after" },
        { label: "PNG to JPG", href: "/png-to-jpg", description: "Convert format" },
      ]}
    >
      <FileDropzone onFilesChange={handleFile} multiple={false} label="Drop image to watermark" />

      {file && (
        <div className="mt-6 space-y-5">
          {/* Mode toggle */}
          <div className="flex gap-2">
            <button onClick={() => setMode("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${mode === "text" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}>
              <Type size={15} aria-hidden="true" /> Text watermark
            </button>
            <button onClick={() => setMode("logo")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${mode === "logo" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}>
              <ImageIcon size={15} aria-hidden="true" /> Logo watermark
            </button>
          </div>

          {/* Text mode controls */}
          {mode === "text" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Watermark text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="© Your Brand" />
              </div>
              <div className="flex flex-wrap gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font size: <span className="text-blue-600">{fontSize}px</span>
                  </label>
                  <input type="range" min={10} max={120} value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-36" aria-label="Font size" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opacity: <span className="text-blue-600">{textOpacity}%</span>
                  </label>
                  <input type="range" min={10} max={100} value={textOpacity}
                    onChange={(e) => setTextOpacity(Number(e.target.value))}
                    className="w-36" aria-label="Text opacity" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                    className="h-9 w-16 rounded border border-gray-300 cursor-pointer"
                    aria-label="Watermark text color" />
                </div>
              </div>
            </div>
          )}

          {/* Logo mode controls */}
          {mode === "logo" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <FileDropzone onFilesChange={handleLogo} multiple={false} label="Drop logo image (PNG with transparency works best)" />
              <div className="flex flex-wrap gap-5 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo size: <span className="text-blue-600">{logoSize}% of width</span>
                  </label>
                  <input type="range" min={5} max={60} value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                    className="w-36" aria-label="Logo size as percent of image width" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opacity: <span className="text-blue-600">{logoOpacity}%</span>
                  </label>
                  <input type="range" min={10} max={100} value={logoOpacity}
                    onChange={(e) => setLogoOpacity(Number(e.target.value))}
                    className="w-36" aria-label="Logo opacity" />
                </div>
              </div>
            </div>
          )}

          {/* Position grid */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Position</p>
            <div className="inline-grid grid-cols-3 gap-1" role="group" aria-label="Watermark position">
              {POSITION_GRID.map((row) =>
                row.map(({ pos, label }) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    aria-pressed={position === pos}
                    aria-label={pos}
                    className={`w-10 h-10 rounded text-lg font-bold transition-colors ${position === pos ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600"}`}
                  >
                    {label}
                  </button>
                ))
              )}
            </div>
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button onClick={process} disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            {processing ? "Adding watermark…" : "Add Watermark"}
          </button>

          {result && (
            <DownloadButton
              mode="single"
              blob={result.blob}
              filename={`watermarked-${result.filename}`}
              originalSize={result.originalSize}
              processedSize={result.blob.size}
            />
          )}
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload image", description: "Drop the image you want to watermark." },
          { title: "Configure watermark", description: "Choose text or logo mode. Set position, opacity, size, and color." },
          { title: "Download", description: "Click Add Watermark and download your branded image instantly." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: Type, title: "Text watermark", description: "Custom text with font size, color picker, and opacity control." },
          { icon: Droplets, title: "Logo watermark", description: "Upload a PNG logo and place it anywhere with adjustable size and opacity." },
          { icon: ImageIcon, title: "9-position grid", description: "Place your watermark in any of 9 positions with one click." },
        ]}
      />
    </ToolPageLayout>
  );
}
