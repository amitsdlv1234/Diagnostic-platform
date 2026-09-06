import type {
  BookingFormState,
} from "../features/booking/bookingTypes";

export type BookingErrors = {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  gender?: string;
  centreId?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  serviceDate?: string;
  serviceTime?: string;
};

export function validateBooking(
  state: BookingFormState,
): BookingErrors {
  const errors: BookingErrors = {};

  if (!state.patient.firstName.trim()) {
    errors.firstName =
      "First name is required";
  }

  if (!state.patient.lastName.trim()) {
    errors.lastName =
      "Last name is required";
  }

  if (
    !/^[6-9]\d{9}$/.test(
      state.patient.mobile,
    )
  ) {
    errors.mobile =
      "Enter a valid 10-digit mobile number";
  }

  if (!state.patient.email.trim()) {
    errors.email =
      "Email address is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      state.patient.email,
    )
  ) {
    errors.email =
      "Enter a valid email address";
  }

  if (!state.patient.gender) {
    errors.gender =
      "Please select gender";
  }

if (!state.schedule.collectionDate) {
  errors.serviceDate =
    "Please select service date";
}

if (!state.schedule.timeSlot) {
  errors.serviceTime =
    "Please select service time";
}

  if (
    state.collectionType ===
    "CENTRE_VISIT"
  ) {
    if (!state.centreId) {
      errors.centreId =
        "Please select a diagnostic centre";
    }
  }

  if (
    state.collectionType ===
    "HOME_COLLECTION"
  ) {
    if (
      !state.address.addressLine1.trim()
    ) {
      errors.addressLine1 =
        "Address is required";
    }

    if (!state.address.city.trim()) {
      errors.city =
        "City is required";
    }

    if (!state.address.state.trim()) {
      errors.state =
        "State is required";
    }

    if (
      !/^\d{6}$/.test(
        state.address.pincode,
      )
    ) {
      errors.pincode =
        "Enter a valid 6-digit pincode";
    }
  }

  return errors;
}