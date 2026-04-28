import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import {
  Maximize2, Crop, FileDown, RotateCw,
  CreditCard, GraduationCap, Briefcase, Globe, FileText, Droplets,
  ArrowRightLeft, Film
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Image Tools — Resize, Compress, Convert in Browser",
  description:
    "15 free image tools that work entirely in your browser. Resize, compress, crop, rotate, convert images. No upload, no account, 100% private.",
};

const SECTIONS = [
  {
    heading: "Resize & Edit",
    tools: [
      { icon: Maximize2, title: "Image Resizer", description: "Resize to exact pixels, cm, or inch with presets", href: "/image-resizer" },
      { icon: Crop, title: "Image Cropper", description: "Crop freely or to fixed aspect ratios", href: "/image-cropper" },
      { icon: RotateCw, title: "Rotate Image", description: "Rotate, flip, and angle-correct images", href: "/rotate-image" },
      { icon: Droplets, title: "Add Watermark", description: "Add text or logo watermark to images", href: "/add-watermark" },
    ],
  },
  {
    heading: "Compress",
    tools: [
      { icon: FileDown, title: "Compress Image", description: "Reduce image file size with quality control", href: "/compress-image" },
      { icon: FileDown, title: "Compress to 50KB", description: "Auto-compress any image to under 50KB", href: "/compress-image-to-50kb" },
      { icon: FileDown, title: "Compress to 100KB", description: "Auto-compress any image to under 100KB", href: "/compress-image-to-100kb" },
    ],
  },
  {
    heading: "Convert",
    tools: [
      { icon: ArrowRightLeft, title: "PNG to JPG", description: "Convert PNG files to JPG with batch support", href: "/png-to-jpg" },
      { icon: ArrowRightLeft, title: "JPG to PNG", description: "Convert JPG to transparent-capable PNG", href: "/jpg-to-png" },
      { icon: Film, title: "HEIC to JPG", description: "Convert iPhone HEIC photos to JPG", href: "/heic-to-jpg" },
      { icon: FileText, title: "Image to PDF", description: "Combine multiple images into a single PDF", href: "/image-to-pdf" },
    ],
  },
  {
    heading: "Documents & Forms",
    tools: [
      { icon: CreditCard, title: "PAN Card Photo", description: "Resize photo to PAN card specifications", href: "/pan-card-photo-resizer" },
      { icon: GraduationCap, title: "UPSC Photo", description: "Resize photo to UPSC exam requirements", href: "/upsc-photo-resizer" },
      { icon: Briefcase, title: "SSC Photo", description: "Resize photo to SSC exam specifications", href: "/ssc-photo-resizer" },
      { icon: Globe, title: "Passport Photo", description: "Create passport photos for India, US, UK, Schengen", href: "/passport-photo-maker" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Free Online Image Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Resize, compress, crop, and convert images entirely in your browser.
          Your files never leave your device — complete privacy guaranteed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" aria-hidden="true" />
            No upload required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" aria-hidden="true" />
            100% free
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" aria-hidden="true" />
            No account needed
          </span>
        </div>
      </div>

      {/* Tool Sections */}
      {SECTIONS.map((section) => {
        const sectionId = `section-${section.heading.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <section key={section.heading} className="mb-12" aria-labelledby={sectionId}>
            <h2
              id={sectionId}
              className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100"
            >
              {section.heading}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.tools.map((tool) => (
                <ToolCard
                  key={tool.href}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  href={tool.href}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
