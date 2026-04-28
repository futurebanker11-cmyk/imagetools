interface Step {
  title: string;
  description: string;
}

interface Props {
  steps: [Step, Step, Step];
}

export default function HowToUse({ steps }: Props) {
  return (
    <section className="mt-10" aria-labelledby="how-to-use-heading">
      <h2 id="how-to-use-heading" className="text-xl font-semibold text-gray-800 mb-5">How to Use</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
