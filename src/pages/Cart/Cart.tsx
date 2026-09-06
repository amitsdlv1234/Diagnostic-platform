import {
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../components/common/Container";

import { CartItem } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import { EmptyCart } from "../../components/cart/EmptyCart";

import { useCart } from "../../features/cart/cartStore";

export function Cart() {
  const {
    items,
    itemCount,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <Container>
          <div className="py-8 sm:py-10">
            <Link
              to="/tests"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Continue shopping
            </Link>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShoppingCart
                    size={24}
                    className="text-blue-600"
                  />

                  <h1 className="text-3xl font-bold tracking-tight text-gray-950">
                    Your Cart
                  </h1>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Review your selected tests and
                  health packages before booking.
                </p>
              </div>

              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="self-start text-sm font-semibold text-red-600 hover:text-red-700 sm:self-auto"
                >
                  Clear cart
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-8 sm:py-10">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {itemCount}
                  </span>{" "}
                  {itemCount === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.type}:${item.id}`}
                      item={item}
                      onRemove={removeItem}
                      onQuantityChange={
                        updateQuantity
                      }
                    />
                  ))}
                </div>

                <CartSummary />
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
