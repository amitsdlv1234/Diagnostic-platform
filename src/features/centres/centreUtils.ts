import type { DiagnosticCentre } from "./centreData";

export interface CentreFilters {
  search: string;
  city: string;
  homeCollection: boolean;
  centreType: string;
}

export function filterCentres(
  centres: DiagnosticCentre[],
  filters: CentreFilters,
): DiagnosticCentre[] {
  const search = filters.search
    .trim()
    .toLowerCase();

  return centres.filter((centre) => {
    const matchesSearch =
      !search ||
      centre.name.toLowerCase().includes(search) ||
      centre.city.toLowerCase().includes(search) ||
      centre.locality.toLowerCase().includes(search) ||
      centre.address.toLowerCase().includes(search) ||
      centre.pincode.includes(search);

    const matchesCity =
      filters.city === "All" ||
      centre.city === filters.city;

    const matchesHomeCollection =
      !filters.homeCollection ||
      centre.homeCollection;

    const matchesCentreType =
      !filters.centreType ||
      centre.centreType === filters.centreType;

    return (
      matchesSearch &&
      matchesCity &&
      matchesHomeCollection &&
      matchesCentreType
    );
  });
}

export function getCentreTypes(
  centres: DiagnosticCentre[],
): string[] {
  return [
    "All",
    ...Array.from(
      new Set(
        centres.map(
          (centre) => centre.centreType,
        ),
      ),
    ),
  ];
}