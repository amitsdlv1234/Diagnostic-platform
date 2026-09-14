import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import {
  defaultHomeSlides,
  HOME_SLIDER_STORAGE_KEY,
  type HomeSlide,
} from "../../../features/home/homeSliderData";

export function HeroSliderSection() {
  const [slides, setSlides] =
    useState<HomeSlide[]>(defaultHomeSlides);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  /*
   * Load admin-controlled slides
   */
  useEffect(() => {
    const loadSlides = () => {
      const stored =
        localStorage.getItem(
          HOME_SLIDER_STORAGE_KEY,
        );

      if (!stored) {
        setSlides(defaultHomeSlides);
        return;
      }

      try {
        const parsed: unknown =
          JSON.parse(stored);

        if (!Array.isArray(parsed)) {
          setSlides(defaultHomeSlides);
          return;
        }

        const activeSlides =
          parsed.filter(
            (slide): slide is HomeSlide =>
              Boolean(
                slide &&
                  typeof slide === "object" &&
                  "active" in slide &&
                  slide.active === true,
              ),
          );

        setSlides(
          activeSlides.length > 0
            ? activeSlides
            : defaultHomeSlides,
        );
      } catch {
        setSlides(defaultHomeSlides);
      }
    };

    loadSlides();

    const handleStorage = () => {
      loadSlides();
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
   * Keep index valid if slides change
   */
  useEffect(() => {
    if (
      currentIndex >= slides.length
    ) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  /*
   * Auto slide
   */
  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
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

  const currentSlide =
    useMemo(
      () =>
        slides[currentIndex] ??
        defaultHomeSlides[0],
      [slides, currentIndex],
    );

  if (!currentSlide) {
    return null;
  }

  const goPrevious = () => {
    setCurrentIndex(
      (previous) =>
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

  return (
    <section className="relative overflow-hidden bg-gray-50">
      <Container>
        <div className="relative py-5 sm:py-7 lg:py-8">
          <div className="relative min-h-[430px] overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-teal-600 shadow-xl sm:min-h-[470px] lg:min-h-[500px]">
            {/* =================================================
                BACKGROUND IMAGE
                ================================================= */}

            <div className="absolute inset-0">
              <img
                src={currentSlide.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-blue-900/20" />
            </div>

            {/* =================================================
                CONTENT
                ================================================= */}

            <div className="relative z-10 flex min-h-[430px] items-center px-6 py-12 sm:min-h-[470px] sm:px-10 lg:min-h-[500px] lg:px-16">
              <div className="max-w-2xl text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                  <ShieldCheck size={17} />

                  Trusted diagnostic testing
                </div>

                <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {currentSlide.title}
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-blue-50 sm:text-lg sm:leading-8">
                  {currentSlide.subtitle}
                </p>

                <div className="mt-8">
                  <Link
                    to={currentSlide.buttonLink}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                  >
                    {currentSlide.buttonText}

                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* =================================================
                PREVIOUS
                ================================================= */}

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={goPrevious}
                  className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-5 sm:h-11 sm:w-11"
                >
                  <ArrowLeft size={20} />
                </button>

                {/* =================================================
                    NEXT
                    ================================================= */}

                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-5 sm:h-11 sm:w-11"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}

            {/* =================================================
                DOTS
                ================================================= */}

            {slides.length > 1 && (
              <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                {slides.map(
                  (slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Go to slide ${
                        index + 1
                      }`}
                      onClick={() =>
                        setCurrentIndex(index)
                      }
                      className={`h-2.5 rounded-full transition-all ${
                        index === currentIndex
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
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
