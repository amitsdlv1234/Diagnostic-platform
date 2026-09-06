import type {
  BookingAddress,
} from "../../../features/booking/bookingTypes";

interface AddressFormProps {
  value: BookingAddress;

  onChange: (
    field: keyof BookingAddress,
    value: string,
  ) => void;

  errors?: Partial<
    Record<keyof BookingAddress, string>
  >;
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  placeholder?: string;
  error?: string;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function AddressForm({
  value,
  onChange,
  errors = {},
}: AddressFormProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">
        Home collection address
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            label="Address Line 1"
            value={value.addressLine1}
            onChange={(nextValue) =>
              onChange(
                "addressLine1",
                nextValue,
              )
            }
            placeholder="House / Flat / Building"
            error={errors.addressLine1}
          />
        </div>

        <div>
          <Field
            label="Address Line 2"
            value={value.addressLine2}
            onChange={(nextValue) =>
              onChange(
                "addressLine2",
                nextValue,
              )
            }
            placeholder="Street / Area"
            error={errors.addressLine2}
          />
        </div>

        <div>
          <Field
            label="Landmark"
            value={value.landmark}
            onChange={(nextValue) =>
              onChange(
                "landmark",
                nextValue,
              )
            }
            placeholder="Nearby landmark"
            error={errors.landmark}
          />
        </div>

        <div>
          <Field
            label="City"
            value={value.city}
            onChange={(nextValue) =>
              onChange(
                "city",
                nextValue,
              )
            }
            placeholder="Lucknow"
            error={errors.city}
          />
        </div>

        <div>
          <Field
            label="State"
            value={value.state}
            onChange={(nextValue) =>
              onChange(
                "state",
                nextValue,
              )
            }
            placeholder="Uttar Pradesh"
            error={errors.state}
          />
        </div>

        <div>
          <Field
            label="Pincode"
            value={value.pincode}
            onChange={(nextValue) =>
              onChange(
                "pincode",
                nextValue,
              )
            }
            placeholder="226001"
            error={errors.pincode}
          />
        </div>
      </div>
    </div>
  );
}