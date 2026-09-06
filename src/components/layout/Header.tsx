import { useState } from "react";
import {
  LogOut,
  Menu,
  MapPin,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { mainNavigation } from "../../constants/navigation";
import { useAuth } from "../../store/authStore";
import { useCart } from "../../features/cart/cartStore";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const { itemCount } = useCart();
  const {
    isAuthenticated,
    patient,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <span className="text-lg font-bold">
                D
              </span>
            </div>

            <div className="hidden sm:block">
              <p className="text-lg font-bold leading-none text-gray-900">
                Diagnostic
              </p>

              <p className="text-xs font-medium text-blue-600">
                Platform
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 md:block md:max-w-md">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search tests, packages..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Location */}
            <button
              className="hidden items-center gap-1 rounded-lg px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 sm:flex"
              type="button"
            >
              <MapPin size={18} />
              <span>Lucknow</span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-gray-700 hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />

              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Desktop Authentication */}
            {isAuthenticated ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/patient/profile"
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-700 transition hover:bg-gray-100"
                  aria-label="My Account"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <User size={17} />
                  </div>

                  <div className="max-w-24">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {patient?.firstName || "Account"}
                    </p>

                    <p className="text-[11px] text-gray-500">
                      My Account
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden sm:block"
              >
                <Button size="sm">
                  <User
                    size={16}
                    className="mr-1.5"
                  />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen,
                )
              }
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search tests, packages..."
                  className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Account */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/patient/profile"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="mt-2 flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600">
                      <User size={17} />
                    </div>

                    <div>
                      <p>
                        {patient?.firstName ||
                          "My Account"}
                      </p>

                      <p className="text-xs font-normal text-blue-500">
                        View Profile
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white"
                >
                  <User size={17} />
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
