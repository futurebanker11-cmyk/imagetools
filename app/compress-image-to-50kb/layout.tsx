import JsonLd from "@/components/JsonLd";

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Compress Image to 50KB",
  operatingSystem: "Web Browser",
  applicationCategory: "UtilitiesApplication",
  description: "Automatically compress any image to under 50KB using binary search quality adjustment. 100% browser-based.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://imagetools.pages.dev/compress-image-to-50kb",
};

export default function CompressTo50kbLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
