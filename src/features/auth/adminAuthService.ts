
import { ADMIN_CREDENTIALS } from "./adminCredentials";

const ADMIN_SESSION_KEY = "diagnostic_admin_session";

interface AdminSession {
  mobile: string;
  role: "ADMIN";
  authenticatedAt: number;
}

export async function requestAdminOtp(
  mobile: string,
): Promise<void> {
  const cleanedMobile = mobile.replace(/\D/g, "");

  if (!/^\d{10}$/.test(cleanedMobile)) {
    throw new Error("Enter a valid 10-digit mobile number.");
  }

  if (cleanedMobile !== ADMIN_CREDENTIALS.mobile) {
    throw new Error(
      "This mobile number is not authorized for admin access.",
    );
  }

  // No SMS or WhatsApp is sent in development mode.
  // The OTP is configured locally in adminCredentials.ts.
}

export async function verifyAdminOtp(
  mobile: string,
  otp: string,
): Promise<AdminSession> {
  const cleanedMobile = mobile.replace(/\D/g, "");

  if (cleanedMobile !== ADMIN_CREDENTIALS.mobile) {
    throw new Error("Unauthorized admin mobile number.");
  }

  if (otp !== ADMIN_CREDENTIALS.otp) {
    throw new Error("Invalid OTP. Please try again.");
  }

  const session: AdminSession = {
    mobile: cleanedMobile,
    role: "ADMIN",
    authenticatedAt: Date.now(),
  };

  sessionStorage.setItem(
    ADMIN_SESSION_KEY,
    JSON.stringify(session),
  );

  return session;
}

export function getAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);

    if (!raw) return null;

    const session = JSON.parse(raw) as AdminSession;

    if (
      session.role !== "ADMIN" ||
      session.mobile !== ADMIN_CREDENTIALS.mobile
    ) {
      return null;
    }

    // Expire the temporary session after 8 hours.
    if (Date.now() - session.authenticatedAt > 8 * 60 * 60 * 1000) {
      logoutAdmin();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function validateAdminSession(): Promise<boolean> {
  return getAdminSession() !== null;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function getAdminToken(): null {
  return null;
}
