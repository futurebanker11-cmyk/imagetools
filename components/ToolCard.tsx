import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function ToolCard({ icon: Icon, title, description, href }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-start gap-3 p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
        <Icon size={22} className="text-blue-600" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </Link>
  );
}
