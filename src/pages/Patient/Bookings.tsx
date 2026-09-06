import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import type { Booking } from "../../features/booking/bookingTypes";

import { getBookings } from "../../features/booking/bookingUtils";


export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            My Bookings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your upcoming and previous diagnostic
            bookings.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <CalendarDays
            size={35}
            className="mx-auto text-blue-600"
          />

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            No bookings yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Book a diagnostic test or health package to see
            your booking information here.
          </p>

          <Link
            to="/tests"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Browse Tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          My Bookings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View your upcoming and previous diagnostic
          bookings.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.bookingId}
            booking={booking}
          />
        ))}
      </div>
    </div>
  );
}

interface BookingCardProps {
  booking: Booking;
}

function BookingCard({
  booking,
}: BookingCardProps) {
  const collectionDate =
    booking.schedule?.collectionDate || "-";

  const timeSlot =
    booking.schedule?.timeSlot || "Time not selected";

  const itemCount = booking.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Booking ID
          </p>

          <p className="mt-1 text-lg font-bold text-blue-600">
            {booking.bookingId}
          </p>
        </div>

        <BookingStatus status={booking.status} />
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5">
        <div className="space-y-3">
          {booking.items.map((item) => (
            <div
              key={`${item.type}:${item.id}`}
              className="flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {item.type === "PACKAGE"
                    ? "Health Package"
                    : "Diagnostic Test"}{" "}
                  × {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-bold text-gray-900">
                ₹
                {(
                  item.price * item.quantity
                ).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
        <InfoItem
          icon={<CalendarDays size={17} />}
          label="Collection Date"
          value={collectionDate}
        />

        <InfoItem
          icon={<Clock3 size={17} />}
          label="Time Slot"
          value={timeSlot}
        />

        <InfoItem
          icon={
            booking.collectionType ===
              "HOME_COLLECTION" ? (
              <Home size={17} />
            ) : (
              <MapPin size={17} />
            )
          }
          label="Collection Method"
          value={
            booking.collectionType ===
              "HOME_COLLECTION"
              ? "Home Collection"
              : "Centre Visit"
          }
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-500">
            {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}
          </p>

          <p className="mt-1 text-xl font-bold text-gray-950">
            ₹{booking.total.toLocaleString("en-IN")}
          </p>
        </div>

        <Link
          to={`/patient/bookings/${booking.bookingId}`}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
        >
          View Booking
        </Link>
      </div>
    </div>
  );
}

function BookingStatus({
  status,
}: {
  status: Booking["status"];
}) {
  const isConfirmed = status === "CONFIRMED";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${isConfirmed
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-600"
        }`}
    >
      {isConfirmed ? (
        <CheckCircle2 size={14} />
      ) : (
        <Clock3 size={14} />
      )}

      {status}
    </span>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-semibold text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}