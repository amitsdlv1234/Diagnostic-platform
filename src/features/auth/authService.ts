import { demoPatient } from "./authData";

import type {
  AuthSession,
  Patient,
  RegisterRequest,
} from "./authTypes";

const AUTH_STORAGE_KEY =
  "diagnostic_platform_auth";

const OTP_STORAGE_KEY =
  "diagnostic_platform_otp";

function createDemoToken(): string {
  return `demo-token-${Date.now()}`;
}

export async function requestLoginOtp(
  mobile: string,
): Promise<void> {
  if (!mobile || mobile.length !== 10) {
    throw new Error(
      "Please enter a valid 10-digit mobile number.",
    );
  }

  localStorage.setItem(
    OTP_STORAGE_KEY,
    "123456",
  );

  localStorage.setItem(
    "diagnostic_platform_pending_mobile",
    mobile,
  );
}

export async function requestRegisterOtp(
  mobile: string,
): Promise<void> {
  if (!mobile || mobile.length !== 10) {
    throw new Error(
      "Please enter a valid 10-digit mobile number.",
    );
  }

  localStorage.setItem(
    OTP_STORAGE_KEY,
    "123456",
  );

  localStorage.setItem(
    "diagnostic_platform_pending_mobile",
    mobile,
  );
}

export async function verifyOtp(
  otp: string,
): Promise<AuthSession> {
  const savedOtp =
    localStorage.getItem(
      OTP_STORAGE_KEY,
    );

  const mobile =
    localStorage.getItem(
      "diagnostic_platform_pending_mobile",
    );

  if (!savedOtp || !mobile) {
    throw new Error(
      "OTP session expired. Please request a new OTP.",
    );
  }

  if (otp !== savedOtp) {
    throw new Error(
      "Invalid OTP. Please try again.",
    );
  }

  const patient: Patient = {
    ...demoPatient,
    mobile,
  };

  const session: AuthSession = {
    token: createDemoToken(),
    patient,
  };

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session),
  );

  localStorage.removeItem(
    OTP_STORAGE_KEY,
  );

  localStorage.removeItem(
    "diagnostic_platform_pending_mobile",
  );

  return session;
}

export async function registerPatient(
  data: RegisterRequest,
): Promise<void> {
  localStorage.setItem(
    "diagnostic_platform_pending_patient",
    JSON.stringify(data),
  );

  await requestRegisterOtp(data.mobile);
}

export function getAuthSession(): AuthSession | null {
  const raw =
    localStorage.getItem(
      AUTH_STORAGE_KEY,
    );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    localStorage.removeItem(
      AUTH_STORAGE_KEY,
    );

    return null;
  }
}

export function updatePatient(
  patient: Patient,
): AuthSession | null {
  const currentSession =
    getAuthSession();

  if (!currentSession) {
    return null;
  }

  const updatedSession: AuthSession = {
    ...currentSession,
    patient,
  };

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(updatedSession),
  );

  return updatedSession;
}

export function logout(): void {
  localStorage.removeItem(
    AUTH_STORAGE_KEY,
  );
}