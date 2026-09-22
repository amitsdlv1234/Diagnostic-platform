import { ArrowRight, Award, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";

import doctorPhoto from "../../../assets/doctorimg.jpeg";

export function DoctorSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Meet Our Doctor"
          title="Expert care backed by experience"
          description="Our diagnostic services are supported by experienced medical professionals focused on accurate diagnosis and patient care."
          align="center"
        />

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          {/* Doctor Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={doctorPhoto}
                alt="Doctor"
                className="h-[360px] w-[300px] rounded-3xl object-cover shadow-xl"
              />

              {/* Doctor Name Overlay */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                <p className="text-lg font-bold text-gray-900">
                  Dr. Doctor Name
                </p>

                <p className="text-sm text-gray-500">
                  Consultant / Specialist
                </p>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Stethoscope size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Medical Expertise
                </p>

                <p className="text-sm text-gray-500">
                  Patient-focused diagnostic care
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-3xl font-bold text-gray-900">
              Dr. Doctor Name
            </h3>

            <p className="mt-2 text-lg text-gray-600">
              Consultant / Specialist
            </p>

            <p className="mt-5 leading-7 text-gray-600">
              With a focus on accurate diagnosis and patient-centered
              care, our medical team works to provide reliable diagnostic
              services and a comfortable patient experience.
            </p>

            {/* Highlights */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Award size={18} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Professional Expertise
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Experienced medical expertise supporting quality
                    diagnostic care.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Stethoscope size={18} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Patient Focused
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Care designed around accuracy, comfort and patient
                    experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/doctor"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                View Doctor Profile
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/booking"
                className="inline-flex items-center rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
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