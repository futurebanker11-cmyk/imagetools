import Link from "next/link";
import type { RelatedTool } from "./ToolPageLayout";

interface Props {
  tools: RelatedTool[];
}

export default function RelatedTools({ tools }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {tools.slice(0, 4).map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
        >
          <p className="font-semibold text-gray-900 text-sm hover:text-blue-600">{tool.label}</p>
          <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
        </Link>
      ))}
    </div>
  );
}
