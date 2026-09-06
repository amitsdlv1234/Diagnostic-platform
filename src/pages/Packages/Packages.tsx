import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

import { Container } from "../../components/common/Container";

import { EmptyState } from "../../components/common/EmptyState";

import { PackageCard } from "../../components/cards/PackageCard";

import { healthPackages } from "../../features/packages/packageData";

import {
  filterPackages,
  sortPackages,
} from "../../features/packages/packageUtils";

import type {
  PackageFilters as PackageFiltersType,
  PackageSortOption,
} from "../../features/packages/packageUtils";

import { PackageFilters } from "./components/PackageFilters";
import { PackageSearchBar } from "./components/PackageSearchBar";
import { PackageSort } from "./components/PackageSort";

const DEFAULT_FILTERS: PackageFiltersType = {
  search: "",
  category: "All",
  homeCollection: false,
  minPrice: 0,
  maxPrice: 10000,
};

const ITEMS_PER_PAGE = 6;

export function Packages() {
  const [filters, setFilters] =
    useState<PackageFiltersType>(
      DEFAULT_FILTERS,
    );

  const [sortBy, setSortBy] =
    useState<PackageSortOption>(
      "relevance",
    );

  const [currentPage, setCurrentPage] =
    useState(1);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const filteredPackages = useMemo(() => {
    const filtered = filterPackages(
      healthPackages,
      filters,
    );

    return sortPackages(
      filtered,
      sortBy,
    );
  }, [filters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPackages.length /
        ITEMS_PER_PAGE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedPackages =
    filteredPackages.slice(
      (safeCurrentPage - 1) *
        ITEMS_PER_PAGE,

      safeCurrentPage *
        ITEMS_PER_PAGE,
    );

  const handleFiltersChange = (
    nextFilters: PackageFiltersType,
  ) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (
    search: string,
  ) => {
    handleFiltersChange({
      ...filters,
      search,
    });
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "All" ||
    filters.homeCollection ||
    filters.minPrice !== 0 ||
    filters.maxPrice !== 10000;

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <Container>
          <div className="py-10 sm:py-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Health Packages
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Complete health packages
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Choose a health package designed around
              your wellness needs, compare prices and
              book convenient sample collection.
            </p>

            <div className="mt-7 max-w-3xl">
              <PackageSearchBar
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-8 sm:py-10">
          {/* Mobile controls */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(true)
              }
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700"
            >
              <Filter size={17} />
              Filters
            </button>

            <PackageSort
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
            {/* Desktop filters */}
            <div className="hidden lg:block">
              <PackageFilters
                filters={filters}
                onChange={handleFiltersChange}
                onReset={handleReset}
              />
            </div>

            {/* Results */}
            <main>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredPackages.length}
                    </span>{" "}
                    {filteredPackages.length === 1
                      ? "package"
                      : "packages"}
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

                <div className="hidden lg:block">
                  <PackageSort
                    value={sortBy}
                    onChange={(value) => {
                      setSortBy(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {paginatedPackages.length > 0 ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {paginatedPackages.map(
                      (packageData) => (
                        <PackageCard
                          key={packageData.id}
                          packageData={
                            packageData
                          }
                        />
                      ),
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={
                          safeCurrentPage === 1
                        }
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              Math.max(
                                1,
                                page - 1,
                              ),
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      {Array.from(
                        {
                          length: totalPages,
                        },
                        (_, index) =>
                          index + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              page,
                            )
                          }
                          className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold ${
                            safeCurrentPage ===
                            page
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        disabled={
                          safeCurrentPage ===
                          totalPages
                        }
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              Math.min(
                                totalPages,
                                page + 1,
                              ),
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  title="No packages found"
                  description="Try changing your search or filters to find a suitable health package."
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

            <PackageFilters
              filters={filters}
              onChange={handleFiltersChange}
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
              View {filteredPackages.length}{" "}
              {filteredPackages.length === 1
                ? "Package"
                : "Packages"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}