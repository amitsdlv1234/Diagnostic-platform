import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useState } from "react";

import { Container } from "../../components/common/Container";

import {
  verifyOtp,
} from "../../features/auth/authService";

import {
  useAuth,
} from "../../store/authStore";

export function VerifyOtp() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const { login } = useAuth();

  const mobile =
    searchParams.get("mobile") ?? "";

  const mode =
    searchParams.get("mode") ?? "login";

  const [otp, setOtp] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleVerify = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP.",
      );
      return;
    }

    try {
      setLoading(true);

      const session =
        await verifyOtp(otp);

      login(session);

      navigate(
        mode === "register"
          ? "/patient/profile"
          : "/patient/bookings",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <Container>
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <div className="mt-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <ShieldCheck
                  size={28}
                  className="text-blue-600"
                />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-gray-950">
                Verify your mobile
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter the OTP sent to{" "}
                <span className="font-semibold text-gray-800">
                  +91 {mobile}
                </span>
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleVerify}
              className="mt-7"
            >
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoFocus
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value.replace(
                      /\D/g,
                      "",
                    ),
                  )
                }
                placeholder="Enter 6-digit OTP"
                className="h-14 w-full rounded-xl border border-gray-300 px-4 text-center text-xl font-bold tracking-[0.5em] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-gray-400">
              Development OTP:{" "}
              <span className="font-bold text-gray-600">
                123456
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}