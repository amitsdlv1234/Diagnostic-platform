import type { ChangeEvent } from "react";

import type {
  BookingPatient,
} from "../../../features/booking/bookingTypes";

interface PatientDetailsFormProps {
  patient: BookingPatient;

  onChange: (
    field: keyof BookingPatient,
    value: string,
  ) => void;
}

export function PatientDetailsForm({
  patient,
  onChange,
}: PatientDetailsFormProps) {
  const handleChange =
    (
      field: keyof BookingPatient,
    ) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >,
    ) => {
      onChange(field, event.target.value);
    };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Patient details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter the details of the person who
          will undergo the tests.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="First name"
          required
          value={patient.firstName}
          onChange={handleChange(
            "firstName",
          )}
          placeholder="Enter first name"
        />

        <Field
          label="Last name"
          required
          value={patient.lastName}
          onChange={handleChange(
            "lastName",
          )}
          placeholder="Enter last name"
        />

        <Field
          label="Mobile number"
          required
          value={patient.mobile}
          onChange={handleChange(
            "mobile",
          )}
          placeholder="10-digit mobile number"
          type="tel"
          maxLength={10}
        />

        <Field
          label="Email address"
          required
          value={patient.email}
          onChange={handleChange("email")}
          placeholder="example@email.com"
          type="email"
        />

        <Field
          label="Date of birth"
          required
          value={patient.dateOfBirth}
          onChange={handleChange(
            "dateOfBirth",
          )}
          type="date"
        />

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Gender
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            value={patient.gender}
            onChange={handleChange("gender")}
            className="mt-2 h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select gender
            </option>

            <option value="MALE">
              Male
            </option>

            <option value="FEMALE">
              Female
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: FieldProps) {
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
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="mt-2 h-11 w-full rounded-xl border border-gray-300 px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}