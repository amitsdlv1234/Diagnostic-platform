import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  defaultHomeContent,
  getHomeContent,
  saveHomeContent,
  type HeroSlide,
  type HomeContent,

  defaultPopularTestsContent,
  getPopularTestsContent,
  savePopularTestsContent,
  type PopularTestsContent,

  defaultPackagesContent,
  getPackagesContent,
  savePackagesContent,
  type PackagesContent,

  PACKAGES_UPDATED_EVENT,
} from "../../features/home/homeConfig";

import {
  diagnosticTests,
  type DiagnosticTest,
} from "../../features/tests/testData";

export function AdminHome() {
  const [content, setContent] =
    useState<HomeContent>(defaultHomeContent);

  const [popularTests, setPopularTests] =
    useState<PopularTestsContent>(
      defaultPopularTestsContent,
    );

  const [saved, setSaved] =
    useState(false);

  const [popularTestsSaved, setPopularTestsSaved] =
    useState(false);

  const [packagesContent, setPackagesContent] =
    useState<PackagesContent>(() =>
      getPackagesContent(),
    );

  useEffect(() => {
    const handlePackagesUpdate = () => {
      setPackagesContent(getPackagesContent());
    };

    window.addEventListener(
      PACKAGES_UPDATED_EVENT,
      handlePackagesUpdate,
    );

    return () => {
      window.removeEventListener(
        PACKAGES_UPDATED_EVENT,
        handlePackagesUpdate,
      );
    };
  }, []);


  /* =====================================================
     LOAD HOME CONFIGURATION
     ===================================================== */

  useEffect(() => {
    setContent(getHomeContent());

    /*
     * Load Popular Tests configuration and
     * repair old/invalid test IDs.
     */
    const loadedPopularTests =
      getPopularTestsContent();

    const validTestIds =
      new Set(
        diagnosticTests.map(
          (test: DiagnosticTest) =>
            test.id,
        ),
      );

    /*
     * Older configuration used:
     *
     * thyroid
     *
     * But current testData uses:
     *
     * thyroid-profile
     *
     * So convert the old ID here.
     */
    const repairedIds =
      loadedPopularTests.testIds.map(
        (id: string) => {
          if (
            id === "thyroid" &&
            validTestIds.has(
              "thyroid-profile",
            )
          ) {
            return "thyroid-profile";
          }

          return id;
        },
      );

    /*
     * Remove IDs that don't exist in
     * diagnosticTests.
     */
    const validIds =
      repairedIds.filter(
        (id: string) =>
          validTestIds.has(id),
      );

    /*
     * Remove duplicate IDs.
     */
    const uniqueIds = Array.from(
      new Set(validIds),
    );

    /*
     * If old configuration had invalid IDs,
     * replace them with valid IDs.
     */
    setPopularTests({
      ...loadedPopularTests,
      testIds: uniqueIds,
    });

    const handleHomeUpdate = () => {
      setContent(getHomeContent());
    };

    const handlePopularTestsUpdate = () => {
      const updated =
        getPopularTestsContent();

      const repaired =
        updated.testIds.map(
          (id: string) => {
            if (
              id === "thyroid" &&
              validTestIds.has(
                "thyroid-profile",
              )
            ) {
              return "thyroid-profile";
            }

            return id;
          },
        );

      const valid =
        repaired.filter(
          (id: string) =>
            validTestIds.has(id),
        );

      setPopularTests({
        ...updated,
        testIds: Array.from(
          new Set(valid),
        ),
      });
    };

    window.addEventListener(
      "home-content-updated",
      handleHomeUpdate,
    );

    window.addEventListener(
      "popular-tests-updated",
      handlePopularTestsUpdate,
    );

    return () => {
      window.removeEventListener(
        "home-content-updated",
        handleHomeUpdate,
      );

      window.removeEventListener(
        "popular-tests-updated",
        handlePopularTestsUpdate,
      );
    };
  }, []);

  /* =====================================================
     GENERAL HOME CONTENT
     ===================================================== */

  const updateField = (
    field: keyof HomeContent,
    value: string,
  ) => {
    setContent(
      (previous: HomeContent) => ({
        ...previous,
        [field]: value,
      }),
    );
  };

  /* =====================================================
     HERO SLIDE
     ===================================================== */

  const updateSlide = (
    id: string,
    field: keyof HeroSlide,
    value: string | boolean,
  ) => {
    setContent(
      (previous: HomeContent) => ({
        ...previous,

        heroSlides:
          previous.heroSlides.map(
            (slide: HeroSlide) =>
              slide.id === id
                ? {
                  ...slide,
                  [field]: value,
                }
                : slide,
          ),
      }),
    );
  };

  /* =====================================================
     ADD SLIDE
     ===================================================== */

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,

      enabled: true,

      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",

      badge:
        "Trusted diagnostic testing",

      title:
        "Your health deserves",

      highlight:
        "better care.",

      description:
        "Book diagnostic tests and health packages online with convenient home sample collection and digital reports.",

      primaryButtonText:
        "Book a Test",

      primaryButtonLink:
        "/booking",

      secondaryButtonText:
        "Explore Packages",

      secondaryButtonLink:
        "/packages",
    };

    setContent(
      (previous: HomeContent) => ({
        ...previous,

        heroSlides: [
          ...previous.heroSlides,
          newSlide,
        ],
      }),
    );
  };

  /* =====================================================
     DELETE SLIDE
     ===================================================== */

  const deleteSlide = (
    id: string,
  ) => {
    if (
      content.heroSlides.length <= 1
    ) {
      window.alert(
        "At least one hero slide is required.",
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this slide?",
      );

    if (!confirmed) {
      return;
    }

    setContent(
      (previous: HomeContent) => ({
        ...previous,

        heroSlides:
          previous.heroSlides.filter(
            (slide: HeroSlide) =>
              slide.id !== id,
          ),
      }),
    );
  };

  /* =====================================================
     MOVE SLIDE
     ===================================================== */

  const moveSlide = (
    index: number,
    direction:
      | "up"
      | "down",
  ) => {
    setContent(
      (previous: HomeContent) => {
        const slides = [
          ...previous.heroSlides,
        ];

        const newIndex =
          direction === "up"
            ? index - 1
            : index + 1;

        if (
          newIndex < 0 ||
          newIndex >=
          slides.length
        ) {
          return previous;
        }

        const current =
          slides[index];

        slides[index] =
          slides[newIndex];

        slides[newIndex] =
          current;

        return {
          ...previous,
          heroSlides: slides,
        };
      },
    );
  };

  const updatePackagesField = <
    K extends keyof PackagesContent,
  >(
    field: K,
    value: PackagesContent[K],
  ) => {
    setPackagesContent((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const togglePackage = (packageId: string) => {
    setPackagesContent((previous) => {
      const exists =
        previous.packageIds.includes(packageId);

      return {
        ...previous,
        packageIds: exists
          ? previous.packageIds.filter(
            (id) => id !== packageId,
          )
          : [
            ...previous.packageIds,
            packageId,
          ],
      };
    });
  };

  const movePackage = (
    packageId: string,
    direction: "up" | "down",
  ) => {
    setPackagesContent((previous) => {
      const ids = [...previous.packageIds];

      const index = ids.indexOf(packageId);

      if (index === -1) {
        return previous;
      }

      const newIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        newIndex < 0 ||
        newIndex >= ids.length
      ) {
        return previous;
      }

      [
        ids[index],
        ids[newIndex],
      ] = [
          ids[newIndex],
          ids[index],
        ];

      return {
        ...previous,
        packageIds: ids,
      };
    });
  };

  const savePackages = () => {
    savePackagesContent(
      packagesContent,
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  /* =====================================================
     SAVE HERO
     ===================================================== */

  const save = () => {
    saveHomeContent(content);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  /* =====================================================
     POPULAR TESTS
     ===================================================== */

  const updatePopularTestsField = <
    K extends keyof PopularTestsContent
  >(
    field: K,
    value: PopularTestsContent[K],
  ) => {
    setPopularTests(
      (
        previous: PopularTestsContent,
      ) => ({
        ...previous,
        [field]: value,
      }),
    );
  };

  /* =====================================================
     CHANGE NUMBER OF TESTS
     ===================================================== */

  const changePopularTestsCount = (
    count: number,
  ) => {
    /*
     * First clean the currently selected IDs.
     */
    const currentIds =
      popularTests.testIds
        .map((id: string) => {
          /*
           * Repair old thyroid ID.
           */
          if (
            id === "thyroid" &&
            diagnosticTests.some(
              (
                test: DiagnosticTest,
              ) =>
                test.id ===
                "thyroid-profile",
            )
          ) {
            return "thyroid-profile";
          }

          return id;
        })
        .filter(
          (id: string) =>
            diagnosticTests.some(
              (
                test: DiagnosticTest,
              ) =>
                test.id === id,
            ),
        );

    /*
     * Remove duplicates.
     */
    const uniqueCurrentIds =
      Array.from(
        new Set(currentIds),
      );

    /*
     * If selected count is smaller,
     * simply reduce the list.
     */
    if (
      count <=
      uniqueCurrentIds.length
    ) {
      updatePopularTestsField(
        "testIds",
        uniqueCurrentIds.slice(
          0,
          count,
        ),
      );

      return;
    }

    /*
     * If selected count is larger,
     * add more tests from diagnosticTests.
     *
     * This is the important fix.
     */
    const selectedIds =
      new Set(
        uniqueCurrentIds,
      );

    const additionalIds =
      diagnosticTests
        .filter(
          (
            test: DiagnosticTest,
          ) =>
            !selectedIds.has(
              test.id,
            ),
        )
        .map(
          (
            test: DiagnosticTest,
          ) => test.id,
        );

    const newIds = [
      ...uniqueCurrentIds,
      ...additionalIds,
    ].slice(0, count);

    updatePopularTestsField(
      "testIds",
      newIds,
    );
  };

  /* =====================================================
     SAVE POPULAR TESTS
     ===================================================== */

  const savePopularTests = () => {
    /*
     * Always validate IDs before saving.
     */
    const validIds =
      popularTests.testIds
        .map((id: string) => {
          /*
           * Repair old ID.
           */
          if (
            id === "thyroid" &&
            diagnosticTests.some(
              (
                test: DiagnosticTest,
              ) =>
                test.id ===
                "thyroid-profile",
            )
          ) {
            return "thyroid-profile";
          }

          return id;
        })
        .filter(
          (id: string) =>
            diagnosticTests.some(
              (
                test: DiagnosticTest,
              ) =>
                test.id === id,
            ),
        );

    const normalizedIds =
      Array.from(
        new Set(validIds),
      );

    const finalContent: PopularTestsContent =
    {
      ...popularTests,
      testIds:
        normalizedIds,
    };

    /*
     * Update local state first.
     */
    setPopularTests(
      finalContent,
    );

    /*
     * Save configuration.
     */
    savePopularTestsContent(
      finalContent,
    );

    setPopularTestsSaved(
      true,
    );

    window.setTimeout(() => {
      setPopularTestsSaved(
        false,
      );
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Home Page Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your public website
          homepage, hero slider and
          homepage sections.
        </p>
      </div>

      {/* =====================================================
          HERO SLIDER MANAGEMENT
          ===================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Hero Slider Management
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add, edit, reorder and enable
              or disable homepage hero
              slides.
            </p>
          </div>

          <button
            type="button"
            onClick={addSlide}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Slide
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {content.heroSlides.map(
            (
              slide: HeroSlide,
              index: number,
            ) => (
              <HeroSlideEditor
                key={slide.id}
                slide={slide}
                index={index}
                total={
                  content.heroSlides
                    .length
                }
                updateSlide={
                  updateSlide
                }
                moveSlide={
                  moveSlide
                }
                deleteSlide={
                  deleteSlide
                }
              />
            ),
          )}

          {content.heroSlides
            .length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
                <p className="text-sm text-gray-500">
                  No hero slides
                  available.
                </p>

                <button
                  type="button"
                  onClick={addSlide}
                  className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white"
                >
                  Add First Slide
                </button>
              </div>
            )}
        </div>

        <div className="mt-7 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            {saved ? (
              <CheckCircle2
                size={18}
              />
            ) : (
              <Save size={18} />
            )}

            {saved
              ? "Saved Successfully"
              : "Save Hero Slider"}
          </button>
        </div>
      </section>

      {/* =====================================================
          POPULAR TESTS MANAGEMENT
          ===================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                Popular Tests Section
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${popularTests.enabled
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {popularTests.enabled
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Control the Popular Tests
              section displayed on your
              homepage.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              updatePopularTestsField(
                "enabled",
                !popularTests.enabled,
              )
            }
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${popularTests.enabled
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-green-600 text-white hover:bg-green-700"
              }`}
          >
            {popularTests.enabled ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}

            {popularTests.enabled
              ? "Disable Section"
              : "Enable Section"}
          </button>
        </div>

        <div className="mt-6 grid gap-5">
          <Field
            label="Section Badge"
            value={
              popularTests.badge
            }
            onChange={(value) =>
              updatePopularTestsField(
                "badge",
                value,
              )
            }
          />

          <Field
            label="Section Title"
            value={
              popularTests.title
            }
            onChange={(value) =>
              updatePopularTestsField(
                "title",
                value,
              )
            }
          />

          <Field
            label="Section Description"
            value={
              popularTests.description
            }
            textarea
            onChange={(value) =>
              updatePopularTestsField(
                "description",
                value,
              )
            }
          />

          {/* =================================================
              VIEW ALL BUTTON
              ================================================= */}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="View All Button Text"
              value={
                popularTests.viewAllText
              }
              onChange={(value) =>
                updatePopularTestsField(
                  "viewAllText",
                  value,
                )
              }
            />

            <Field
              label="View All Button Link"
              value={
                popularTests.viewAllLink
              }
              onChange={(value) =>
                updatePopularTestsField(
                  "viewAllLink",
                  value,
                )
              }
            />
          </div>

          {/* =================================================
              TEST COUNT
              ================================================= */}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Number of Tests to Display
            </label>

            <select
              value={
                Math.min(
                  popularTests.testIds
                    .length,
                  diagnosticTests.length,
                )
              }
              onChange={(event) => {
                const count =
                  Number(
                    event.target.value,
                  );

                changePopularTestsCount(
                  count,
                );
              }}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
            >
              {[
                4,
                6,
                8,
                10,
                12,
              ]
                .filter(
                  (count) =>
                    count <=
                    diagnosticTests.length,
                )
                .map(
                  (count) => (
                    <option
                      key={count}
                      value={count}
                    >
                      {count} Tests
                    </option>
                  ),
                )}
            </select>

            <p className="mt-1 text-xs text-gray-400">
              Selecting a larger number
              automatically adds more tests
              from your diagnostic test list.
            </p>
          </div>

          {/* =================================================
              SELECTED TESTS PREVIEW
              ================================================= */}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Selected Tests
            </label>

            <div className="mt-2 flex flex-wrap gap-2">
              {popularTests.testIds.map(
                (id: string, index: number) => {
                  const test =
                    diagnosticTests.find(
                      (
                        item: DiagnosticTest,
                      ) =>
                        item.id === id,
                    );

                  return (
                    <span
                      key={`${id}-${index}`}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                    >
                      {index + 1}.{" "}
                      {test?.name ??
                        id}
                    </span>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            PREVIEW
            ================================================= */}

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Section Preview
          </p>

          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-blue-600">
            {popularTests.badge}
          </p>

          <h3 className="mt-2 text-xl font-bold text-gray-950">
            {popularTests.title}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
            {popularTests.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700">
              {
                popularTests
                  .testIds.length
              }{" "}
              tests
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${popularTests.enabled
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
                }`}
            >
              {popularTests.enabled
                ? "Visible on Home"
                : "Hidden from Home"}
            </span>
          </div>

          <div className="mt-4">
            <span className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white">
              {
                popularTests.viewAllText
              }
            </span>
          </div>
        </div>

        {/* =================================================
            SAVE
            ================================================= */}

        <div className="mt-7 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={
              savePopularTests
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            {popularTestsSaved ? (
              <CheckCircle2
                size={18}
              />
            ) : (
              <Save size={18} />
            )}

            {popularTestsSaved
              ? "Saved Successfully"
              : "Save Popular Tests"}
          </button>
        </div>
      </section>

      {/* =====================================================
    PACKAGES MANAGEMENT
    ===================================================== */}

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Packages Section
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Control which health packages appear on
              the Home page and their order.
            </p>
          </div>

          {/* Enable / Disable */}

          <button
            type="button"
            onClick={() =>
              updatePackagesField(
                "enabled",
                !packagesContent.enabled,
              )
            }
            className={`rounded-full px-4 py-2 text-xs font-bold ${packagesContent.enabled
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
              }`}
          >
            {packagesContent.enabled
              ? "Enabled"
              : "Disabled"}
          </button>
        </div>

        {/* Content */}

        <div className="mt-6 space-y-5">
          <Field
            label="Badge"
            value={packagesContent.badge}
            onChange={(value) =>
              updatePackagesField(
                "badge",
                value,
              )
            }
          />

          <Field
            label="Title"
            value={packagesContent.title}
            onChange={(value) =>
              updatePackagesField(
                "title",
                value,
              )
            }
          />

          <Field
            label="Description"
            value={
              packagesContent.description
            }
            textarea
            onChange={(value) =>
              updatePackagesField(
                "description",
                value,
              )
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="View All Button Text"
              value={
                packagesContent.viewAllText
              }
              onChange={(value) =>
                updatePackagesField(
                  "viewAllText",
                  value,
                )
              }
            />

            <Field
              label="View All Button Link"
              value={
                packagesContent.viewAllLink
              }
              onChange={(value) =>
                updatePackagesField(
                  "viewAllLink",
                  value,
                )
              }
            />
          </div>
        </div>

        {/* Package Selection */}

        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-900">
            Select Packages
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Selected packages will be displayed on
            the Home page.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {defaultPackagesContent.packageIds.map(
              (packageId) => {
                const selected =
                  packagesContent.packageIds.includes(
                    packageId,
                  );

                return (
                  <button
                    key={packageId}
                    type="button"
                    onClick={() =>
                      togglePackage(packageId)
                    }
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {packageId}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${selected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {selected
                        ? "Selected"
                        : "Add"}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Selected Order */}

        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-900">
            Display Order
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Use the arrows to change the order shown
            on the Home page.
          </p>

          <div className="mt-4 space-y-2">
            {packagesContent.packageIds.map(
              (packageId, index) => (
                <div
                  key={packageId}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {index + 1}
                    </span>

                    <span className="text-sm font-semibold text-gray-800">
                      {packageId}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() =>
                        movePackage(
                          packageId,
                          "up",
                        )
                      }
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      disabled={
                        index ===
                        packagesContent
                          .packageIds
                          .length -
                        1
                      }
                      onClick={() =>
                        movePackage(
                          packageId,
                          "down",
                        )
                      }
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Save */}

        <button
          type="button"
          onClick={savePackages}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          {saved ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}

          {saved
            ? "Saved Successfully"
            : "Save Packages"}
        </button>
      </div>

      {/* =====================================================
          DEFAULT HERO CONTENT
          ===================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Default Hero Content
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            This content is used as the
            fallback homepage hero content.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <Field
            label="Hero Title"
            value={
              content.heroTitle
            }
            onChange={(value) =>
              updateField(
                "heroTitle",
                value,
              )
            }
          />

          <Field
            label="Hero Highlight"
            value={
              content.heroHighlight
            }
            onChange={(value) =>
              updateField(
                "heroHighlight",
                value,
              )
            }
          />

          <Field
            label="Hero Description"
            value={
              content.heroDescription
            }
            textarea
            onChange={(value) =>
              updateField(
                "heroDescription",
                value,
              )
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Primary Button Text"
              value={
                content.primaryButtonText
              }
              onChange={(value) =>
                updateField(
                  "primaryButtonText",
                  value,
                )
              }
            />

            <Field
              label="Primary Button Link"
              value={
                content.primaryButtonLink
              }
              onChange={(value) =>
                updateField(
                  "primaryButtonLink",
                  value,
                )
              }
            />

            <Field
              label="Secondary Button Text"
              value={
                content.secondaryButtonText
              }
              onChange={(value) =>
                updateField(
                  "secondaryButtonText",
                  value,
                )
              }
            />

            <Field
              label="Secondary Button Link"
              value={
                content.secondaryButtonLink
              }
              onChange={(value) =>
                updateField(
                  "secondaryButtonLink",
                  value,
                )
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   HERO SLIDE EDITOR
   ========================================================= */

function HeroSlideEditor({
  slide,
  index,
  total,
  updateSlide,
  moveSlide,
  deleteSlide,
}: {
  slide: HeroSlide;
  index: number;
  total: number;

  updateSlide: (
    id: string,
    field: keyof HeroSlide,
    value: string | boolean,
  ) => void;

  moveSlide: (
    index: number,
    direction:
      | "up"
      | "down",
  ) => void;

  deleteSlide: (
    id: string,
  ) => void;
}) {
  return (
    <div
      className={`rounded-2xl border ${slide.enabled
        ? "border-gray-200"
        : "border-gray-200 bg-gray-50"
        }`}
    >
      {/* =================================================
          SLIDE HEADER
          ================================================= */}

      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              Slide {index + 1}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${slide.enabled
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500"
                }`}
            >
              {slide.enabled
                ? "Enabled"
                : "Disabled"}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {slide.title}{" "}
            {slide.highlight}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              updateSlide(
                slide.id,
                "enabled",
                !slide.enabled,
              )
            }
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            {slide.enabled ? (
              <EyeOff size={15} />
            ) : (
              <Eye size={15} />
            )}

            {slide.enabled
              ? "Disable"
              : "Enable"}
          </button>

          <button
            type="button"
            disabled={
              index === 0
            }
            onClick={() =>
              moveSlide(
                index,
                "up",
              )
            }
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Move slide up"
          >
            <ArrowUp size={16} />
          </button>

          <button
            type="button"
            disabled={
              index ===
              total - 1
            }
            onClick={() =>
              moveSlide(
                index,
                "down",
              )
            }
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Move slide down"
          >
            <ArrowDown size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              deleteSlide(
                slide.id,
              )
            }
            className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
            aria-label="Delete slide"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* =================================================
          SLIDE CONTENT
          ================================================= */}

      <div className="grid gap-6 p-5 lg:grid-cols-[280px_1fr]">
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Image Preview
          </label>

          <div className="mt-2 aspect-video overflow-hidden rounded-xl bg-gray-100">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          </div>

          <div className="mt-4">
            <Field
              label="Image URL"
              value={slide.image}
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "image",
                  value,
                )
              }
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Badge"
              value={
                slide.badge
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "badge",
                  value,
                )
              }
            />

            <Field
              label="Title"
              value={
                slide.title
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "title",
                  value,
                )
              }
            />

            <Field
              label="Highlight"
              value={
                slide.highlight
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "highlight",
                  value,
                )
              }
            />
          </div>

          <Field
            label="Description"
            value={
              slide.description
            }
            textarea
            onChange={(value) =>
              updateSlide(
                slide.id,
                "description",
                value,
              )
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Primary Button Text"
              value={
                slide.primaryButtonText
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "primaryButtonText",
                  value,
                )
              }
            />

            <Field
              label="Primary Button Link"
              value={
                slide.primaryButtonLink
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "primaryButtonLink",
                  value,
                )
              }
            />

            <Field
              label="Secondary Button Text"
              value={
                slide.secondaryButtonText
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "secondaryButtonText",
                  value,
                )
              }
            />

            <Field
              label="Secondary Button Link"
              value={
                slide.secondaryButtonLink
              }
              onChange={(value) =>
                updateSlide(
                  slide.id,
                  "secondaryButtonLink",
                  value,
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          rows={4}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      ) : (
        <input
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      )}
    </div>
  );
}