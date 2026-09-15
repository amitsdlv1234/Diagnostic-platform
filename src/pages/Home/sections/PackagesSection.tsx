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

import {
  getPackagesContent,
  PACKAGES_UPDATED_EVENT,
  type PackagesContent,
} from "../../../features/home/homeConfig";

/* =========================================================
   PACKAGE DATA
   ========================================================= */

interface LifestylePackage {
  id: string;
  name: string;
  category: string;
  image: string;
}

const lifestylePackages: LifestylePackage[] = [
  {
    id: "men-under-30",
    name: "Under 30 years",
    category: "Men Health",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "men-30-45",
    name: "Age 30-45",
    category: "Men Health",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "men-45-60",
    name: "Age 45-60",
    category: "Men Health",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "men-above-60",
    name: "Above 60 years",
    category: "Men Health",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
  },

  {
    id: "women-under-30",
    name: "Under 30 years",
    category: "Women Health",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "women-30-45",
    name: "Age 30-45",
    category: "Women Health",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "women-45-60",
    name: "Age 45-60",
    category: "Women Health",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "women-above-60",
    name: "Above 60 years",
    category: "Women Health",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85",
  },

  {
    id: "diabetes",
    name: "Diabetes",
    category: "Diabetes",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "heart",
    name: "Heart Health",
    category: "Heart Health",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "thyroid",
    name: "Thyroid",
    category: "Thyroid",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "vitamin",
    name: "Vitamin",
    category: "Vitamin",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=85",
  },
];

/* =========================================================
   PACKAGE ROW
   ========================================================= */

interface PackageRowProps {
  title: string;
  category: string;
  items: LifestylePackage[];
}

function PackageRow({
  title,
  category,
  items,
}: PackageRowProps) {
  const sliderRef =
    useRef<HTMLDivElement>(null);

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

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      {/* =================================================
          ROW HEADER
          ================================================= */}

      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 sm:text-base">
          {title}
        </h3>

        <Link
          to={`/packages?category=${encodeURIComponent(
            category,
          )}`}
          className="
            inline-flex
            shrink-0
            items-center
            gap-1
            rounded-md
            border
            border-pink-500
            bg-white
            px-5
            py-1.5
            text-xs
            font-semibold
            text-pink-600
            transition
            hover:bg-pink-500
            hover:text-white
          "
        >
          View All
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* =================================================
          SLIDER
          ================================================= */}

      <div className="relative">
        {/* Previous */}

        <button
          type="button"
          onClick={() =>
            moveSlider("left")
          }
          aria-label={`Previous ${title}`}
          className="
            absolute
            -left-4
            top-1/2
            z-20
            hidden
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-700
            shadow-md
            transition
            hover:bg-gray-50
            lg:flex
          "
        >
          <ChevronLeft size={19} />
        </button>

        {/* Cards */}

        <div
          ref={sliderRef}
          className="
            flex
            gap-5
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-2
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map(
            (item: LifestylePackage) => (
              <Link
                key={item.id}
                to={`/packages?category=${encodeURIComponent(
                  item.category,
                )}`}
                className="
                  group
                  relative
                  min-w-[210px]
                  snap-start
                  overflow-hidden
                  rounded-xl
                  bg-gray-200
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:min-w-[220px]
                  lg:min-w-0
                  lg:flex-1
                "
              >
                {/* Image */}

                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  {/* Package Name */}

                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className="
                        rounded-full
                        bg-white
                        px-3
                        py-1.5
                        text-center
                        shadow-md
                      "
                    >
                      <span className="text-xs font-semibold text-gray-800">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>

        {/* Next */}

        <button
          type="button"
          onClick={() =>
            moveSlider("right")
          }
          aria-label={`Next ${title}`}
          className="
            absolute
            -right-4
            top-1/2
            z-20
            hidden
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-700
            shadow-md
            transition
            hover:bg-gray-50
            lg:flex
          "
        >
          <ChevronRight size={19} />
        </button>
      </div>

      {/* Mobile */}

      <p className="mt-2 text-center text-[11px] text-gray-400 sm:hidden">
        Swipe to explore →
      </p>
    </div>
  );
}

/* =========================================================
   PACKAGES SECTION
   ========================================================= */

export function PackagesSection() {
  const [
    content,
    setContent,
  ] = useState<PackagesContent>(() =>
    getPackagesContent(),
  );

  /* =======================================================
     LOAD UPDATED ADMIN CONFIG
     ======================================================= */

  useEffect(() => {
    const handleUpdate = () => {
      setContent(getPackagesContent());
    };

    window.addEventListener(
      PACKAGES_UPDATED_EVENT,
      handleUpdate,
    );

    return () => {
      window.removeEventListener(
        PACKAGES_UPDATED_EVENT,
        handleUpdate,
      );
    };
  }, []);

  /* =======================================================
     SUPPORT DIFFERENT BROWSER TABS
     ======================================================= */

  useEffect(() => {
    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key ===
        "diagnostic_packages_content"
      ) {
        setContent(
          getPackagesContent(),
        );
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

  /* =======================================================
     SECTION ENABLE / DISABLE
     ======================================================= */

  if (!content.enabled) {
    return null;
  }

  /* =======================================================
     GET ADMIN SELECTED PACKAGES
     ======================================================= */

  const configuredPackages =
    content.packageIds
      .map((packageId: string) =>
        lifestylePackages.find(
          (item: LifestylePackage) =>
            item.id === packageId,
        ),
      )
      .filter(
        (
          item: LifestylePackage | undefined,
        ): item is LifestylePackage =>
          Boolean(item),
      );

  /* =======================================================
     GROUP SELECTED PACKAGES
     ======================================================= */

  const menPackages =
    configuredPackages.filter(
      (item: LifestylePackage) =>
        item.category === "Men Health",
    );

  const womenPackages =
    configuredPackages.filter(
      (item: LifestylePackage) =>
        item.category === "Women Health",
    );

  const otherPackages =
    configuredPackages.filter(
      (item: LifestylePackage) =>
        item.category !== "Men Health" &&
        item.category !== "Women Health",
    );

  return (
    <section className="bg-[#fff8f7] py-12 sm:py-14 lg:py-16">
      <Container>
        {/* =================================================
            MAIN HEADER
            ================================================= */}

        <div className="text-center">
          <span
            className="
              inline-flex
              rounded-full
              bg-blue-50
              px-4
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-blue-600
            "
          >
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
            MEN'S HEALTH
            ================================================= */}

        <PackageRow
          title="Men's Health"
          category="Men Health"
          items={menPackages}
        />

        {/* =================================================
            WOMEN'S HEALTH
            ================================================= */}

        <PackageRow
          title="Women's Health"
          category="Women Health"
          items={womenPackages}
        />

        {/* =================================================
            OTHER PACKAGES
            ================================================= */}

        <PackageRow
          title="Popular Health Packages"
          category="Diabetes"
          items={otherPackages}
        />

        {/* =================================================
            ALL PACKAGES
            ================================================= */}

        <div className="mt-10 flex justify-center">
          <Link
            to={content.viewAllLink}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-pink-500
              bg-white
              px-8
              py-2.5
              text-sm
              font-bold
              text-pink-600
              transition
              hover:bg-pink-500
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