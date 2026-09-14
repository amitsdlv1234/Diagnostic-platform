import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

import {
  useSearchParams,
} from "react-router-dom";

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


/* =========================================================
   DEFAULT FILTERS
   ========================================================= */

const DEFAULT_FILTERS: PackageFiltersType = {
  search: "",
  category: "All",
  homeCollection: false,
  minPrice: 0,
  maxPrice: 10000,
};


/* =========================================================
   PAGINATION
   ========================================================= */

const ITEMS_PER_PAGE = 6;


/* =========================================================
   CATEGORY ICONS
   ========================================================= */

const CATEGORY_ICONS: Record<
  string,
  string
> = {
  All: "❤️",
  "Full Body": "🩺",
  Diabetes: "🩸",
  "Heart Health": "❤️",
  "Women Health": "👩",
  "Men Health": "👨",
  "Senior Citizen": "👴",
  Thyroid: "🦋",
  Vitamin: "💊",
  "Liver Health": "🫀",
  "Kidney Health": "🫘",
};


/* =========================================================
   PACKAGES PAGE
   ========================================================= */

export function Packages() {
  /*
   * Read category from URL.
   *
   * Example:
   *
   * /packages?category=Heart%20Health
   *
   * This is what allows the Home page package cards
   * to open the Packages page with the correct filter.
   */

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") ||
    "All";


  /* =======================================================
     BUILD AVAILABLE CATEGORIES
     ======================================================= */

  const categories = useMemo(() => {
    const unique =
      Array.from(
        new Set(
          healthPackages
            .map(
              (item) =>
                item.category,
            )
            .filter(Boolean),
        ),
      );

    return [
      "All",
      ...unique,
    ];
  }, []);


  /* =======================================================
     INITIAL FILTER
     ======================================================= */

  const initialCategory =
    categories.includes(
      categoryFromUrl,
    )
      ? categoryFromUrl
      : "All";


  const [
    filters,
    setFilters,
  ] = useState<PackageFiltersType>(
    () => ({
      ...DEFAULT_FILTERS,
      category:
        initialCategory,
    }),
  );


  /* =======================================================
     SORT
     ======================================================= */

  const [
    sortBy,
    setSortBy,
  ] = useState<PackageSortOption>(
    "relevance",
  );


  /* =======================================================
     PAGINATION
     ======================================================= */

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);


  /* =======================================================
     MOBILE FILTER DRAWER
     ======================================================= */

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false);


  /* =======================================================
     CATEGORY SCROLL
     ======================================================= */

  const [
    categoryScroll,
    setCategoryScroll,
  ] = useState<HTMLDivElement | null>(
    null,
  );


  /* =======================================================
     SYNC URL -> FILTER
     =======================================================

     If the user opens:

     /packages?category=Heart%20Health

     the selected category becomes:

     Heart Health
  */

  useEffect(() => {
    const requestedCategory =
      searchParams.get(
        "category",
      ) || "All";

    const validCategory =
      categories.includes(
        requestedCategory,
      )
        ? requestedCategory
        : "All";

    setFilters(
      (current) => {
        if (
          current.category ===
          validCategory
        ) {
          return current;
        }

        return {
          ...current,
          category:
            validCategory,
        };
      },
    );

    setCurrentPage(1);
  }, [
    searchParams,
    categories,
  ]);


  /* =======================================================
     FILTER PACKAGES
     ======================================================= */

  const filteredPackages =
    useMemo(() => {
      const filtered =
        filterPackages(
          healthPackages,
          filters,
        );

      return sortPackages(
        filtered,
        sortBy,
      );
    }, [
      filters,
      sortBy,
    ]);


  /* =======================================================
     TOTAL PAGES
     ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredPackages.length /
          ITEMS_PER_PAGE,
      ),
    );


  /* =======================================================
     SAFE CURRENT PAGE
     ======================================================= */

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );


  /* =======================================================
     PAGINATED PACKAGES
     ======================================================= */

  const paginatedPackages =
    filteredPackages.slice(
      (safeCurrentPage - 1) *
        ITEMS_PER_PAGE,

      safeCurrentPage *
        ITEMS_PER_PAGE,
    );


  /* =======================================================
     FILTER CHANGE
     ======================================================= */

  const handleFiltersChange = (
    nextFilters: PackageFiltersType,
  ) => {
    setFilters(
      nextFilters,
    );

    setCurrentPage(1);
  };


  /* =======================================================
     SEARCH CHANGE
     ======================================================= */

  const handleSearchChange = (
    search: string,
  ) => {
    handleFiltersChange({
      ...filters,
      search,
    });
  };


  /* =======================================================
     CATEGORY CHANGE
     =======================================================

     IMPORTANT:

     When the user clicks a category, we also update
     the URL.

     Example:

     /packages
          ↓
     click Heart Health
          ↓
     /packages?category=Heart%20Health
  */

  const handleCategoryChange = (
    category: string,
  ) => {
    const nextFilters = {
      ...filters,
      category,
    };

    setFilters(
      nextFilters,
    );

    setCurrentPage(1);


    const nextParams =
      new URLSearchParams(
        searchParams,
      );


    if (
      category === "All"
    ) {
      nextParams.delete(
        "category",
      );
    } else {
      nextParams.set(
        "category",
        category,
      );
    }


    setSearchParams(
      nextParams,
    );
  };


  /* =======================================================
     RESET
     ======================================================= */

  const handleReset = () => {
    setFilters(
      DEFAULT_FILTERS,
    );

    setSortBy(
      "relevance",
    );

    setCurrentPage(1);


    /*
     * Remove category from URL
     */

    const nextParams =
      new URLSearchParams(
        searchParams,
      );

    nextParams.delete(
      "category",
    );

    setSearchParams(
      nextParams,
    );
  };


  /* =======================================================
     ACTIVE FILTER CHECK
     ======================================================= */

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "All" ||
    filters.homeCollection ||
    filters.minPrice !== 0 ||
    filters.maxPrice !== 10000;


  /* =======================================================
     CATEGORY SCROLL
     ======================================================= */

  const scrollCategories = (
    direction:
      | "left"
      | "right",
  ) => {
    if (
      !categoryScroll
    ) {
      return;
    }

    categoryScroll.scrollBy({
      left:
        direction ===
        "right"
          ? 260
          : -260,

      behavior:
        "smooth",
    });
  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="bg-gradient-to-b from-blue-50 via-white to-white">

        <Container>

          <div className="px-0 pb-8 pt-8 sm:pb-10 sm:pt-12">

            <div className="text-center">

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                Health Packages
              </span>


              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                Find the right health package
              </h1>


              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Choose from preventive
                health checkups
                designed for your age,
                lifestyle and wellness
                needs.
              </p>

            </div>


            {/* =================================================
                SEARCH
                ================================================= */}

            <div className="mx-auto mt-7 max-w-3xl">

              <PackageSearchBar
                value={
                  filters.search
                }
                onChange={
                  handleSearchChange
                }
              />

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          BROWSE BY HEALTH NEED
          ===================================================== */}

      <section className="border-b border-gray-100 bg-white">

        <Container>

          <div className="py-7">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-gray-950">
                  Browse by health need
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Select a category to
                  explore packages
                </p>

              </div>


              {/* Category arrows */}

              {categories.length >
                5 && (
                <div className="hidden gap-2 sm:flex">

                  <button
                    type="button"
                    onClick={() =>
                      scrollCategories(
                        "left",
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
                    aria-label="Previous categories"
                  >
                    <ChevronLeft
                      size={18}
                    />
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      scrollCategories(
                        "right",
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
                    aria-label="Next categories"
                  >
                    <ChevronRight
                      size={18}
                    />
                  </button>

                </div>
              )}

            </div>


            {/* =================================================
                CATEGORY LIST
                ================================================= */}

            <div className="relative">

              {/* Left fade */}

              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent" />


              <div
                ref={
                  setCategoryScroll
                }
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-none"
              >

                {categories.map(
                  (
                    category,
                  ) => {

                    const selected =
                      filters.category ===
                      category;


                    const icon =
                      CATEGORY_ICONS[
                        category
                      ] ??
                      "🩺";


                    return (
                      <button
                        key={
                          category
                        }
                        type="button"
                        onClick={() =>
                          handleCategoryChange(
                            category,
                          )
                        }
                        className={`group flex min-w-[125px] shrink-0 flex-col items-center justify-center rounded-2xl border px-5 py-4 text-center transition ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >

                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${
                            selected
                              ? "bg-white/15"
                              : "bg-blue-50"
                          }`}
                        >
                          {icon}
                        </span>


                        <span
                          className={`mt-2 whitespace-nowrap text-xs font-bold ${
                            selected
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {
                            category
                          }
                        </span>

                      </button>
                    );
                  },
                )}

              </div>


              {/* Right fade */}

              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent" />

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          RESULTS
          ===================================================== */}

      <Container>

        <div className="py-8 sm:py-10">

          {/* =================================================
              MOBILE CONTROLS
              ================================================= */}

          <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  true,
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm"
            >
              <Filter
                size={17}
              />

              Filters

            </button>


            <PackageSort
              value={
                sortBy
              }
              onChange={(
                value,
              ) => {
                setSortBy(
                  value,
                );

                setCurrentPage(
                  1,
                );
              }}
            />

          </div>


          {/* =================================================
              MAIN GRID
              ================================================= */}

          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">


            {/* =================================================
                FILTER SIDEBAR
                ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24">

                <PackageFilters
                  filters={
                    filters
                  }
                  onChange={
                    handleFiltersChange
                  }
                  onReset={
                    handleReset
                  }
                />

              </div>

            </aside>


            {/* =================================================
                PACKAGE RESULTS
                ================================================= */}

            <main>

              {/* Result header */}

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-gray-600">

                    Showing{" "}

                    <span className="font-bold text-gray-950">

                      {
                        filteredPackages.length
                      }

                    </span>{" "}

                    {filteredPackages.length ===
                    1
                      ? "package"
                      : "packages"}

                  </p>


                  {filters.category !==
                    "All" && (
                    <p className="mt-1 text-xs font-medium text-blue-600">
                      Category:{" "}
                      {
                        filters.category
                      }
                    </p>
                  )}


                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={
                        handleReset
                      }
                      className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                      filters
                    </button>
                  )}

                </div>


                {/* Desktop sort */}

                <div className="hidden lg:block">

                  <PackageSort
                    value={
                      sortBy
                    }
                    onChange={(
                      value,
                    ) => {
                      setSortBy(
                        value,
                      );

                      setCurrentPage(
                        1,
                      );
                    }}
                  />

                </div>

              </div>


              {/* =================================================
                  PACKAGE CARDS
                  ================================================= */}

              {paginatedPackages.length >
              0 ? (
                <>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                    {paginatedPackages.map(
                      (
                        packageData,
                      ) => (
                        <PackageCard
                          key={
                            packageData.id
                          }
                          packageData={
                            packageData
                          }
                        />
                      ),
                    )}

                  </div>


                  {/* =================================================
                      PAGINATION
                      ================================================= */}

                  {totalPages >
                    1 && (

                    <div className="mt-10 flex items-center justify-center gap-2">

                      {/* Previous */}

                      <button
                        type="button"
                        disabled={
                          safeCurrentPage ===
                          1
                        }
                        onClick={() =>
                          setCurrentPage(
                            (
                              page,
                            ) =>
                              Math.max(
                                1,
                                page -
                                  1,
                              ),
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft
                          size={18}
                        />
                      </button>


                      {/* Page numbers */}

                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (
                          _,
                          index,
                        ) =>
                          index +
                          1,
                      ).map(
                        (
                          page,
                        ) => (
                          <button
                            key={
                              page
                            }
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
                            {
                              page
                            }
                          </button>
                        ),
                      )}


                      {/* Next */}

                      <button
                        type="button"
                        disabled={
                          safeCurrentPage ===
                          totalPages
                        }
                        onClick={() =>
                          setCurrentPage(
                            (
                              page,
                            ) =>
                              Math.min(
                                totalPages,
                                page +
                                  1,
                              ),
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <ChevronRight
                          size={18}
                        />
                      </button>

                    </div>
                  )}

                </>
              ) : (

                /* =================================================
                   NO RESULTS
                   ================================================= */

                <EmptyState
                  title="No packages found"
                  description="Try changing your search or filters to find a suitable health package."
                  action={
                    <button
                      type="button"
                      onClick={
                        handleReset
                      }
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


      {/* =====================================================
          MOBILE FILTER DRAWER
          ===================================================== */}

      {mobileFiltersOpen && (

        <div className="fixed inset-0 z-[60] lg:hidden">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFiltersOpen(
                false,
              )
            }
          />


          {/* Drawer */}

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
              filters={
                filters
              }
              onChange={
                handleFiltersChange
              }
              onReset={
                handleReset
              }
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
              View{" "}
              {
                filteredPackages.length
              }{" "}

              {filteredPackages.length ===
              1
                ? "Package"
                : "Packages"}

            </button>

          </div>

        </div>

      )}

    </div>
  );
}