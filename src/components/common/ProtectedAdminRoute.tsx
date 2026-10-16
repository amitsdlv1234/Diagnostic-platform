
import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  getAdminSession,
  validateAdminSession,
  logoutAdmin,
} from "../../features/auth/adminAuthService";

export function ProtectedAdminRoute() {
  const location = useLocation();

  const [status, setStatus] = useState<
    "checking" | "authorized" | "unauthorized"
  >("checking");

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      const session = getAdminSession();

      if (!session) {
        if (!cancelled) {
          setStatus("unauthorized");
        }
        return;
      }

      try {
        const valid = await validateAdminSession();

        if (cancelled) return;

        if (valid) {
          setStatus("authorized");
        } else {
          logoutAdmin();
          setStatus("unauthorized");
        }
      } catch {
        if (cancelled) return;

        logoutAdmin();
        setStatus("unauthorized");
      }
    };

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

          <p className="mt-4 text-sm text-gray-600">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
