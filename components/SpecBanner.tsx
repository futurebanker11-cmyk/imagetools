import { Info } from "lucide-react";

interface Props {
  dimensions: string;
  fileSize: string;
  format: string;
  note?: string;
}

export default function SpecBanner({ dimensions, fileSize, format, note }: Props) {
  return (
    <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6" role="note">
      <Info size={20} className="text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-semibold text-blue-900 text-sm">
          Required: <span className="font-bold">{dimensions}</span>
          {" · "}<span className="font-bold">{fileSize}</span>
          {" · "}<span className="font-bold">{format}</span>
        </p>
        {note && <p className="text-blue-700 text-xs mt-1">{note}</p>}
      </div>
    </div>
  );
}
