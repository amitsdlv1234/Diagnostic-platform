
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import {
  getAdminSession,
  requestAdminOtp,
  verifyAdminOtp,
} from "../../features/auth/adminAuthService";

export function AdminLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (getAdminSession()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSendOtp = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const cleanedMobile = mobile.replace(/\D/g, "");

    if (!/^\d{10}$/.test(cleanedMobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      await requestAdminOtp(cleanedMobile);

      setMobile(cleanedMobile);
      setOtpSent(true);
      setSuccess(
        "OTP request accepted. Enter your configured development OTP.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to request OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      await verifyAdminOtp(mobile, otp);

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "OTP verification failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-6 shadow-2xl sm:p-9">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <ShieldCheck size={32} />
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Nidan Diagnostic Centre
          </p>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-950">
            Admin Login
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {otpSent
              ? `Enter the configured OTP for +91 ${mobile}.`
              : "Sign in using your registered admin mobile number."}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="mt-7 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-800">
                Registered mobile number
              </span>

              <div className="flex overflow-hidden rounded-xl border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-600">
                  +91
                </span>

                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  required
                  value={mobile}
                  onChange={(event) =>
                    setMobile(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="10-digit mobile number"
                  className="min-w-0 flex-1 px-4 py-3 outline-none"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={19} />
              ) : (
                <MessageCircle size={19} />
              )}

              {loading ? "Checking..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-7 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-800">
                Six-digit OTP
              </span>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                autoFocus
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, ""))
                }
                placeholder="••••••"
                className="h-14 w-full rounded-xl border border-gray-300 px-4 text-center text-2xl font-bold tracking-[0.6em] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={19} />
              ) : (
                <ArrowRight size={19} />
              )}

              {loading ? "Verifying..." : "Verify OTP & Login"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError("");
                setSuccess("");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold text-gray-600 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Change mobile number
            </button>
          </form>
        )}

        <div className="mt-7 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs leading-5 text-gray-400">
            Authorized administrators only.
            This is a temporary development login.
          </p>
        </div>
      </section>
    </main>
  );
}
