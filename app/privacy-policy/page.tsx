import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — ImageTools",
  description: "ImageTools privacy policy: how we handle your data, cookies, and image files. All image processing is client-side only.",
};

const LAST_UPDATED = "April 28, 2026";
const ADSENSE_PUB = "ca-pub-XXXXXXXXXXXXXXXX"; // Replace with actual AdSense pub-id before launch
const CONTACT_EMAIL = "support@gkquestionsguru.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section aria-labelledby="pp-core">
          <h2 id="pp-core" className="text-2xl font-semibold text-gray-900 mb-3">The most important thing first</h2>
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
            <p className="font-semibold">
              All image processing on ImageTools happens entirely in your browser using JavaScript.
              We never upload, store, or transmit your images to any server.
              When you use any of our tools, your files never leave your device.
            </p>
          </div>
        </section>

        <section aria-labelledby="pp-collect">
          <h2 id="pp-collect" className="text-2xl font-semibold text-gray-900 mb-3">What information we collect</h2>
          <p>
            <strong>Images and files:</strong> None. As stated above, we do not receive, process, or store any image files you use on this site.
          </p>
          <p className="mt-3">
            <strong>Usage data:</strong> If you have Google Analytics enabled on this site, it may collect anonymous usage data such as pages visited, browser type, country, and session duration. This data does not include personally identifiable information and is governed by Google&apos;s privacy policy. No Analytics ID is currently active on this site; if one is added, this policy will be updated.
          </p>
          <p className="mt-3">
            <strong>Advertising data:</strong> We use Google AdSense (publisher ID: {ADSENSE_PUB}) to display advertisements. Google AdSense may use cookies and similar technologies to show relevant ads based on your browsing activity across sites. This is governed by Google&apos;s advertising policies. You can opt out of personalised advertising at <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" rel="noopener noreferrer">adssettings.google.com</a>.
          </p>
        </section>

        <section aria-labelledby="pp-cookies">
          <h2 id="pp-cookies" className="text-2xl font-semibold text-gray-900 mb-3">Cookies</h2>
          <p>
            This website does not set any first-party cookies. Third-party cookies may be set by Google AdSense for advertising purposes. You can manage or delete cookies through your browser settings. Disabling cookies will not affect the functionality of our image tools.
          </p>
        </section>

        <section aria-labelledby="pp-data-retention">
          <h2 id="pp-data-retention" className="text-2xl font-semibold text-gray-900 mb-3">Data retention</h2>
          <p>
            We retain no user data because we collect none. Image files you process using our tools exist only in your browser&apos;s memory during your session. Once you close the tab or navigate away, all data is discarded automatically by your browser. We have no ability to access or retrieve it.
          </p>
        </section>

        <section aria-labelledby="pp-third-party">
          <h2 id="pp-third-party" className="text-2xl font-semibold text-gray-900 mb-3">Third-party services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Google AdSense</strong> — displays advertisements. Google may use cookies to serve personalised ads. See <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
            </li>
            <li>
              <strong>Cloudflare Pages</strong> — hosts this website. Cloudflare may log basic request metadata (IP address, URL, timestamp) for security purposes. See <a href="https://www.cloudflare.com/privacypolicy/" className="text-blue-600 hover:underline" rel="noopener noreferrer">Cloudflare&apos;s Privacy Policy</a>.
            </li>
          </ul>
        </section>

        <section aria-labelledby="pp-gdpr">
          <h2 id="pp-gdpr" className="text-2xl font-semibold text-gray-900 mb-3">Your rights (GDPR)</h2>
          <p>
            If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Right of access</strong> — you can request a copy of any personal data we hold about you.</li>
            <li><strong>Right to rectification</strong> — you can request correction of inaccurate data.</li>
            <li><strong>Right to erasure</strong> — you can request deletion of your data.</li>
            <li><strong>Right to object</strong> — you can object to processing of your data for direct marketing.</li>
            <li><strong>Right to data portability</strong> — you can request your data in a machine-readable format.</li>
          </ul>
          <p className="mt-3">
            Because we collect no personal data through our image tools, most of these rights are satisfied by design. For questions related to advertising cookies set by Google AdSense, please refer to Google&apos;s privacy controls.
          </p>
        </section>

        <section aria-labelledby="pp-ccpa">
          <h2 id="pp-ccpa" className="text-2xl font-semibold text-gray-900 mb-3">California residents (CCPA)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information.
          </p>
          <p className="mt-3">
            We do not sell personal information. We do not collect personal information through our image processing tools. For information about how Google uses data in connection with advertising, please visit <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-600 hover:underline" rel="noopener noreferrer">Google&apos;s partner sites policy</a>.
          </p>
        </section>

        <section aria-labelledby="pp-children">
          <h2 id="pp-children" className="text-2xl font-semibold text-gray-900 mb-3">Children&apos;s privacy</h2>
          <p>
            ImageTools is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided personal information through this website, please contact us and we will take steps to remove it promptly.
          </p>
        </section>

        <section aria-labelledby="pp-changes">
          <h2 id="pp-changes" className="text-2xl font-semibold text-gray-900 mb-3">Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the site after changes are posted constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section aria-labelledby="pp-contact">
          <h2 id="pp-contact" className="text-2xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <p className="text-sm text-gray-400 border-t pt-6">
          See also: <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> · <Link href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
