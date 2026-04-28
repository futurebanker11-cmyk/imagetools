import CompressToTargetTool from "@/components/CompressToTargetTool";

export const metadata = {
  title: "Compress Image to 100KB — Free Online Tool",
  description: "Automatically compress any image to under 100KB. No upload, no account. Works entirely in your browser.",
};

export default function CompressTo100KBPage() {
  return (
    <CompressToTargetTool
      targetKB={100}
      title="Compress Image to 100KB"
      description="Automatically reduce any image to under 100KB. Ideal for government portals, job applications, and upload forms."
      relatedTools={[
        { label: "Compress to 50KB", href: "/compress-image-to-50kb", description: "Stricter size limit" },
        { label: "Compress Image", href: "/compress-image", description: "Manual quality control" },
        { label: "SSC Photo", href: "/ssc-photo-resizer", description: "Resize for SSC exam" },
        { label: "Passport Photo", href: "/passport-photo-maker", description: "Create passport photo" },
      ]}
    />
  );
}
