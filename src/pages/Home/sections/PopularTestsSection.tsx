import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";
import { TestCard } from "../../../components/cards/TestCard";

import {
  getPopularTestsData,
  POPULAR_TESTS_UPDATED_EVENT,
  type PopularTestsContent,
} from "../../../features/home/homeConfig";

import type {
  DiagnosticTest,
} from "../../../features/tests/testData";

export function PopularTestsSection() {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  const [
    content,
    setContent,
  ] = useState<PopularTestsContent>(() => {
    return getPopularTestsData().content;
  });

  const [
    popularTests,
    setPopularTests,
  ] = useState<DiagnosticTest[]>(() => {
    return getPopularTestsData().tests;
  });

  /*
   * Reload configuration when Admin saves changes.
   */
  useEffect(() => {
    const handleUpdate = () => {
      const data =
        getPopularTestsData();

      setContent(data.content);
      setPopularTests(data.tests);
    };

    window.addEventListener(
      POPULAR_TESTS_UPDATED_EVENT,
      handleUpdate,
    );

    return () => {
      window.removeEventListener(
        POPULAR_TESTS_UPDATED_EVENT,
        handleUpdate,
      );
    };
  }, []);

  /*
   * Also listen for storage changes.
   *
   * This is useful if Admin and Home are open
   * in different browser tabs.
   */
  useEffect(() => {
    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key ===
        "diagnostic_popular_tests_content"
      ) {
        const data =
          getPopularTestsData();

        setContent(data.content);
        setPopularTests(data.tests);
      }
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  /*
   * If section is disabled from Admin,
   * don't render anything.
   */
  if (!content.enabled) {
    return null;
  }

  /*
   * Slider movement.
   */
  const moveSlider = (
    direction: "left" | "right",
  ) => {
    if (!sliderRef.current) {
      return;
    }

    const amount =
      sliderRef.current.clientWidth *
      0.85;

    sliderRef.current.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gray-50 py-14 sm:py-16 lg:py-20">
      <Container>
        {/* =================================================
            HEADER
            ================================================= */}

        <div className="text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600">
            {content.badge}
          </span>

          <h2 className="mt-3 text-2xl font-bold text-gray-950 sm:text-3xl">
            {content.title}
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
            {content.description}
          </p>
        </div>

        {/* =================================================
            TEST SLIDER
            ================================================= */}

        {popularTests.length > 0 && (
          <div className="relative mt-9">
            {/* Left Arrow */}

            <button
              type="button"
              onClick={() =>
                moveSlider("left")
              }
              aria-label="Previous tests"
              className="absolute -left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-600 shadow-md transition hover:bg-blue-50 lg:flex"
            >
              <ChevronLeft size={21} />
            </button>

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

                sm:grid
                sm:grid-cols-2
                lg:grid-cols-4
                sm:overflow-visible
              "
            >
              {popularTests.map(
                (test: DiagnosticTest) => (
                  <div
                    key={test.id}
                    className="
                      min-w-[280px]
                      snap-start
                      sm:min-w-0
                    "
                  >
                    <TestCard
                      test={test}
                    />
                  </div>
                ),
              )}
            </div>

            {/* Right Arrow */}

            <button
              type="button"
              onClick={() =>
                moveSlider("right")
              }
              aria-label="Next tests"
              className="absolute -right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-600 shadow-md transition hover:bg-blue-50 lg:flex"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        )}

        {/* =================================================
            MOBILE SWIPE
            ================================================= */}

        {popularTests.length > 1 && (
          <p className="mt-3 text-center text-xs text-gray-400 sm:hidden">
            Swipe to explore →
          </p>
        )}

        {/* =================================================
            VIEW ALL
            ================================================= */}

        <div className="mt-7 flex justify-center">
          <Link
            to={content.viewAllLink}
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
            {content.viewAllText}

            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}