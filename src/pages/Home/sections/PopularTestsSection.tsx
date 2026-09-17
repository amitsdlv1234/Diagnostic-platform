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

/*
 * IMPORTANT:
 * Use the same ThemeProvider / useTheme
 * that is used by Admin → Theme & Appearance.
 */
import { useTheme } from "../../../components/theme/ThemeProvider";

import {
  getPopularTestsData,
  POPULAR_TESTS_UPDATED_EVENT,
  type PopularTestsContent,
} from "../../../features/home/homeConfig";

import type {
  DiagnosticTest,
} from "../../../features/tests/testData";

export function PopularTestsSection() {
  const { getSectionColors } = useTheme();

  /*
   * Get colors from the central theme configuration.
   *
   * Admin:
   * Theme & Appearance → Popular Tests
   */
  const colors =
    getSectionColors("popularTests");

  const sliderRef =
    useRef<HTMLDivElement>(null);

  const [content, setContent] =
    useState<PopularTestsContent>(() => {
      return getPopularTestsData().content;
    });

  const [popularTests, setPopularTests] =
    useState<DiagnosticTest[]>(() => {
      return getPopularTestsData().tests;
    });

  /*
   * ==========================================================
   * LOAD POPULAR TESTS CONFIGURATION
   * ==========================================================
   */
  const reloadPopularTests = () => {
    const data =
      getPopularTestsData();

    setContent(data.content);
    setPopularTests(data.tests);
  };

  /*
   * ==========================================================
   * ADMIN UPDATE EVENT
   * ==========================================================
   *
   * Updates Home Page immediately when Admin saves
   * Popular Tests configuration in the same tab.
   */
  useEffect(() => {
    window.addEventListener(
      POPULAR_TESTS_UPDATED_EVENT,
      reloadPopularTests,
    );

    return () => {
      window.removeEventListener(
        POPULAR_TESTS_UPDATED_EVENT,
        reloadPopularTests,
      );
    };
  }, []);

  /*
   * ==========================================================
   * LOCAL STORAGE UPDATE
   * ==========================================================
   *
   * Allows Home Page to update when Admin is open
   * in another browser tab.
   */
  useEffect(() => {
    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key ===
        "diagnostic_popular_tests_content"
      ) {
        reloadPopularTests();
      }

      /*
       * Also reload the component when the central
       * theme configuration changes.
       */
      if (
        event.key ===
        "diagnostic_theme_config"
      ) {
        reloadPopularTests();
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
   * ==========================================================
   * DISABLED SECTION
   * ==========================================================
   */
  if (!content.enabled) {
    return null;
  }

  /*
   * ==========================================================
   * SLIDER
   * ==========================================================
   */
  const moveSlider = (
    direction: "left" | "right",
  ) => {
    if (!sliderRef.current) {
      return;
    }

    const amount =
      sliderRef.current.clientWidth * 0.85;

    sliderRef.current.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        py-14
        sm:py-16
        lg:py-20
      "
      style={{
        backgroundColor:
          colors.background,
      }}
    >
      <Container>

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="text-center">

          {/* Badge */}
          <span
            className="
              inline-flex
              rounded-full
              px-4
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-widest
            "
            style={{
              backgroundColor:
                `${colors.accent}15`,
              color:
                colors.accent,
            }}
          >
            {content.badge}
          </span>

          {/* Heading */}
          <h2
            className="
              mt-3
              text-2xl
              font-bold
              sm:text-3xl
            "
            style={{
              color:
                colors.heading,
            }}
          >
            {content.title}
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-2
              max-w-xl
              text-sm
              leading-6
            "
            style={{
              color:
                colors.text,
            }}
          >
            {content.description}
          </p>
        </div>

        {/* =====================================================
            TEST SLIDER
            ===================================================== */}

        {popularTests.length > 0 && (
          <div className="relative mt-9">

            {/* =================================================
                LEFT ARROW
                ================================================= */}

            <button
              type="button"
              onClick={() =>
                moveSlider("left")
              }
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
                bg-white
                shadow-md
                transition
                hover:shadow-lg
                lg:flex
              "
              style={{
                color:
                  colors.accent,
                borderColor:
                  `${colors.accent}40`,
              }}
            >
              <ChevronLeft size={21} />
            </button>

            {/* =================================================
                TEST CARDS
                ================================================= */}

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
                (
                  test: DiagnosticTest,
                ) => (
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
                      themeColors={colors}
                    />
                  </div>
                ),
              )}
            </div>

            {/* =================================================
                RIGHT ARROW
                ================================================= */}

            <button
              type="button"
              onClick={() =>
                moveSlider("right")
              }
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
                bg-white
                shadow-md
                transition
                hover:shadow-lg
                lg:flex
              "
              style={{
                color:
                  colors.accent,
                borderColor:
                  `${colors.accent}40`,
              }}
            >
              <ChevronRight size={21} />
            </button>
          </div>
        )}

        {/* =====================================================
            MOBILE SWIPE
            ===================================================== */}

        {popularTests.length > 1 && (
          <p
            className="
              mt-3
              text-center
              text-xs
              sm:hidden
            "
            style={{
              color:
                `${colors.text}99`,
            }}
          >
            Swipe to explore →
          </p>
        )}

        {/* =====================================================
            VIEW ALL
            ===================================================== */}

        <div className="mt-7 flex justify-center">
          <Link
            to={content.viewAllLink}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              bg-white
              px-8
              py-2.5
              text-sm
              font-bold
              transition
            "
            style={{
              color:
                colors.accent,
              borderColor:
                colors.accent,
            }}
            onMouseEnter={(
              event,
            ) => {
              event.currentTarget.style.backgroundColor =
                colors.accent;

              event.currentTarget.style.color =
                "#ffffff";
            }}
            onMouseLeave={(
              event,
            ) => {
              event.currentTarget.style.backgroundColor =
                "#ffffff";

              event.currentTarget.style.color =
                colors.accent;
            }}
          >
            {content.viewAllText}

            <ArrowRight size={16} />
          </Link>
        </div>

      </Container>
    </section>
  );
}