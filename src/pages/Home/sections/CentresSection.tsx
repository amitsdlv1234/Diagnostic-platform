import {
  Clock3,
  MapPin,
  Navigation,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import { diagnosticCentres } from "../../../features/home/homeData";

import { useTheme } from "../../../features/theme/useTheme";

export function CentresSection() {
  const theme = useTheme();

  const colors = theme.sections.centres;

  return (
    <section
      className="py-16 sm:py-20"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <Container>
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Eyebrow */}

            <span
              className="inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{
                backgroundColor: `${colors.accent}15`,
                color: colors.accent,
              }}
            >
              Our Centres
            </span>

            {/* Title */}

            <h2
              className="mt-3 text-2xl font-bold sm:text-3xl"
              style={{
                color: colors.heading,
              }}
            >
              Find a diagnostic centre near you
            </h2>

            {/* Description */}

            <p
              className="mt-2 max-w-xl text-sm leading-6"
              style={{
                color: colors.text,
              }}
            >
              Choose a convenient centre for sample
              collection and diagnostic services.
            </p>
          </div>

          {/* View All */}

          <Link
            to="/centres"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              color: colors.accent,
            }}
          >
            View all centres

            <ArrowRight size={17} />
          </Link>
        </div>

        {/* =====================================================
            CENTRE CARDS
            ===================================================== */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {diagnosticCentres.map((centre) => (
            <div
              key={centre.id}
              className="rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              {/* Centre Icon */}

              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${colors.accent}15`,
                  color: colors.accent,
                }}
              >
                <MapPin size={22} />
              </div>

              {/* Centre Name */}

              <h3
                className="mt-5 font-bold"
                style={{
                  color: colors.heading,
                }}
              >
                {centre.name}
              </h3>

              {/* Address */}

              <p
                className="mt-2 text-sm leading-6"
                style={{
                  color: colors.text,
                }}
              >
                {centre.address}, {centre.city}
              </p>

              {/* =================================================
                  CENTRE INFORMATION
                  ================================================= */}

              <div
                className="mt-5 space-y-2 text-sm"
                style={{
                  color: colors.text,
                }}
              >
                {/* Distance */}

                <div className="flex items-center gap-2">
                  <Navigation
                    size={16}
                    style={{
                      color: colors.accent,
                    }}
                  />

                  {centre.distance}
                </div>

                {/* Timing */}

                <div className="flex items-center gap-2">
                  <Clock3
                    size={16}
                    style={{
                      color: colors.accent,
                    }}
                  />

                  {centre.timing}
                </div>
              </div>

              {/* View Centre */}

              <Link
                to={`/centres/${centre.id}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  color: colors.accent,
                }}
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