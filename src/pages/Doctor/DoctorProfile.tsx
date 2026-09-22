import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../components/common/Container";

import doctorPhoto from "../../assets/doctorimg.jpeg";

export function DoctorProfile() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* =========================================================
          TOP SECTION
          ========================================================= */}
      <section className="bg-white py-10 sm:py-14">
        <Container>
          {/* Back */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
            {/* ===================================================
                DOCTOR IMAGE
                =================================================== */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={doctorPhoto}
                  alt="Dr. Doctor Name"
                  className="h-[440px] w-[360px] rounded-3xl object-cover shadow-xl"
                />

                {/* Available Badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />

                    <span className="text-sm font-semibold text-gray-800">
                      Available for consultation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================
                DOCTOR BASIC INFORMATION
                =================================================== */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Meet Our Doctor
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Dr. Doctor Name
              </h1>

              <p className="mt-3 text-xl font-medium text-gray-600">
                Consultant / Specialist
              </p>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                Our medical professional is committed to providing
                patient-focused diagnostic care with an emphasis on
                accurate assessment, quality service and a positive
                patient experience.
              </p>

              {/* Quick Information */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Stethoscope size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Specialization
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      Medical Specialist
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <GraduationCap size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Qualifications
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      Add verified qualification
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </Link>

                <Link
                  to="/tests"
                  className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  Explore Diagnostic Tests
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          ABOUT DOCTOR
          ========================================================= */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* About */}
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Stethoscope size={22} />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  About the Doctor
                </h2>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                Add the doctor's verified professional biography here.
                This section can describe the doctor's medical
                specialization, professional approach and areas of
                expertise.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                The information should be based on the doctor's actual
                professional profile and verified credentials.
              </p>
            </div>

            {/* Expertise */}
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Award size={22} />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Areas of Expertise
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  "Diagnostic consultation",
                  "Medical imaging / diagnostics",
                  "Patient-focused care",
                  "Clinical assessment",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-green-600"
                    />

                    <span className="text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          PROFESSIONAL INFORMATION
          ========================================================= */}
      <section className="bg-white py-14 sm:py-18">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Professional Profile
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Qualifications & Experience
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {/* Qualification */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center gap-3">
                  <GraduationCap
                    size={22}
                    className="text-blue-600"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Qualifications
                  </h3>
                </div>

                <p className="mt-4 leading-6 text-gray-600">
                  Add verified medical qualifications here.
                </p>
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center gap-3">
                  <Award
                    size={22}
                    className="text-blue-600"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Professional Experience
                  </h3>
                </div>

                <p className="mt-4 leading-6 text-gray-600">
                  Add verified professional experience here.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          FINAL CTA
          ========================================================= */}
      <section className="bg-blue-600 py-14">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to book your diagnostic test?
              </h2>

              <p className="mt-2 text-blue-100">
                Explore our diagnostic services and book your test
                conveniently online.
              </p>
            </div>

            <Link
              to="/booking"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              <CalendarDays size={18} />
              Book Now
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default DoctorProfile;