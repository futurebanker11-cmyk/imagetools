import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "JPG to PNG Converter Free — Convert JPEG Online, No Upload",
  description: "Convert JPG to PNG format online with lossless quality. Optional white background removal for transparent output. Batch convert. No upload required.",
  openGraph: {
    title: "JPG to PNG Converter Free",
    description: "Convert JPG to PNG online. Lossless output. Optional transparency. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "JPG to PNG Converter Free", description: "Convert JPG to PNG. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JPG to PNG Converter",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Convert JPG images to lossless PNG format. Optional white background removal for transparent output.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/jpg-to-png",
};

export default function JpgToPngLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
