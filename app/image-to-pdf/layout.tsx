import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Image to PDF Converter Free — JPG PNG to PDF Online",
  description: "Convert multiple images to a single PDF online. A4 or Letter, portrait or landscape, adjustable margins. Up to 30 images. No upload, 100% private.",
  openGraph: {
    title: "Image to PDF Converter Free",
    description: "Convert JPG, PNG images to PDF. Multi-page, A4/Letter, portrait/landscape. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Image to PDF Converter Free", description: "Convert images to PDF online. No upload required." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image to PDF Converter",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Combine multiple images into a single PDF. A4 or Letter size, portrait or landscape, adjustable margins. Up to 30 images.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/image-to-pdf",
};

export default function ImageToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
