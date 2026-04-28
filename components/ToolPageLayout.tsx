import type { ReactNode } from "react";
import RelatedTools from "./RelatedTools";

export interface RelatedTool {
  label: string;
  href: string;
  description: string;
}

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  relatedTools: RelatedTool[];
}

export default function ToolPageLayout({ title, description, children, relatedTools }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        {children}
      </div>

      {relatedTools.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Tools</h2>
          <RelatedTools tools={relatedTools} />
        </div>
      )}
    </div>
  );
}
