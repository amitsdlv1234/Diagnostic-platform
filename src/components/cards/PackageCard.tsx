import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Home,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { HealthPackage } from "../../features/packages/packageData";

import { calculatePackageDiscount } from "../../features/packages/packageUtils";

interface PackageCardProps {
  packageData: HealthPackage;
}

export function PackageCard({
  packageData,
}: PackageCardProps) {
  const discount = calculatePackageDiscount(
    packageData.price,
    packageData.mrp,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {packageData.category}
          </span>

          {packageData.popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Star size={12} fill="currentColor" />
              Popular
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold leading-7 text-gray-900">
          {packageData.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
          {packageData.shortDescription}
        </p>

        <div className="mt-5 space-y-2.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="shrink-0 text-blue-600"
            />

            <span>
              {packageData.testsIncluded.length} tests
              included
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3
              size={16}
              className="shrink-0 text-blue-600"
            />

            <span>
              Report in {packageData.reportTime}
            </span>
          </div>

          {packageData.homeCollection && (
            <div className="flex items-center gap-2">
              <Home
                size={16}
                className="shrink-0 text-blue-600"
              />

              <span>Home collection available</span>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-xl bg-gray-50 p-3">
          <p className="text-xs font-semibold text-gray-500">
            Includes
          </p>

          <p className="mt-1 line-clamp-2 text-sm text-gray-700">
            {packageData.testsIncluded.join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-100 p-5">
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{packageData.price.toLocaleString("en-IN")}
          </span>

          {packageData.mrp > packageData.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{packageData.mrp.toLocaleString("en-IN")}
            </span>
          )}

          {discount > 0 && (
            <span className="text-xs font-bold text-green-600">
              {discount}% OFF
            </span>
          )}
        </div>

        <Link
          to={`/packages/${packageData.id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Package
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}