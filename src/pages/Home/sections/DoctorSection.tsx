import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import doctorPhoto from "../../../assets/doctorimg.jpeg";

const NAVY = "#1b3a7a";
const RED = "#c8102e";
const GOLD = "#b8903c";
const SERIF = `"Libre Baskerville", "Playfair Display", Georgia, serif`;

const credentials = [
  "CCFRG, Certificate Course in Fetal Radiology & Genetics (ICRI, IRIA), 2025",
  "Fellowship in fetal ultrasound, Bangalore Fetal Medicine Centre (FGI)",
  "Scholarship awardee, American Society of Pediatric Neuroradiology (ASPNR), 2024-25",
  "Observership in pediatric radiology, Bharati Vidyapeeth, Pune, 2024",
  "Life member, IRIA and ISPR (since 2021)",
  "Member, European Society of Radiology (since 2023)",
  "Member, Fetal Medicine Foundation, UK (FMF ID 302305)",
  "Member, ISUOG",
];

export function DoctorSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-md md:max-w-none">
            <img
              src={doctorPhoto}
              alt="Dr. Sarita Yadav, Consultant Radiologist"
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
              Dr. Sarita Yadav
            </h2>

            <p className="mt-4 text-base font-medium uppercase tracking-wide text-gray-700">
              Consultant Radiologist &amp; Founder
            </p>

            <p className="mt-1 text-sm text-gray-600">
              MBBS, MD (Radiodiagnosis), CCFRG &middot; Fetal &amp; Women&rsquo;s
              Imaging Specialist
            </p>

            <div className="mt-5 h-[3px] w-14" style={{ background: GOLD }} />

            <div className="mt-8 space-y-5 text-[17px] leading-8 text-gray-600">
              <p>
                Nidan Diagnostic Centre has served Ayodhya since 2000 and is
                Dr. Sarita Yadav&rsquo;s own centre. Obstetric and fetal
                imaging, Doppler studies, digital X-ray and a full pathology
                laboratory sit under one roof.
              </p>
            </div>

            <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.14em] text-gray-700">
              Training and memberships
            </h3>

            <div className="mt-3 h-[3px] w-14" style={{ background: GOLD }} />

            <ul className="mt-6 space-y-3 text-[16px] leading-7 text-gray-600">
              {credentials.map((item) => (
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
              Rishi Tola, Kasabbara, near GIC, Ayodhya 224001
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