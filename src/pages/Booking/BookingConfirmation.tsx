import {
  CalendarCheck,
  CheckCircle2,
  Home,
  MapPin,
  Printer,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { Container } from "../../components/common/Container";

import type { Booking } from "../../features/booking/bookingTypes";
import nidanLogo from "../../assets/nidan-logo.jpeg";
import { getDoctorContent } from "../../features/admin/doctorConfig";

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

  const doctor = getDoctorContent();

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <style>{`
        @page { size: A4 portrait; margin: 7mm; }
        @media print {
          html, body, #root { width: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; background: #fff !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden !important; }
          #booking-invoice, #booking-invoice * { visibility: visible !important; }
          #booking-invoice { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; }
          #booking-invoice > div { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
          #booking-invoice .invoice-letterhead { padding-bottom: 8px !important; border-bottom-width: 1px !important; break-inside: avoid !important; }
          #booking-invoice .invoice-letterhead img { max-height: 54px !important; max-width: 54px !important; }
          #booking-invoice .invoice-letterhead .h-20 { height: 54px !important; }
          #booking-invoice .invoice-letterhead .w-20 { width: 54px !important; }
          #booking-invoice .invoice-letterhead .mt-4 { margin-top: 7px !important; }
          #booking-invoice .invoice-letterhead .gap-4 { gap: 8px !important; }
          #booking-invoice .invoice-letterhead .p-3 { padding: 6px !important; }
          #booking-invoice .invoice-letterhead .text-2xl { font-size: 17px !important; line-height: 1.2 !important; }
          #booking-invoice .invoice-letterhead .text-xs { font-size: 8px !important; line-height: 1.25 !important; }
          #booking-invoice .invoice-letterhead .text-sm { font-size: 9px !important; line-height: 1.3 !important; }
          #booking-invoice .mt-6 { margin-top: 8px !important; }
          #booking-invoice .mt-8 { margin-top: 10px !important; }
          #booking-invoice .mt-4 { margin-top: 6px !important; }
          #booking-invoice .mt-3 { margin-top: 5px !important; }
          #booking-invoice .mt-2 { margin-top: 4px !important; }
          #booking-invoice .mt-1 { margin-top: 2px !important; }
          #booking-invoice .p-5 { padding: 8px !important; }
          #booking-invoice .p-4 { padding: 7px !important; }
          #booking-invoice .rounded-3xl, #booking-invoice .rounded-2xl { border-radius: 6px !important; }
          #booking-invoice .text-3xl { font-size: 17px !important; line-height: 1.2 !important; }
          #booking-invoice .text-2xl { font-size: 16px !important; line-height: 1.2 !important; }
          #booking-invoice .text-xl { font-size: 13px !important; line-height: 1.2 !important; }
          #booking-invoice .text-base { font-size: 10px !important; line-height: 1.25 !important; }
          #booking-invoice .text-sm { font-size: 9px !important; line-height: 1.25 !important; }
          #booking-invoice .text-xs { font-size: 8px !important; line-height: 1.25 !important; }
          #booking-invoice .h-16 { height: 24px !important; }
          #booking-invoice .w-16 { width: 24px !important; }
          #booking-invoice .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 5px !important; }
          #booking-invoice .border-t { padding-top: 6px !important; }
          #booking-invoice .invoice-letterhead, #booking-invoice .rounded-2xl { break-inside: avoid !important; }
          #booking-invoice .print\:hidden { display: none !important; }
        }
      `}</style>
      <Container>
        <div id="booking-invoice" className="mx-auto max-w-3xl py-12 sm:py-16 print:max-w-none print:py-0">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 print:border-0 print:p-0 print:shadow-none">
            {/* Professional invoice letterhead */}
            <header className="invoice-letterhead border-b-2 border-rose-600 pb-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img src={nidanLogo} alt="Nidan Diagnostic Centre logo" className="h-20 w-20 rounded-full border border-gray-200 object-contain p-1" />
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-slate-900">Nidan Diagnostic <span className="text-rose-600">Centre</span></p>
                    <p className="mt-1 text-sm text-slate-600">निदान डायग्नोस्टिक सेंटर · Estd. 2000</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Diagnostic Imaging · Pathology · Health Checkups</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 sm:max-w-[260px]">
                  <img src={doctor.imageUrl} alt={doctor.name} className="h-20 w-16 shrink-0 rounded-lg border border-white object-cover shadow-sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">Consulting Doctor</p>
                    <p className="mt-1 font-bold text-slate-900">{doctor.name}</p>
                    <p className="text-xs text-slate-600">{doctor.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{doctor.qualificationsSummary}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-xs text-slate-600 sm:grid-cols-3">
                <p><span className="font-semibold text-slate-800">Address:</span> {doctor.address}</p>
                <p><span className="font-semibold text-slate-800">Phone:</span> {doctor.phone}</p>
                <p><span className="font-semibold text-slate-800">Speciality:</span> {doctor.specialty}</p>
              </div>
            </header>

            {/* Invoice title */}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Payment receipt / booking invoice</p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-900">Booking Invoice</h2>
              </div>
              <p className="text-sm text-slate-500">Issued: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
            </div>

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
                    : "Nidan Diagnostic Centre Visit"}
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                <Printer size={17} />
                Print booking invoice
              </button>

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