import {
  Building2,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Stethoscope,
  FileText,
} from "lucide-react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

const links = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/tests",
    label: "Tests",
    icon: Stethoscope,
  },
  {
    to: "/admin/packages",
    label: "Packages",
    icon: Package,
  },
  {
    to: "/admin/centres",
    label: "Centres",
    icon: Building2,
  },
  {
    to: "/admin/home",
    label: "Home Page",
    icon: Home,
  },
  {
    to: "/admin/offers",
    label: "Offers & Banners",
    icon: Gift,
  },
  {
    to: "/admin/bookings",
    label: "Bookings",
    icon: FileText,
  },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="border-b border-gray-100 p-5">
            <h1 className="text-xl font-bold text-gray-950">
              Diagnostic Admin
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Management Panel
            </p>
          </div>

          <nav className="space-y-1 p-3">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={18} />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="absolute bottom-5 w-64 px-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="border-b border-gray-200 bg-white px-6 py-4 lg:px-8">
            <div className="text-sm font-semibold text-gray-700">
              Admin Panel
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}