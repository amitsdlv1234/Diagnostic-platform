import { Home, RotateCcw, SlidersHorizontal } from "lucide-react";
import { testCategories } from "../../../features/tests/testData";
import type { TestFilters as TestFiltersType } from "../../../features/tests/testUtils";

interface TestFiltersProps {
  filters: TestFiltersType;
  onChange: (
    filters: TestFiltersType,
  ) => void;
  onReset: () => void;
}

export function TestFilters({
  filters,
  onChange,
  onReset,
}: TestFiltersProps) {
  const updateFilter = <K extends keyof TestFiltersType>(
    key: K,
    value: TestFiltersType[K],
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

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Category
        </label>

        <div className="space-y-1">
          {testCategories.map((category) => {
            const selected =
              filters.category === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  updateFilter("category", category)
                }
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  selected
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{category}</span>

                {selected && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-6 border-t border-gray-100" />

      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">
          Price range
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-gray-500">
              Minimum
            </label>

            <input
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={(event) =>
                updateFilter(
                  "minPrice",
                  Number(event.target.value),
                )
              }
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-500">
              Maximum
            </label>

            <input
              type="number"
              min={0}
              value={filters.maxPrice}
              onChange={(event) =>
                updateFilter(
                  "maxPrice",
                  Number(event.target.value),
                )
              }
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-gray-100" />

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={filters.homeCollection}
          onChange={(event) =>
            updateFilter(
              "homeCollection",
              event.target.checked,
            )
          }
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />

        <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Home size={16} className="text-blue-600" />
          Home collection available
        </span>
      </label>
    </aside>
  );
}