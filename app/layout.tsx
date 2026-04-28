import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://imagetools.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Free Online Image Tools — Browser-Based, No Upload",
    template: "%s | ImageTools",
  },
  description:
    "15 free image tools that work entirely in your browser. Resize, compress, crop, rotate, convert images. Your files never leave your device.",
  keywords: [
    "image resizer", "compress image", "image cropper", "png to jpg",
    "jpg to png", "heic to jpg", "rotate image", "image to pdf",
    "watermark image", "passport photo", "pan card photo", "upsc photo",
  ],
  authors: [{ name: "ImageTools" }],
  creator: "ImageTools",
  publisher: "ImageTools",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "ImageTools",
    title: "Free Online Image Tools — Browser-Based, No Upload",
    description: "15 free image tools. Resize, compress, crop, convert. Your files never leave your browser.",
    url: BASE_URL,
    // TODO: Replace with actual OG image (1200x630px) before launch
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ImageTools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Tools — Browser-Based, No Upload",
    description: "15 free image tools. Resize, compress, crop, convert. No upload required.",
    // TODO: Replace with actual Twitter card image before launch
    // images: ["/og-image.png"],
  },
  // TODO: Before launch, add these icon files to /app directory:
  //   app/icon.png       (32×32 PNG)
  //   app/apple-icon.png (180×180 PNG)
  // Next.js App Router auto-serves them as /icon.png and /apple-icon.png
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          ADSENSE_SCRIPT_PLACEHOLDER
          Paste your Google AdSense <script> tag here before launch.
          Example:
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496395300151813" crossOrigin="anonymous"></script>
        */}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
