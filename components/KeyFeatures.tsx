import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Props {
  features: [Feature, Feature, Feature];
}

export default function KeyFeatures({ features }: Props) {
  return (
    <section className="mt-10" aria-labelledby="key-features-heading">
      <h2 id="key-features-heading" className="text-xl font-semibold text-gray-800 mb-5">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {features.map((feat, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <feat.icon size={22} className="text-blue-600 mb-2" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 mb-1">{feat.title}</h3>
            <p className="text-sm text-gray-600">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
