export type CartItemType = "TEST" | "PACKAGE";

export interface CartItem {
  id: string;
  type: CartItemType;

  name: string;
  slug?: string;

  price: number;
  mrp: number;

  quantity: number;

  shortDescription?: string;
  image?: string;
}

export interface CartState {
  items: CartItem[];
}

export interface CartContextValue {
  items: CartItem[];

  itemCount: number;

  subtotal: number;
  totalMrp: number;
  discount: number;
  total: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string, type: CartItemType) => void;
  updateQuantity: (
    id: string,
    type: CartItemType,
    quantity: number,
  ) => void;
  clearCart: () => void;

  isInCart: (
    id: string,
    type: CartItemType,
  ) => boolean;
}

