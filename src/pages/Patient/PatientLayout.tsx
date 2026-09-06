import {
  FileText,
  LogOut,
  User,
} from "lucide-react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  useAuth,
} from "../../store/authStore";

import { Container } from "../../components/common/Container";

export function PatientLayout() {
  const {
    patient,
    logout,
  } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <Container>
        <div className="py-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-950">
              My Account
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Welcome back,{" "}
              <span className="font-semibold text-gray-700">
                {patient?.firstName}
              </span>
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3">
              <nav className="space-y-1">
                <PatientNavLink
                  to="/patient/profile"
                  icon={User}
                  label="Profile"
                />

                <PatientNavLink
                  to="/patient/bookings"
                  icon={FileText}
                  label="My Bookings"
                />

                <PatientNavLink
                  to="/patient/reports"
                  icon={FileText}
                  label="My Reports"
                />
              </nav>

              <div className="my-3 border-t border-gray-100" />

              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </aside>

            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
}

interface PatientNavLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function PatientNavLink({
  to,
  icon: Icon,
  label,
}: PatientNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}