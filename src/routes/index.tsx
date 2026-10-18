
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

import DoctorProfile from "../pages/Doctor/DoctorProfile";

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
   ADMIN AUTHENTICATION
   ============================================================ */

import { AdminLogin } from "../pages/Admin/AdminLogin";
import { ProtectedAdminRoute } from "../components/common/ProtectedAdminRoute";

/* ============================================================
   ADMIN PAGES
   ============================================================ */

import { AdminLayout } from "../pages/Admin/AdminLayout";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { AdminTests } from "../pages/Admin/AdminTests";
import { AdminPackages } from "../pages/Admin/AdminPackages";
import { AdminCentres } from "../pages/Admin/AdminCentres";
import { AdminHome } from "../pages/Admin/AdminHome";
import { AdminDoctors } from "../pages/Admin/AdminDoctors";
import { AdminVideos } from "../pages/Admin/AdminVideos";
import { AdminOffers } from "../pages/Admin/AdminOffers";
import { AdminBookings } from "../pages/Admin/AdminBookings";
import { AdminReports } from "../pages/Admin/AdminReports";
import { AdminTheme } from "../pages/Admin/AdminTheme";
import { AdminNotifications } from "../pages/Admin/AdminNotifications";
import { ContactSettings } from "../pages/Admin/ContactSettings";

/* ============================================================
   ADMIN - ARTICLES
   ============================================================ */

import { AdminArticles } from "../pages/Admin/Articles/AdminArticles";
import { ArticleForm } from "../pages/Admin/Articles/ArticleForm";

/* ============================================================
   PLACEHOLDER PAGE
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
          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* DOCTOR PROFILE */}

          <Route
            path="/doctor"
            element={<DoctorProfile />}
          />

          {/* TESTS */}

          <Route
            path="/tests"
            element={<Tests />}
          />

          <Route
            path="/tests/:testId"
            element={<TestDetails />}
          />

          {/* PACKAGES */}

          <Route
            path="/packages"
            element={<Packages />}
          />

          <Route
            path="/packages/:packageId"
            element={<PackageDetails />}
          />

          {/* DIAGNOSTIC CENTRES */}

          <Route
            path="/centres"
            element={<Centres />}
          />

          <Route
            path="/centres/:centreId"
            element={<CentreDetails />}
          />

          {/* HOME COLLECTION */}

          <Route
            path="/home-collection"
            element={
              <PlaceholderPage title="Home Collection" />
            }
          />

          {/* BOOKING */}

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

          {/* CART */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* ARTICLES */}

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
            PATIENT AUTHENTICATION
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
            ADMIN LOGIN
            Accessible without an existing admin session
            ===================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =====================================================
            PROTECTED ADMIN AREA
            All admin pages require an admin session
            ===================================================== */}

        <Route element={<ProtectedAdminRoute />}>
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            {/* DASHBOARD */}

            <Route
              index
              element={<AdminDashboard />}
            />

            {/* TESTS */}

            <Route
              path="tests"
              element={<AdminTests />}
            />

            {/* PACKAGES */}

            <Route
              path="packages"
              element={<AdminPackages />}
            />

            {/* CENTRES */}

            <Route
              path="centres"
              element={<AdminCentres />}
            />

            {/* DOCTOR SECTION MANAGEMENT */}

            <Route path="doctors" element={<AdminDoctors />} />

            {/* HOME PAGE MANAGEMENT */}

            <Route
              path="home"
              element={<AdminHome />}
            />

            {/* VIDEO SECTION */}
            <Route path="videos" element={<AdminVideos />} />

            {/* OFFERS */}

            <Route
              path="offers"
              element={<AdminOffers />}
            />

            {/* PATIENT REPORT MANAGEMENT */}
            <Route path="reports" element={<AdminReports />} />

            {/* BOOKINGS */}

            <Route
              path="bookings"
              element={<AdminBookings />}
            />

            {/* THEME */}

            <Route
              path="theme"
              element={<AdminTheme />}
            />

            {/* NOTIFICATIONS */}

            <Route
              path="notifications"
              element={<AdminNotifications />}
            />

            {/* CONTACT SETTINGS */}

            <Route
              path="contact"
              element={<ContactSettings />}
            />

            {/* ARTICLES */}

            <Route
              path="articles"
              element={<AdminArticles />}
            />

            <Route
              path="articles/new"
              element={<ArticleForm />}
            />

            <Route
              path="articles/edit/:id"
              element={<ArticleForm />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
