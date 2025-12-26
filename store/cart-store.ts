import { create } from "zustand";

type CartItem = {
  image: string;
  name: string | null;
  price: number;
  id: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      // go through items and check if any new items have the same id as the previous ones
      const exists = state.items.find((i) => i.id === item.id);

      // if any new items have the same id then return the same item instead of adding a new one
      if (exists) {
        return item;
      }

      // else add the new item
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },
  clearCart: () => {
    set(() => ({ items: [] }));
  },

  increaseQuantity: (id: string) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
  },
  decreaseQuantity: (id: string) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id
          ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : i.quantity }
          : i
      ),
    }));
  },
}));
