import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { PackageCard } from "../../../components/cards/PackageCard";
import { healthPackages } from "../../../features/packages/packageData";

export function PackagesSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Health Packages"
            title="Take care of your whole health"
            description="Comprehensive health packages designed for preventive screening."
          />

          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Explore packages
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthPackages.map((item) => (
            <PackageCard
              key={item.id}
              packageData={item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

