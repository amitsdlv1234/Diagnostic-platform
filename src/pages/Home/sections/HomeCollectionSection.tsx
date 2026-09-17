import {
  CalendarDays,
  Clock3,
  Home,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import { useTheme } from "../../../components/theme/ThemeProvider";

export function HomeCollectionSection() {
  const { getSectionColors } = useTheme();

  /*
   * ============================================================
   * HOME COLLECTION THEME
   * ============================================================
   *
   * Controlled from:
   *
   * Admin → Theme & Appearance
   * → Home Collection
   *
   */
  const colors =
    getSectionColors("homeCollection");

  const items = [
    {
      icon: CalendarDays,
      title: "Choose a date",
      text: "Select a convenient collection date.",
    },
    {
      icon: Clock3,
      title: "Choose a slot",
      text: "Pick an available time slot.",
    },
    {
      icon: ShieldCheck,
      title: "Safe collection",
      text: "Samples collected by trained professionals.",
    },
  ];

  return (
    <section
      className="
        py-16
        sm:py-20
      "
      style={{
        backgroundColor:
          colors.background,
      }}
    >
      <Container>

        {/* =====================================================
            MAIN HOME COLLECTION BANNER
            ===================================================== */}

        <div
          className="
            overflow-hidden
            rounded-3xl
          "
          style={{
            /*
             * Brand pink banner
             */
            backgroundColor:
              colors.accent,

            /*
             * Optional border from theme
             */
            border:
              `1px solid ${colors.border}`,
          }}
        >
          <div
            className="
              grid
              items-center
              gap-10
              p-8
              sm:p-12
              lg:grid-cols-2
              lg:p-16
            "
          >

            {/* =================================================
                LEFT CONTENT
                ================================================= */}

            <div>

              {/* Home Icon */}

              <div
                className="
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  /*
                   * Transparent white background
                   * over pink banner
                   */
                  backgroundColor:
                    `${colors.buttonText}20`,
                }}
              >
                <Home
                  size={28}
                  style={{
                    /*
                     * White icon
                     */
                    color:
                      colors.buttonBackground,
                  }}
                />
              </div>

              {/* Heading */}

              <h2
                className="
                  text-3xl
                  font-bold
                  sm:text-4xl
                "
                style={{
                  /*
                   * White heading on pink banner
                   */
                  color:
                    colors.buttonBackground,
                }}
              >
                Get your samples collected at home
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-xl
                  leading-7
                "
                style={{
                  /*
                   * White/light text
                   */
                  color:
                    colors.buttonBackground,

                  opacity: 0.9,
                }}
              >
                No need to travel. Choose a convenient
                collection slot and our trained collection
                professional will visit your home.
              </p>

              {/* Book Button */}

              <Link
                to="/home-collection"
                className="
                  mt-7
                  inline-flex
                  rounded-lg
                  px-5
                  py-3
                  text-sm
                  font-bold
                  transition
                  hover:opacity-90
                "
                style={{
                  /*
                   * White button
                   */
                  backgroundColor:
                    colors.buttonBackground,

                  /*
                   * Pink text
                   */
                  color:
                    colors.buttonText,
                }}
              >
                Book Home Collection
              </Link>
            </div>

            {/* =================================================
                RIGHT FEATURES
                ================================================= */}

            <div
              className="
                grid
                gap-4
                sm:grid-cols-3
                lg:grid-cols-1
              "
            >
              {items.map((item) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      flex
                      gap-4
                      rounded-2xl
                      p-5
                    "
                    style={{
                      /*
                       * Very light transparent
                       * white feature background
                       */
                      backgroundColor:
                        `${colors.buttonBackground}18`,
                    }}
                  >

                    {/* Feature Icon */}

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                      "
                      style={{
                        backgroundColor:
                          colors.buttonBackground,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{
                          color:
                            colors.buttonText,
                        }}
                      />
                    </div>

                    {/* Feature Content */}

                    <div>

                      {/* Feature Title */}

                      <h3
                        className="
                          font-bold
                        "
                        style={{
                          color:
                            colors.buttonBackground,
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Feature Description */}

                      <p
                        className="
                          mt-1
                          text-sm
                          leading-6
                        "
                        style={{
                          color:
                            colors.buttonBackground,

                          opacity: 0.85,
                        }}
                      >
                        {item.text}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}