import GovtPhotoTool from "@/components/GovtPhotoTool";

export const metadata = {
  title: "SSC Photo Resizer — Free Online Tool",
  description: "Resize your photo to SSC exam specifications instantly in your browser. No upload required.",
};

// VERIFY SPECS — placeholder values, confirm before launch
const SSC_SPEC = {
  widthPx: 100,    // VERIFY SPECS
  heightPx: 120,   // VERIFY SPECS
  maxKB: 50,       // VERIFY SPECS
  minKB: 20,       // VERIFY SPECS
  dimensionLabel: "100×120 px",
  fileSizeLabel: "20–50 KB",
  formatLabel: "JPG",
  specNote: "VERIFY SPECS — Confirm exact dimensions and file size on the official SSC portal before use.",
};

export default function SscPhotoResizerPage() {
  return (
    <GovtPhotoTool
      title="SSC Photo Resizer"
      description="Resize and compress your photo to meet SSC exam photo requirements. Correct dimensions and file size in one click."
      spec={SSC_SPEC}
      relatedTools={[
        { label: "PAN Card Photo", href: "/pan-card-photo-resizer", description: "For PAN card" },
        { label: "UPSC Photo Resizer", href: "/upsc-photo-resizer", description: "For UPSC exam" },
        { label: "Compress to 50KB", href: "/compress-image-to-50kb", description: "Auto-compress to 50KB" },
        { label: "Passport Photo", href: "/passport-photo-maker", description: "For passport" },
      ]}
    />
  );
}
