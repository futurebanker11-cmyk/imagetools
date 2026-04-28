"use client";

import { Download } from "lucide-react";

interface SingleProps {
  mode: "single";
  blob: Blob;
  filename: string;
  originalSize?: number;
  processedSize?: number;
}

interface ZipProps {
  mode: "zip";
  onDownload: () => void;
  count: number;
  disabled?: boolean;
}

type Props = SingleProps | ZipProps;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DownloadButton(props: Props) {
  if (props.mode === "single") {
    const { blob, filename, originalSize, processedSize } = props;
    const url = URL.createObjectURL(blob);
    return (
      <div className="mt-4">
        {originalSize !== undefined && processedSize !== undefined && (
          <p className="text-sm text-gray-500 mb-2">
            Before: <span className="font-medium text-gray-700">{formatSize(originalSize)}</span>
            {" → "}After: <span className="font-medium text-green-600">{formatSize(processedSize)}</span>
            {" "}
            <span className="text-green-600">({Math.round((1 - processedSize / originalSize) * 100)}% smaller)</span>
          </p>
        )}
        <a
          href={url}
          download={filename}
          onClick={() => setTimeout(() => URL.revokeObjectURL(url), 1000)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Download size={18} aria-hidden="true" />
          Download {filename}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        onClick={props.onDownload}
        disabled={props.disabled}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <Download size={18} aria-hidden="true" />
        Download All ({props.count} files as ZIP)
      </button>
    </div>
  );
}
