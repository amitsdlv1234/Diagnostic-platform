import { CheckCircle2 } from "lucide-react";

import type {
  CartItem,
} from "../../../features/cart/cartTypes";

interface BookingSummaryProps {
  items: CartItem[];
  totalMrp: number;
  discount: number;
  total: number;
}

export function BookingSummary({
  items,
  totalMrp,
  discount,
  total,
}: BookingSummaryProps) {
  return (
    <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">
        Booking summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.type}:${item.id}`}
            className="flex justify-between gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {item.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {item.type === "TEST"
                  ? "Diagnostic Test"
                  : "Health Package"}{" "}
                × {item.quantity}
              </p>
            </div>

            <p className="shrink-0 text-sm font-bold text-gray-900">
              ₹
              {(
                item.price *
                item.quantity
              ).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-gray-100" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Total MRP</span>

          <span>
            ₹{totalMrp.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>

          <span>
            -₹
            {discount.toLocaleString(
              "en-IN",
            )}
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-gray-100" />

      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          Total
        </span>

        <span className="text-2xl font-bold text-gray-950">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-5 rounded-xl bg-green-50 p-3">
        <div className="flex items-start gap-2">
          <CheckCircle2
            size={17}
            className="mt-0.5 shrink-0 text-green-600"
          />

          <p className="text-xs leading-5 text-green-700">
            Your booking details will be confirmed
            before final submission.
          </p>
        </div>
      </div>
    </aside>
  );
}