import Link from "next/link";
import { ImageIcon } from "lucide-react";

const TOOLS = [
  { label: "Image Resizer", href: "/image-resizer" },
  { label: "Image Cropper", href: "/image-cropper" },
  { label: "Compress Image", href: "/compress-image" },
  { label: "Compress to 50KB", href: "/compress-image-to-50kb" },
  { label: "Compress to 100KB", href: "/compress-image-to-100kb" },
  { label: "Rotate Image", href: "/rotate-image" },
  { label: "PNG to JPG", href: "/png-to-jpg" },
  { label: "JPG to PNG", href: "/jpg-to-png" },
  { label: "HEIC to JPG", href: "/heic-to-jpg" },
  { label: "PAN Card Photo", href: "/pan-card-photo-resizer" },
  { label: "UPSC Photo", href: "/upsc-photo-resizer" },
  { label: "SSC Photo", href: "/ssc-photo-resizer" },
  { label: "Passport Photo", href: "/passport-photo-maker" },
  { label: "Image to PDF", href: "/image-to-pdf" },
  { label: "Add Watermark", href: "/add-watermark" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <ImageIcon size={20} aria-hidden="true" />
              <span>ImageTools</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Free browser-based image tools. Your files never leave your device.
            </p>
            <nav aria-label="Company links">
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <nav aria-label="Legal links">
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </nav>
          </div>

          {/* Tools */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <nav aria-label="Tool links">
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-1 text-sm">
                {TOOLS.slice(0, 8).map((tool) => (
                  <li key={tool.href}>
                    <Link href={tool.href} className="hover:text-white transition-colors">
                      {tool.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">More Tools</h3>
            <nav aria-label="More tool links">
              <ul className="space-y-1 text-sm">
                {TOOLS.slice(8).map((tool) => (
                  <li key={tool.href}>
                    <Link href={tool.href} className="hover:text-white transition-colors">
                      {tool.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ImageTools. All image processing happens in your browser — we never see your files.</p>
        </div>
      </div>
    </footer>
  );
}
