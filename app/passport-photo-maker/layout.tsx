import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Passport Photo Maker Free — India, US, UK, Schengen Size",
  description: "Make passport photos online free. Correct size for India, US, UK, and Schengen countries. Auto-resize and compress. No upload, 100% private.",
  openGraph: {
    title: "Passport Photo Maker Free Online",
    description: "Create passport photos for India, US, UK, Schengen. Auto-resize to correct dimensions. No upload.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Passport Photo Maker Free", description: "Passport photos for India, US, UK, Schengen. No upload." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Passport Photo Maker",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Create passport-size photos for India, US, UK, and Schengen countries. Automatically resizes and compresses to official specifications.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/passport-photo-maker",
};

export default function PassportPhotoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
