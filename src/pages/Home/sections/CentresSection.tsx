import {
  Clock3,
  MapPin,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { diagnosticCentres } from "../../../features/home/homeData";

export function CentresSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our Centres"
            title="Find a diagnostic centre near you"
            description="Choose a convenient centre for sample collection and diagnostic services."
          />

          <Link
            to="/centres"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            View all centres
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {diagnosticCentres.map((centre) => (
            <div
              key={centre.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin size={22} />
              </div>

              <h3 className="mt-5 font-bold text-gray-900">
                {centre.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {centre.address}, {centre.city}
              </p>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Navigation size={16} />
                  {centre.distance}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {centre.timing}
                </div>
              </div>

              <Link
                to={`/centres/${centre.id}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                View centre
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}