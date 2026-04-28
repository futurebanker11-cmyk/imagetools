import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Compress Image Online Free — Reduce JPG PNG File Size",
  description: "Compress JPEG, PNG, WEBP images with a simple quality slider. See live before/after file size. Batch compress 30 images. 100% browser-based, no upload.",
  openGraph: {
    title: "Compress Image Online Free",
    description: "Reduce image file size with quality control. Live before/after size display. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Compress Image Online Free", description: "Reduce image file size. Quality slider. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Compressor",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Compress JPEG, PNG, WEBP images with quality slider. Live before/after size display. Batch support.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/compress-image",
};

export default function CompressImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
