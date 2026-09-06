import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { MainLayout } from "../components/layout/MainLayout";

import { Home } from "../pages/Home/Home";

import { Tests } from "../pages/Tests/Tests";
import { TestDetails } from "../pages/Tests/TestDetails";

import { Packages } from "../pages/Packages/Packages";
import { PackageDetails } from "../pages/Packages/PackageDetails";

import { Centres } from "../pages/Centres/Centres";
import { CentreDetails } from "../pages/Centres/CentreDetails";

import { ProtectedRoute } from "../components/common/ProtectedRoute";

import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { VerifyOtp } from "../pages/Auth/VerifyOtp";

import { PatientLayout } from "../pages/Patient/PatientLayout";
import { Profile } from "../pages/Patient/Profile";
import { Bookings } from "../pages/Patient/Bookings";
import { Reports } from "../pages/Patient/Reports";

import { Cart } from "../pages/Cart/Cart";

import { Booking } from "../pages/Booking/Booking";
import { BookingConfirmation } from "../pages/Booking/BookingConfirmation";
import { BookingDetails } from "../pages/Patient/BookingDetails";

function PlaceholderPage({
  title,
}: {
  title: string;
}) {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-3 text-gray-600">
        This page will be implemented in the next phase.
      </p>
    </div>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            PUBLIC WEBSITE
            ===================================================== */}

        <Route element={<MainLayout />}>
          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* =================================================
              TESTS
              ================================================= */}

          <Route
            path="/tests"
            element={<Tests />}
          />

          <Route
            path="/tests/:testId"
            element={<TestDetails />}
          />

          {/* =================================================
              PACKAGES
              ================================================= */}

          <Route
            path="/packages"
            element={<Packages />}
          />

          <Route
            path="/packages/:packageId"
            element={<PackageDetails />}
          />

          {/* =================================================
              DIAGNOSTIC CENTRES
              ================================================= */}

          <Route
            path="/centres"
            element={<Centres />}
          />

          <Route
            path="/centres/:centreId"
            element={<CentreDetails />}
          />

          {/* =================================================
              HOME COLLECTION
              ================================================= */}

          <Route
            path="/home-collection"
            element={
              <PlaceholderPage
                title="Home Collection"
              />
            }
          />

          {/* =================================================
              BOOKING
              ================================================= */}

          {/* IMPORTANT:
              Confirmation route is declared before /booking
          */}

          <Route
            path="/booking/confirmation/:bookingId"
            element={<BookingConfirmation />}
          />

          <Route
            path="/booking"
            element={<Booking />}
          />

          {/* =================================================
              CART
              ================================================= */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* =================================================
              ARTICLES
              ================================================= */}

          <Route
            path="/blogs"
            element={
              <PlaceholderPage
                title="Health Articles"
              />
            }
          />

          <Route
            path="/blogs/:articleId"
            element={
              <PlaceholderPage
                title="Article"
              />
            }
          />
        </Route>

        {/* =====================================================
            AUTHENTICATION
            ===================================================== */}

        <Route
          path="/auth/login"
          element={<Login />}
        />

        <Route
          path="/auth/register"
          element={<Register />}
        />

        <Route
          path="/auth/verify-otp"
          element={<VerifyOtp />}
        />

        {/* =====================================================
            PROTECTED PATIENT AREA
            ===================================================== */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/patient"
            element={<PatientLayout />}
          >
            <Route
              index
              element={<Profile />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />

            <Route
              path="bookings"
              element={<Bookings />}
            />
            <Route
              path="bookings/:bookingId"
              element={<BookingDetails />}
            />
            <Route
              path="reports"
              element={<Reports />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}