import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://imagetools.pages.dev";

const ROUTES = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { url: "/image-resizer", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/image-cropper", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/compress-image", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/compress-image-to-50kb", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/compress-image-to-100kb", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/rotate-image", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/png-to-jpg", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/jpg-to-png", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/heic-to-jpg", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/pan-card-photo-resizer", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/upsc-photo-resizer", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/ssc-photo-resizer", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/passport-photo-maker", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/image-to-pdf", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/add-watermark", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/about", priority: 0.5, changeFrequency: "yearly" as const },
  { url: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
