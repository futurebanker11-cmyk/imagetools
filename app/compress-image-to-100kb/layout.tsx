import JsonLd from "@/components/JsonLd";

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Compress Image to 100KB",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Automatically compress any image to under 100KB using binary search quality adjustment. 100% browser-based.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/compress-image-to-100kb",
};

export default function CompressTo100kbLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
