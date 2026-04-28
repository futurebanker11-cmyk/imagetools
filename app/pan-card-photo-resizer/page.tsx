import GovtPhotoTool from "@/components/GovtPhotoTool";

export const metadata = {
  title: "PAN Card Photo Resizer — Free Online Tool",
  description: "Resize and compress your photo to PAN card specifications instantly in your browser. No upload required.",
};

// VERIFY SPECS — placeholder values, confirm before launch
const PAN_SPEC = {
  widthPx: 200,    // VERIFY SPECS
  heightPx: 230,   // VERIFY SPECS
  maxKB: 50,       // VERIFY SPECS
  minKB: 20,       // VERIFY SPECS
  dimensionLabel: "200×230 px",
  fileSizeLabel: "20–50 KB",
  formatLabel: "JPG",
  specNote: "VERIFY SPECS — Confirm exact dimensions and file size with the official PAN application portal before use.",
};

export default function PanCardPhotoResizerPage() {
  return (
    <GovtPhotoTool
      title="PAN Card Photo Resizer"
      description="Resize and compress your photo to meet PAN card application requirements. Correct dimensions and file size automatically."
      spec={PAN_SPEC}
      relatedTools={[
        { label: "UPSC Photo Resizer", href: "/upsc-photo-resizer", description: "For UPSC exam" },
        { label: "SSC Photo Resizer", href: "/ssc-photo-resizer", description: "For SSC exam" },
        { label: "Passport Photo", href: "/passport-photo-maker", description: "For passport" },
        { label: "Compress to 50KB", href: "/compress-image-to-50kb", description: "Auto-compress to 50KB" },
      ]}
    />
  );
}
