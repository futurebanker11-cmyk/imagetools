"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ImageIcon } from "lucide-react";

const NAV_MENUS = [
  {
    label: "Resize & Edit",
    items: [
      { label: "Image Resizer", href: "/image-resizer" },
      { label: "Image Cropper", href: "/image-cropper" },
      { label: "Rotate Image", href: "/rotate-image" },
      { label: "Add Watermark", href: "/add-watermark" },
    ],
  },
  {
    label: "Compress",
    items: [
      { label: "Compress Image", href: "/compress-image" },
      { label: "Compress to 50KB", href: "/compress-image-to-50kb" },
      { label: "Compress to 100KB", href: "/compress-image-to-100kb" },
    ],
  },
  {
    label: "Convert",
    items: [
      { label: "PNG to JPG", href: "/png-to-jpg" },
      { label: "JPG to PNG", href: "/jpg-to-png" },
      { label: "HEIC to JPG", href: "/heic-to-jpg" },
      { label: "Image to PDF", href: "/image-to-pdf" },
    ],
  },
  {
    label: "Govt Forms",
    items: [
      { label: "PAN Card Photo", href: "/pan-card-photo-resizer" },
      { label: "UPSC Photo", href: "/upsc-photo-resizer" },
      { label: "SSC Photo", href: "/ssc-photo-resizer" },
      { label: "Passport Photo", href: "/passport-photo-maker" },
    ],
  },
];

function DropdownMenu({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-gray-50 transition-colors"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-blue-600"
          >
            <ImageIcon size={24} aria-hidden="true" />
            <span>ImageTools</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_MENUS.map((menu) => (
              <DropdownMenu key={menu.label} label={menu.label} items={menu.items} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {NAV_MENUS.map((menu) => (
            <div key={menu.label}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                onClick={() =>
                  setMobileExpanded((v) => (v === menu.label ? null : menu.label))
                }
                aria-expanded={mobileExpanded === menu.label}
              >
                {menu.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${mobileExpanded === menu.label ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {mobileExpanded === menu.label && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
