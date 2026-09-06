import {
  CheckCircle2,
  Save,
} from "lucide-react";

import { useState } from "react";

import { FormInput } from "../../components/forms/FormInput";

import {
  useAuth,
} from "../../store/authStore";

export function Profile() {
  const {
    patient,
    updateProfile,
  } = useAuth();

  const [saved, setSaved] =
    useState(false);

  const [form, setForm] =
    useState(() => ({
      firstName:
        patient?.firstName ?? "",
      lastName:
        patient?.lastName ?? "",
      mobile:
        patient?.mobile ?? "",
      email:
        patient?.email ?? "",
      dateOfBirth:
        patient?.dateOfBirth ?? "",
      gender:
        patient?.gender ?? "",
      address:
        patient?.address ?? "",
      city:
        patient?.city ?? "",
      state:
        patient?.state ?? "",
      pincode:
        patient?.pincode ?? "",
    }));

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!patient) {
      return;
    }

    updateProfile({
      ...patient,
      firstName: form.firstName,
      lastName: form.lastName,
      mobile: form.mobile,
      email: form.email,
      dateOfBirth:
        form.dateOfBirth || undefined,
      gender:
        form.gender === "Male" ||
        form.gender === "Female" ||
        form.gender === "Other"
          ? form.gender
          : undefined,
      address:
        form.address || undefined,
      city:
        form.city || undefined,
      state:
        form.state || undefined,
      pincode:
        form.pincode || undefined,
    });

    setSaved(true);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Keep your details updated for bookings and
          reports.
        </p>
      </div>

      {saved && (
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />
          Profile updated successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            id="firstName"
            label="First name"
            value={form.firstName}
            onChange={(event) =>
              updateField(
                "firstName",
                event.target.value,
              )
            }
          />

          <FormInput
            id="lastName"
            label="Last name"
            value={form.lastName}
            onChange={(event) =>
              updateField(
                "lastName",
                event.target.value,
              )
            }
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            id="mobile"
            label="Mobile number"
            value={form.mobile}
            disabled
          />

          <FormInput
            id="email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value,
              )
            }
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            id="dateOfBirth"
            label="Date of birth"
            type="date"
            value={form.dateOfBirth}
            onChange={(event) =>
              updateField(
                "dateOfBirth",
                event.target.value,
              )
            }
          />

          <div>
            <label
              htmlFor="gender"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Gender
            </label>

            <select
              id="gender"
              value={form.gender}
              onChange={(event) =>
                updateField(
                  "gender",
                  event.target.value,
                )
              }
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Select gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Address
          </label>

          <textarea
            id="address"
            value={form.address}
            onChange={(event) =>
              updateField(
                "address",
                event.target.value,
              )
            }
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter your address"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <FormInput
            id="city"
            label="City"
            value={form.city}
            onChange={(event) =>
              updateField(
                "city",
                event.target.value,
              )
            }
          />

          <FormInput
            id="state"
            label="State"
            value={form.state}
            onChange={(event) =>
              updateField(
                "state",
                event.target.value,
              )
            }
          />

          <FormInput
            id="pincode"
            label="PIN code"
            inputMode="numeric"
            maxLength={6}
            value={form.pincode}
            onChange={(event) =>
              updateField(
                "pincode",
                event.target.value.replace(
                  /\D/g,
                  "",
                ),
              )
            }
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}