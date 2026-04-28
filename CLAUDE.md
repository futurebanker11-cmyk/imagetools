# ImageTools — Claude Code Session Rules

Read this file at the start of every new Claude Code session in this repo.

## Stack
- Next.js 15 App Router, TypeScript strict, Tailwind CSS v4, React 19
- `output: 'export'` — Cloudflare Pages static deployment
- NO backend API routes, NO server-side image processing, NO database

## Critical Rules (non-negotiable)

1. **No image uploads to any server.** All processing in-browser. Privacy claim must be true in implementation.
2. **No long articles, no blog posts, no SEO filler.** Each tool page = tool + minimal supporting text only. Total tool page text under 300 words.
3. **No copying text from reference sites.** All copy written fresh.
4. **No fake testimonials, fake "trusted by" logos, fake review counts, or fake usage counters.**
5. **No `<form>` tags with backend submission.** Contact form = mailto: link only.
6. **No "coming soon" placeholders on tool pages.** Every tool must work in v1.
7. **Heavy libraries (heic2any, jspdf, react-image-crop, pica) must be dynamically imported** on the pages that need them only.
8. **Bulk operations capped at 30 files** with clear error messaging.
9. **Accessibility:** all interactive elements keyboard-navigable, proper ARIA labels, alt text on all icons, focus rings visible.
10. **TypeScript strict mode.** No `any` types unless absolutely necessary and commented why.
11. **No external image hosting.** All UI assets in `public/`.
12. **Govt form specs marked `// VERIFY SPECS`** until user confirms — these change and must not be guessed.

## 15 Tools + Routes

| Tool | Route |
|------|-------|
| Image Resizer | /image-resizer |
| Image Cropper | /image-cropper |
| Compress Image | /compress-image |
| Compress to 50KB | /compress-image-to-50kb |
| Compress to 100KB | /compress-image-to-100kb |
| Rotate Image | /rotate-image |
| PNG to JPG | /png-to-jpg |
| JPG to PNG | /jpg-to-png |
| HEIC to JPG | /heic-to-jpg |
| PAN Card Photo Resizer | /pan-card-photo-resizer |
| UPSC Photo Resizer | /upsc-photo-resizer |
| SSC Photo Resizer | /ssc-photo-resizer |
| Passport Photo Maker | /passport-photo-maker |
| Image to PDF | /image-to-pdf |
| Add Watermark | /add-watermark |

## Legal Pages
/about · /contact · /privacy-policy · /terms · /disclaimer

## Govt Form Specs — VERIFY SPECS before launch
All placeholder specs are marked `// VERIFY SPECS` in code. Do NOT change without user confirmation.
- PAN Card: ~200×230px, 20–50KB JPG
- UPSC: ~350×350px, 20–300KB JPG
- SSC: ~100×120px, 20–50KB JPG
- Passport India: 35×45mm, 200KB max
- Passport US: 2×2 inch / 600×600px
- Passport UK/Schengen: 35×45mm

## AdSense
Placeholder comment in `app/layout.tsx` — user will paste their pub-id script there before launch.
