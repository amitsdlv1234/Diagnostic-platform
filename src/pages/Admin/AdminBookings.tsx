import {
  CalendarDays,
  Eye,
  FileText,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getBookings,
} from "../../features/booking/bookingUtils";

import type {
  Booking,
} from "../../features/booking/bookingTypes";

export function AdminBookings() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const confirmed = bookings.filter(
    (booking) =>
      booking.status === "CONFIRMED",
  ).length;

  const pending = bookings.filter(
    (booking) =>
      booking.status === "PENDING",
  ).length;

  const cancelled = bookings.filter(
    (booking) =>
      booking.status === "CANCELLED",
  ).length;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Bookings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View bookings created by patients.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Total Bookings"
          value={bookings.length}
        />

        <Stat
          label="Confirmed"
          value={confirmed}
        />

        <Stat
          label="Pending"
          value={pending}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <FileText
              size={38}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 font-bold text-gray-900">
              No bookings found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Patient bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-blue-600">
                        {booking.bookingId}
                      </h3>

                      <Status
                        status={booking.status}
                      />

                      <PaymentStatus
                        status={
                          booking.paymentStatus
                        }
                      />
                    </div>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      {booking.patient.firstName}{" "}
                      {booking.patient.lastName}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {booking.patient.mobile}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>
                        {booking.items.length} item(s)
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={14} />
                        {
                          booking.schedule
                            .collectionDate
                        }
                      </span>

                      <span className="font-bold text-gray-800">
                        ₹
                        {booking.total.toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/patient/bookings/${booking.bookingId}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                  >
                    <Eye size={17} />
                    View Booking
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cancelled > 0 && (
        <p className="mt-4 text-xs text-gray-500">
          Cancelled bookings: {cancelled}
        </p>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-950">
        {value}
      </p>
    </div>
  );
}

function Status({
  status,
}: {
  status: Booking["status"];
}) {
  const classes =
    status === "CONFIRMED"
      ? "bg-green-50 text-green-700"
      : status === "CANCELLED"
        ? "bg-red-50 text-red-700"
        : "bg-yellow-50 text-yellow-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

function PaymentStatus({
  status,
}: {
  status: Booking["paymentStatus"];
}) {
  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
      Payment: {status}
    </span>
  );
}