import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { Container } from "../../components/common/Container";

import { FormInput } from "../../components/forms/FormInput";

import {
  requestLoginOtp,
} from "../../features/auth/authService";

export function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setError("");

    const cleanedMobile =
      mobile.replace(/\D/g, "");

    if (cleanedMobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    try {
      setLoading(true);

      await requestLoginOtp(cleanedMobile);

      navigate(
        `/auth/verify-otp?mobile=${cleanedMobile}&mode=login`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send OTP.",
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

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
              <ShieldCheck
                size={28}
                className="text-blue-600"
              />
            </div>

            {/* Heading */}
            <div className="mt-5 text-center">
              <h1 className="text-2xl font-bold text-gray-950">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Login using your registered mobile
                number.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <FormInput
                id="mobile"
                label="Mobile number"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(event) =>
                  setMobile(
                    event.target.value.replace(
                      /\D/g,
                      "",
                    ),
                  )
                }
                placeholder="Enter 10-digit mobile number"
                error={error}
              />

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending OTP..."
                  : "Continue"}

                {!loading && (
                  <ArrowRight size={17} />
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-gray-500">
              New patient?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>

            {/* Back to Home */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <Link
                to="/"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
