import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Image Resizer Online — Resize to Any Pixel, CM or Inch",
  description: "Resize images to any size in pixels, centimeters, or inches. Lock aspect ratio, use presets for Instagram, YouTube, Facebook. Batch resize 30 images. No upload.",
  openGraph: {
    title: "Free Image Resizer Online",
    description: "Resize images to exact dimensions. Presets for social media. Batch support. 100% browser-based.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Free Image Resizer Online", description: "Resize images to any size. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Resizer",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Resize images to any dimensions in pixels, cm, or inch. Lock aspect ratio, social media presets, batch processing.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/image-resizer",
};

export default function ImageResizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
