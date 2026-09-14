import {
  Edit3,
  Plus,
  Power,
  Search,
  X,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";

interface AdminTest {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  reportTime: string;
  active: boolean;
}

const STORAGE_KEY = "diagnostic-admin-tests";

const defaultTests: AdminTest[] = [
  {
    id: "test-001",
    name: "Complete Blood Count (CBC)",
    description:
      "Complete blood count diagnostic test.",
    price: 450,
    mrp: 600,
    reportTime: "24 Hours",
    active: true,
  },
  {
    id: "test-002",
    name: "Lipid Profile",
    description:
      "Cholesterol and lipid profile test.",
    price: 700,
    mrp: 900,
    reportTime: "24 Hours",
    active: true,
  },
];

const emptyForm = {
  name: "",
  description: "",
  price: "",
  mrp: "",
  reportTime: "24 Hours",
};

export function AdminTests() {
  const [tests, setTests] = useState<AdminTest[]>([]);
  const [search, setSearch] = useState("");

  const [editing, setEditing] =
    useState<AdminTest | null>(null);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [form, setForm] =
    useState(emptyForm);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setTests(parsed);
          return;
        }
      } catch {
        // fallback to default tests
      }
    }

    setTests(defaultTests);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultTests),
    );
  }, []);

  const saveTests = (
    updated: AdminTest[],
  ) => {
    setTests(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated),
    );
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setError("");
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setIsFormOpen(true);
  };

  const openEdit = (
    test: AdminTest,
  ) => {
    setEditing(test);

    setForm({
      name: test.name,
      description: test.description,
      price: String(test.price),
      mrp: String(test.mrp),
      reportTime: test.reportTime,
    });

    setError("");
    setIsFormOpen(true);
  };

  const saveTest = () => {
    setError("");

    const name = form.name.trim();
    const description =
      form.description.trim();

    const price = Number(form.price);
    const mrp = Number(form.mrp);

    if (!name) {
      setError("Please enter the test name.");
      return;
    }

    if (!price || price <= 0) {
      setError(
        "Please enter a valid selling price.",
      );
      return;
    }

    if (!mrp || mrp <= 0) {
      setError(
        "Please enter a valid MRP.",
      );
      return;
    }

    if (price > mrp) {
      setError(
        "Selling price cannot be greater than MRP.",
      );
      return;
    }

    if (!form.reportTime.trim()) {
      setError(
        "Please enter the report time.",
      );
      return;
    }

    if (editing) {
      const updatedTests =
        tests.map((test) =>
          test.id === editing.id
            ? {
                ...test,
                name,
                description,
                price,
                mrp,
                reportTime:
                  form.reportTime.trim(),
              }
            : test,
        );

      saveTests(updatedTests);

      setSuccessMessage(
        "Test updated successfully.",
      );
    } else {
      const newTest: AdminTest = {
        id: `test-${Date.now()}`,
        name,
        description,
        price,
        mrp,
        reportTime:
          form.reportTime.trim(),
        active: true,
      };

      saveTests([
        ...tests,
        newTest,
      ]);

      setSuccessMessage(
        "Test added successfully.",
      );
    }

    /*
     * IMPORTANT:
     * Close the Add/Edit form immediately
     * after successful save.
     */
    closeForm();

    /*
     * Automatically hide success message.
     */
    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const toggleStatus = (
    id: string,
  ) => {
    const updatedTests =
      tests.map((test) =>
        test.id === id
          ? {
              ...test,
              active: !test.active,
            }
          : test,
      );

    saveTests(updatedTests);

    setSuccessMessage(
      "Test status updated successfully.",
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const filteredTests =
    tests.filter((test) =>
      `${test.name} ${test.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  return (
    <div>
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">
            Manage Tests
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add, edit and manage diagnostic
            tests.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Test
        </button>
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}

      {successMessage && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />

          <span>{successMessage}</span>
        </div>
      )}

      {/* ================= SEARCH ================= */}

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search tests..."
          className="w-full bg-transparent text-sm outline-none"
        />

        {search && (
          <button
            type="button"
            onClick={() =>
              setSearch("")
            }
            className="text-gray-400 hover:text-gray-700"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* ================= TEST LIST ================= */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-gray-100">
          {filteredTests.map(
            (test) => (
              <div
                key={test.id}
                className="p-5 transition hover:bg-gray-50"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-gray-900">
                        {test.name}
                      </h3>

                      {test.active ? (
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-500">
                          Disabled
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {test.description ||
                        "No description available."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <span className="font-bold text-gray-900">
                        ₹
                        {test.price.toLocaleString(
                          "en-IN",
                        )}
                      </span>

                      <span className="text-gray-400 line-through">
                        ₹
                        {test.mrp.toLocaleString(
                          "en-IN",
                        )}
                      </span>

                      <span className="text-gray-500">
                        Report:{" "}
                        <span className="font-semibold text-gray-700">
                          {test.reportTime}
                        </span>
                      </span>

                      {test.mrp >
                        test.price && (
                        <span className="font-semibold text-green-600">
                          Save ₹
                          {(
                            test.mrp -
                            test.price
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEdit(test)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleStatus(
                          test.id,
                        )
                      }
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        test.active
                          ? "border-gray-300 bg-white text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      <Power size={16} />

                      {test.active
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}

          {filteredTests.length ===
            0 && (
            <div className="p-12 text-center">
              <Search
                size={32}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 text-base font-bold text-gray-900">
                No tests found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try another search term.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
          ===================================================== */}

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeForm();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editing
                    ? "Edit Test"
                    : "Add New Test"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editing
                    ? "Update the test information below."
                    : "Enter the details for the new diagnostic test."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <div className="p-5 sm:p-6">
              {/* ERROR */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Test Name"
                  required
                  value={form.name}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      name: value,
                    })
                  }
                  placeholder="e.g. Complete Blood Count"
                />

                <Input
                  label="Report Time"
                  required
                  value={
                    form.reportTime
                  }
                  onChange={(value) =>
                    setForm({
                      ...form,
                      reportTime:
                        value,
                    })
                  }
                  placeholder="e.g. 24 Hours"
                />

                <Input
                  label="MRP"
                  required
                  value={form.mrp}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      mrp: value,
                    })
                  }
                  type="number"
                  placeholder="e.g. 600"
                />

                <Input
                  label="Selling Price"
                  required
                  value={form.price}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      price: value,
                    })
                  }
                  type="number"
                  placeholder="e.g. 450"
                />

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={
                      form.description
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Enter a short description of this diagnostic test..."
                    className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* PRICE PREVIEW */}

              {form.price &&
                form.mrp &&
                Number(form.mrp) >=
                  Number(
                    form.price,
                  ) && (
                  <div className="mt-5 rounded-xl bg-gray-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Price Preview
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                          ₹
                          {Number(
                            form.price,
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          MRP
                        </p>

                        <p className="font-semibold text-gray-400 line-through">
                          ₹
                          {Number(
                            form.mrp,
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Discount
                        </p>

                        <p className="font-bold text-green-600">
                          ₹
                          {(
                            Number(
                              form.mrp,
                            ) -
                            Number(
                              form.price,
                            )
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* BUTTONS */}

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveTest}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  {editing
                    ? "Save Changes"
                    : "Add Test"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   INPUT COMPONENT
   ============================================================ */

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        min={
          type === "number"
            ? "0"
            : undefined
        }
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}