export type OutputFormat = "keep" | "image/jpeg" | "image/png" | "image/webp";

export function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

export function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  return c;
}

export function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      mimeType,
      quality
    );
  });
}

export function resolveFormat(file: File, outputFormat: OutputFormat): string {
  if (outputFormat === "keep") return file.type || "image/jpeg";
  return outputFormat;
}

export function resolveExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] ?? "jpg";
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function replaceExtension(filename: string, newExt: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return `${base}.${newExt}`;
}

// Draw image onto a canvas with white background (for transparency flattening)
export function drawOnCanvas(
  img: HTMLImageElement,
  width: number,
  height: number,
  fillBackground = false,
  bgColor = "#ffffff"
): HTMLCanvasElement {
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d")!;
  if (fillBackground) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

// Rotate image by degrees around center, optionally flip
export function rotateCanvas(
  img: HTMLImageElement,
  degrees: number,
  flipH: boolean,
  flipV: boolean
): HTMLCanvasElement {
  const rad = (degrees * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  const w = Math.round(img.width * cos + img.height * sin);
  const h = Math.round(img.width * sin + img.height * cos);
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.translate(w / 2, h / 2);
  if (flipH) ctx.scale(-1, 1);
  if (flipV) ctx.scale(1, -1);
  ctx.rotate(rad);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  return canvas;
}

// Binary search to hit a target KB size
export async function compressToTarget(
  canvas: HTMLCanvasElement,
  mime: string,
  targetBytes: number,
  maxIterations = 16
): Promise<{ blob: Blob; quality: number }> {
  let lo = 0.01, hi = 1.0, bestBlob: Blob | null = null, bestQ = 0.5;
  for (let i = 0; i < maxIterations; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mime, mid);
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      bestQ = mid;
      lo = mid;
    } else {
      hi = mid;
    }
    if (hi - lo < 0.005) break;
  }
  if (!bestBlob) {
    // Even at lowest quality it's too big — return lowest quality result
    bestBlob = await canvasToBlob(canvas, mime, 0.01);
    bestQ = 0.01;
  }
  return { blob: bestBlob, quality: bestQ };
}

// Unit conversion helpers (for image resizer)
export const PX_PER_INCH = 96;
export const PX_PER_CM = PX_PER_INCH / 2.54;

export function toPx(value: number, unit: "px" | "cm" | "inch"): number {
  if (unit === "px") return Math.round(value);
  if (unit === "cm") return Math.round(value * PX_PER_CM);
  return Math.round(value * PX_PER_INCH);
}

export function fromPx(px: number, unit: "px" | "cm" | "inch"): number {
  if (unit === "px") return px;
  if (unit === "cm") return parseFloat((px / PX_PER_CM).toFixed(2));
  return parseFloat((px / PX_PER_INCH).toFixed(2));
}
