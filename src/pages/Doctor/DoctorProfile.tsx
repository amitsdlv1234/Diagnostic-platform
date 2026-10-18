import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Phone,
  Stethoscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorContent, DOCTOR_CONTENT_UPDATED_EVENT, type DoctorContent } from "../../features/admin/doctorConfig";

import { Container } from "../../components/common/Container";

import doctorPhoto from "../../assets/doctorimg.jpeg";

const NAVY = "#1b3a7a";
const RED = "#c8102e";
const GOLD = "#b8903c";
const SERIF = `"Libre Baskerville", "Playfair Display", Georgia, serif`;

function GoldRule() {
  return <div className="h-[3px] w-14" style={{ background: GOLD }} />;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 leading-6 text-gray-600">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: GOLD }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function DoctorProfile() {
  const [doctor, setDoctor] = useState<DoctorContent>(() => getDoctorContent());
  useEffect(() => {
    const update = () => setDoctor(getDoctorContent());
    window.addEventListener(DOCTOR_CONTENT_UPDATED_EVENT, update);
    window.addEventListener("storage", update);
    return () => { window.removeEventListener(DOCTOR_CONTENT_UPDATED_EVENT, update); window.removeEventListener("storage", update); };
  }, []);
  if (!doctor.enabled) return <main className="min-h-screen bg-gray-50"><Container><div className="py-24 text-center"><h1 className="text-2xl font-bold text-gray-900">Doctor profile is currently unavailable</h1><Link to="/" className="mt-5 inline-block font-semibold text-blue-700">Back to Home</Link></div></Container></main>;
  return (
    <main className="min-h-screen bg-gray-50">
      {/* TOP SECTION */}
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <img
                src={doctor.imageUrl || doctorPhoto}
                alt={`${doctor.name}, ${doctor.title}`}
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(27,58,122,0.35)]"
              />
            </div>

            <div className="lg:pt-6">
              <p
                className="text-sm font-bold uppercase tracking-[0.18em]"
                style={{ color: RED }}
              >
                Leadership
              </p>

              <h1
                className="mt-3 text-4xl font-bold leading-tight sm:text-5xl"
                style={{ fontFamily: SERIF, color: NAVY }}
              >
                {doctor.name}
              </h1>

              <p className="mt-4 text-base font-medium uppercase tracking-wide text-gray-700">
                {doctor.title}
              </p>

              <div className="mt-5">
                <GoldRule />
              </div>

              <p className="mt-8 max-w-2xl text-[17px] leading-8 text-gray-600">
                {doctor.profileBio}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white"
                    style={{ color: NAVY }}
                  >
                    <Stethoscope size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Specialisation</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white"
                    style={{ color: NAVY }}
                  >
                    <GraduationCap size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Qualifications</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {doctor.qualificationsSummary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ background: RED }}
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </Link>

                <Link
                  to="/tests"
                  className="inline-flex items-center rounded-lg border-2 px-6 py-3 font-semibold transition hover:bg-gray-50"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  Explore Diagnostic Tests
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT + EXPERTISE */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50"
                  style={{ color: NAVY }}
                >
                  <Stethoscope size={22} />
                </div>

                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: SERIF, color: NAVY }}
                >
                  About the Doctor
                </h2>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                Dr. Yadav holds an MBBS and an MD in Radiodiagnosis, and has
                completed the Certificate Course in Fetal Radiology &amp;
                Genetics (CCFRG) and a fellowship in fetal ultrasound. She
                is a Consultant Radiologist at her own centre, Nidan
                Diagnostic Centre.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                The centre offers obstetric and fetal imaging, Doppler
                studies, digital X-ray and a full pathology laboratory under
                one roof.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50"
                  style={{ color: NAVY }}
                >
                  <Award size={22} />
                </div>

                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: SERIF, color: NAVY }}
                >
                  Areas of Expertise
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {doctor.expertise.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* QUALIFICATIONS, TRAINING, MEMBERSHIPS */}
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p
                className="text-sm font-bold uppercase tracking-[0.18em]"
                style={{ color: RED }}
              >
                Professional Profile
              </p>

              <h2
                className="mt-3 text-3xl font-bold"
                style={{ fontFamily: SERIF, color: NAVY }}
              >
                Qualifications &amp; Memberships
              </h2>

              <div className="mx-auto mt-4 w-14">
                <GoldRule />
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center gap-3">
                  <GraduationCap size={22} style={{ color: NAVY }} />
                  <h3 className="font-semibold text-gray-900">
                    Qualifications
                  </h3>
                </div>
                <BulletList items={doctor.qualifications} />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center gap-3">
                  <Award size={22} style={{ color: NAVY }} />
                  <h3 className="font-semibold text-gray-900">
                    Training &amp; Recognition
                  </h3>
                </div>
                <BulletList items={doctor.training} />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center gap-3">
                  <Users size={22} style={{ color: NAVY }} />
                  <h3 className="font-semibold text-gray-900">Memberships</h3>
                </div>
                <BulletList items={doctor.memberships} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-14" style={{ background: NAVY }}>
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Book a scan or test at Nidan Diagnostic Centre
              </h2>

              <p className="mt-3 flex items-start justify-center gap-2 text-blue-100 md:justify-start">
                <MapPin size={18} className="mt-1 shrink-0" />
                {doctor.address}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/booking"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 font-semibold shadow-sm transition hover:bg-gray-100"
                style={{ color: NAVY }}
              >
                <CalendarDays size={18} />
                Book Now
              </Link>

              <a
                href={`tel:${doctor.phone.replace(/\s/g, "")}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-white/70 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone size={18} />
                {doctor.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default DoctorProfile;