import { useState } from "react";

import {
  ArrowLeft,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock3,
  Droplets,
  Home,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { Container } from "../../components/common/Container";

import { EmptyState } from "../../components/common/EmptyState";

import { healthPackages } from "../../features/packages/packageData";

import { calculatePackageDiscount } from "../../features/packages/packageUtils";

import { useCart } from "../../features/cart/cartStore";


export function PackageDetails() {
  const { packageId } =
    useParams<{
      packageId: string;
    }>();

  const { addItem, isInCart } = useCart();

  const [addedToCart] =
    useState(false);

  const packageData =
    healthPackages.find(
      (item) => item.id === packageId,
    );

  if (!packageData) {
    return (
      <div className="bg-gray-50 py-16">
        <Container>
          <EmptyState
            title="Package not found"
            description="The health package you are looking for does not exist or may have been removed."
            action={
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <ArrowLeft size={16} />
                Back to Packages
              </Link>
            }
          />
        </Container>
      </div>
    );
  }

  const discount =
    calculatePackageDiscount(
      packageData.price,
      packageData.mrp,
    );

  const alreadyInCart = isInCart(
    packageData.id,
    "PACKAGE",
  );

  // const handleAddToCart = () => {
  //   if (alreadyInCart || addedToCart) {
  //     return;
  //   }

  //   const cartItem: CartItem = {
  //     id: packageData.id,
  //     type: "PACKAGE",
  //     name: packageData.name,
  //     price: packageData.price,
  //     mrp: packageData.mrp,
  //     quantity: 1,
  //     shortDescription:
  //       packageData.shortDescription,
  //   };

  //   addItem(cartItem);

  //   setAddedToCart(true);
  // };

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-8">
          {/* Back */}
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Packages
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_380px]">
            {/* =========================
                Main Content
            ========================== */}
            <div>
              {/* Package Overview */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {packageData.category}
                  </span>

                  {packageData.recommended && (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Recommended
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  {packageData.name}
                </h1>

                <p className="mt-4 text-base leading-7 text-gray-600">
                  {packageData.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <InfoItem
                    icon={Clock3}
                    label="Report Time"
                    value={
                      packageData.reportTime
                    }
                  />

                  <InfoItem
                    icon={Droplets}
                    label="Sample Type"
                    value={
                      packageData.sampleType
                    }
                  />

                  <InfoItem
                    icon={Home}
                    label="Collection"
                    value={
                      packageData.homeCollection
                        ? "Home Available"
                        : "Centre Only"
                    }
                  />
                </div>
              </div>

              {/* =========================
                  Tests Included
              ========================== */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Tests included
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  This package includes{" "}
                  {packageData.testsIncluded.length}{" "}
                  diagnostic tests.
                </p>

                <div className="mt-5 space-y-3">
                  {packageData.testsIncluded.map(
                    (test) => (
                      <div
                        key={test}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-green-600"
                        />

                        <span className="text-sm font-semibold text-gray-700">
                          {test}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* =========================
                  Parameters
              ========================== */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Parameters included
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {packageData.parametersIncluded.map(
                    (parameter) => (
                      <div
                        key={parameter}
                        className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3"
                      >
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-blue-600"
                        />

                        <span className="text-sm text-gray-700">
                          {parameter}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* =========================
                  Preparation
              ========================== */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Preparation instructions
                </h2>

                {packageData.fastingRequired && (
                  <div className="mt-5 rounded-xl bg-amber-50 p-4">
                    <p className="text-sm font-bold text-amber-800">
                      Fasting required
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-700">
                      {
                        packageData.fastingInstructions
                      }
                    </p>
                  </div>
                )}

                <ul className="mt-5 space-y-3">
                  {packageData.preparation.map(
                    (instruction) => (
                      <li
                        key={instruction}
                        className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-blue-600"
                        />

                        <span>
                          {instruction}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* =========================
                Booking / Cart Card
            ========================== */}
            <aside>
              <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Package price
                </p>

                {/* Price */}
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-950">
                    ₹
                    {packageData.price.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                  {packageData.mrp >
                    packageData.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹
                        {packageData.mrp.toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    )}
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <p className="mt-1 text-sm font-semibold text-green-600">
                    Save {discount}% on this package
                  </p>
                )}

                <div className="my-6 border-t border-gray-100" />

                {/* Benefits */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 text-green-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Trusted diagnostic service
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Secure booking and digital
                        report access.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 text-blue-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {
                          packageData.testsIncluded
                            .length
                        }{" "}
                        tests included
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Multiple diagnostic tests in
                        one convenient package.
                      </p>
                    </div>
                  </div>

                  {packageData.homeCollection && (
                    <div className="flex items-start gap-3">
                      <Home
                        size={19}
                        className="mt-0.5 text-blue-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Home collection available
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Choose your preferred
                          collection date and time
                          during booking.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* =====================
                    Book Package
                ====================== */}
                <Link
                  to={`/booking?package=${packageData.id}`}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <CalendarCheck size={18} />
                  Book This Package
                </Link>

                {/* =====================
                    Add to Cart
                ====================== */}
                {alreadyInCart || addedToCart ? (
                  <Link
                    to="/cart"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm font-bold text-green-700 transition hover:bg-green-100"
                  >
                    <Check size={18} />
                    Added to Cart — View Cart
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      addItem({
                        id: packageData.id,
                        type: "PACKAGE",
                        name: packageData.name,
                        slug: packageData.slug,
                        price: packageData.price,
                        mrp: packageData.mrp,
                        quantity: 1,
                        shortDescription:
                          packageData.shortDescription,
                      });
                    }}
                    disabled={isInCart(
                      packageData.id,
                      "PACKAGE",
                    )}
                  >
                    <ShoppingCart size={18} />

                    {isInCart(
                      packageData.id,
                      "PACKAGE",
                    )
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                )}

                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  Final availability and collection
                  options will be confirmed during
                  booking.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <Icon
        size={20}
        className="text-blue-600"
      />

      <p className="mt-3 text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}