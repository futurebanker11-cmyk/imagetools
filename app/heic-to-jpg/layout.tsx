import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter Free — Convert iPhone Photos Online",
  description: "Convert iPhone HEIC photos to JPG format free. No upload, no account. Batch convert up to 30 HEIC files. Works entirely in your browser.",
  openGraph: {
    title: "HEIC to JPG Converter Free",
    description: "Convert iPhone HEIC photos to JPG. Batch support. 100% browser-based, no upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "HEIC to JPG Converter Free", description: "Convert iPhone HEIC photos to JPG. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HEIC to JPG Converter",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Convert iPhone HEIC photos to universally compatible JPG format. Batch convert up to 30 files. 100% browser-based.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/heic-to-jpg",
};

export default function HeicToJpgLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
