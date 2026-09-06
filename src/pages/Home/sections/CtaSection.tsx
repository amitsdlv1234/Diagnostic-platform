import { ArrowRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";

export function CtaSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <div className="rounded-3xl bg-gray-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <CalendarCheck size={26} />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold sm:text-4xl">
            Ready to take the next step for your health?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
            Find the right test or package and book your
            diagnostic appointment in just a few steps.
          </p>

          <Link
            to="/tests"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explore Tests
            <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}