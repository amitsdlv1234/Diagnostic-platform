import {
  Check,
  Palette,
  RotateCcw,
  Save,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useTheme,
} from "../../components/theme/ThemeProvider";

import {
  themeColors,
  type ThemeColor,
} from "../../components/theme/themeTypes";

const colorOptions: ThemeColor[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "teal",
  "red",
];

export function AdminTheme() {
  const {
    theme,
    setTheme,
    resetTheme,
  } = useTheme();

  const [draft, setDraft] =
    useState(theme);

  const [saved, setSaved] =
    useState(false);

  const updateDraft = (
    changes: Partial<typeof draft>,
  ) => {
    setDraft({
      ...draft,
      ...changes,
    });
  };

  const save = () => {
    setTheme(draft);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const reset = () => {
    resetTheme();

    setDraft({
      color: "blue",
      mode: "light",
      borderRadius: "medium",
    });
  };

  const selectedColor =
    themeColors[draft.color];

  return (
    <div className="max-w-6xl">
      {/* Header */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Palette size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-950">
              Theme & Appearance
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Customize the look and feel of your
              diagnostic platform.
            </p>
          </div>
        </div>
      </div>

      {/* Main */}

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Settings */}

        <div className="space-y-6">
          {/* Primary Color */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Primary Color
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose the main color used throughout
              the website.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {colorOptions.map(
                (colorName) => {
                  const color =
                    themeColors[colorName];

                  const selected =
                    draft.color === colorName;

                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() =>
                        updateDraft({
                          color: colorName,
                        })
                      }
                      className={`relative rounded-xl border-2 p-4 text-left transition ${
                        selected
                          ? "border-gray-900 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className="h-10 w-10 rounded-full"
                        style={{
                          backgroundColor:
                            color.primary,
                        }}
                      />

                      <p className="mt-3 text-sm font-bold text-gray-900">
                        {color.name}
                      </p>

                      {selected && (
                        <div
                          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white"
                          style={{
                            backgroundColor:
                              color.primary,
                          }}
                        >
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </section>

          {/* Appearance */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select how the website surfaces should
              appear.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <OptionCard
                title="Light"
                description="Clean white interface"
                selected={
                  draft.mode === "light"
                }
                onClick={() =>
                  updateDraft({
                    mode: "light",
                  })
                }
              />

              <OptionCard
                title="Soft"
                description="Softer background surfaces"
                selected={
                  draft.mode === "soft"
                }
                onClick={() =>
                  updateDraft({
                    mode: "soft",
                  })
                }
              />
            </div>
          </section>

          {/* Radius */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Corner Style
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Control how rounded cards and buttons
              should appear.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <OptionCard
                title="Small"
                description="Compact corners"
                selected={
                  draft.borderRadius ===
                  "small"
                }
                onClick={() =>
                  updateDraft({
                    borderRadius:
                      "small",
                  })
                }
              />

              <OptionCard
                title="Medium"
                description="Balanced corners"
                selected={
                  draft.borderRadius ===
                  "medium"
                }
                onClick={() =>
                  updateDraft({
                    borderRadius:
                      "medium",
                  })
                }
              />

              <OptionCard
                title="Large"
                description="Soft modern corners"
                selected={
                  draft.borderRadius ===
                  "large"
                }
                onClick={() =>
                  updateDraft({
                    borderRadius:
                      "large",
                  })
                }
              />
            </div>
          </section>

          {/* Buttons */}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
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
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        </div>

        {/* Preview */}

        <div>
          <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900">
              Live Preview
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Preview of the selected appearance.
            </p>

            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              <div
                className="p-5 text-white"
                style={{
                  backgroundColor:
                    selectedColor.primary,
                }}
              >
                <p className="text-xs font-semibold opacity-80">
                  Diagnostic Platform
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Better health starts here
                </h3>

                <p className="mt-2 text-xs leading-5 opacity-90">
                  Book trusted diagnostic tests
                  and health packages.
                </p>
              </div>

              <div className="space-y-3 p-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500">
                    Popular Test
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    Complete Blood Count
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      ₹499
                    </span>

                    <button
                      type="button"
                      className="rounded-lg px-3 py-2 text-xs font-bold text-white"
                      style={{
                        backgroundColor:
                          selectedColor.primary,
                      }}
                    >
                      Book
                    </button>
                  </div>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor:
                      selectedColor.light,
                  }}
                >
                  <p
                    className="text-xs font-bold"
                    style={{
                      color:
                        selectedColor.text,
                    }}
                  >
                    Home Collection
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Sample collection at your
                    doorstep.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Selected theme
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      selectedColor.primary,
                  }}
                />

                <span className="text-sm font-bold text-gray-900">
                  {selectedColor.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 p-4 text-left transition ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">
          {title}
        </span>

        {selected && (
          <Check
            size={17}
            className="text-blue-600"
          />
        )}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </button>
  );
}