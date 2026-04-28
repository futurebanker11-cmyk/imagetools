import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — ImageTools",
  description: "Get in touch with the ImageTools team. Report bugs, suggest new tools, or ask a question.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
