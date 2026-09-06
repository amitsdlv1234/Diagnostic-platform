import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import { Container } from "../../components/common/Container";

import { useCart } from "../../features/cart/cartStore";

import {
    createInitialBookingState,
    generateBookingId,
    generateBookingInternalId,
    getTodayDate,
    saveBooking,
} from "../../features/booking/bookingUtils";

import type {
    BookingFormState,
    BookingPatient,
} from "../../features/booking/bookingTypes";

import { diagnosticTests } from "../../features/tests/testData";
import { healthPackages } from "../../features/packages/packageData";

import { BookingProgress } from "./components/BookingProgress";
import { PatientDetailsForm } from "./components/PatientDetailsForm";
import { CollectionMethod } from "./components/CollectionMethod";
import { CollectionSchedule } from "./components/CollectionSchedule";
import { AddressForm } from "./components/AddressForm";
import { BookingSummary } from "./components/BookingSummary";

export function Booking() {
    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const testId = searchParams.get("test");
    const packageId = searchParams.get("package");

    const {
        items,
        totalMrp,
        discount,
        total,
        addItem,
        isInCart,
    } = useCart();

    const [step, setStep] = useState(1);

    const [form, setForm] =
        useState<BookingFormState>(() =>
            createInitialBookingState(),
        );

    /*
     * Direct Test / Package -> Booking
     *
     * If the user clicks:
     *   /booking?test=cbc
     * or
     *   /booking?package=basic-full-body
     *
     * automatically add that item to cart if it is
     * not already present.
     */
    useEffect(() => {
        if (testId) {
            const test = diagnosticTests.find(
                (item) => item.id === testId,
            );

            if (
                test &&
                !isInCart(test.id, "TEST")
            ) {
                addItem({
                    id: test.id,
                    type: "TEST",
                    name: test.name,
                    slug: test.slug,
                    price: test.price,
                    mrp: test.mrp,
                    quantity: 1,
                    shortDescription:
                        test.shortDescription,
                });
            }
        }

        if (packageId) {
            const packageData =
                healthPackages.find(
                    (item) => item.id === packageId,
                );

            if (
                packageData &&
                !isInCart(
                    packageData.id,
                    "PACKAGE",
                )
            ) {
                addItem({
                    id: packageData.id,
                    type: "PACKAGE",
                    name: packageData.name,
                    slug: packageData.slug,
                    price: packageData.price,
                    mrp: packageData.mrp,
                    quantity: 1,
                    shortDescription:
                        packageData.shortDescription,
                });
            }
        }
    }, [
        testId,
        packageId,
        addItem,
        isInCart,
    ]);

    const updatePatient = (
        field: keyof BookingPatient,
        value: string,
    ) => {
        setForm((current) => ({
            ...current,

            patient: {
                ...current.patient,
                [field]: value,
            },
        }));
    };

    const updateAddress = (
        field: keyof BookingFormState["address"],
        value: string,
    ) => {
        setForm((current) => ({
            ...current,

            address: {
                ...current.address,
                [field]: value,
            },
        }));
    };

    const handleNext = () => {
        setStep((current) =>
            Math.min(current + 1, 4),
        );
    };

    const handleBack = () => {
        setStep((current) =>
            Math.max(current - 1, 1),
        );
    };

    const handleConfirmBooking = () => {
        if (items.length === 0) {
            return;
        }

        const bookingId = generateBookingId();

        const booking = {
            id: `booking_${Date.now()}`,

            bookingId,

            items,

            patient: form.patient,

            collectionType:
                form.collectionType,

            centreId:
                form.centreId,

            centreName:
                form.centreName,

            address:
                form.address,

            schedule:
                form.schedule,

            subtotal: total,

            totalMrp,

            discount,

            total,

            // Booking is not confirmed until payment succeeds
            status: "PENDING" as const,

            paymentStatus: "PENDING" as const,

            createdAt:
                new Date().toISOString(),
        };

        localStorage.setItem(
            `diagnostic-booking-${bookingId}`,
            JSON.stringify(booking),
        );

        navigate("/booking/payment", {
            state: {
                bookingId,
                total,
            },
        });
    };

    /*
     * While direct test/package is being added to the
     * cart, show a loading state instead of immediately
     * displaying "No tests selected".
     */
    const hasDirectBookingItem =
        Boolean(testId || packageId);

    if (
        items.length === 0 &&
        !hasDirectBookingItem
    ) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Container>
                    <div className="py-20 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            No tests selected
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Add a diagnostic test or health
                            package before starting a booking.
                        </p>

                        <Link
                            to="/tests"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                        >
                            Browse Tests
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    /*
     * Invalid direct booking ID
     */
    if (
        items.length === 0 &&
        hasDirectBookingItem
    ) {
        const validTest =
            testId &&
            diagnosticTests.some(
                (item) => item.id === testId,
            );

        const validPackage =
            packageId &&
            healthPackages.some(
                (item) => item.id === packageId,
            );

        if (!validTest && !validPackage) {
            return (
                <div className="min-h-screen bg-gray-50">
                    <Container>
                        <div className="py-20 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Booking item not found
                            </h1>

                            <p className="mt-3 text-gray-600">
                                The selected test or package could
                                not be found.
                            </p>

                            <Link
                                to="/tests"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                            >
                                Browse Tests
                                <ArrowRight size={17} />
                            </Link>
                        </div>
                    </Container>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50">
                <Container>
                    <div className="py-20 text-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Preparing your booking...
                        </h1>

                        <p className="mt-3 text-sm text-gray-600">
                            Please wait while we prepare the
                            selected item.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <Container>
                    <div className="py-8">
                        <Link
                            to="/cart"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
                        >
                            <ArrowLeft size={16} />
                            Back to Cart
                        </Link>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-950">
                            Book your diagnostic tests
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Complete the details below to schedule
                            your sample collection.
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="py-8 sm:py-10">
                    <BookingProgress
                        currentStep={step}
                    />

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                        <main className="space-y-6">
                            {/* Step 1 */}
                            {step === 1 && (
                                <PatientDetailsForm
                                    patient={form.patient}
                                    onChange={updatePatient}
                                />
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <>
                                    <CollectionMethod
                                        value={
                                            form.collectionType
                                        }
                                        onChange={(value) =>
                                            setForm((current) => ({
                                                ...current,
                                                collectionType:
                                                    value,
                                            }))
                                        }
                                    />

                                    {form.collectionType ===
                                        "HOME_COLLECTION" && (
                                            <AddressForm
                                                value={form.address}
                                                onChange={
                                                    updateAddress
                                                }
                                            />
                                        )}
                                </>
                            )}

                            {/* Step 3 */}
                            {step === 3 && (
                                <CollectionSchedule
                                    collectionDate={
                                        form.schedule
                                            .collectionDate
                                    }
                                    timeSlot={
                                        form.schedule.timeSlot
                                    }
                                    minDate={getTodayDate()}
                                    onDateChange={(value) =>
                                        setForm((current) => ({
                                            ...current,

                                            schedule: {
                                                ...current.schedule,

                                                collectionDate:
                                                    value,
                                            },
                                        }))
                                    }
                                    onTimeChange={(value) =>
                                        setForm((current) => ({
                                            ...current,

                                            schedule: {
                                                ...current.schedule,

                                                timeSlot:
                                                    value,
                                            },
                                        }))
                                    }
                                />
                            )}

                            {/* Step 4 */}
                            {step === 4 && (
                                <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Review booking
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Please verify your information
                                        before confirming the booking.
                                    </p>

                                    <div className="mt-6 space-y-6">
                                        {/* Patient */}
                                        <ReviewSection title="Patient">
                                            <p>
                                                {
                                                    form.patient
                                                        .firstName
                                                }{" "}
                                                {
                                                    form.patient
                                                        .lastName
                                                }
                                            </p>

                                            <p>
                                                {
                                                    form.patient
                                                        .mobile
                                                }
                                            </p>

                                            <p>
                                                {
                                                    form.patient
                                                        .email
                                                }
                                            </p>

                                            <p>
                                                Gender:{" "}
                                                {
                                                    form.patient
                                                        .gender
                                                }
                                            </p>
                                        </ReviewSection>

                                        {/* Collection */}
                                        <ReviewSection title="Collection">
                                            <p>
                                                {form.collectionType ===
                                                    "HOME_COLLECTION"
                                                    ? "Home Collection"
                                                    : "Diagnostic Centre Visit"}
                                            </p>

                                            {form.collectionType ===
                                                "HOME_COLLECTION" && (
                                                    <>
                                                        <p>
                                                            {
                                                                form.address
                                                                    .addressLine1
                                                            }
                                                        </p>

                                                        {form.address
                                                            .addressLine2 && (
                                                                <p>
                                                                    {
                                                                        form.address
                                                                            .addressLine2
                                                                    }
                                                                </p>
                                                            )}

                                                        {form.address
                                                            .landmark && (
                                                                <p>
                                                                    Landmark:{" "}
                                                                    {
                                                                        form.address
                                                                            .landmark
                                                                    }
                                                                </p>
                                                            )}

                                                        <p>
                                                            {
                                                                form.address
                                                                    .city
                                                            }
                                                            ,{" "}
                                                            {
                                                                form.address
                                                                    .state
                                                            }{" "}
                                                            -{" "}
                                                            {
                                                                form.address
                                                                    .pincode
                                                            }
                                                        </p>
                                                    </>
                                                )}

                                            {form.collectionType ===
                                                "CENTRE_VISIT" &&
                                                form.centreName && (
                                                    <p>
                                                        Centre:{" "}
                                                        {
                                                            form.centreName
                                                        }
                                                    </p>
                                                )}
                                        </ReviewSection>

                                        {/* Schedule */}
                                        <ReviewSection title="Schedule">
                                            <p>
                                                {
                                                    form.schedule
                                                        .collectionDate
                                                }
                                            </p>

                                            <p>
                                                {
                                                    form.schedule
                                                        .timeSlot
                                                }
                                            </p>
                                        </ReviewSection>

                                        {/* Items */}
                                        <ReviewSection title="Selected items">
                                            <div className="space-y-2">
                                                {items.map(
                                                    (item) => (
                                                        <div
                                                            key={`${item.type}:${item.id}`}
                                                            className="flex items-center justify-between gap-4"
                                                        >
                                                            <span>
                                                                {item.name}
                                                            </span>

                                                            <span className="font-semibold text-gray-900">
                                                                ₹
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toLocaleString(
                                                                    "en-IN",
                                                                )}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </ReviewSection>
                                    </div>
                                </section>
                            )}

                            {/* Navigation buttons */}
                            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>

                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                                    >
                                        Continue
                                        <ArrowRight
                                            size={16}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={
                                            handleConfirmBooking
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700"
                                    >
                                        Confirm Booking
                                        <ArrowRight
                                            size={16}
                                        />
                                    </button>
                                )}
                            </div>
                        </main>

                        {/* Summary */}
                        <BookingSummary
                            items={items}
                            totalMrp={totalMrp}
                            discount={discount}
                            total={total}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

interface ReviewSectionProps {
    title: string;
    children: ReactNode;
}

function ReviewSection({
    title,
    children,
}: ReviewSectionProps) {
    return (
        <div>
            <h3 className="text-sm font-bold text-gray-900">
                {title}
            </h3>

            <div className="mt-2 space-y-1 text-sm leading-6 text-gray-600">
                {children}
            </div>
        </div>
    );
}