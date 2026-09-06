import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getAuthSession,
  logout as logoutService,
  updatePatient,
} from "../features/auth/authService";

import type {
  AuthSession,
  Patient,
} from "../features/auth/authTypes";

interface AuthContextValue {
  session: AuthSession | null;
  patient: Patient | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  updateProfile: (
    patient: Patient,
  ) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] =
    useState<AuthSession | null>(null);

  useEffect(() => {
    const existingSession =
      getAuthSession();

    setSession(existingSession);
  }, []);

  const login = (
    newSession: AuthSession,
  ) => {
    setSession(newSession);
  };

  const updateProfile = (
    patient: Patient,
  ) => {
    const updatedSession =
      updatePatient(patient);

    if (updatedSession) {
      setSession(updatedSession);
    }
  };

  const logout = () => {
    logoutService();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        patient: session?.patient ?? null,
        isAuthenticated:
          Boolean(session),
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}