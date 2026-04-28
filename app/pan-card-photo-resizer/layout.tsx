import JsonLd from "@/components/JsonLd";

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PAN Card Photo Resizer",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Resize and compress photos to PAN card application specifications. Auto-resize to correct dimensions and file size. 100% browser-based.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/pan-card-photo-resizer",
};

export default function PanCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
