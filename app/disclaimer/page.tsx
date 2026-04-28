import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — ImageTools",
  description: "Disclaimer for ImageTools. Tools are provided as-is. Always verify government photo specifications before submitting official applications.",
};

const LAST_UPDATED = "April 28, 2026";

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section aria-labelledby="disc-general">
          <h2 id="disc-general" className="text-2xl font-semibold text-gray-900 mb-3">General disclaimer</h2>
          <p>
            The tools and content on ImageTools are provided for general informational and practical purposes only. While we make every effort to keep the tools functional and accurate, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the tools or the results they produce.
          </p>
          <p className="mt-3">
            Your use of any tool on this Site is entirely at your own risk. We accept no liability for any loss or damage, including without limitation indirect or consequential loss or damage, arising from the use of or inability to use the tools or the outputs they generate.
          </p>
        </section>

        <section aria-labelledby="disc-govt">
          <h2 id="disc-govt" className="text-2xl font-semibold text-gray-900 mb-3">Government form photo tools</h2>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
            <p className="font-semibold">
              Important: The PAN card, UPSC, SSC, and passport photo tools use placeholder specifications that have not been independently verified.
            </p>
          </div>
          <p className="mt-4">
            Photo requirements for government applications — including dimensions, file size, background colour, and format — are set by the relevant authority and can change at any time. The specifications displayed in our tools are estimates based on publicly available information at the time of writing and are clearly marked as unverified.
          </p>
          <p className="mt-3">
            <strong>Before using any output from these tools in an official application, you must verify the current requirements directly from the official portal or authority.</strong> We are not responsible for any application rejection, delay, or other consequence resulting from use of these tools.
          </p>
        </section>

        <section aria-labelledby="disc-accuracy">
          <h2 id="disc-accuracy" className="text-2xl font-semibold text-gray-900 mb-3">Accuracy of output</h2>
          <p>
            Image processing results depend on the quality and format of your input file, your device hardware, and your browser implementation of the underlying Web APIs. Results may vary. We do not guarantee that compressed files will meet a specific size target in all cases, that conversions will be pixel-perfect, or that PDF output will be accepted by all PDF readers or printers.
          </p>
        </section>

        <section aria-labelledby="disc-professional">
          <h2 id="disc-professional" className="text-2xl font-semibold text-gray-900 mb-3">No professional advice</h2>
          <p>
            Nothing on this Site constitutes legal, professional, or official advice. The tools are utilities to help you manipulate image files, not to provide guidance on legal or regulatory compliance. If you need to meet specific official requirements, consult the relevant authority directly.
          </p>
        </section>

        <section aria-labelledby="disc-external">
          <h2 id="disc-external" className="text-2xl font-semibold text-gray-900 mb-3">External links</h2>
          <p>
            This Site may contain links to external websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </section>

        <p className="text-sm text-gray-400 border-t pt-6">
          See also: <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> · <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}
