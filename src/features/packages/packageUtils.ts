import type { HealthPackage } from "./packageData";

export interface PackageFilters {
  search: string;
  category: string;
  homeCollection: boolean;
  minPrice: number;
  maxPrice: number;
}

export type PackageSortOption =
  | "relevance"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

export function filterPackages(
  packages: HealthPackage[],
  filters: PackageFilters,
): HealthPackage[] {
  const search = filters.search
    .trim()
    .toLowerCase();

  return packages.filter((pkg) => {
    const matchesSearch =
      !search ||
      pkg.name.toLowerCase().includes(search) ||
      pkg.category.toLowerCase().includes(search) ||
      pkg.description.toLowerCase().includes(search);

    const matchesCategory =
      filters.category === "All" ||
      pkg.category === filters.category;

    const matchesHomeCollection =
      !filters.homeCollection ||
      pkg.homeCollection;

    const matchesMinPrice =
      pkg.price >= filters.minPrice;

    const matchesMaxPrice =
      pkg.price <= filters.maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesHomeCollection &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
}

export function sortPackages(
  packages: HealthPackage[],
  sortBy: PackageSortOption,
): HealthPackage[] {
  const sorted = [...packages];

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
        const aScore =
          Number(a.popular) +
          Number(a.recommended);

        const bScore =
          Number(b.popular) +
          Number(b.recommended);

        if (aScore !== bScore) {
          return bScore - aScore;
        }

        return a.name.localeCompare(b.name);
      });
  }
}

export function calculatePackageDiscount(
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