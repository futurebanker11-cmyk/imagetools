import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "PNG to JPG Converter Free — Convert PNG Online, No Upload",
  description: "Convert PNG images to JPG format online. White background fill for transparent PNGs. Batch convert 30 files. 100% browser-based, no upload, no account.",
  openGraph: {
    title: "PNG to JPG Converter Free",
    description: "Convert PNG to JPG online. Handles transparency. Batch convert. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "PNG to JPG Converter Free", description: "Convert PNG to JPG. Batch support. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PNG to JPG Converter",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Convert PNG images to JPG format. White background fill for transparency. Batch convert up to 30 files.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/png-to-jpg",
};

export default function PngToJpgLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
