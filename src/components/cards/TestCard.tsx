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

interface TestCardProps {
  test: DiagnosticTest;
}

export function TestCard({ test }: TestCardProps) {
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
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >
      {/* =====================================================
          TOP BADGES
          ===================================================== */}

      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <span
          className="
            rounded-full
            bg-blue-50
            px-3
            py-1.5
            text-xs
            font-bold
            text-blue-700
          "
        >
          {test.category}
        </span>

        {test.popular && (
          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-amber-50
              px-3
              py-1.5
              text-xs
              font-bold
              text-amber-700
            "
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

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        {/* Test name */}

        <h3
          className="
            min-h-[48px]
            text-lg
            font-bold
            leading-6
            text-gray-950
            transition-colors
            group-hover:text-blue-700
          "
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
            text-gray-600
          "
        >
          {test.shortDescription}
        </p>

        {/* =================================================
            TEST INFORMATION
            ================================================= */}

        <div className="mt-5 space-y-3">
          {/* Report time */}

          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-50
              "
            >
              <Clock3
                size={15}
                className="text-blue-600"
              />
            </span>

            <span>
              Report in{" "}
              <strong className="font-semibold text-gray-800">
                {test.reportTime}
              </strong>
            </span>
          </div>

          {/* Sample */}

          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-50
              "
            >
              <Droplets
                size={15}
                className="text-blue-600"
              />
            </span>

            <span>
              Sample:{" "}
              <strong className="font-semibold text-gray-800">
                {test.sampleType}
              </strong>
            </span>
          </div>

          {/* Home collection */}

          {test.homeCollection && (
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                "
              >
                <Home
                  size={15}
                  className="text-green-600"
                />
              </span>

              <span className="font-medium text-gray-700">
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
                border-amber-100
                bg-amber-50
                px-3
                py-2.5
                text-xs
                font-semibold
                text-amber-700
              "
            >
              Fasting required before sample collection
            </div>
          )}
        </div>

        {/* =================================================
            PRICE
            ================================================= */}

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="text-2xl font-extrabold text-gray-950">
              ₹{test.price.toLocaleString("en-IN")}
            </span>

            {test.mrp > test.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{test.mrp.toLocaleString("en-IN")}
              </span>
            )}

            {discount > 0 && (
              <span
                className="
                  rounded-md
                  bg-green-50
                  px-2
                  py-1
                  text-[11px]
                  font-bold
                  text-green-700
                "
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
              bg-blue-600
              px-4
              py-3
              text-sm
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-blue-700
              hover:shadow-md
            "
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