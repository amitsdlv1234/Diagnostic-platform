import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import type { CartItem as CartItemType } from "../../features/cart/cartTypes";

import {
  formatCurrency,
} from "../../features/cart/cartUtils";

interface CartItemProps {
  item: CartItemType;

  onRemove: (
    id: string,
    type: CartItemType["type"],
  ) => void;

  onQuantityChange: (
    id: string,
    type: CartItemType["type"],
    quantity: number,
  ) => void;
}

export function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  const itemTotal =
    item.price * item.quantity;

  const itemMrp =
    item.mrp * item.quantity;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex gap-4">
        <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:flex">
          <span className="text-2xl font-bold text-blue-600">
            {item.type === "TEST" ? "T" : "P"}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {item.type === "TEST"
                  ? "Diagnostic Test"
                  : "Health Package"}
              </span>

              <h3 className="mt-1 text-base font-bold text-gray-900">
                {item.name}
              </h3>

              {item.shortDescription && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {item.shortDescription}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                onRemove(item.id, item.type)
              }
              className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500">
                Quantity
              </span>

              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  type="button"
                  onClick={() =>
                    onQuantityChange(
                      item.id,
                      item.type,
                      item.quantity - 1,
                    )
                  }
                  className="p-2 text-gray-600 hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="min-w-8 text-center text-sm font-semibold text-gray-900">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    onQuantityChange(
                      item.id,
                      item.type,
                      item.quantity + 1,
                    )
                  }
                  className="p-2 text-gray-600 hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(itemTotal)}
                </span>

                {itemMrp > itemTotal && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatCurrency(itemMrp)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
