import CompressToTargetTool from "@/components/CompressToTargetTool";

export const metadata = {
  title: "Compress Image to 50KB — Free Online Tool",
  description: "Automatically compress any image to under 50KB. No upload, no account. Works entirely in your browser.",
};

export default function CompressTo50KBPage() {
  return (
    <CompressToTargetTool
      targetKB={50}
      title="Compress Image to 50KB"
      description="Automatically reduce any image to under 50KB. Perfect for online forms, applications, and email attachments."
      relatedTools={[
        { label: "Compress to 100KB", href: "/compress-image-to-100kb", description: "Larger target size" },
        { label: "Compress Image", href: "/compress-image", description: "Manual quality control" },
        { label: "PAN Card Photo", href: "/pan-card-photo-resizer", description: "Resize for PAN card" },
        { label: "UPSC Photo", href: "/upsc-photo-resizer", description: "Resize for UPSC" },
      ]}
    />
  );
}
