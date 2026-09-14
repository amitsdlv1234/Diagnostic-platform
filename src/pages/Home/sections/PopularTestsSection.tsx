import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  Home,
  Star,
} from "lucide-react";

import { useRef } from "react";
import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";
import { diagnosticTests } from "../../../features/tests/testData";
import { calculateDiscount } from "../../../features/tests/testUtils";

export function PopularTestsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const popularTests = diagnosticTests
    .filter((test) => test.popular)
    .slice(0, 8);

  const moveSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.scrollBy({
      left: direction === "right" ? 340 : -340,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gray-50 py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Popular Tests
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Most booked diagnostic tests
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Choose from commonly booked diagnostic tests
              with convenient sample collection options.
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

        {/* Slider */}
        <div className="relative mt-9">
          {/* Left Arrow */}
          {popularTests.length > 4 && (
            <button
              type="button"
              onClick={() => moveSlider("left")}
              aria-label="Previous tests"
              className="
                absolute
                -left-4
                top-1/2
                z-20
                hidden
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                text-blue-600
                shadow-md
                transition
                hover:bg-blue-50
                lg:flex
              "
            >
              <ChevronLeft size={21} />
            </button>
          )}

          {/* Test Cards */}
          <div
            ref={sliderRef}
            className="
              flex
              gap-5
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              lg:grid
              lg:grid-flow-col
              lg:auto-cols-[calc((100%-60px)/4)]
              lg:overflow-x-auto
            "
          >
            {popularTests.map((test) => {
              const discount = calculateDiscount(
                test.price,
                test.mrp,
              );

              return (
                <article
                  key={test.id}
                  className="
                    group
                    relative
                    flex
                    min-w-[290px]
                    snap-start
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    lg:min-w-0
                  "
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-2 p-5 pb-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                      {test.category}
                    </span>

                    {test.popular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                        <Star
                          size={11}
                          fill="currentColor"
                        />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col px-5 pb-5">
                    <h3 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-gray-900">
                      {test.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-gray-500">
                      {test.shortDescription}
                    </p>

                    {/* Details */}
                    <div className="mt-4 space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={14}
                          className="shrink-0 text-blue-600"
                        />

                        <span>
                          Report in {test.reportTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Droplets
                          size={14}
                          className="shrink-0 text-blue-600"
                        />

                        <span>
                          Sample: {test.sampleType}
                        </span>
                      </div>

                      {test.homeCollection && (
                        <div className="flex items-center gap-2">
                          <Home
                            size={14}
                            className="shrink-0 text-blue-600"
                          />

                          <span>
                            Home collection available
                          </span>
                        </div>
                      )}

                      {test.fastingRequired && (
                        <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
                          Fasting required
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-5">
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹
                          {test.price.toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        {test.mrp > test.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹
                            {test.mrp.toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        )}

                        {discount > 0 && (
                          <span className="text-[10px] font-bold text-green-600">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* View Test */}
                      <Link
                        to={`/tests/${test.id}`}
                        className="
                          mt-4
                          flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-blue-600
                          px-4
                          py-3
                          text-xs
                          font-bold
                          text-white
                          transition
                          hover:bg-blue-700
                        "
                      >
                        View Test

                        <ArrowRight
                          size={15}
                          className="
                            transition-transform
                            duration-200
                            group-hover:translate-x-1
                          "
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Arrow */}
          {popularTests.length > 4 && (
            <button
              type="button"
              onClick={() => moveSlider("right")}
              aria-label="Next tests"
              className="
                absolute
                -right-4
                top-1/2
                z-20
                hidden
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                text-blue-600
                shadow-md
                transition
                hover:bg-blue-50
                lg:flex
              "
            >
              <ChevronRight size={21} />
            </button>
          )}
        </div>

        {/* Mobile Swipe */}
        {popularTests.length > 1 && (
          <p className="mt-3 text-center text-xs text-gray-400 lg:hidden">
            Swipe to explore →
          </p>
        )}

        {/* View All */}
        <div className="mt-7 flex justify-center">
          <Link
            to="/tests"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-blue-500
              bg-white
              px-8
              py-2.5
              text-sm
              font-bold
              text-blue-600
              transition
              hover:bg-blue-600
              hover:text-white
            "
          >
            View All Tests
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}