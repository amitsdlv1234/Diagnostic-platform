import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";
import { TestCard } from "../../../components/cards/TestCard";
import { diagnosticTests } from "../../../features/tests/testData";

export function PopularTestsSection() {
  const popularTests = diagnosticTests
    .filter((test) => test.popular)
    .slice(0, 6);

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Popular Tests
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Most booked diagnostic tests
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Choose from commonly booked diagnostic tests with
              convenient sample collection options.
            </p>
          </div>

          <Link
            to="/tests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all tests
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Test Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularTests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}