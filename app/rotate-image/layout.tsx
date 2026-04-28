import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Rotate Image Online Free — Rotate & Flip Images Any Angle",
  description: "Rotate images 90°, 180°, 270°, or any custom angle. Flip horizontally or vertically. Batch rotate up to 30 images. Free, no upload.",
  openGraph: {
    title: "Rotate Image Online Free",
    description: "Rotate images to any angle and flip horizontally or vertically. Batch support. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Rotate Image Online Free", description: "Rotate and flip images. Any angle. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Rotator",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Rotate images 90°, 180°, 270°, or any angle. Flip horizontally or vertically. Batch processing.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/rotate-image",
};

export default function RotateImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
