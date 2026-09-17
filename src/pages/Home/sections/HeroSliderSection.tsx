import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import { useTheme } from "../../../features/theme/useTheme";

import {
  getHomeContent,
  type HeroSlide,
} from "../../../features/home/homeConfig";

export function HeroSliderSection() {
  /*
   * =========================================================
   * THEME
   * =========================================================
   */

  const theme = useTheme();

  const colors = theme.sections.hero;

  /*
   * =========================================================
   * LOAD SLIDES FROM ADMIN CONFIG
   * =========================================================
   */

  const loadSlides = (): HeroSlide[] => {
    const content = getHomeContent();

    return content.heroSlides.filter(
      (slide) => slide.enabled,
    );
  };

  const [slides, setSlides] =
    useState<HeroSlide[]>(loadSlides);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  /*
   * =========================================================
   * RELOAD WHEN ADMIN CHANGES CONTENT
   * =========================================================
   */

  useEffect(() => {
    const reloadSlides = () => {
      const updatedSlides = loadSlides();

      setSlides(updatedSlides);

      setCurrentIndex((previous) => {
        if (updatedSlides.length === 0) {
          return 0;
        }

        return Math.min(
          previous,
          updatedSlides.length - 1,
        );
      });
    };

    /*
     * Same-tab update
     */
    window.addEventListener(
      "home-content-updated",
      reloadSlides,
    );

    /*
     * Another-tab update
     */
    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key ===
        "diagnostic_home_content"
      ) {
        reloadSlides();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        "home-content-updated",
        reloadSlides,
      );

      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  /*
   * =========================================================
   * KEEP INDEX VALID
   * =========================================================
   */

  useEffect(() => {
    if (slides.length === 0) {
      setCurrentIndex(0);
      return;
    }

    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [
    currentIndex,
    slides.length,
  ]);

  /*
   * =========================================================
   * AUTO SLIDER
   * =========================================================
   */

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setCurrentIndex(
          (previous) =>
            (previous + 1) %
            slides.length,
        );
      }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length]);

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (slides.length === 0) {
    return null;
  }

  /*
   * =========================================================
   * CURRENT SLIDE
   * =========================================================
   */

  const currentSlide =
    slides[currentIndex];

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  const goPrevious = () => {
    setCurrentIndex((previous) =>
      previous === 0
        ? slides.length - 1
        : previous - 1,
    );
  };

  const goNext = () => {
    setCurrentIndex(
      (previous) =>
        (previous + 1) %
        slides.length,
    );
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <section
      className="py-4 sm:py-5 lg:py-6"
      style={{
        backgroundColor:
          colors.background,
      }}
    >
      <Container>
        <div className="relative">

          {/* =================================================
              SLIDER
              ================================================= */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[1205px]
              overflow-hidden
              rounded-[20px]
              shadow-sm
            "
          >

            {/* =================================================
                IMAGE
                ================================================= */}

            <div className="relative h-[300px] sm:h-[360px] md:h-[400px] lg:h-[440px]">

              <img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-opacity
                  duration-500
                "
              />

              {/* =================================================
                  IMAGE OVERLAY

                  Uses existing theme colors.
                  No colors.overlay required.
                  ================================================= */}

              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to right,
                    ${colors.background}F2 0%,
                    ${colors.background}B8 38%,
                    ${colors.background}35 65%,
                    transparent 100%
                  )`,
                }}
              />

              {/* =================================================
                  CONTENT
                  ================================================= */}

              <div
                className="
                  relative
                  flex
                  h-full
                  items-center
                  px-6
                  sm:px-10
                  lg:px-14
                "
              >
                <div className="max-w-xl">

                  {/* =================================================
                      BADGE
                      ================================================= */}

                  {currentSlide.badge && (
                    <div
                      className="
                        mb-4
                        inline-flex
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        backdrop-blur-sm
                        sm:text-sm
                      "
                      style={{
                        backgroundColor:
                          `${colors.accent}30`,
                        color:
                          colors.accent,
                      }}
                    >
                      {currentSlide.badge}
                    </div>
                  )}

                  {/* =================================================
                      TITLE
                      ================================================= */}

                  <h1
                    className="
                      text-3xl
                      font-extrabold
                      leading-tight
                      tracking-tight
                      sm:text-4xl
                      lg:text-5xl
                    "
                    style={{
                      color:
                        colors.heading,
                    }}
                  >
                    {currentSlide.title}{" "}

                    <span
                      style={{
                        color:
                          colors.accent,
                      }}
                    >
                      {
                        currentSlide.highlight
                      }
                    </span>
                  </h1>

                  {/* =================================================
                      DESCRIPTION
                      ================================================= */}

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-sm
                      leading-6
                      sm:text-base
                    "
                    style={{
                      color:
                        colors.text,
                    }}
                  >
                    {
                      currentSlide.description
                    }
                  </p>

                  {/* =================================================
                      BUTTONS
                      ================================================= */}

                  <div className="mt-6 flex flex-wrap gap-3">

                    {/* Primary Button */}

                    <Link
                      to={
                        currentSlide.primaryButtonLink
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        px-5
                        py-3
                        text-sm
                        font-bold
                        transition
                        hover:opacity-90
                      "
                      style={{
                        backgroundColor:
                          colors.buttonBackground,
                        color:
                          colors.buttonText,
                      }}
                    >
                      {
                        currentSlide.primaryButtonText
                      }

                      <ArrowRight
                        size={17}
                      />
                    </Link>

                    {/* Secondary Button */}

                    {currentSlide
                      .secondaryButtonText && (
                      <Link
                        to={
                          currentSlide.secondaryButtonLink
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          px-5
                          py-3
                          text-sm
                          font-bold
                          backdrop-blur-sm
                          transition
                          hover:opacity-90
                        "
                        style={{
                          borderColor:
                            colors.border,
                          color:
                            colors.heading,
                          backgroundColor:
                            `${colors.cardBackground}CC`,
                        }}
                      >
                        {
                          currentSlide.secondaryButtonText
                        }
                      </Link>
                    )}

                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                PREVIOUS BUTTON
                ================================================= */}

            {slides.length > 1 && (
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous slide"
                className="
                  absolute
                  left-[-1px]
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  bg-white
                  shadow-md
                  transition
                  hover:scale-105
                "
                style={{
                  color:
                    colors.accent,
                  borderColor:
                    colors.border,
                }}
              >
                <ChevronLeft
                  size={21}
                />
              </button>
            )}

            {/* =================================================
                NEXT BUTTON
                ================================================= */}

            {slides.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className="
                  absolute
                  right-[-1px]
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  bg-white
                  shadow-md
                  transition
                  hover:scale-105
                "
                style={{
                  color:
                    colors.accent,
                  borderColor:
                    colors.border,
                }}
              >
                <ChevronRight
                  size={21}
                />
              </button>
            )}

            {/* =================================================
                DOTS
                ================================================= */}

            {slides.length > 1 && (
              <div
                className="
                  absolute
                  bottom-5
                  left-1/2
                  z-20
                  flex
                  -translate-x-1/2
                  items-center
                  gap-2
                "
              >
                {slides.map(
                  (slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Go to slide ${
                        index + 1
                      }`}
                      onClick={() =>
                        setCurrentIndex(
                          index,
                        )
                      }
                      className="
                        h-2.5
                        rounded-full
                        transition-all
                      "
                      style={{
                        width:
                          index ===
                          currentIndex
                            ? "32px"
                            : "10px",

                        backgroundColor:
                          index ===
                          currentIndex
                            ? colors.accent
                            : `${colors.buttonText}80`,
                      }}
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}