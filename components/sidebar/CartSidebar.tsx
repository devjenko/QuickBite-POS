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
      className="top-0 bg-[var(--White)]  w-xs"
    >
      <div className="flex justify-between">
        <h2>New Order</h2>
        <Trash2Icon onClick={clearCart} />
      </div>
      <div className="overflow-y-auto hide-scrollbar p-2.5 pb-15 gap-2.5 flex flex-col">
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
      </div>
      <CheckoutButton />
    </BaseSidebar>
  );
};

export default CartSidebar;
