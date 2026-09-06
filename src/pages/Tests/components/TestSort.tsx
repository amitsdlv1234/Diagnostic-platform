import type { TestSortOption } from "../../../features/tests/testUtils";

interface TestSortProps {
  value: TestSortOption;
  onChange: (value: TestSortOption) => void;
}

export function TestSort({
  value,
  onChange,
}: TestSortProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="test-sort"
        className="hidden text-sm text-gray-500 sm:block"
      >
        Sort by
      </label>

      <select
        id="test-sort"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as TestSortOption,
          )
        }
        className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 outline-none focus:border-blue-500"
      >
        <option value="relevance">Relevance</option>
        <option value="price-low">
          Price: Low to High
        </option>
        <option value="price-high">
          Price: High to Low
        </option>
        <option value="name-asc">
          Name: A to Z
        </option>
        <option value="name-desc">
          Name: Z to A
        </option>
      </select>
    </div>
  );
}