import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getDoctorContent, DOCTOR_CONTENT_UPDATED_EVENT, type DoctorContent } from "../../../features/admin/doctorConfig";
import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import doctorPhoto from "../../../assets/doctorimg.jpeg";

const NAVY = "#1b3a7a";
const RED = "#c8102e";
const GOLD = "#b8903c";
const SERIF = `"Libre Baskerville", "Playfair Display", Georgia, serif`;

export function DoctorSection() {
  const [doctor, setDoctor] = useState<DoctorContent>(() => getDoctorContent());
  useEffect(() => {
    const update = () => setDoctor(getDoctorContent());
    window.addEventListener(DOCTOR_CONTENT_UPDATED_EVENT, update);
    window.addEventListener("storage", update);
    return () => { window.removeEventListener(DOCTOR_CONTENT_UPDATED_EVENT, update); window.removeEventListener("storage", update); };
  }, []);
  if (!doctor.enabled) return null;
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-md md:max-w-none">
            <img
              src={doctor.imageUrl || doctorPhoto}
              alt={`${doctor.name}, ${doctor.title}`}
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(27,58,122,0.35)] md:aspect-auto md:h-[600px]"
            />
          </div>

          <div className="md:pt-8">
            <p
              className="text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: RED }}
            >
              Leadership
            </p>

            <h2
              className="mt-3 text-4xl font-bold leading-tight sm:text-5xl"
              style={{ fontFamily: SERIF, color: NAVY }}
            >
              {doctor.name}
            </h2>

            <p className="mt-4 text-base font-medium uppercase tracking-wide text-gray-700">
              {doctor.title}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {doctor.qualificationsSummary} &middot; {doctor.specialty}
            </p>

            <div className="mt-5 h-[3px] w-14" style={{ background: GOLD }} />

            <div className="mt-8 space-y-5 text-[17px] leading-8 text-gray-600">
              <p>
                {doctor.shortBio}
              </p>
            </div>

            <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.14em] text-gray-700">
              Training and memberships
            </h3>

            <div className="mt-3 h-[3px] w-14" style={{ background: GOLD }} />

            <ul className="mt-6 space-y-3 text-[16px] leading-7 text-gray-600">
              {[...doctor.training, ...doctor.memberships].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: GOLD }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2 text-gray-600">
              <MapPin
                size={18}
                className="mt-1 shrink-0"
                style={{ color: RED }}
              />
              {doctor.address}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/doctor"
                className="inline-flex items-center rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: RED }}
              >
                View Doctor Profile
              </Link>

              <Link
                to="/booking"
                className="inline-flex items-center rounded-lg border-2 px-6 py-3 font-semibold transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}