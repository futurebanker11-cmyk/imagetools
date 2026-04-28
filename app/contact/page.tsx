"use client";

import { useState } from "react";
import { Mail, Clock } from "lucide-react";

const CONTACT_EMAIL = "[OWNER EMAIL]"; // Replace before launch

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject || "ImageTools inquiry")}&body=${encodeURIComponent(body)}`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        Have a question, found a bug, or want to suggest a new tool? We would love to hear from you.
        Fill in the form below and click the button to open your email client — your message will be pre-filled.
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Clock size={16} aria-hidden="true" />
        <span>We typically respond within 2–3 business days.</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Bug report — image resizer"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe your question or issue in detail..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <a
          href={mailto}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Mail size={18} aria-hidden="true" />
          Open in your email client
        </a>

        <p className="text-xs text-gray-400">
          This opens your default email app with the message pre-filled. No data is sent through this website.
        </p>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
        <p>
          <strong>Direct email:</strong>{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}
