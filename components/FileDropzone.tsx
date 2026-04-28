"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X } from "lucide-react";

const MAX_FILES = 30;
const ACCEPTED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp", "image/tiff", "image/heic", "image/heif"];

export interface DroppedFile {
  file: File;
  preview: string;
}

interface Props {
  onFilesChange: (files: DroppedFile[]) => void;
  multiple?: boolean;
  accept?: string[];
  label?: string;
}

export default function FileDropzone({ onFilesChange, multiple = false, accept = ACCEPTED_MIME, label }: Props) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: File[]) => {
    setError(null);
    const valid = incoming.filter((f) => accept.some((a) => f.type === a || f.name.toLowerCase().endsWith(a.replace("image/", "."))));
    if (valid.length === 0) {
      setError("Please upload valid image files.");
      return;
    }
    const newDropped: DroppedFile[] = valid.map((f) => ({ file: f, preview: URL.createObjectURL(f) }));
    const next: DroppedFile[] = multiple ? [...files, ...newDropped].slice(0, MAX_FILES) : [newDropped[0]];
    if (multiple && files.length + valid.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed. Only the first ${MAX_FILES} were added.`);
    }
    setFiles(next);
    onFilesChange(next);
  }, [files, multiple, accept, onFilesChange]);

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange(next);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={label ?? "Upload image files"}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors select-none
          ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
      >
        <Upload size={36} className="mx-auto mb-3 text-gray-400" aria-hidden="true" />
        <p className="text-gray-700 font-medium text-lg">
          {label ?? "Drop image here or click to upload"}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {multiple ? `Up to ${MAX_FILES} files` : "Single file"} · JPG, PNG, WEBP, GIF, BMP, HEIC
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept.join(",")}
          multiple={multiple}
          onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
          aria-hidden="true"
        />
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
          {files.map((f, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.preview}
                alt={f.file.name}
                className="w-full aspect-square object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${f.file.name}`}
              >
                <X size={12} aria-hidden="true" />
              </button>
              <p className="text-xs text-gray-500 mt-1 truncate">{(f.file.size / 1024).toFixed(0)} KB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
