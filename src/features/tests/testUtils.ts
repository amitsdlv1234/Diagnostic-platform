import type { DiagnosticTest } from "./testData";

export interface TestFilters {
  search: string;
  category: string;
  homeCollection: boolean;
  minPrice: number;
  maxPrice: number;
}

export type TestSortOption =
  | "relevance"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

export function filterTests(
  tests: DiagnosticTest[],
  filters: TestFilters,
): DiagnosticTest[] {
  const search = filters.search.trim().toLowerCase();

  return tests.filter((test) => {
    const matchesSearch =
      !search ||
      test.name.toLowerCase().includes(search) ||
      test.category.toLowerCase().includes(search) ||
      test.description.toLowerCase().includes(search);

    const matchesCategory =
      filters.category === "All" ||
      test.category === filters.category;

    const matchesHomeCollection =
      !filters.homeCollection ||
      test.homeCollection;

    const matchesMinPrice =
      test.price >= filters.minPrice;

    const matchesMaxPrice =
      test.price <= filters.maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesHomeCollection &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
}

export function sortTests(
  tests: DiagnosticTest[],
  sortBy: TestSortOption,
): DiagnosticTest[] {
  const sorted = [...tests];

  switch (sortBy) {
    case "price-low":
      return sorted.sort(
        (a, b) => a.price - b.price,
      );

    case "price-high":
      return sorted.sort(
        (a, b) => b.price - a.price,
      );

    case "name-asc":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name),
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name),
      );

    case "relevance":
    default:
      return sorted.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;

        return a.name.localeCompare(b.name);
      });
  }
}

export function calculateDiscount(
  price: number,
  mrp: number,
): number {
  if (!mrp || mrp <= price) {
    return 0;
  }

  return Math.round(
    ((mrp - price) / mrp) * 100,
  );
}