"use client";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import CartItem from "@/components/shared/CartItem";
import { useCartStore } from "@/store/cart-store";
import { Trash2Icon } from "lucide-react";
import CheckoutButton from "../ui/CheckoutButton";

const CartSidebar = () => {
  const items = useCartStore((state) => state.items);

  const { clearCart } = useCartStore();

  return (
    <BaseSidebar
      style={{ right: "max(0px, calc((100vw - 3000px) / 2))" }}
      className="top-0 bg-[var(--White)] right-[max(0px, calc((100vw - 3000px) / 2))] overflow-y-auto hide-scrollbar"
    >
      <div className="flex justify-between">
        <h2>New Order</h2>
        <Trash2Icon onClick={clearCart} />
      </div>
      {items.map((item) => (
        <li key={item.name}>
          <CartItem
            imageUrl={item.image}
            id={item.id}
            name={item.name}
            price={item.price}
          />
        </li>
      ))}
      <CheckoutButton />
    </BaseSidebar>
  );
};

export default CartSidebar;
