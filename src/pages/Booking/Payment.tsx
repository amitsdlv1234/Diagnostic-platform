import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  RefreshCw,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { Container } from "../../components/common/Container";

interface PaymentState {
  bookingId: string;
  total: number;
}

type PaymentStatus =
  | "IDLE"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED";

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as PaymentState | undefined;

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("IDLE");

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="mx-auto max-w-2xl py-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Payment information unavailable
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              We could not find the booking required
              for payment.
            </p>

            <Link
              to="/patient/bookings"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <ArrowLeft size={17} />
              My Bookings
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  /*
   * Demo payment processing.
   *
   * This currently simulates a successful payment.
   * The failure button below allows us to test the
   * payment-failed -> retry flow.
   */
  const handlePayment = (
    simulateFailure = false,
  ) => {
    setPaymentStatus("PROCESSING");

    setTimeout(() => {
      const storageKey =
        `diagnostic-booking-${state.bookingId}`;

      const stored =
        localStorage.getItem(storageKey);

      if (!stored) {
        setPaymentStatus("FAILED");
        return;
      }

      try {
        const booking = JSON.parse(stored);

        if (simulateFailure) {
          /*
           * Payment failed.
           *
           * Booking remains pending because payment
           * was not completed.
           */
          const failedBooking = {
            ...booking,
            status: "PENDING",
            paymentStatus: "FAILED",
            paymentFailedAt:
              new Date().toISOString(),
          };

          localStorage.setItem(
            storageKey,
            JSON.stringify(failedBooking),
          );

          setPaymentStatus("FAILED");
          return;
        }

        /*
         * Payment successful.
         *
         * Now confirm the existing booking.
         */
        const updatedBooking = {
          ...booking,
          status: "CONFIRMED",
          paymentStatus: "PAID",
          paidAt: new Date().toISOString(),
        };

        localStorage.setItem(
          storageKey,
          JSON.stringify(updatedBooking),
        );

        setPaymentStatus("SUCCESS");
      } catch {
        setPaymentStatus("FAILED");
      }
    }, 1200);
  };

  /*
   * Payment failed screen
   */
  if (paymentStatus === "FAILED") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="mx-auto max-w-2xl py-12 sm:py-16">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <AlertCircle
                  size={38}
                  className="text-red-600"
                />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-red-600">
                Payment Failed
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-950">
                Payment could not be completed
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Your payment was not successful.
                Your booking is still pending and
                has not been confirmed.
              </p>

              <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Booking ID
                </p>

                <p className="mt-1 text-lg font-bold text-blue-600">
                  {state.bookingId}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-500">
                    Amount Payable
                  </span>

                  <span className="text-xl font-bold text-gray-950">
                    ₹
                    {state.total.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Payment Status
                  </span>

                  <span className="text-sm font-bold text-red-600">
                    FAILED
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() =>
                    handlePayment(false)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <RefreshCw size={17} />
                  Retry Payment
                </button>

                <Link
                  to="/patient/bookings"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  My Bookings
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  /*
   * Payment successful screen
   */
  if (paymentStatus === "SUCCESS") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="mx-auto max-w-2xl py-12 sm:py-16">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2
                  size={38}
                  className="text-green-600"
                />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-600">
                Payment Successful
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-950">
                Payment completed
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Your payment has been successfully
                processed and your booking is confirmed.
              </p>

              <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Booking ID
                </p>

                <p className="mt-1 text-lg font-bold text-blue-600">
                  {state.bookingId}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-500">
                    Amount Paid
                  </span>

                  <span className="text-xl font-bold text-gray-950">
                    ₹
                    {state.total.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Payment Status
                  </span>

                  <span className="text-sm font-bold text-green-600">
                    PAID
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/booking/confirmation/${state.bookingId}`,
                    )
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  View Booking Confirmation
                </button>

                <Link
                  to="/patient/bookings"
                  className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  My Bookings
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const processing =
    paymentStatus === "PROCESSING";

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="mx-auto max-w-2xl py-10 sm:py-14">
          <Link
            to="/patient/bookings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back
          </Link>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <CreditCard
                  size={23}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-950">
                  Payment
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Complete payment to confirm your booking.
                </p>
              </div>
            </div>

            {/* Booking */}
            <div className="mt-7 rounded-2xl bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Booking ID
              </p>

              <p className="mt-1 text-lg font-bold text-blue-600">
                {state.bookingId}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-sm font-semibold text-gray-700">
                  Amount Payable
                </span>

                <span className="text-2xl font-bold text-gray-950">
                  ₹
                  {state.total.toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-bold text-gray-900">
                Payment Method
              </p>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <CreditCard
                  size={20}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Demo Card Payment
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Test payment for frontend implementation
                  </p>
                </div>
              </div>
            </div>

            {/* Pay */}
            <button
              type="button"
              disabled={processing}
              onClick={() =>
                handlePayment(false)
              }
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing ? (
                "Processing Payment..."
              ) : (
                <>
                  <CreditCard size={18} />
                  Pay ₹
                  {state.total.toLocaleString(
                    "en-IN",
                  )}
                </>
              )}
            </button>

            {processing && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Please wait while your payment is being
                processed.
              </p>
            )}

            {/* Demo failure testing */}
            {!processing && (
              <button
                type="button"
                onClick={() =>
                  handlePayment(true)
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <AlertCircle size={17} />
                Simulate Payment Failure
              </button>
            )}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
              <LockKeyhole size={14} />
              Secure payment
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}