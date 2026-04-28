import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Add Watermark to Image Free — Text or Logo Watermark Online",
  description: "Add text or logo watermark to images free. Control position, opacity, font size, and color. 9-position grid. 100% browser-based, no upload.",
  openGraph: {
    title: "Add Watermark to Image Free",
    description: "Text or logo watermarks with position, opacity, and color control. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Add Watermark to Image Free", description: "Add text or logo watermark. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Watermark Tool",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Add text or logo watermarks to images. Control position (9-grid), opacity, font size, and color. Browser-based, no upload.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/add-watermark",
};

export default function AddWatermarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
