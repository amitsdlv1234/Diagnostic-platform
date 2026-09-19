import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { MainLayout } from "../components/layout/MainLayout";

/* ============================================================
   PUBLIC PAGES
   ============================================================ */

import { Home } from "../pages/Home/Home";

import { Tests } from "../pages/Tests/Tests";
import { TestDetails } from "../pages/Tests/TestDetails";

import { Packages } from "../pages/Packages/Packages";
import { PackageDetails } from "../pages/Packages/PackageDetails";

import { Centres } from "../pages/Centres/Centres";
import { CentreDetails } from "../pages/Centres/CentreDetails";

/* ============================================================
   AUTHENTICATION
   ============================================================ */

import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { VerifyOtp } from "../pages/Auth/VerifyOtp";

/* ============================================================
   PATIENT
   ============================================================ */

import { ProtectedRoute } from "../components/common/ProtectedRoute";

import { PatientLayout } from "../pages/Patient/PatientLayout";
import { Profile } from "../pages/Patient/Profile";
import { Bookings } from "../pages/Patient/Bookings";
import { Reports } from "../pages/Patient/Reports";

import { BookingDetails } from "../pages/Patient/BookingDetails";
import { ReportDetails } from "../pages/Patient/ReportDetails";

/* ============================================================
   BOOKING
   ============================================================ */

import { Cart } from "../pages/Cart/Cart";

import { Booking } from "../pages/Booking/Booking";
import { BookingConfirmation } from "../pages/Booking/BookingConfirmation";
import { Payment } from "../pages/Booking/Payment";

/* ============================================================
   ARTICLES - PUBLIC
   ============================================================ */

import { Blogs } from "../pages/Blogs/Blogs";
import { ArticleDetails } from "../pages/Blogs/ArticleDetails";

/* ============================================================
   ADMIN
   ============================================================ */

import { AdminLayout } from "../pages/Admin/AdminLayout";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { AdminTests } from "../pages/Admin/AdminTests";
import { AdminPackages } from "../pages/Admin/AdminPackages";
import { AdminCentres } from "../pages/Admin/AdminCentres";
import { AdminHome } from "../pages/Admin/AdminHome";
import { AdminOffers } from "../pages/Admin/AdminOffers";
import { AdminBookings } from "../pages/Admin/AdminBookings";
import { AdminTheme } from "../pages/Admin/AdminTheme";

/* ============================================================
   ADMIN - ARTICLES
   ============================================================ */

import { AdminArticles } from "../pages/Admin/Articles/AdminArticles";
import { ArticleForm } from "../pages/Admin/Articles/ArticleForm";

/* ============================================================
   PLACEHOLDER
   ============================================================ */

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

/* ============================================================
   APP ROUTES
   ============================================================ */

export function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            PUBLIC WEBSITE
            ===================================================== */}

        <Route element={<MainLayout />}>

          {/* =================================================
              HOME
              ================================================= */}

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

          <Route
            path="/booking/payment"
            element={<Payment />}
          />

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
            element={<Blogs />}
          />

          <Route
            path="/blogs/:slug"
            element={<ArticleDetails />}
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

            <Route
              path="reports/:reportId"
              element={<ReportDetails />}
            />

          </Route>

        </Route>

        {/* =====================================================
            ADMIN AREA
            ===================================================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* =================================================
              DASHBOARD
              ================================================= */}

          <Route
            index
            element={<AdminDashboard />}
          />

          {/* =================================================
              TESTS
              ================================================= */}

          <Route
            path="tests"
            element={<AdminTests />}
          />

          {/* =================================================
              PACKAGES
              ================================================= */}

          <Route
            path="packages"
            element={<AdminPackages />}
          />

          {/* =================================================
              CENTRES
              ================================================= */}

          <Route
            path="centres"
            element={<AdminCentres />}
          />

          {/* =================================================
              HOME
              ================================================= */}

          <Route
            path="home"
            element={<AdminHome />}
          />

          {/* =================================================
              OFFERS
              ================================================= */}

          <Route
            path="offers"
            element={<AdminOffers />}
          />

          {/* =================================================
              BOOKINGS
              ================================================= */}

          <Route
            path="bookings"
            element={<AdminBookings />}
          />

          {/* =================================================
              THEME
              ================================================= */}

          <Route
            path="theme"
            element={<AdminTheme />}
          />

          {/* =================================================
              ARTICLES
              ================================================= */}


          {/* Article list */}

          <Route
            path="articles"
            element={<AdminArticles />}
          />

          {/* Add article */}

          <Route
            path="articles/new"
            element={<ArticleForm />}
          />

          {/* Edit article */}

          <Route
            path="articles/edit/:id"
            element={<ArticleForm />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}