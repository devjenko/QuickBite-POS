"use client";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import { useCartStore } from "@/store/cart-store";
import { Trash2Icon } from "lucide-react";
import CheckoutButton from "../ui/CheckoutButton";
import OrderList from "../shared/OrderList";
import Link from "next/link";

const CartSidebar = () => {
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
      <OrderList />
      <Link href="/checkout"><CheckoutButton  className="w-2xs"/></Link>
    </BaseSidebar>
  );
};

export default CartSidebar;
