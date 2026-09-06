import {
  ArrowRight,
  Clock3,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { DiagnosticCentre } from "../../features/centres/centreData";

interface CentreCardProps {
  centre: DiagnosticCentre;
}

export function CentreCard({
  centre,
}: CentreCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-100 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {centre.centreType}
          </span>

          {centre.recommended && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Recommended
            </span>
          )}
        </div>

        <h2 className="mt-4 text-xl font-bold leading-7 text-gray-900">
          {centre.name}
        </h2>

        <div className="mt-3 flex items-start gap-2 text-sm leading-6 text-gray-600">
          <MapPin
            size={17}
            className="mt-1 shrink-0 text-blue-600"
          />

          <span>
            {centre.locality}, {centre.city}
          </span>
        </div>
      </div>

      {/* Information */}
      <div className="flex-1 p-5">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock3
              size={17}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {centre.openingTime} -{" "}
                {centre.closingTime}
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                {centre.workingDays}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone
              size={17}
              className="shrink-0 text-blue-600"
            />

            <a
              href={`tel:${centre.phone}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {centre.phone}
            </a>
          </div>

          {centre.homeCollection && (
            <div className="flex items-center gap-3">
              <Home
                size={17}
                className="shrink-0 text-blue-600"
              />

              <span className="text-sm font-medium text-gray-700">
                Home collection available
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={17}
              className="shrink-0 text-green-600"
            />

            <span className="text-sm font-medium text-gray-700">
              Verified diagnostic services
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Services
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {centre.services
              .slice(0, 3)
              .map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                >
                  {service}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-5">
        <Link
          to={`/centres/${centre.id}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Centre
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}