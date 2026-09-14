import {
  Edit3,
  Plus,
  Power,
  Search,
  X,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";

interface AdminPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  reportTime: string;
  active: boolean;
}

const STORAGE_KEY =
  "diagnostic-admin-packages";

const defaultPackages: AdminPackage[] = [
  {
    id: "package-001",
    name: "Full Body Health Checkup",
    description:
      "Comprehensive health screening package.",
    price: 1999,
    mrp: 2999,
    reportTime: "24-48 Hours",
    active: true,
  },
  {
    id: "package-002",
    name: "Basic Health Checkup",
    description:
      "Essential tests for routine health screening.",
    price: 999,
    mrp: 1499,
    reportTime: "24 Hours",
    active: true,
  },
];

export function AdminPackages() {
  const [packages, setPackages] =
    useState<AdminPackage[]>([]);

  const [editing, setEditing] =
    useState<AdminPackage | null>(null);

  const [isEditorOpen, setIsEditorOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [message, setMessage] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    reportTime: "24-48 Hours",
  });

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setPackages(JSON.parse(stored));
        return;
      } catch {
        // Use defaults below.
      }
    }

    setPackages(defaultPackages);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultPackages),
    );
  }, []);

  const savePackages = (
    updated: AdminPackage[],
  ) => {
    setPackages(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated),
    );
  };

  const resetForm = () => {
    setEditing(null);

    setForm({
      name: "",
      description: "",
      price: "",
      mrp: "",
      reportTime: "24-48 Hours",
    });
  };

  const closeEditor = () => {
    resetForm();
    setIsEditorOpen(false);
  };

  const openAddEditor = () => {
    resetForm();
    setIsEditorOpen(true);
    setMessage("");
  };

  const openEditEditor = (
    item: AdminPackage,
  ) => {
    setEditing(item);

    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      mrp: String(item.mrp),
      reportTime: item.reportTime,
    });

    setIsEditorOpen(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const savePackage = () => {
    const name = form.name.trim();
    const description =
      form.description.trim();

    const price = Number(form.price);
    const mrp = Number(form.mrp);

    if (!name) {
      setMessage(
        "Please enter a package name.",
      );
      return;
    }

    if (!price || price <= 0) {
      setMessage(
        "Please enter a valid selling price.",
      );
      return;
    }

    if (!mrp || mrp <= 0) {
      setMessage(
        "Please enter a valid MRP.",
      );
      return;
    }

    if (price > mrp) {
      setMessage(
        "Selling price cannot be greater than MRP.",
      );
      return;
    }

    if (editing) {
      const updated = packages.map((item) =>
        item.id === editing.id
          ? {
              ...item,
              name,
              description,
              price,
              mrp,
              reportTime:
                form.reportTime.trim() ||
                "24-48 Hours",
            }
          : item,
      );

      savePackages(updated);

      closeEditor();

      setMessage(
        "Package updated successfully.",
      );
    } else {
      const newPackage: AdminPackage = {
        id: `package-${Date.now()}`,
        name,
        description,
        price,
        mrp,
        reportTime:
          form.reportTime.trim() ||
          "24-48 Hours",
        active: true,
      };

      savePackages([
        ...packages,
        newPackage,
      ]);

      closeEditor();

      setMessage(
        "Package added successfully.",
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const togglePackage = (
    packageId: string,
  ) => {
    const updated = packages.map((item) =>
      item.id === packageId
        ? {
            ...item,
            active: !item.active,
          }
        : item,
    );

    savePackages(updated);

    const changed = packages.find(
      (item) => item.id === packageId,
    );

    if (changed) {
      setMessage(
        changed.active
          ? `${changed.name} disabled.`
          : `${changed.name} enabled.`,
      );
    }
  };

  const filtered = packages.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">
            Manage Packages
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add, edit and manage health checkup
            packages.
          </p>
        </div>

        {!isEditorOpen && (
          <button
            type="button"
            onClick={openAddEditor}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Package
          </button>
        )}
      </div>

      {/* Success / information message */}
      {message && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {/* Editor */}
      {isEditorOpen && (
        <div className="mt-6 rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {editing
                  ? "Edit Package"
                  : "Add New Package"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {editing
                  ? "Update the package information below."
                  : "Enter the package information below."}
              </p>
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

          <div className="p-5 sm:p-6">
            {message &&
              !message.includes(
                "successfully",
              ) && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {message}
                </div>
              )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Package Name"
                value={form.name}
                onChange={(value) =>
                  setForm({
                    ...form,
                    name: value,
                  })
                }
                placeholder="e.g. Full Body Checkup"
              />

              <Input
                label="Report Time"
                value={form.reportTime}
                onChange={(value) =>
                  setForm({
                    ...form,
                    reportTime: value,
                  })
                }
                placeholder="e.g. 24-48 Hours"
              />

              <Input
                label="MRP"
                value={form.mrp}
                onChange={(value) =>
                  setForm({
                    ...form,
                    mrp: value,
                  })
                }
                type="number"
                placeholder="2999"
              />

              <Input
                label="Selling Price"
                value={form.price}
                onChange={(value) =>
                  setForm({
                    ...form,
                    price: value,
                  })
                }
                type="number"
                placeholder="1999"
              />

              <div className="sm:col-span-2">
                <Input
                  label="Description"
                  value={form.description}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      description: value,
                    })
                  }
                  placeholder="Describe what this package includes..."
                />
              </div>
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
                onClick={savePackage}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {editing
                  ? "Update Package"
                  : "Save Package"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div
        className={`mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 ${
          isEditorOpen
            ? ""
            : "mt-6"
        }`}
      >
        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search packages..."
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Package List */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-semibold text-gray-900">
              No packages found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try another search or add a new package.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-100 p-5 last:border-b-0"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-gray-900">
                      {item.name}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.active
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.active
                        ? "Active"
                        : "Disabled"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-bold text-gray-900">
                      ₹
                      {item.price.toLocaleString(
                        "en-IN",
                      )}
                    </span>

                    <span className="text-gray-400 line-through">
                      ₹
                      {item.mrp.toLocaleString(
                        "en-IN",
                      )}
                    </span>

                    <span className="text-gray-500">
                      • Report:{" "}
                      {item.reportTime}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEditEditor(item)
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      togglePackage(item.id)
                    }
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      item.active
                        ? "border-red-200 text-red-600 hover:bg-red-50"
                        : "border-green-200 text-green-600 hover:bg-green-50"
                    }`}
                  >
                    <Power size={16} />

                    {item.active
                      ? "Disable"
                      : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
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