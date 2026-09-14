import {
  ArrowRight,
  FileText,
} from "lucide-react";

import type { HealthContent } from "../../features/healthContent/healthContentTypes";

interface HealthContentCardProps {
  content: HealthContent;
  onClick?: () => void;
}

export function HealthContentCard({
  content,
  onClick,
}: HealthContentCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {content.imageUrl ? (
        <img
          src={content.imageUrl}
          alt={content.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-50">
          <FileText
            size={42}
            className="text-blue-600"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {content.category}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900">
          {content.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {content.shortDescription}
        </p>

        {content.buttonAction !== "NONE" && (
          <button
            type="button"
            onClick={onClick}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            {content.buttonText ||
              "Learn More"}

            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </article>
  );
}