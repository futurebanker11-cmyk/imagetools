import GovtPhotoTool from "@/components/GovtPhotoTool";

export const metadata = {
  title: "UPSC Photo Resizer — Free Online Tool",
  description: "Resize your photo to UPSC Civil Services exam specifications. Works in your browser, no upload needed.",
};

// VERIFY SPECS — placeholder values, confirm before launch
const UPSC_SPEC = {
  widthPx: 350,    // VERIFY SPECS
  heightPx: 350,   // VERIFY SPECS
  maxKB: 300,      // VERIFY SPECS
  minKB: 20,       // VERIFY SPECS
  dimensionLabel: "350×350 px",
  fileSizeLabel: "20–300 KB",
  formatLabel: "JPG",
  specNote: "VERIFY SPECS — Confirm exact dimensions and file size on the official UPSC application portal before use.",
};

export default function UpscPhotoResizerPage() {
  return (
    <GovtPhotoTool
      title="UPSC Photo Resizer"
      description="Resize and compress your photo to meet UPSC Civil Services exam photo requirements. Exact dimensions and file size in one click."
      spec={UPSC_SPEC}
      relatedTools={[
        { label: "PAN Card Photo", href: "/pan-card-photo-resizer", description: "For PAN card" },
        { label: "SSC Photo Resizer", href: "/ssc-photo-resizer", description: "For SSC exam" },
        { label: "Passport Photo", href: "/passport-photo-maker", description: "For passport" },
        { label: "Compress to 100KB", href: "/compress-image-to-100kb", description: "Auto-compress to 100KB" },
      ]}
    />
  );
}
