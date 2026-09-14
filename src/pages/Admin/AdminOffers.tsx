import {
  Edit3,
  Gift,
  Plus,
  Power,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  active: boolean;
}

const STORAGE_KEY =
  "diagnostic-admin-offers";

const defaults: Offer[] = [
  {
    id: "offer-001",
    title: "Full Body Checkup Offer",
    description:
      "Get special discount on selected health packages.",
    discount: 20,
    active: true,
  },
];

export function AdminOffers() {
  const [offers, setOffers] =
    useState<Offer[]>([]);

  const [editing, setEditing] =
    useState<Offer | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    discount: "",
  });

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setOffers(JSON.parse(stored));
        return;
      } catch {}
    }

    setOffers(defaults);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaults),
    );
  }, []);

  const save = (items: Offer[]) => {
    setOffers(items);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items),
    );
  };

  const clear = () => {
    setEditing(null);

    setForm({
      title: "",
      description: "",
      discount: "",
    });
  };

  const submit = () => {
    if (!form.title.trim()) {
      alert("Enter offer title.");
      return;
    }

    const discount = Number(form.discount);

    if (!discount) {
      alert("Enter discount percentage.");
      return;
    }

    if (editing) {
      save(
        offers.map((offer) =>
          offer.id === editing.id
            ? {
                ...offer,
                title: form.title,
                description: form.description,
                discount,
              }
            : offer,
        ),
      );
    } else {
      save([
        ...offers,
        {
          id: `offer-${Date.now()}`,
          title: form.title,
          description: form.description,
          discount,
          active: true,
        },
      ]);
    }

    clear();
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Offers & Banners
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage promotional offers shown to patients.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <Gift
            size={22}
            className="text-blue-600"
          />

          <h2 className="text-lg font-bold">
            {editing ? "Edit Offer" : "Create Offer"}
          </h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Offer Title"
            value={form.title}
            onChange={(value) =>
              setForm({
                ...form,
                title: value,
              })
            }
          />

          <Field
            label="Discount %"
            value={form.discount}
            type="number"
            onChange={(value) =>
              setForm({
                ...form,
                discount: value,
              })
            }
          />

          <div className="sm:col-span-2">
            <Field
              label="Description"
              value={form.description}
              onChange={(value) =>
                setForm({
                  ...form,
                  description: value,
                })
              }
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
          >
            <Plus size={17} />
            {editing
              ? "Update Offer"
              : "Add Offer"}
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-gray-900">
                    {offer.title}
                  </h3>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    {offer.discount}% OFF
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {offer.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(offer);

                    setForm({
                      title: offer.title,
                      description:
                        offer.description,
                      discount:
                        String(offer.discount),
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold"
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    save(
                      offers.map((item) =>
                        item.id === offer.id
                          ? {
                              ...item,
                              active:
                                !item.active,
                            }
                          : item,
                      ),
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold"
                >
                  <Power size={16} />

                  {offer.active
                    ? "Disable"
                    : "Enable"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this offer?",
                      )
                    ) {
                      save(
                        offers.filter(
                          (item) =>
                            item.id !== offer.id,
                        ),
                      );
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
      />
    </div>
  );
}