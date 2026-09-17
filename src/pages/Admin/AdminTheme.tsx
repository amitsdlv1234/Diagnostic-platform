import {
  Check,
  Palette,
  RotateCcw,
  Save,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useTheme,
} from "../../components/theme/ThemeProvider";

import type {
  SectionColors,
  SectionName,
  ThemeConfig,
} from "../../features/theme/themeConfig";

const sectionOptions: {
  key: SectionName;
  name: string;
  description: string;
}[] = [
  {
    key: "hero",
    name: "Hero Slider",
    description: "Main banner / hero section",
  },
  {
    key: "popularTests",
    name: "Popular Tests",
    description: "Popular diagnostic tests",
  },
  {
    key: "packages",
    name: "Packages",
    description: "Health packages section",
  },
  {
    key: "homeCollection",
    name: "Home Collection",
    description: "Home sample collection section",
  },
  {
    key: "centres",
    name: "Diagnostic Centres",
    description: "Diagnostic centre section",
  },
  {
    key: "whyChooseUs",
    name: "Why Choose Us",
    description: "Benefits / advantages section",
  },
  {
    key: "howItWorks",
    name: "How It Works",
    description: "Process / steps section",
  },
  {
    key: "articles",
    name: "Health Articles",
    description: "Articles and blogs section",
  },
  {
    key: "testimonials",
    name: "Testimonials",
    description: "Patient testimonials section",
  },
  {
    key: "faq",
    name: "FAQ",
    description: "Frequently asked questions",
  },
  {
    key: "cta",
    name: "CTA",
    description: "Call-to-action section",
  },
];

const colorFields: {
  key: keyof SectionColors;
  label: string;
  description: string;
}[] = [
  {
    key: "background",
    label: "Background",
    description: "Main section background",
  },
  {
    key: "heading",
    label: "Heading",
    description: "Main headings and titles",
  },
  {
    key: "text",
    label: "Text",
    description: "Normal paragraph text",
  },
  {
    key: "accent",
    label: "Accent",
    description: "Icons, highlights and badges",
  },
  {
    key: "buttonBackground",
    label: "Button Background",
    description: "Primary button background",
  },
  {
    key: "buttonText",
    label: "Button Text",
    description: "Text inside buttons",
  },
  {
    key: "cardBackground",
    label: "Card Background",
    description: "Cards inside this section",
  },
  {
    key: "border",
    label: "Border",
    description: "Card and component borders",
  },
];

export function AdminTheme() {
  const {
    theme,
    setTheme,
    resetTheme,
  } = useTheme();

  const [
    draft,
    setDraft,
  ] = useState<ThemeConfig>(theme);

  const [
    selectedSection,
    setSelectedSection,
  ] = useState<SectionName>("hero");

  const [
    saved,
    setSaved,
  ] = useState(false);

  /*
   * Keep draft synchronized if theme
   * changes from another browser tab.
   */
  useEffect(() => {
    setDraft(theme);
  }, [theme]);

  /*
   * Currently selected section colors.
   */
  const sectionColors =
    draft.sections[selectedSection];

  /*
   * Update one section color.
   */
  const updateSectionColor = (
    field: keyof SectionColors,
    value: string,
  ) => {
    setDraft(
      (
        previous: ThemeConfig,
      ): ThemeConfig => ({
        ...previous,

        sections: {
          ...previous.sections,

          [selectedSection]: {
            ...previous.sections[
              selectedSection
            ],
            [field]: value,
          },
        },
      }),
    );
  };

  /*
   * Save complete theme.
   */
  const save = () => {
    setTheme(draft);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  /*
   * Reset theme.
   */
  const reset = () => {
    resetTheme();
  };

  return (
    <div className="max-w-7xl">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div>
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-green-50
              text-green-600
            "
          >
            <Palette size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-950">
              Theme & Appearance
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Customize colors for every section of
              your diagnostic platform.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <div className="mt-7 grid gap-6 lg:grid-cols-[280px_1fr_320px]">
        {/* ===================================================
            SECTION LIST
            =================================================== */}

        <div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="px-2 text-sm font-bold text-gray-900">
              Website Sections
            </h2>

            <p className="px-2 pt-1 text-xs text-gray-500">
              Select a section to customize.
            </p>

            <div className="mt-4 space-y-1.5">
              {sectionOptions.map(
                (section) => {
                  const selected =
                    selectedSection ===
                    section.key;

                  const colors =
                    draft.sections[
                      section.key
                    ];

                  return (
                    <button
                      key={section.key}
                      type="button"
                      onClick={() =>
                        setSelectedSection(
                          section.key,
                        )
                      }
                      className={`
                        w-full
                        rounded-xl
                        border
                        p-3
                        text-left
                        transition
                        ${
                          selected
                            ? "border-green-500 bg-green-50"
                            : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="
                            h-9
                            w-9
                            shrink-0
                            rounded-lg
                            border
                            border-gray-200
                          "
                          style={{
                            backgroundColor:
                              colors.background,
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            className={`
                              truncate
                              text-sm
                              font-bold
                              ${
                                selected
                                  ? "text-green-700"
                                  : "text-gray-900"
                              }
                            `}
                          >
                            {section.name}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-gray-500">
                            {section.description}
                          </p>
                        </div>

                        {selected && (
                          <Check
                            size={17}
                            className="shrink-0 text-green-600"
                          />
                        )}
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            COLOR SETTINGS
            =================================================== */}

        <div>
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            {/* Section heading */}

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-950">
                  {
                    sectionOptions.find(
                      (item) =>
                        item.key ===
                        selectedSection,
                    )?.name
                  }
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {
                    sectionOptions.find(
                      (item) =>
                        item.key ===
                        selectedSection,
                    )?.description
                  }
                </p>
              </div>

              <div
                className="h-10 w-10 shrink-0 rounded-xl border border-gray-200"
                style={{
                  backgroundColor:
                    sectionColors.background,
                }}
              />
            </div>

            {/* Color fields */}

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {colorFields.map(
                (field) => {
                  const value =
                    sectionColors[
                      field.key
                    ];

                  return (
                    <div
                      key={field.key}
                      className="
                        rounded-xl
                        border
                        border-gray-200
                        p-4
                      "
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <label
                            htmlFor={`color-${field.key}`}
                            className="text-sm font-bold text-gray-900"
                          >
                            {field.label}
                          </label>

                          <p className="mt-1 text-xs text-gray-500">
                            {field.description}
                          </p>
                        </div>

                        {/* Color preview */}

                        <span
                          className="
                            h-8
                            w-8
                            shrink-0
                            rounded-lg
                            border
                            border-gray-200
                          "
                          style={{
                            backgroundColor:
                              value,
                          }}
                        />
                      </div>

                      <div className="mt-4 flex gap-2">
                        {/* Color picker */}

                        <input
                          id={`color-${field.key}`}
                          type="color"
                          value={
                            isValidHexColor(
                              value,
                            )
                              ? value
                              : "#ffffff"
                          }
                          onChange={(event) =>
                            updateSectionColor(
                              field.key,
                              event.target.value,
                            )
                          }
                          className="
                            h-10
                            w-12
                            cursor-pointer
                            rounded-lg
                            border
                            border-gray-300
                            bg-white
                            p-1
                          "
                        />

                        {/* Hex input */}

                        <input
                          type="text"
                          value={value}
                          onChange={(event) =>
                            updateSectionColor(
                              field.key,
                              event.target.value,
                            )
                          }
                          placeholder="#ffffff"
                          className="
                            h-10
                            flex-1
                            rounded-lg
                            border
                            border-gray-300
                            px-3
                            font-mono
                            text-sm
                            text-gray-900
                            outline-none
                            focus:border-green-500
                            focus:ring-2
                            focus:ring-green-100
                          "
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            {/* Reset section */}

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-700">
                Section customization
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Changes are applied to this section
                only. Other sections will not be
                affected.
              </p>
            </div>
          </section>

          {/* =================================================
              ACTIONS
              ================================================= */}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={save}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-green-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-green-700
              "
            >
              {saved ? (
                <Check size={18} />
              ) : (
                <Save size={18} />
              )}

              {saved
                ? "Theme Saved"
                : "Save Theme"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-300
                bg-white
                px-5
                py-3
                text-sm
                font-bold
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              <RotateCcw size={17} />

              Reset All
            </button>
          </div>
        </div>

        {/* ===================================================
            LIVE PREVIEW
            =================================================== */}

        <div>
          <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900">
              Live Preview
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Preview of the selected section colors.
            </p>

            {/* Preview */}

            <div
              className="mt-5 overflow-hidden rounded-2xl border"
              style={{
                backgroundColor:
                  sectionColors.background,
                borderColor:
                  sectionColors.border,
              }}
            >
              {/* Header */}

              <div
                className="p-5"
                style={{
                  backgroundColor:
                    sectionColors.background,
                }}
              >
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold"
                  style={{
                    backgroundColor:
                      sectionColors.accent,
                    color:
                      sectionColors.buttonText,
                  }}
                >
                  SECTION PREVIEW
                </span>

                <h3
                  className="mt-3 text-xl font-bold"
                  style={{
                    color:
                      sectionColors.heading,
                  }}
                >
                  Better health starts here
                </h3>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{
                    color:
                      sectionColors.text,
                  }}
                >
                  Trusted diagnostic services
                  designed around your needs.
                </p>

                <button
                  type="button"
                  className="mt-4 rounded-lg px-4 py-2.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      sectionColors.buttonBackground,
                    color:
                      sectionColors.buttonText,
                  }}
                >
                  Book Now
                </button>
              </div>

              {/* Card */}

              <div className="p-4">
                <div
                  className="rounded-xl border p-4"
                  style={{
                    backgroundColor:
                      sectionColors.cardBackground,
                    borderColor:
                      sectionColors.border,
                  }}
                >
                  <p
                    className="text-xs font-semibold"
                    style={{
                      color:
                        sectionColors.accent,
                    }}
                  >
                    Popular Test
                  </p>

                  <p
                    className="mt-2 font-bold"
                    style={{
                      color:
                        sectionColors.heading,
                    }}
                  >
                    Complete Blood Count
                  </p>

                  <p
                    className="mt-2 text-xs leading-5"
                    style={{
                      color:
                        sectionColors.text,
                    }}
                  >
                    Comprehensive blood test for
                    routine health screening.
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className="font-bold"
                      style={{
                        color:
                          sectionColors.heading,
                      }}
                    >
                      ₹499
                    </span>

                    <button
                      type="button"
                      className="rounded-lg px-3 py-2 text-xs font-bold"
                      style={{
                        backgroundColor:
                          sectionColors.buttonBackground,
                        color:
                          sectionColors.buttonText,
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Colors */}

            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-bold text-gray-700">
                Selected Colors
              </p>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {colorFields.map(
                  (field) => (
                    <div
                      key={field.key}
                      title={field.label}
                      className="text-center"
                    >
                      <div
                        className="
                          mx-auto
                          h-7
                          w-7
                          rounded-lg
                          border
                          border-gray-200
                        "
                        style={{
                          backgroundColor:
                            sectionColors[
                              field.key
                            ],
                        }}
                      />

                      <p className="mt-1 truncate text-[9px] text-gray-500">
                        {field.label}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Validate HEX color before passing it
 * to the native color picker.
 */
function isValidHexColor(
  value: string,
): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}