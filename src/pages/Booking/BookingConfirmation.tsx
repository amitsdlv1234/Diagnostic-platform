import {
  CalendarCheck,
  CheckCircle2,
  Home,
  MapPin,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { Container } from "../../components/common/Container";

import type { Booking } from "../../features/booking/bookingTypes";

export function BookingConfirmation() {
  const { bookingId } = useParams<{
    bookingId: string;
  }>();

  let booking: Booking | null = null;

  if (bookingId) {
    try {
      const storedBooking =
        localStorage.getItem(
          `diagnostic-booking-${bookingId}`,
        );

      if (storedBooking) {
        booking = JSON.parse(
          storedBooking,
        ) as Booking;
      }
    } catch {
      booking = null;
    }
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Booking information unavailable
            </h1>

            <p className="mt-3 text-gray-600">
              We could not find the booking confirmation
              details.
            </p>

            <Link
              to="/tests"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Browse Tests
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const patientName = [
    booking.patient.firstName,
    booking.patient.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const isHomeCollection =
    booking.collectionType ===
    "HOME_COLLECTION";

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
            {/* Success */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2
                  size={36}
                  className="text-green-600"
                />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-600">
                Booking Confirmed
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-950">
                Your booking is confirmed
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Your diagnostic booking has been successfully
                created.
              </p>
            </div>

            {/* Booking ID */}
            <div className="mt-8 rounded-2xl bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Booking ID
              </p>

              <p className="mt-1 text-xl font-bold text-blue-600">
                {booking.bookingId}
              </p>
            </div>

            {/* Patient */}
            <div className="mt-6 rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Patient
              </p>

              <p className="mt-2 text-base font-bold text-gray-900">
                {patientName || "Patient"}
              </p>

              {booking.patient.mobile && (
                <p className="mt-1 text-sm text-gray-600">
                  {booking.patient.mobile}
                </p>
              )}

              {booking.patient.email && (
                <p className="mt-1 text-sm text-gray-600">
                  {booking.patient.email}
                </p>
              )}
            </div>

            {/* Booking Items */}
            <div className="mt-6 rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Booked Tests / Packages
              </p>

              <div className="mt-4 space-y-3">
                {booking.items.map((item) => (
                  <div
                    key={`${item.type}:${item.id}`}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.type === "TEST"
                          ? "Diagnostic Test"
                          : "Health Package"}{" "}
                        × {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule + Collection */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 p-5">
                <CalendarCheck
                  size={20}
                  className="text-blue-600"
                />

                <p className="mt-3 text-xs text-gray-500">
                  Collection Date
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {booking.schedule.collectionDate}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {booking.schedule.timeSlot}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 p-5">
                {isHomeCollection ? (
                  <Home
                    size={20}
                    className="text-blue-600"
                  />
                ) : (
                  <MapPin
                    size={20}
                    className="text-blue-600"
                  />
                )}

                <p className="mt-3 text-xs text-gray-500">
                  Collection Method
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {isHomeCollection
                    ? "Home Collection"
                    : "Diagnostic Centre Visit"}
                </p>

                {!isHomeCollection &&
                  booking.centreName && (
                    <p className="mt-1 text-xs text-gray-500">
                      {booking.centreName}
                    </p>
                  )}
              </div>
            </div>

            {/* Address */}
            {isHomeCollection &&
              booking.address && (
                <div className="mt-6 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={20}
                      className="text-blue-600"
                    />

                    <p className="text-sm font-bold text-gray-900">
                      Home Collection Address
                    </p>
                  </div>

                  <div className="mt-3 text-sm leading-6 text-gray-600">
                    <p>
                      {booking.address.addressLine1}
                    </p>

                    {booking.address.addressLine2 && (
                      <p>
                        {booking.address.addressLine2}
                      </p>
                    )}

                    {booking.address.landmark && (
                      <p>
                        {booking.address.landmark}
                      </p>
                    )}

                    <p>
                      {booking.address.city},{" "}
                      {booking.address.state} -{" "}
                      {booking.address.pincode}
                    </p>
                  </div>
                </div>
              )}

            {/* Amount */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Total MRP
                </span>

                <span className="font-medium text-gray-700">
                  ₹
                  {booking.totalMrp.toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Discount
                </span>

                <span className="font-medium text-green-600">
                  -₹
                  {booking.discount.toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">
                    Booking Amount
                  </span>

                  <span className="text-2xl font-bold text-gray-950">
                    ₹
                    {booking.total.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-sm font-semibold text-green-700">
                Booking Status: {booking.status}
              </p>

              <p className="mt-1 text-xs text-green-600">
                Payment Status:{" "}
                {booking.paymentStatus}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/patient/bookings"
                className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
              >
                View My Bookings
              </Link>

              <Link
                to="/tests"
                className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Book Another Test
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}