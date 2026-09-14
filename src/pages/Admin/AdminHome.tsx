import {
  CheckCircle2,
  Save,
} from "lucide-react";

import { useEffect, useState } from "react";

interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

const STORAGE_KEY =
  "diagnostic-admin-home-content";

const defaults: HomeContent = {
  heroTitle:
    "Quality Diagnostic Tests, Made Simple",

  heroSubtitle:
    "Book diagnostic tests and health packages from trusted diagnostic centres.",

  primaryButtonText: "Book a Test",

  secondaryButtonText: "Explore Packages",
};

export function AdminHome() {
  const [content, setContent] =
    useState<HomeContent>(defaults);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setContent(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const save = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(content),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Home Page Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Control the main content displayed to patients.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-bold text-gray-900">
          Hero Section
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Update the main website message and buttons.
        </p>

        <div className="mt-6 space-y-5">
          <Field
            label="Hero Title"
            value={content.heroTitle}
            onChange={(value) =>
              setContent({
                ...content,
                heroTitle: value,
              })
            }
          />

          <Field
            label="Hero Subtitle"
            value={content.heroSubtitle}
            onChange={(value) =>
              setContent({
                ...content,
                heroSubtitle: value,
              })
            }
            textarea
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Primary Button"
              value={content.primaryButtonText}
              onChange={(value) =>
                setContent({
                  ...content,
                  primaryButtonText: value,
                })
              }
            />

            <Field
              label="Secondary Button"
              value={content.secondaryButtonText}
              onChange={(value) =>
                setContent({
                  ...content,
                  secondaryButtonText: value,
                })
              }
            />
          </div>
        </div>

        <button
          type="button"
          onClick={save}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          {saved ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}

          {saved ? "Saved" : "Save Home Page"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-semibold text-blue-900">
          Admin Preview
        </p>

        <h2 className="mt-3 text-2xl font-bold text-gray-950">
          {content.heroTitle}
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          {content.heroSubtitle}
        </p>

        <div className="mt-5 flex gap-3">
          <span className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">
            {content.primaryButtonText}
          </span>

          <span className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold">
            {content.secondaryButtonText}
          </span>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
          onChange={(e) =>
            onChange(e.target.value)
          }
          rows={4}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      ) : (
        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      )}
    </div>
  );
}