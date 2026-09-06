import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Home,
    MapPin,
    XCircle,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import { useState } from "react";

import type { Booking } from "../../features/booking/bookingTypes";

import {
    getBooking,
    saveBooking,
} from "../../features/booking/bookingUtils";

export function BookingDetails() {
    const { bookingId } = useParams<{
        bookingId: string;
    }>();


    const [isCancelling, setIsCancelling] =
        useState(false);

    const [booking, setBooking] =
        useState<Booking | null>(() =>
            bookingId ? getBooking(bookingId) : null,
        );

    if (!booking) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="py-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Booking not found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        We could not find the requested booking.
                    </p>

                    <Link
                        to="/patient/bookings"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Back to My Bookings
                    </Link>
                </div>
            </div>
        );
    }

    const collectionDate =
        booking.schedule?.collectionDate || "-";

    const timeSlot =
        booking.schedule?.timeSlot ||
        "Time not selected";

    const isHomeCollection =
        booking.collectionType ===
        "HOME_COLLECTION";

    const isCancelled =
        booking.status === "CANCELLED";

    const handleCancelBooking = () => {
        if (!booking || booking.status === "CANCELLED") {
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to cancel booking ${booking.bookingId}?`,
        );

        if (!confirmed) {
            return;
        }

        setIsCancelling(true);

        try {
            const updatedBooking: Booking = {
                ...booking,
                status: "CANCELLED",
            };

            saveBooking(updatedBooking);

            // Update the page without reloading the browser.
            setBooking(updatedBooking);
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <Link
                        to="/patient/bookings"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
                    >
                        <ArrowLeft size={17} />
                        Back to My Bookings
                    </Link>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Booking ID
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-blue-600">
                        {booking.bookingId}
                    </h2>
                </div>

                <BookingStatus
                    status={booking.status}
                />
            </div>

            {/* Cancellation Message */}
            {isCancelled && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <XCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div>
                        <p className="text-sm font-bold text-red-700">
                            Booking Cancelled
                        </p>

                        <p className="mt-1 text-sm leading-6 text-red-600">
                            This booking has been cancelled and is no
                            longer active.
                        </p>
                    </div>
                </div>
            )}

            {/* Patient */}
            <section className="mt-8 rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Patient
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Detail
                        label="Name"
                        value={`${booking.patient.firstName} ${booking.patient.lastName}`}
                    />

                    <Detail
                        label="Mobile"
                        value={booking.patient.mobile}
                    />

                    <Detail
                        label="Email"
                        value={booking.patient.email}
                    />

                    <Detail
                        label="Gender"
                        value={
                            booking.patient.gender || "-"
                        }
                    />

                    <Detail
                        label="Date of Birth"
                        value={
                            booking.patient.dateOfBirth || "-"
                        }
                    />
                </div>
            </section>

            {/* Tests / Packages */}
            <section className="mt-5 rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Booked Tests / Packages
                </h3>

                <div className="mt-4 space-y-4">
                    {booking.items.map((item) => (
                        <div
                            key={`${item.type}:${item.id}`}
                            className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                        >
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900">
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
            </section>

            {/* Schedule */}
            <section className="mt-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Collection Schedule
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <InfoCard
                        icon={<CalendarDays size={19} />}
                        label="Collection Date"
                        value={collectionDate}
                    />

                    <InfoCard
                        icon={<Clock3 size={19} />}
                        label="Time Slot"
                        value={timeSlot}
                    />

                    <InfoCard
                        icon={
                            isHomeCollection ? (
                                <Home size={19} />
                            ) : (
                                <MapPin size={19} />
                            )
                        }
                        label="Collection Method"
                        value={
                            isHomeCollection
                                ? "Home Collection"
                                : "Centre Visit"
                        }
                    />

                    {!isHomeCollection && (
                        <InfoCard
                            icon={<MapPin size={19} />}
                            label="Diagnostic Centre"
                            value={
                                booking.centreName || "-"
                            }
                        />
                    )}
                </div>
            </section>

            {/* Address */}
            {isHomeCollection &&
                booking.address && (
                    <section className="mt-5 rounded-2xl border border-gray-200 p-5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                            Collection Address
                        </h3>

                        <div className="mt-4 text-sm leading-6 text-gray-700">
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
                    </section>
                )}

            {/* Amount */}
            <section className="mt-5 rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Payment Summary
                </h3>

                <div className="mt-4 space-y-3">
                    <AmountRow
                        label="Total MRP"
                        value={booking.totalMrp}
                    />

                    <AmountRow
                        label="Discount"
                        value={-booking.discount}
                    />

                    <div className="border-t border-gray-100 pt-3">
                        <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-gray-900">
                                Total Amount
                            </span>

                            <span className="text-xl font-bold text-gray-950">
                                ₹
                                {booking.total.toLocaleString(
                                    "en-IN",
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Payment Status
                        </span>

                        <p className="mt-1 text-sm font-bold text-gray-900">
                            {booking.paymentStatus}
                        </p>
                    </div>
                </div>
            </section>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    to="/patient/bookings"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                    <ArrowLeft size={17} />
                    Back to My Bookings
                </Link>

                {!isCancelled && (
                    <button
                        type="button"
                        onClick={handleCancelBooking}
                        disabled={isCancelling}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <XCircle size={17} />

                        {isCancelling
                            ? "Cancelling..."
                            : "Cancel Booking"}
                    </button>
                )}
            </div>
        </div>
    );
}

function BookingStatus({
    status,
}: {
    status: Booking["status"];
}) {
    const isConfirmed =
        status === "CONFIRMED";

    const isCancelled =
        status === "CANCELLED";

    if (isCancelled) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                <XCircle size={14} />
                CANCELLED
            </span>
        );
    }

    if (isConfirmed) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                <CheckCircle2 size={14} />
                CONFIRMED
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
            <Clock3 size={14} />
            {status}
        </span>
    );
}

function Detail({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-xs text-gray-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-bold text-gray-900">
                {value}
            </p>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">
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

function AmountRow({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
                {label}
            </span>

            <span
                className={`text-sm font-semibold ${value < 0
                    ? "text-green-600"
                    : "text-gray-900"
                    }`}
            >
                {value < 0 ? "-₹" : "₹"}
                {Math.abs(value).toLocaleString(
                    "en-IN",
                )}
            </span>
        </div>
    );
}