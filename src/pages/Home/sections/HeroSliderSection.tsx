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

import {
  getHomeContent,
  type HeroSlide,
} from "../../../features/home/homeConfig";

export function HeroSliderSection() {
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
        if (
          updatedSlides.length === 0
        ) {
          return 0;
        }

        return Math.min(
          previous,
          updatedSlides.length - 1,
        );
      });
    };

    /*
     * Same-tab update.
     */
    window.addEventListener(
      "home-content-updated",
      reloadSlides,
    );

    /*
     * Another-tab update.
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

    if (
      currentIndex >= slides.length
    ) {
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
    <section className="bg-[#f6f8fb] py-4 sm:py-5 lg:py-6">
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
                  DARK OVERLAY
                  ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/70
                  via-black/30
                  to-transparent
                "
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
                <div
                  className="
                    max-w-xl
                    text-white
                  "
                >
                  {/* Badge */}

                  {currentSlide.badge && (
                    <div
                      className="
                        mb-4
                        inline-flex
                        rounded-full
                        bg-white/15
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        backdrop-blur-sm
                        sm:text-sm
                      "
                    >
                      {currentSlide.badge}
                    </div>
                  )}

                  {/* Title */}

                  <h1
                    className="
                      text-3xl
                      font-extrabold
                      leading-tight
                      tracking-tight
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    {currentSlide.title}{" "}

                    <span className="text-blue-300">
                      {currentSlide.highlight}
                    </span>
                  </h1>

                  {/* Description */}

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-sm
                      leading-6
                      text-white/90
                      sm:text-base
                    "
                  >
                    {
                      currentSlide.description
                    }
                  </p>

                  {/* Buttons */}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={
                        currentSlide.primaryButtonLink
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-blue-700
                      "
                    >
                      {
                        currentSlide.primaryButtonText
                      }

                      <ArrowRight
                        size={17}
                      />
                    </Link>

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
                          border-white/60
                          bg-white/10
                          px-5
                          py-3
                          text-sm
                          font-bold
                          text-white
                          backdrop-blur-sm
                          transition
                          hover:bg-white
                          hover:text-gray-900
                        "
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
                PREVIOUS
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
                  border-gray-200
                  bg-white
                  text-blue-600
                  shadow-md
                  transition
                  hover:bg-blue-50
                "
              >
                <ChevronLeft
                  size={21}
                />
              </button>
            )}

            {/* =================================================
                NEXT
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
                  border-gray-200
                  bg-white
                  text-blue-600
                  shadow-md
                  transition
                  hover:bg-blue-50
                "
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
                      className={`
                        h-2.5
                        rounded-full
                        transition-all
                        ${
                          index ===
                          currentIndex
                            ? "w-8 bg-white"
                            : "w-2.5 bg-white/50 hover:bg-white/80"
                        }
                      `}
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