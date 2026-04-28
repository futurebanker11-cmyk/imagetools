import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "About ImageTools — Free Browser-Based Image Tools",
  description: "Learn about ImageTools: 15 free image tools that process your files entirely in your browser. No uploads, no accounts, complete privacy.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About ImageTools</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p className="text-xl text-gray-600">
          ImageTools is a collection of 15 free image utilities built around one principle: your files stay on your device.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">What we built and why</h2>
        <p>
          Most online image tools work by uploading your files to a remote server, processing them there, and sending them back. That approach works, but it raises real questions: Who has access to those files? How long are they stored? What happens if there is a data breach?
        </p>
        <p>
          We built ImageTools differently. Every operation — resizing, compressing, converting, cropping, rotating, adding a watermark — runs entirely inside your web browser using JavaScript. Your images are never transmitted anywhere. They never touch our servers because we do not have servers involved in the processing pipeline at all.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">The tools</h2>
        <p>
          ImageTools covers the most common image tasks people search for every day:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Resize</strong> — pixel-perfect dimensions with aspect ratio lock, presets for Instagram, YouTube, Facebook, and more</li>
          <li><strong>Compress</strong> — quality slider or automatic compression to a specific file size target (50KB or 100KB)</li>
          <li><strong>Crop</strong> — free-form or fixed aspect ratios (1:1, 4:3, 16:9, 9:16)</li>
          <li><strong>Rotate and flip</strong> — correct orientation issues in seconds</li>
          <li><strong>Convert</strong> — PNG↔JPG, HEIC to JPG (iPhone photos), images to PDF</li>
          <li><strong>Watermark</strong> — add text or logo branding with opacity and position control</li>
          <li><strong>Government form photos</strong> — auto-resize and compress to PAN card, UPSC, SSC, and passport specifications</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">How it works technically</h2>
        <p>
          When you drop an image onto any tool, it is read directly by your browser using the File API. Processing is done through browser Canvas APIs, WebAssembly libraries like <code>pica</code> for high-quality resizing, and format-specific converters like <code>heic2any</code> for HEIC files and <code>jspdf</code> for PDF generation. The result is generated as a Blob in memory and offered to you as a download — all without a single HTTP request carrying your image data.
        </p>
        <p>
          Heavy libraries (HEIC converter, PDF generator) are loaded on demand only on the pages that need them, so the homepage and other tools stay fast.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Who runs this</h2>
        <p>
          ImageTools is actively being developed and improved. We are a team focused on building practical, privacy-first tools for everyday image tasks. If you have a question, found a bug, or want to suggest a tool, reach out at <a href="mailto:support@gkquestionsguru.com" className="text-blue-600 hover:underline">support@gkquestionsguru.com</a>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
          <div className="flex flex-col items-start gap-2 p-5 bg-blue-50 rounded-xl">
            <Shield size={22} className="text-blue-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">Zero uploads</h3>
            <p className="text-sm text-gray-600">Images are processed locally. Nothing leaves your device.</p>
          </div>
          <div className="flex flex-col items-start gap-2 p-5 bg-blue-50 rounded-xl">
            <Zap size={22} className="text-blue-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">Always free</h3>
            <p className="text-sm text-gray-600">All 15 tools are free to use with no account required.</p>
          </div>
          <div className="flex flex-col items-start gap-2 p-5 bg-blue-50 rounded-xl">
            <Lock size={22} className="text-blue-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">No account needed</h3>
            <p className="text-sm text-gray-600">Open a tool, use it, download the result. Nothing more.</p>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Want to learn how we handle your data? Read our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> for the full details.
        </p>
      </div>
    </div>
  );
}
