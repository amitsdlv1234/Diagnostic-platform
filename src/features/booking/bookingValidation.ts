export interface BookingFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;

  dateOfBirth: string;
  gender: string;

  collectionType: "HOME" | "CENTRE";

  centreId: string;

  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

  serviceDate: string;
  serviceTime: string;
}

export type BookingValidationErrors =
  Partial<
    Record<
      keyof BookingFormValues,
      string
    >
  >;

export function validateBooking(
  values: BookingFormValues,
): BookingValidationErrors {
  const errors: BookingValidationErrors =
    {};

  if (!values.firstName.trim()) {
    errors.firstName =
      "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName =
      "Last name is required";
  }

  if (!/^[6-9]\d{9}$/.test(values.mobile)) {
    errors.mobile =
      "Enter a valid 10-digit mobile number";
  }

  if (!values.email.trim()) {
    errors.email =
      "Email address is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email,
    )
  ) {
    errors.email =
      "Enter a valid email address";
  }

  if (!values.gender) {
    errors.gender =
      "Please select gender";
  }

  if (!values.serviceDate) {
    errors.serviceDate =
      "Please select service date";
  }

  if (!values.serviceTime) {
    errors.serviceTime =
      "Please select service time";
  }

  if (
    values.collectionType ===
    "CENTRE" &&
    !values.centreId
  ) {
    errors.centreId =
      "Please select a diagnostic centre";
  }

  if (
    values.collectionType ===
    "HOME"
  ) {
    if (!values.addressLine1.trim()) {
      errors.addressLine1 =
        "Address is required";
    }

    if (!values.city.trim()) {
      errors.city =
        "City is required";
    }

    if (!values.state.trim()) {
      errors.state =
        "State is required";
    }

    if (
      !/^\d{6}$/.test(values.pincode)
    ) {
      errors.pincode =
        "Enter a valid 6-digit pincode";
    }
  }

  return errors;
}