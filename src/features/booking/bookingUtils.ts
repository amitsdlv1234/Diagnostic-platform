import type {
  Booking,
  BookingFormState,
} from "./bookingTypes";

export const BOOKINGS_STORAGE_KEY =
  "diagnostic-platform-bookings";

export function getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(
    2,
    "0",
  );
  const day = String(today.getDate()).padStart(
    2,
    "0",
  );

  return `${year}-${month}-${day}`;
}

export function createInitialBookingState(): BookingFormState {
  return {
    patient: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      dateOfBirth: "",
      gender: "",
    },

    collectionType: "HOME_COLLECTION",

    centreId: "",
    centreName: "",

    address: {
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },

    schedule: {
      collectionDate: getTodayDate(),
      timeSlot: "",
    },
  };
}

export function generateBookingId(): string {
  const timestamp = Date.now().toString().slice(-8);

  const random = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `DGP-${timestamp}-${random}`;
}

export function generateBookingInternalId(): string {
  return `booking_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/**
 * Get all saved booking IDs.
 */
export function getBookingIds(): string[] {
  try {
    const stored = localStorage.getItem(
      BOOKINGS_STORAGE_KEY,
    );

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is string =>
        typeof item === "string",
    );
  } catch {
    return [];
  }
}

/**
 * Save a booking.
 */
export function saveBooking(
  booking: Booking,
): void {
  const existingIds = getBookingIds();

  if (!existingIds.includes(booking.bookingId)) {
    existingIds.push(booking.bookingId);
  }

  localStorage.setItem(
    `diagnostic-booking-${booking.bookingId}`,
    JSON.stringify(booking),
  );

  localStorage.setItem(
    BOOKINGS_STORAGE_KEY,
    JSON.stringify(existingIds),
  );
}

/**
 * Get all saved bookings.
 */
export function getBookings(): Booking[] {
  const bookingIds = getBookingIds();

  const bookings: Booking[] = [];

  for (const bookingId of bookingIds) {
    try {
      const stored = localStorage.getItem(
        `diagnostic-booking-${bookingId}`,
      );

      if (!stored) {
        continue;
      }

      const parsed: unknown = JSON.parse(stored);

      if (
        !parsed ||
        typeof parsed !== "object"
      ) {
        continue;
      }

      const booking = parsed as Booking;

      if (
        typeof booking.bookingId !== "string" ||
        typeof booking.createdAt !== "string"
      ) {
        continue;
      }

      bookings.push(booking);
    } catch {
      // Ignore invalid booking records.
    }
  }

  return bookings.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  );
}

/**
 * Get a single booking by booking ID.
 */
export function getBooking(
  bookingId: string,
): Booking | null {
  try {
    const stored = localStorage.getItem(
      `diagnostic-booking-${bookingId}`,
    );

    if (!stored) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return null;
    }

    return parsed as Booking;
  } catch {
    return null;
  }
}

/**
 * Delete a booking.
 */
export function deleteBooking(
  bookingId: string,
): void {
  const bookingIds = getBookingIds().filter(
    (id) => id !== bookingId,
  );

  localStorage.removeItem(
    `diagnostic-booking-${bookingId}`,
  );

  localStorage.setItem(
    BOOKINGS_STORAGE_KEY,
    JSON.stringify(bookingIds),
  );
}
/**
 * Cancel an existing booking.
 *
 * Only CONFIRMED bookings can be cancelled.
 */
export function cancelBooking(
  bookingId: string,
): Booking | null {
  const booking = getBooking(bookingId);

  if (!booking) {
    return null;
  }

  if (booking.status !== "CONFIRMED") {
    return booking;
  }

  const cancelledBooking: Booking = {
    ...booking,
    status: "CANCELLED",
  };

  saveBooking(cancelledBooking);

  return cancelledBooking;
}