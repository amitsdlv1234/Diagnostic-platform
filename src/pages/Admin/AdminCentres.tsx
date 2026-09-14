import {
  CheckCircle2,
  Edit3,
  MapPin,
  Plus,
  Power,
  Search,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

interface Centre {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  active: boolean;
}

const STORAGE_KEY =
  "diagnostic-admin-centres";

const defaults: Centre[] = [
  {
    id: "centre-001",
    name: "Diagnostic Centre - Lucknow",
    address: "Hazratganj",
    city: "Lucknow",
    phone: "9876543210",
    active: true,
  },
];

export function AdminCentres() {
  const [centres, setCentres] =
    useState<Centre[]>([]);

  const [editing, setEditing] =
    useState<Centre | null>(null);

  const [isEditorOpen, setIsEditorOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setCentres(JSON.parse(stored));
        return;
      } catch {
        // Use defaults.
      }
    }

    setCentres(defaults);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaults),
    );
  }, []);

  const saveCentres = (
    items: Centre[],
  ) => {
    setCentres(items);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items),
    );
  };

  const resetForm = () => {
    setEditing(null);

    setForm({
      name: "",
      address: "",
      city: "",
      phone: "",
    });

    setError("");
  };

  const closeEditor = () => {
    resetForm();
    setIsEditorOpen(false);
    setError("");
  };

  const openAddEditor = () => {
    resetForm();

    setIsEditorOpen(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openEditEditor = (
    centre: Centre,
  ) => {
    setEditing(centre);

    setForm({
      name: centre.name,
      address: centre.address,
      city: centre.city,
      phone: centre.phone,
    });

    setIsEditorOpen(true);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const submit = () => {
    const name = form.name.trim();
    const address = form.address.trim();
    const city = form.city.trim();
    const phone = form.phone.trim();

    if (!name) {
      setError(
        "Please enter the centre name.",
      );
      return;
    }

    if (!city) {
      setError(
        "Please enter the city.",
      );
      return;
    }

    if (!address) {
      setError(
        "Please enter the centre address.",
      );
      return;
    }

    if (!phone) {
      setError(
        "Please enter the centre phone number.",
      );
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError(
        "Please enter a valid 10-digit phone number.",
      );
      return;
    }

    setError("");

    if (editing) {
      const updated = centres.map(
        (centre) =>
          centre.id === editing.id
            ? {
                ...centre,
                name,
                address,
                city,
                phone,
              }
            : centre,
      );

      saveCentres(updated);

      closeEditor();

      setMessage(
        "Centre updated successfully.",
      );
    } else {
      const newCentre: Centre = {
        id: `centre-${Date.now()}`,
        name,
        address,
        city,
        phone,
        active: true,
      };

      saveCentres([
        ...centres,
        newCentre,
      ]);

      closeEditor();

      setMessage(
        "Centre added successfully.",
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleCentre = (
    centreId: string,
  ) => {
    const centre = centres.find(
      (item) => item.id === centreId,
    );

    const updated = centres.map(
      (item) =>
        item.id === centreId
          ? {
              ...item,
              active: !item.active,
            }
          : item,
    );

    saveCentres(updated);

    if (centre) {
      setMessage(
        centre.active
          ? `${centre.name} disabled.`
          : `${centre.name} enabled.`,
      );
    }
  };

  const filteredCentres =
    centres.filter((centre) => {
      const query =
        search.toLowerCase().trim();

      if (!query) {
        return true;
      }

      return (
        centre.name
          .toLowerCase()
          .includes(query) ||
        centre.city
          .toLowerCase()
          .includes(query) ||
        centre.address
          .toLowerCase()
          .includes(query) ||
        centre.phone.includes(query)
      );
    });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">
            Diagnostic Centres
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage collection centres available
            to patients.
          </p>
        </div>

        {!isEditorOpen && (
          <button
            type="button"
            onClick={openAddEditor}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Centre
          </button>
        )}
      </div>

      {/* Success message */}
      {message && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {/* Editor */}
      {isEditorOpen && (
        <div className="mt-6 rounded-2xl border border-blue-200 bg-white shadow-sm">
          {/* Editor Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editing
                    ? "Edit Centre"
                    : "Add New Centre"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editing
                    ? "Update centre information."
                    : "Enter the centre information below."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeEditor}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close editor"
            >
              <X size={20} />
            </button>
          </div>

          {/* Editor Body */}
          <div className="p-5 sm:p-6">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Centre Name"
                value={form.name}
                onChange={(value) =>
                  setForm({
                    ...form,
                    name: value,
                  })
                }
                placeholder="Diagnostic Centre - Lucknow"
              />

              <Input
                label="City"
                value={form.city}
                onChange={(value) =>
                  setForm({
                    ...form,
                    city: value,
                  })
                }
                placeholder="Lucknow"
              />

              <Input
                label="Address"
                value={form.address}
                onChange={(value) =>
                  setForm({
                    ...form,
                    address: value,
                  })
                }
                placeholder="Hazratganj"
              />

              <Input
                label="Phone"
                value={form.phone}
                onChange={(value) =>
                  setForm({
                    ...form,
                    phone: value,
                  })
                }
                placeholder="9876543210"
                type="tel"
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {editing ? (
                  <Edit3 size={17} />
                ) : (
                  <Plus size={17} />
                )}

                {editing
                  ? "Update Centre"
                  : "Save Centre"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by centre, city, address or phone..."
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Centre List */}
      <div className="mt-6 space-y-4">
        {filteredCentres.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <MapPin
              size={36}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 font-bold text-gray-900">
              No centres found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try another search or add a new centre.
            </p>
          </div>
        ) : (
          filteredCentres.map(
            (centre) => (
              <div
                key={centre.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-gray-900">
                        {centre.name}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          centre.active
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {centre.active
                          ? "Active"
                          : "Disabled"}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <p>
                        {centre.address},{" "}
                        {centre.city}
                      </p>

                      <p>
                        Phone: {centre.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditEditor(
                          centre,
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleCentre(
                          centre.id,
                        )
                      }
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        centre.active
                          ? "border-red-200 text-red-600 hover:bg-red-50"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      <Power size={16} />

                      {centre.active
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </div>
                </div>
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}