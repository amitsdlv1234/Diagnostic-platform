import {
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyCart() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <ShoppingCart size={30} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-900">
        Your cart is empty
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        Add diagnostic tests or health packages
        to your cart and continue with your
        booking.
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/tests"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Tests
          <ArrowRight size={16} />
        </Link>

        <Link
          to="/packages"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          View Packages
        </Link>
      </div>
    </div>
  );
}

