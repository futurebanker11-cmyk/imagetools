import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — ImageTools",
  description: "Terms of service for ImageTools. Understand your rights, acceptable use, and limitations when using our free image tools.",
};

const LAST_UPDATED = "April 28, 2026";
const GOVERNING_LAW = "[YOUR STATE/COUNTRY]"; // Replace before launch
const CONTACT_EMAIL = "[OWNER EMAIL]"; // Replace before launch

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section aria-labelledby="tos-agreement">
          <h2 id="tos-agreement" className="text-2xl font-semibold text-gray-900 mb-3">Agreement to terms</h2>
          <p>
            By accessing or using ImageTools (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site. These terms apply to all visitors and users of the Site.
          </p>
        </section>

        <section aria-labelledby="tos-description">
          <h2 id="tos-description" className="text-2xl font-semibold text-gray-900 mb-3">Description of service</h2>
          <p>
            ImageTools provides a set of free, browser-based image processing tools. All processing occurs locally in your browser. We do not transmit, store, or have access to any images you process using this Site. The Site is provided free of charge and is funded through advertising.
          </p>
        </section>

        <section aria-labelledby="tos-acceptable">
          <h2 id="tos-acceptable" className="text-2xl font-semibold text-gray-900 mb-3">Acceptable use</h2>
          <p>You agree to use ImageTools only for lawful purposes. You must not use the Site to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Process, distribute, or create any image that is illegal, defamatory, obscene, or infringes the intellectual property rights of any third party.</li>
            <li>Attempt to reverse-engineer, scrape, or systematically access the Site in a way that places unreasonable load on our hosting infrastructure.</li>
            <li>Use automated tools, bots, or scripts to bulk-process content in a manner that violates these terms.</li>
            <li>Circumvent, disable, or interfere with any security features of the Site.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
          </ul>
        </section>

        <section aria-labelledby="tos-ip">
          <h2 id="tos-ip" className="text-2xl font-semibold text-gray-900 mb-3">Intellectual property</h2>
          <p>
            <strong>Your content:</strong> You retain full ownership of all images and files you process using ImageTools. We claim no rights to your content. Because processing is entirely client-side, we never receive your files.
          </p>
          <p className="mt-3">
            <strong>Our content:</strong> The source code, design, and written content of ImageTools are owned by the operator. You may not copy, reproduce, or redistribute any part of the Site without written permission.
          </p>
        </section>

        <section aria-labelledby="tos-warranties">
          <h2 id="tos-warranties" className="text-2xl font-semibold text-gray-900 mb-3">No warranties</h2>
          <p>
            ImageTools is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The Site will be uninterrupted, error-free, or free of viruses or other harmful components.</li>
            <li>The results produced by the tools will be accurate, complete, or suitable for any particular purpose.</li>
            <li>The tools will meet the specific requirements of any government form, application portal, or institution.</li>
          </ul>
          <p className="mt-3">
            This disclaimer applies particularly to our government form photo tools (PAN card, UPSC, SSC, passport). Specifications for these tools are provided in good faith as placeholders only. You are responsible for verifying the current official requirements before submitting any application.
          </p>
        </section>

        <section aria-labelledby="tos-liability">
          <h2 id="tos-liability" className="text-2xl font-semibold text-gray-900 mb-3">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, ImageTools and its operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including but not limited to loss of data, loss of profits, or rejection of an application — arising out of or in connection with your use of the Site, even if we have been advised of the possibility of such damages.
          </p>
          <p className="mt-3">
            Our total liability to you for any claims arising from these terms or your use of the Site shall not exceed the amount you paid to use the Site (which, as a free service, is zero).
          </p>
        </section>

        <section aria-labelledby="tos-third-party">
          <h2 id="tos-third-party" className="text-2xl font-semibold text-gray-900 mb-3">Third-party links and services</h2>
          <p>
            The Site may display advertisements served by Google AdSense and may contain links to external websites. We have no control over the content or privacy practices of third-party sites and are not responsible for them. The inclusion of any link does not imply endorsement.
          </p>
        </section>

        <section aria-labelledby="tos-governing">
          <h2 id="tos-governing" className="text-2xl font-semibold text-gray-900 mb-3">Governing law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of {GOVERNING_LAW}, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in {GOVERNING_LAW}.
          </p>
        </section>

        <section aria-labelledby="tos-changes">
          <h2 id="tos-changes" className="text-2xl font-semibold text-gray-900 mb-3">Changes to these terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. Continued use of the Site after any changes constitutes your acceptance of the new terms. If you do not agree to the updated terms, you must stop using the Site.
          </p>
        </section>

        <section aria-labelledby="tos-contact">
          <h2 id="tos-contact" className="text-2xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <p className="text-sm text-gray-400 border-t pt-6">
          See also: <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> · <Link href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
