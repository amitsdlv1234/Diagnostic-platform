import { useMemo, useState } from "react";

import {
  Filter,
  MapPin,
  X,
} from "lucide-react";

import { Container } from "../../components/common/Container";

import { CentreCard } from "../../components/cards/CentreCard";

import { EmptyState } from "../../components/common/EmptyState";

import {
  diagnosticCentres,
} from "../../features/centres/centreData";

import {
  filterCentres,
} from "../../features/centres/centreUtils";

import type {
  CentreFilters as CentreFiltersType,
} from "../../features/centres/centreUtils";

import { CentreFilters } from "./components/CentreFilters";

import { CentreSearchBar } from "./components/CentreSearchBar";

const DEFAULT_FILTERS: CentreFiltersType = {
  search: "",
  city: "All",
  homeCollection: false,
  centreType: "",
};

export function Centres() {
  const [filters, setFilters] =
    useState<CentreFiltersType>(
      DEFAULT_FILTERS,
    );

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false);

  const filteredCentres = useMemo(
    () =>
      filterCentres(
        diagnosticCentres,
        filters,
      ),
    [filters],
  );

  const handleFiltersChange = (
    nextFilters: CentreFiltersType,
  ) => {
    setFilters(nextFilters);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleSearchChange = (
    search: string,
  ) => {
    setFilters({
      ...filters,
      search,
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.city !== "All" ||
    filters.homeCollection ||
    filters.centreType !== "";

  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white">
        <Container>
          <div className="py-10 sm:py-14">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              <MapPin size={17} />

              Diagnostic Centres
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Find a diagnostic centre near you
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Search diagnostic centres, check available
              services and choose a convenient location
              for your tests and health packages.
            </p>

            <div className="mt-7 max-w-4xl">
              <CentreSearchBar
                value={filters.search}
                onChange={
                  handleSearchChange
                }
              />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-8 sm:py-10">
          {/* Mobile filter button */}
          <div className="mb-5 lg:hidden">
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(true)
              }
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700"
            >
              <Filter size={17} />

              Filters

              {hasActiveFilters && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                  Active
                </span>
              )}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <CentreFilters
                filters={filters}
                onChange={
                  handleFiltersChange
                }
                onReset={handleReset}
              />
            </div>

            {/* Results */}
            <main>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredCentres.length}
                    </span>{" "}
                    {filteredCentres.length ===
                    1
                      ? "centre"
                      : "centres"}
                  </p>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="flex min-h-[180px] items-center justify-center bg-gray-100 px-6 py-10">
                  <div className="text-center">
                    <MapPin
                      size={30}
                      className="mx-auto text-blue-600"
                    />

                    <h2 className="mt-3 text-sm font-bold text-gray-900">
                      Centre map
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Interactive map integration will
                      be added in the next phase.
                    </p>
                  </div>
                </div>
              </div>

              {filteredCentres.length >
              0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCentres.map(
                    (centre) => (
                      <CentreCard
                        key={centre.id}
                        centre={centre}
                      />
                    ),
                  )}
                </div>
              ) : (
                <EmptyState
                  title="No diagnostic centres found"
                  description="Try changing your search or filters to find a nearby diagnostic centre."
                  action={
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Clear filters
                    </button>
                  }
                />
              )}
            </main>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
          />

          <div className="absolute inset-y-0 left-0 w-[min(90%,360px)] overflow-y-auto bg-gray-50 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false,
                  )
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <CentreFilters
              filters={filters}
              onChange={
                handleFiltersChange
              }
              onReset={handleReset}
            />

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  false,
                )
              }
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              View {filteredCentres.length}{" "}
              {filteredCentres.length === 1
                ? "Centre"
                : "Centres"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}