import {
  ArrowRight,
  Clock3,
  Droplets,
  Home,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { DiagnosticTest } from "../../features/tests/testData";
import { calculateDiscount } from "../../features/tests/testUtils";

import {
  defaultSectionColors,
  type SectionColors,
} from "../../features/theme/themeConfig";

interface TestCardProps {
  test: DiagnosticTest;
  themeColors?: SectionColors;
}

export function TestCard({
  test,
  themeColors,
}: TestCardProps) {
  /*
   * Use the colors configured for the section.
   *
   * Popular Tests passes:
   * theme.sections.popularTests
   *
   * If no theme is supplied, use default colors.
   */
  const colors =
    themeColors ?? defaultSectionColors;

  const discount = calculateDiscount(
    test.price,
    test.mrp,
  );

  return (
    <article
      className="
        group
        flex
        h-full
        min-h-[390px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
      style={{
        backgroundColor:
          colors.cardBackground,
        borderColor:
          colors.border,
      }}
    >
      {/* =====================================================
          TOP BADGES
          ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          px-5
          pt-5
        "
      >
        {/* Category */}

        <span
          className="
            rounded-full
            px-3
            py-1.5
            text-xs
            font-bold
          "
          style={{
            backgroundColor:
              `${colors.accent}15`,
            color:
              colors.accent,
          }}
        >
          {test.category}
        </span>

        {/* Popular */}

        {test.popular && (
          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              px-3
              py-1.5
              text-xs
              font-bold
            "
            style={{
              backgroundColor:
                `${colors.accent}15`,
              color:
                colors.accent,
            }}
          >
            <Star
              size={12}
              fill="currentColor"
            />

            Popular
          </span>
        )}
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-5
          pb-5
          pt-4
        "
      >
        {/* Test Name */}

        <h3
          className="
            min-h-[48px]
            text-lg
            font-bold
            leading-6
            transition-colors
          "
          style={{
            color:
              colors.heading,
          }}
        >
          {test.name}
        </h3>

        {/* Description */}

        <p
          className="
            mt-2
            min-h-[48px]
            line-clamp-2
            text-sm
            leading-6
          "
          style={{
            color:
              colors.text,
          }}
        >
          {test.shortDescription}
        </p>

        {/* =================================================
            TEST INFORMATION
            ================================================= */}

        <div
          className="
            mt-5
            space-y-3
          "
        >
          {/* Report Time */}

          <div
            className="
              flex
              items-center
              gap-2.5
              text-sm
            "
            style={{
              color:
                colors.text,
            }}
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor:
                  `${colors.accent}15`,
              }}
            >
              <Clock3
                size={15}
                style={{
                  color:
                    colors.accent,
                }}
              />
            </span>

            <span>
              Report in{" "}
              <strong
                className="
                  font-semibold
                "
                style={{
                  color:
                    colors.heading,
                }}
              >
                {test.reportTime}
              </strong>
            </span>
          </div>

          {/* Sample */}

          <div
            className="
              flex
              items-center
              gap-2.5
              text-sm
            "
            style={{
              color:
                colors.text,
            }}
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor:
                  `${colors.accent}15`,
              }}
            >
              <Droplets
                size={15}
                style={{
                  color:
                    colors.accent,
                }}
              />
            </span>

            <span>
              Sample:{" "}
              <strong
                className="
                  font-semibold
                "
                style={{
                  color:
                    colors.heading,
                }}
              >
                {test.sampleType}
              </strong>
            </span>
          </div>

          {/* Home Collection */}

          {test.homeCollection && (
            <div
              className="
                flex
                items-center
                gap-2.5
                text-sm
              "
              style={{
                color:
                  colors.text,
              }}
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor:
                    `${colors.accent}15`,
                }}
              >
                <Home
                  size={15}
                  style={{
                    color:
                      colors.accent,
                  }}
                />
              </span>

              <span
                className="
                  font-medium
                "
                style={{
                  color:
                    colors.text,
                }}
              >
                Home collection available
              </span>
            </div>
          )}

          {/* Fasting */}

          {test.fastingRequired && (
            <div
              className="
                rounded-xl
                border
                px-3
                py-2.5
                text-xs
                font-semibold
              "
              style={{
                borderColor:
                  `${colors.accent}30`,
                backgroundColor:
                  `${colors.accent}10`,
                color:
                  colors.accent,
              }}
            >
              Fasting required before sample
              collection
            </div>
          )}
        </div>

        {/* =================================================
            PRICE
            ================================================= */}

        <div
          className="
            mt-auto
            pt-6
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-end
              gap-x-2
              gap-y-1
            "
          >
            {/* Current Price */}

            <span
              className="
                text-2xl
                font-extrabold
              "
              style={{
                color:
                  colors.heading,
              }}
            >
              ₹
              {test.price.toLocaleString(
                "en-IN",
              )}
            </span>

            {/* MRP */}

            {test.mrp > test.price && (
              <span
                className="
                  text-sm
                  line-through
                "
                style={{
                  color:
                    `${colors.text}80`,
                }}
              >
                ₹
                {test.mrp.toLocaleString(
                  "en-IN",
                )}
              </span>
            )}

            {/* Discount */}

            {discount > 0 && (
              <span
                className="
                  rounded-md
                  px-2
                  py-1
                  text-[11px]
                  font-bold
                "
                style={{
                  backgroundColor:
                    `${colors.accent}15`,
                  color:
                    colors.accent,
                }}
              >
                {discount}% OFF
              </span>
            )}
          </div>

          {/* =================================================
              VIEW TEST BUTTON
              ================================================= */}

          <Link
            to={`/tests/${test.id}`}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-3
              text-sm
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:shadow-md
            "
            style={{
              backgroundColor:
                colors.buttonBackground,
              color:
                colors.buttonText,
            }}
          >
            View Test

            <ArrowRight
              size={16}
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
}