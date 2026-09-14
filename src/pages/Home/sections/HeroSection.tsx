import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import {
  useEffect,
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

function getSlides(): HeroSlide[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      if (
        Array.isArray(parsed) &&
        parsed.length > 0
      ) {
        return parsed;
      }
    }
  } catch {
    // Use default slides.
  }

  return defaultSlides;
}

export function HeroSection() {
  const [slides, setSlides] =
    useState<HeroSlide[]>(getSlides);

  const [current, setCurrent] =
    useState(0);

  const [transitionEnabled, setTransitionEnabled] =
    useState(true);

  const [search, setSearch] =
    useState("");

  /*
   * We render an extra copy of the slides.
   *
   * Example:
   *
   * 1 2 3 | 1 2 3
   *
   * The slider always moves →
   *
   * 1 → 2 → 3 → 1 → 2 → 3
   *
   * Therefore there is never a visible
   * 3 → 2 → 1 reverse animation.
   */
  const sliderSlides = [
    ...slides,
    ...slides,
  ];

  /*
   * Reload admin changes when another tab
   * changes localStorage.
   */
  useEffect(() => {
    const handleStorage = () => {
      setSlides(getSlides());
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
   * Automatic right → left movement.
   */
  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setCurrent(
          (previous) =>
            previous + 1,
        );
      }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length]);

  /*
   * When we reach the duplicated first slide,
   * silently jump back to the real first slide.
   *
   * This happens AFTER the animation has finished,
   * so the user never sees a reverse movement.
   */
  useEffect(() => {
    if (
      current === slides.length &&
      slides.length > 0
    ) {
      const timer =
        window.setTimeout(() => {
          setTransitionEnabled(false);
          setCurrent(0);

          /*
           * Re-enable transition after the
           * invisible reset.
           */
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              setTransitionEnabled(true);
            });
          });
        }, 700);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [current, slides.length]);

  /*
   * If admin removes slides while the page
   * is open, keep index valid.
   */
  useEffect(() => {
    if (
      slides.length > 0 &&
      current > slides.length
    ) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  if (slides.length === 0) {
    return null;
  }

  /*
   * Current visible slide for buttons/content.
   */
  const visibleIndex =
    current % slides.length;

  /*
   * Next button.
   *
   * Always moves right → left.
   */
  const nextSlide = () => {
    setTransitionEnabled(true);

    setCurrent(
      (previous) =>
        previous + 1,
    );
  };

  /*
   * Previous button.
   *
   * This is only for manual navigation.
   * Automatic navigation remains strictly
   * right → left.
   */
  const previousSlide = () => {
    if (current === 0) {
      /*
       * Jump to duplicated last slide.
       *
       * Disable transition for the jump,
       * then move to the previous position.
       */
      setTransitionEnabled(false);

      setCurrent(slides.length);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setCurrent(
            slides.length - 1,
          );
        });
      });

      return;
    }

    setTransitionEnabled(true);

    setCurrent(
      (previous) =>
        previous - 1,
    );
  };

  return (
    <section className="bg-[#f6f8fb] py-4 sm:py-5 lg:py-6">
      <Container>

        {/* =========================================
            HERO BANNER
            ========================================= */}

        <div className="relative">

          {/* Banner */}

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

            {/* Slider Track */}

            <div
              className={`flex ${
                transitionEnabled
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${
                  current * 100
                }%)`,
              }}
            >
              {sliderSlides.map(
                (item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="
                      relative
                      min-w-full
                      h-[300px]
                      sm:h-[360px]
                      md:h-[400px]
                      lg:h-[440px]
                    "
                  >

                    {/* Background Image */}

                    <img
                      src={item.imageUrl}
                      alt=""
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    {/* Dark gradient only on left */}

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

                    {/* Content */}

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
                          Trusted diagnostic testing
                        </div>

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
                          {item.title}

                          <span
                            className="
                              block
                              text-blue-200
                            "
                          >
                            {item.highlight}
                          </span>
                        </h1>

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
                          {item.description}
                        </p>

                        {/* Buttons */}

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
                              item.primaryButtonLink
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
                              item.primaryButtonText
                            }

                            <ArrowRight
                              size={16}
                            />
                          </Link>

                          <Link
                            to={
                              item.secondaryButtonLink
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
                              item.secondaryButtonText
                            }
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* =====================================
                DOTS
                ===================================== */}

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
                  (item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Go to slide ${
                        index + 1
                      }`}
                      onClick={() => {
                        setTransitionEnabled(
                          true,
                        );
                        setCurrent(index);
                      }}
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          index ===
                          visibleIndex
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

          {/* =========================================
              LEFT ARROW
              ========================================= */}

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

          {/* =========================================
              RIGHT ARROW
              ========================================= */}

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

        {/* =========================================
            SEARCH
            ========================================= */}

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
                placeholder="
                  Search tests, packages or health checkups
                "
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

        {/* =========================================
            QUICK SERVICES
            ========================================= */}

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