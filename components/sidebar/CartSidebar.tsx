"use client";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import { useCartStore } from "@/store/cart-store";
import { Trash2Icon, ShoppingCart } from "lucide-react";
import CheckoutButton from "../ui/CheckoutButton";
import OrderList from "../shared/OrderList";
import Link from "next/link";

const CartSidebar = () => {
  const { items, clearCart } = useCartStore();
  const isEmpty = items.length === 0;

  return (
    <BaseSidebar
      style={{ right: "max(0px, calc((100vw - 3000px) / 2))" }}
      className="top-0 bg-[var(--White)] w-xs"
    >
      <div className="flex flex-col h-full">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="rounded-full p-6 mb-4">
              <ShoppingCart className="w-12 h-12 text-[var(--Grey)]" />
            </div>
            <h3 className="text-large font-semibold text-[var(--Black)] mb-2">Your Cart is Empty</h3>
            <p className="text-xsmall text-[var(--Grey)]">
              Add items from the menu to get started
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <h2>New Order</h2>
              <Trash2Icon onClick={clearCart} className="cursor-pointer" />
            </div>
            <OrderList className="flex-1" />
            <Link href="/checkout">
              <CheckoutButton className="w-full" />
            </Link>
          </>
        )}
      </div>
    </BaseSidebar>
  );
};

export default CartSidebar;
