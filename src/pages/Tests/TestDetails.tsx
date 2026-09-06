import { useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Droplets,
  Home,
  ShieldCheck,
  ShoppingCart,
  Check,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Container } from "../../components/common/Container";
import { EmptyState } from "../../components/common/EmptyState";

import { diagnosticTests } from "../../features/tests/testData";
import { calculateDiscount } from "../../features/tests/testUtils";

import { useCart } from "../../features/cart/cartStore";
import type { CartItem } from "../../features/cart/cartTypes";

export function TestDetails() {
  const { testId } = useParams<{
    testId: string;
  }>();

  const {
    addItem, isInCart } = useCart();

  const [addedToCart, setAddedToCart] = useState(false);

  const test = diagnosticTests.find(
    (item) => item.id === testId,
  );

  if (!test) {
    return (
      <div className="bg-gray-50 py-16">
        <Container>
          <EmptyState
            title="Test not found"
            description="The diagnostic test you are looking for does not exist or may have been removed."
            action={
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <ArrowLeft size={16} />
                Back to Tests
              </Link>
            }
          />
        </Container>
      </div>
    );
  }

  const discount = calculateDiscount(
    test.price,
    test.mrp,
  );

  const alreadyInCart = isInCart(
    test.id,
    "TEST",
  );

  const handleAddToCart = () => {
    if (alreadyInCart) {
      return;
    }

    const cartItem: CartItem = {
      id: test.id,
      type: "TEST",
      name: test.name,
      slug: test.slug,
      price: test.price,
      mrp: test.mrp,
      quantity: 1,
      shortDescription: test.shortDescription,
    };

    addItem(cartItem);
    setAddedToCart(true);
  };

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-8">
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Tests
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_380px]">
            {/* Main information */}
            <div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {test.category}
                  </span>

                  {test.popular && (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      Popular Test
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  {test.name}
                </h1>

                <p className="mt-4 text-base leading-7 text-gray-600">
                  {test.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <InfoItem
                    icon={Clock3}
                    label="Report Time"
                    value={test.reportTime}
                  />

                  <InfoItem
                    icon={Droplets}
                    label="Sample Type"
                    value={test.sampleType}
                  />

                  <InfoItem
                    icon={Home}
                    label="Collection"
                    value={
                      test.homeCollection
                        ? "Home Available"
                        : "Centre Only"
                    }
                  />
                </div>
              </div>

              {/* Parameters */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Parameters covered
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {test.parameters.map(
                    (parameter) => (
                      <div
                        key={parameter}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-green-600"
                        />

                        <span className="text-sm font-medium text-gray-700">
                          {parameter}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Preparation */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Preparation instructions
                </h2>

                {test.fastingRequired && (
                  <div className="mt-5 rounded-xl bg-amber-50 p-4">
                    <p className="text-sm font-bold text-amber-800">
                      Fasting required
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-700">
                      {test.fastingInstructions}
                    </p>
                  </div>
                )}

                <ul className="mt-5 space-y-3">
                  {test.preparation.map(
                    (instruction) => (
                      <li
                        key={instruction}
                        className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-blue-600"
                        />

                        <span>{instruction}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* Booking card */}
            <aside>
              <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Test price
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-950">
                    ₹{test.price.toLocaleString("en-IN")}
                  </span>

                  {test.mrp > test.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{test.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <p className="mt-1 text-sm font-semibold text-green-600">
                    Save {discount}% on this test
                  </p>
                )}

                <div className="my-6 border-t border-gray-100" />

                <div className="space-y-3">
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
                        Secure booking and digital report access.
                      </p>
                    </div>
                  </div>

                  {test.homeCollection && (
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
                          Select your preferred date and time
                          during booking.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Book */}
                <Link
                  to={`/booking?test=${test.id}`}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <CalendarCheck size={18} />
                  Book This Test
                </Link>

                {/* Add to Cart */}
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
                        id: test.id,
                        type: "TEST",
                        name: test.name,
                        slug: test.slug,
                        price: test.price,
                        mrp: test.mrp,
                        quantity: 1,
                        shortDescription:
                          test.shortDescription,
                      });
                    }}
                    disabled={isInCart(test.id, "TEST")}
                    className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition ${isInCart(test.id, "TEST")
                        ? "cursor-not-allowed bg-green-50 text-green-700"
                        : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                  >
                    <ShoppingCart size={18} />

                    {isInCart(test.id, "TEST")
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                )}

                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  Final availability and collection options
                  will be confirmed during booking.
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
      <Icon size={20} className="text-blue-600" />

      <p className="mt-3 text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}