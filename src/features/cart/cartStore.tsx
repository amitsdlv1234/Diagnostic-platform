import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  CartContextValue,
  CartItem,
  CartItemType,
} from "./cartTypes";

import {
  calculateCartDiscount,
  calculateCartItemCount,
  calculateCartMrp,
  calculateCartSubtotal,
  getCartItemKey,
} from "./cartUtils";

const CART_STORAGE_KEY =
  "diagnostic-platform-cart";

const CartContext =
  createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(
    () => {
      try {
        const storedCart =
          localStorage.getItem(
            CART_STORAGE_KEY,
          );

        if (!storedCart) {
          return [];
        }

        const parsedCart: unknown =
          JSON.parse(storedCart);

        if (!Array.isArray(parsedCart)) {
          return [];
        }

        return parsedCart as CartItem[];
      } catch {
        return [];
      }
    },
  );

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [items]);

const addItem = (item: CartItem) => {
  setItems((currentItems) => {
    const exists = currentItems.some(
      (currentItem) =>
        getCartItemKey(
          currentItem.id,
          currentItem.type,
        ) ===
        getCartItemKey(
          item.id,
          item.type,
        ),
    );

    if (exists) {
      return currentItems;
    }

    return [
      ...currentItems,
      {
        ...item,
        quantity: Math.max(
          item.quantity || 1,
          1,
        ),
      },
    ];
  });
};

  const removeItem = (
    id: string,
    type: CartItemType,
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          getCartItemKey(
            item.id,
            item.type,
          ) !== getCartItemKey(id, type),
      ),
    );
  };

  const updateQuantity = (
    id: string,
    type: CartItemType,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeItem(id, type);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (
          getCartItemKey(
            item.id,
            item.type,
          ) !== getCartItemKey(id, type)
        ) {
          return item;
        }

        return {
          ...item,
          quantity,
        };
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (
    id: string,
    type: CartItemType,
  ): boolean => {
    return items.some(
      (item) =>
        getCartItemKey(
          item.id,
          item.type,
        ) === getCartItemKey(id, type),
    );
  };

  const itemCount = useMemo(
    () => calculateCartItemCount(items),
    [items],
  );

  const totalMrp = useMemo(
    () => calculateCartMrp(items),
    [items],
  );

  const subtotal = useMemo(
    () => calculateCartSubtotal(items),
    [items],
  );

  const discount = useMemo(
    () => calculateCartDiscount(items),
    [items],
  );

  const total = subtotal;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      totalMrp,
      discount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      totalMrp,
      discount,
      total,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}

