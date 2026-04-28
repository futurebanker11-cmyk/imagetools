"use client";

import { useState, useRef, useCallback } from "react";
import type { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import FileDropzone, { type DroppedFile } from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import HowToUse from "@/components/HowToUse";
import KeyFeatures from "@/components/KeyFeatures";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Crop as CropIcon, Maximize2, Shield } from "lucide-react";
import { canvasToBlob, replaceExtension, resolveExtension } from "@/lib/imageUtils";

// Dynamically import the heavy crop component (only loaded on this page)
import dynamic from "next/dynamic";
const ReactCrop = dynamic(() => import("react-image-crop").then((m) => m.ReactCrop), { ssr: false });

const ASPECT_PRESETS: { label: string; value: number | undefined }[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
  { label: "3:4", value: 3 / 4 },
];

export default function ImageCropperPage() {
  const [file, setFile] = useState<DroppedFile | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFiles = useCallback((dropped: DroppedFile[]) => {
    setFile(dropped[0] ?? null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setResultBlob(null);
  }, []);

  const applyCrop = async () => {
    if (!completedCrop || !imgRef.current) { setError("Please make a selection first."); return; }
    setError(null);
    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(completedCrop.width * scaleX);
    canvas.height = Math.round(completedCrop.height * scaleY);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0, 0,
      canvas.width,
      canvas.height
    );
    const mime = file?.file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await canvasToBlob(canvas, mime, 0.95);
    setResultBlob(blob);
  };

  const filename = file
    ? replaceExtension(file.file.name, resolveExtension(file.file.type === "image/png" ? "image/png" : "image/jpeg"))
    : "cropped.jpg";

  return (
    <ToolPageLayout
      title="Image Cropper"
      description="Crop images to any size or aspect ratio. Drag to select the exact area you want to keep."
      relatedTools={[
        { label: "Image Resizer", href: "/image-resizer", description: "Resize dimensions" },
        { label: "Rotate Image", href: "/rotate-image", description: "Rotate & flip" },
        { label: "Compress Image", href: "/compress-image", description: "Reduce file size" },
        { label: "Add Watermark", href: "/add-watermark", description: "Brand your images" },
      ]}
    >
      <FileDropzone onFilesChange={handleFiles} multiple={false} />

      {file && (
        <div className="mt-6 space-y-4">
          {/* Aspect ratio presets */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Aspect ratio</p>
            <div className="flex flex-wrap gap-2">
              {ASPECT_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => { setAspect(p.value); setCrop(undefined); }}
                  className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-colors ${aspect === p.value ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-400"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crop UI */}
          <div className="max-w-2xl">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="rounded-xl overflow-hidden border border-gray-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={file.preview}
                alt="Image to crop"
                style={{ maxWidth: "100%", maxHeight: "60vh" }}
              />
            </ReactCrop>
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            onClick={applyCrop}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Apply Crop
          </button>

          {resultBlob && (
            <DownloadButton
              mode="single"
              blob={resultBlob}
              filename={`cropped-${filename}`}
              originalSize={file.file.size}
              processedSize={resultBlob.size}
            />
          )}
        </div>
      )}

      <HowToUse
        steps={[
          { title: "Upload image", description: "Drop your image or click to browse. Supports JPG, PNG, WEBP, and more." },
          { title: "Select crop area", description: "Drag to select the area you want to keep. Choose an aspect ratio preset if needed." },
          { title: "Download", description: "Click Apply Crop and download your cropped image instantly." },
        ]}
      />
      <KeyFeatures
        features={[
          { icon: CropIcon, title: "Free-form & preset crop", description: "Crop freely or snap to 1:1, 4:3, 16:9, 9:16, and 3:4 ratios." },
          { icon: Maximize2, title: "Full resolution output", description: "Crops are applied at the original image resolution — no quality loss." },
          { icon: Shield, title: "100% private", description: "Your image never leaves your browser. All cropping happens locally." },
        ]}
      />
    </ToolPageLayout>
  );
}
