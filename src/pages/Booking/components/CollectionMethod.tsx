import {
  Building2,
  Home,
} from "lucide-react";

import type {
  CollectionType,
} from "../../../features/booking/bookingTypes";

interface CollectionMethodProps {
  value: CollectionType;

  onChange: (
    value: CollectionType,
  ) => void;
}

export function CollectionMethod({
  value,
  onChange,
}: CollectionMethodProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">
        Collection method
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Choose how you want your sample to be
        collected.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            onChange("HOME_COLLECTION")
          }
          className={`rounded-2xl border p-5 text-left transition ${
            value === "HOME_COLLECTION"
              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
              : "border-gray-200 bg-white hover:border-blue-300"
          }`}
        >
          <Home
            size={24}
            className="text-blue-600"
          />

          <p className="mt-3 font-bold text-gray-900">
            Home Collection
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Our phlebotomist will visit your
            selected address.
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            onChange("CENTRE_VISIT")
          }
          className={`rounded-2xl border p-5 text-left transition ${
            value === "CENTRE_VISIT"
              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
              : "border-gray-200 bg-white hover:border-blue-300"
          }`}
        >
          <Building2
            size={24}
            className="text-blue-600"
          />

          <p className="mt-3 font-bold text-gray-900">
            Visit Diagnostic Centre
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Select a convenient diagnostic
            centre for sample collection.
          </p>
        </button>
      </div>
    </div>
  );
}