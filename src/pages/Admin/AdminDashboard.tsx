import {
  Building2,
  FileText,
  Gift,
  Home,
  Package,
  Palette,
  Stethoscope,
} from "lucide-react";

import { Link } from "react-router-dom";

const cards = [
  {
    title: "Tests",
    description: "Manage diagnostic tests",
    icon: Stethoscope,
    path: "/admin/tests",
  },
  {
    title: "Packages",
    description: "Manage health packages",
    icon: Package,
    path: "/admin/packages",
  },
  {
    title: "Centres",
    description: "Manage diagnostic centres",
    icon: Building2,
    path: "/admin/centres",
  },
  {
    title: "Home Page",
    description: "Manage website content",
    icon: Home,
    path: "/admin/home",
  },
  {
    title: "Offers & Banners",
    description: "Manage promotions",
    icon: Gift,
    path: "/admin/offers",
  },
  {
    title: "Bookings",
    description: "View patient bookings",
    icon: FileText,
    path: "/admin/bookings",
  },
  {
  title: "Theme & Appearance",
  description: "Customize colours and website appearance",
  icon: Palette,
  path: "/admin/theme",
},
];

export function AdminDashboard() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your diagnostic platform.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.path}
              to={card.path}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={22} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-gray-900">
                {card.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}