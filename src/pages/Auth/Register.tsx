import {
  ArrowRight,
  UserPlus,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { Container } from "../../components/common/Container";

import { FormInput } from "../../components/forms/FormInput";

import {
  registerPatient,
} from "../../features/auth/authService";

export function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!form.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    const mobile =
      form.mobile.replace(/\D/g, "");

    if (mobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    if (
      !form.email.includes("@")
    ) {
      setError(
        "Please enter a valid email address.",
      );
      return;
    }

    try {
      setLoading(true);

      await registerPatient({
        ...form,
        mobile,
      });

      navigate(
        `/auth/verify-otp?mobile=${mobile}&mode=register`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to continue.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <Container>
        <div className="flex justify-center py-10 sm:py-14">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
              <UserPlus
                size={28}
                className="text-blue-600"
              />
            </div>

            <div className="mt-5 text-center">
              <h1 className="text-2xl font-bold text-gray-950">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Register to book tests and manage
                diagnostic reports.
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput
                  id="firstName"
                  label="First name"
                  value={form.firstName}
                  onChange={(event) =>
                    updateField(
                      "firstName",
                      event.target.value,
                    )
                  }
                  placeholder="First name"
                />

                <FormInput
                  id="lastName"
                  label="Last name"
                  value={form.lastName}
                  onChange={(event) =>
                    updateField(
                      "lastName",
                      event.target.value,
                    )
                  }
                  placeholder="Last name"
                />
              </div>

              <FormInput
                id="mobile"
                label="Mobile number"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.mobile}
                onChange={(event) =>
                  updateField(
                    "mobile",
                    event.target.value.replace(
                      /\D/g,
                      "",
                    ),
                  )
                }
                placeholder="10-digit mobile number"
              />

              <FormInput
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value,
                  )
                }
                placeholder="you@example.com"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Continue"}

                {!loading && (
                  <ArrowRight size={17} />
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already registered?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-blue-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}