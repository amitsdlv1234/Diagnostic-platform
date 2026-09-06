import {
  Home,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import {
  centreCities,
  diagnosticCentres,
} from "../../../features/centres/centreData";

import {
  getCentreTypes,
} from "../../../features/centres/centreUtils";

import type {
  CentreFilters as CentreFiltersType,
} from "../../../features/centres/centreUtils";

interface CentreFiltersProps {
  filters: CentreFiltersType;

  onChange: (
    filters: CentreFiltersType,
  ) => void;

  onReset: () => void;
}

export function CentreFilters({
  filters,
  onChange,
  onReset,
}: CentreFiltersProps) {
  const centreTypes =
    getCentreTypes(diagnosticCentres);

  const updateFilter = <
    K extends keyof CentreFiltersType,
  >(
    key: K,
    value: CentreFiltersType[K],
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="text-blue-600"
          />

          <h2 className="font-bold text-gray-900">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* City */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          City
        </label>

        <div className="space-y-1">
          {centreCities.map((city) => {
            const selected =
              filters.city === city;

            return (
              <button
                key={city}
                type="button"
                onClick={() =>
                  updateFilter("city", city)
                }
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  selected
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {city}

                {selected && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-6 border-t border-gray-100" />

      {/* Centre type */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Centre Type
        </label>

        <select
          value={
            filters.centreType || "All"
          }
          onChange={(event) =>
            updateFilter(
              "centreType",
              event.target.value ===
                "All"
                ? ""
                : event.target.value,
            )
          }
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
        >
          {centreTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="my-6 border-t border-gray-100" />

      {/* Home collection */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={
            filters.homeCollection
          }
          onChange={(event) =>
            updateFilter(
              "homeCollection",
              event.target.checked,
            )
          }
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />

        <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Home
            size={16}
            className="text-blue-600"
          />

          Home collection available
        </span>
      </label>
    </aside>
  );
}