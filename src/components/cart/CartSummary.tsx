import {
  ArrowRight,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  formatCurrency,
} from "../../features/cart/cartUtils";

import { useCart } from "../../features/cart/cartStore";

export function CartSummary() {
  const {
    items,
    totalMrp,
    subtotal,
    discount,
    total,
  } = useCart();

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Items</span>
          <span>{items.length}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>MRP</span>
          <span>
            {formatCurrency(totalMrp)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Discount</span>
          <span className="font-semibold text-green-600">
            -{formatCurrency(discount)}
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          Total
        </span>

        <span className="text-xl font-bold text-gray-900">
          {formatCurrency(total)}
        </span>
      </div>

      {discount > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
          <Tag size={14} />
          You save {formatCurrency(discount)}
        </div>
      )}

      <Link
        to={
          items.length > 0
            ? "/booking"
            : "/tests"
        }
        className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
          items.length > 0
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400"
        }`}
      >
        Proceed to Booking
        <ArrowRight size={16} />
      </Link>

      <p className="mt-3 text-center text-xs leading-5 text-gray-500">
        You can select the patient, collection
        method and appointment slot in the next
        step.
      </p>
    </aside>
  );
}

