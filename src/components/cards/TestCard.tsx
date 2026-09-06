import {
  ArrowRight,
  Clock3,
  Droplets,
  Home,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { DiagnosticTest } from "../../features/tests/testData";
import { calculateDiscount } from "../../features/tests/testUtils";

interface TestCardProps {
  test: DiagnosticTest;
}

export function TestCard({ test }: TestCardProps) {
  const discount = calculateDiscount(
    test.price,
    test.mrp,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3 p-5 pb-0">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {test.category}
        </span>

        {test.popular && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <Star size={12} fill="currentColor" />
            Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-6 text-gray-900">
          {test.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
          {test.shortDescription}
        </p>

        <div className="mt-5 space-y-2.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock3
              size={16}
              className="shrink-0 text-blue-600"
            />
            <span>
              Report in {test.reportTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Droplets
              size={16}
              className="shrink-0 text-blue-600"
            />
            <span>Sample: {test.sampleType}</span>
          </div>

          {test.homeCollection && (
            <div className="flex items-center gap-2">
              <Home
                size={16}
                className="shrink-0 text-blue-600"
              />
              <span>Home collection available</span>
            </div>
          )}

          {test.fastingRequired && (
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
              Fasting required
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{test.price.toLocaleString("en-IN")}
            </span>

            {test.mrp > test.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{test.mrp.toLocaleString("en-IN")}
              </span>
            )}

            {discount > 0 && (
              <span className="text-xs font-bold text-green-600">
                {discount}% OFF
              </span>
            )}
          </div>

          <Link
            to={`/tests/${test.id}`}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Test
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}