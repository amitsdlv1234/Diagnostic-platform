import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { Container } from "../../components/common/Container";
import { EmptyState } from "../../components/common/EmptyState";
import { TestCard } from "../../components/cards/TestCard";
import {
  diagnosticTests,
} from "../../features/tests/testData";
import {
  filterTests,
  sortTests,
} from "../../features/tests/testUtils";
import type {
  TestFilters as TestFiltersType,
  TestSortOption,
} from "../../features/tests/testUtils";
import { TestFilters } from "./components/TestFilters";
import { TestSearchBar } from "./components/TestSearchBar";
import { TestSort } from "./components/TestSort";

const DEFAULT_FILTERS: TestFiltersType = {
  search: "",
  category: "All",
  homeCollection: false,
  minPrice: 0,
  maxPrice: 10000,
};

const ITEMS_PER_PAGE = 6;

export function Tests() {
  const [filters, setFilters] =
    useState<TestFiltersType>(DEFAULT_FILTERS);

  const [sortBy, setSortBy] =
    useState<TestSortOption>("relevance");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const filteredTests = useMemo(() => {
    const filtered = filterTests(
      diagnosticTests,
      filters,
    );

    return sortTests(filtered, sortBy);
  }, [filters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTests.length / ITEMS_PER_PAGE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedTests = filteredTests.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  const handleFiltersChange = (
    nextFilters: TestFiltersType,
  ) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
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
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white">
        <Container>
          <div className="py-10 sm:py-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Diagnostic Tests
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Find the right diagnostic test
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Search from our range of diagnostic tests,
              compare prices and choose convenient home
              sample collection where available.
            </p>

            <div className="mt-7 max-w-3xl">
              <TestSearchBar
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-8 sm:py-10">
          {/* Mobile filter button */}
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

            <TestSort
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <TestFilters
                filters={filters}
                onChange={handleFiltersChange}
                onReset={handleReset}
              />
            </div>

            {/* Main content */}
            <main>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredTests.length}
                    </span>{" "}
                    {filteredTests.length === 1
                      ? "test"
                      : "tests"}
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
                  <TestSort
                    value={sortBy}
                    onChange={(value) => {
                      setSortBy(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {paginatedTests.length > 0 ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {paginatedTests.map((test) => (
                      <TestCard
                        key={test.id}
                        test={test}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={safeCurrentPage === 1}
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.max(1, page - 1),
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition ${
                            safeCurrentPage === page
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
                          safeCurrentPage === totalPages
                        }
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.min(
                              totalPages,
                              page + 1,
                            ),
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  title="No tests found"
                  description="Try changing your search or filters to find the diagnostic test you are looking for."
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

      {/* Mobile Filter Drawer */}
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
                  setMobileFiltersOpen(false)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <TestFilters
              filters={filters}
              onChange={handleFiltersChange}
              onReset={handleReset}
            />

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              View {filteredTests.length}{" "}
              {filteredTests.length === 1
                ? "Test"
                : "Tests"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}