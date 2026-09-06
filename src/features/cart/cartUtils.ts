import type {
  CartItem,
} from "./cartTypes";

export function getCartItemKey(
  id: string,
  type: CartItem["type"],
): string {
  return `${type}:${id}`;
}

export function calculateCartSubtotal(
  items: CartItem[],
): number {
  return items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );
}

export function calculateCartMrp(
  items: CartItem[],
): number {
  return items.reduce(
    (total, item) =>
      total + item.mrp * item.quantity,
    0,
  );
}

export function calculateCartDiscount(
  items: CartItem[],
): number {
  const mrp = calculateCartMrp(items);
  const subtotal = calculateCartSubtotal(items);

  return Math.max(mrp - subtotal, 0);
}

export function calculateCartItemCount(
  items: CartItem[],
): number {
  return items.reduce(
    (count, item) => count + item.quantity,
    0,
  );
}

export function formatCurrency(
  amount: number,
): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

