import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Image Cropper Online — Crop to Any Aspect Ratio",
  description: "Crop images to any size or aspect ratio. Presets: 1:1, 4:3, 16:9, 9:16, 3:4. Full-resolution output. Works entirely in your browser — no upload needed.",
  openGraph: {
    title: "Free Image Cropper Online",
    description: "Crop images freely or to preset aspect ratios. Full resolution output. 100% browser-based.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Free Image Cropper Online", description: "Crop images to any aspect ratio. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Cropper",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Crop images freely or to preset aspect ratios (1:1, 4:3, 16:9, 9:16, 3:4). Full-resolution output.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/image-cropper",
};

export default function ImageCropperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
