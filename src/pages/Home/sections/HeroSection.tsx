import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

interface HeroSlide {
  id: string;
  title: string;
  highlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  imageUrl: string;
}

const STORAGE_KEY =
  "diagnostic-admin-home-slides";

/* =========================================================
   DEFAULT HOME SLIDES
   ========================================================= */

const defaultSlides: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Better health starts with the right",
    highlight: "diagnosis.",
    description:
      "Book diagnostic tests and health packages online with convenient home sample collection and digital reports.",
    primaryButtonText: "Book a Test",
    primaryButtonLink: "/booking",
    secondaryButtonText: "Explore Packages",
    secondaryButtonLink: "/packages",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: "hero-2",
    title: "Complete health checkups",
    highlight: "made simple.",
    description:
      "Choose from trusted diagnostic tests and preventive health packages for you and your family.",
    primaryButtonText: "View Packages",
    primaryButtonLink: "/packages",
    secondaryButtonText: "Book Now",
    secondaryButtonLink: "/booking",
    imageUrl:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: "hero-3",
    title: "Diagnostic testing",
    highlight: "at your doorstep.",
    description:
      "Get convenient home sample collection from trained professionals at a time that works for you.",
    primaryButtonText: "Home Collection",
    primaryButtonLink: "/home-collection",
    secondaryButtonText: "Book a Test",
    secondaryButtonLink: "/booking",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=85",
  },
];

/* =========================================================
   READ ADMIN CONFIGURATION
   ========================================================= */

function getSlides(): HeroSlide[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultSlides;
    }

    const parsed = JSON.parse(stored);

    if (
      Array.isArray(parsed) &&
      parsed.length > 0
    ) {
      return parsed;
    }
  } catch {
    // Ignore invalid localStorage data.
  }

  return defaultSlides;
}

/* =========================================================
   HERO SECTION
   ========================================================= */

export function HeroSection() {
  const [slides, setSlides] =
    useState<HeroSlide[]>(getSlides);

  /*
   * currentIndex is the actual slide index.
   *
   * 0 = first slide
   * 1 = second slide
   * 2 = third slide
   */
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /*
   * We use duplicated slides:
   *
   * [1, 2, 3, 1]
   *
   * When 3 moves to duplicate 1, the user sees
   * a normal right-to-left animation.
   *
   * After the animation completes we silently
   * reset the internal index to real slide 1.
   */
  const sliderSlides = useMemo(() => {
    if (slides.length <= 1) {
      return slides;
    }

    return [
      ...slides,
      slides[0],
    ];
  }, [slides]);

  /* =======================================================
     LOAD ADMIN CHANGES
     ======================================================= */

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedSlides = getSlides();

      setSlides(updatedSlides);
      setCurrentIndex(0);
    };

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, []);

  /*
   * Also listen for the custom event if the admin panel
   * updates localStorage in the same browser tab.
   */
  useEffect(() => {
    const handleAdminUpdate = () => {
      const updatedSlides = getSlides();

      setSlides(updatedSlides);
      setCurrentIndex(0);
    };

    window.addEventListener(
      "diagnostic-home-updated",
      handleAdminUpdate,
    );

    return () => {
      window.removeEventListener(
        "diagnostic-home-updated",
        handleAdminUpdate,
      );
    };
  }, []);

  /* =======================================================
     KEEP INDEX VALID
     ======================================================= */

  useEffect(() => {
    if (
      slides.length > 0 &&
      currentIndex >= slides.length
    ) {
      setCurrentIndex(0);
    }
  }, [
    slides.length,
    currentIndex,
  ]);

  /* =======================================================
     AUTOMATIC SLIDER
     ======================================================= */

  useEffect(() => {
    if (
      slides.length <= 1 ||
      isPaused
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setCurrentIndex(
          (previous) =>
            previous + 1,
        );
      }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    slides.length,
    isPaused,
  ]);

  /* =======================================================
     INFINITE LOOP RESET
     ======================================================= */

  useEffect(() => {
    if (
      slides.length <= 1 ||
      currentIndex !== slides.length
    ) {
      return;
    }

    /*
     * Wait until the CSS animation has completed.
     */
    const timer =
      window.setTimeout(() => {
        /*
         * Disable animation temporarily.
         */
        const element =
          document.getElementById(
            "home-hero-slider",
          );

        if (element) {
          element.style.transition =
            "none";
        }

        setCurrentIndex(0);

        /*
         * Force browser to process the
         * position before re-enabling transition.
         */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (element) {
              element.style.transition =
                "";
            }
          });
        });
      }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    currentIndex,
    slides.length,
  ]);

  /* =======================================================
     NEXT
     ======================================================= */

  const nextSlide = () => {
    if (slides.length <= 1) {
      return;
    }

    setCurrentIndex(
      (previous) =>
        previous + 1,
    );
  };

  /* =======================================================
     PREVIOUS
     ======================================================= */

  const previousSlide = () => {
    if (slides.length <= 1) {
      return;
    }

    /*
     * If currently on first slide,
     * move visually to the duplicate last
     * position without showing reverse animation.
     */
    if (currentIndex === 0) {
      const element =
        document.getElementById(
          "home-hero-slider",
        );

      if (element) {
        element.style.transition =
          "none";
      }

      setCurrentIndex(
        slides.length,
      );

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCurrentIndex(
            slides.length - 1,
          );

          requestAnimationFrame(() => {
            if (element) {
              element.style.transition =
                "";
            }
          });
        });
      });

      return;
    }

    setCurrentIndex(
      (previous) =>
        previous - 1,
    );
  };

  /* =======================================================
     DOT NAVIGATION
     ======================================================= */

  const goToSlide = (
    index: number,
  ) => {
    setCurrentIndex(index);
  };

  /* =======================================================
     EMPTY STATE
     ======================================================= */

  if (slides.length === 0) {
    return null;
  }

  /*
   * Current visible dot.
   */
  const activeDot =
    currentIndex %
    slides.length;

  return (
    <section className="bg-[#f6f8fb] py-4 sm:py-5 lg:py-6">
      <Container>
        {/* =================================================
            HERO
            ================================================= */}

        <div
          className="relative"
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
        >
          {/* =================================================
              SLIDER CONTAINER
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
                SLIDER TRACK
                ================================================= */}

            <div
              id="home-hero-slider"
              className="
                flex
                transition-transform
                duration-700
                ease-in-out
              "
              style={{
                transform: `translateX(-${
                  currentIndex * 100
                }%)`,
              }}
            >
              {sliderSlides.map(
                (
                  slide,
                  index,
                ) => (
                  <div
                    key={`${slide.id}-${index}`}
                    className="
                      relative
                      min-w-full
                      h-[300px]
                      sm:h-[360px]
                      md:h-[400px]
                      lg:h-[440px]
                    "
                  >
                    {/* =================================================
                        IMAGE
                        ================================================= */}

                    <img
                      src={
                        slide.imageUrl
                      }
                      alt=""
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    {/* =================================================
                        LEFT DARK OVERLAY
                        ================================================= */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-black/65
                        via-black/25
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

                        <div
                          className="
                            mb-3
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
                          Trusted diagnostic
                          testing
                        </div>

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
                          {slide.title}

                          <span
                            className="
                              block
                              text-blue-200
                            "
                          >
                            {
                              slide.highlight
                            }
                          </span>
                        </h1>

                        {/* Description */}

                        <p
                          className="
                            mt-4
                            max-w-lg
                            text-sm
                            leading-6
                            text-white/90
                            sm:text-base
                            sm:leading-7
                          "
                        >
                          {
                            slide.description
                          }
                        </p>

                        {/* =================================================
                            BUTTONS
                            ================================================= */}

                        <div
                          className="
                            mt-5
                            flex
                            flex-wrap
                            gap-3
                          "
                        >
                          <Link
                            to={
                              slide.primaryButtonLink
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              bg-blue-600
                              px-4
                              py-2.5
                              text-sm
                              font-bold
                              text-white
                              shadow-lg
                              transition
                              hover:bg-blue-700
                            "
                          >
                            {
                              slide.primaryButtonText
                            }

                            <ArrowRight
                              size={16}
                            />
                          </Link>

                          <Link
                            to={
                              slide.secondaryButtonLink
                            }
                            className="
                              inline-flex
                              items-center
                              rounded-xl
                              border
                              border-white/50
                              bg-white/10
                              px-4
                              py-2.5
                              text-sm
                              font-bold
                              text-white
                              backdrop-blur
                              transition
                              hover:bg-white/20
                            "
                          >
                            {
                              slide.secondaryButtonText
                            }
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* =================================================
                DOTS
                ================================================= */}

            {slides.length > 1 && (
              <div
                className="
                  absolute
                  bottom-4
                  left-1/2
                  flex
                  -translate-x-1/2
                  items-center
                  gap-2
                  rounded-full
                  bg-black/15
                  px-3
                  py-1.5
                  backdrop-blur-sm
                "
              >
                {slides.map(
                  (
                    slide,
                    index,
                  ) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Go to slide ${
                        index + 1
                      }`}
                      onClick={() =>
                        goToSlide(index)
                      }
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          index ===
                          activeDot
                            ? "w-7 bg-white"
                            : "w-2 bg-white/50 hover:bg-white"
                        }
                      `}
                    />
                  ),
                )}
              </div>
            )}
          </div>

          {/* =================================================
              LEFT ARROW
              ================================================= */}

          {slides.length > 1 && (
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="
                absolute
                left-0
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white
                text-blue-700
                shadow-md
                ring-1
                ring-gray-200
                transition
                hover:scale-105
                hover:bg-blue-50
                sm:h-11
                sm:w-11
              "
            >
              <ChevronLeft
                size={21}
              />
            </button>
          )}

          {/* =================================================
              RIGHT ARROW
              ================================================= */}

          {slides.length > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="
                absolute
                right-0
                top-1/2
                z-20
                flex
                h-10
                w-10
                translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white
                text-blue-700
                shadow-md
                ring-1
                ring-gray-200
                transition
                hover:scale-105
                hover:bg-blue-50
                sm:h-11
                sm:w-11
              "
            >
              <ChevronRight
                size={21}
              />
            </button>
          )}
        </div>

        {/* =================================================
            SEARCH BAR
            ================================================= */}

        <div
          className="
            relative
            z-20
            mx-auto
            -mt-5
            max-w-[850px]
            px-3
            sm:-mt-6
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-2
              shadow-lg
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Search
                size={20}
                className="
                  ml-3
                  shrink-0
                  text-gray-400
                "
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search tests, packages or health checkups"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  sm:text-base
                "
              />

              <Link
                to={`/tests?search=${encodeURIComponent(
                  search,
                )}`}
                className="
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
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            QUICK SERVICES
            ================================================= */}

        <div
          className="
            mx-auto
            mt-6
            grid
            max-w-[1100px]
            gap-3
            pb-2
            sm:grid-cols-3
          "
        >
          <QuickCard
            title="Home Sample Collection"
            description="Sample collection at your doorstep"
          />

          <QuickCard
            title="Trusted Diagnostics"
            description="Quality testing from reliable centres"
          />

          <QuickCard
            title="Digital Reports"
            description="Securely access your reports online"
          />
        </div>
      </Container>
    </section>
  );
}

/* ===========================================================
   QUICK CARD
   =========================================================== */

function QuickCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <h3
        className="
          text-sm
          font-bold
          text-gray-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-xs
          leading-5
          text-gray-500
        "
      >
        {description}
      </p>
    </div>
  );
}