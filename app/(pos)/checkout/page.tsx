"use client";

import BackButton from "@/components/shared/BackButton";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import ContentWrapper from "@/components/shared/ContentWrapper";
import OrderList from "@/components/shared/OrderList";
import CheckoutButton from "@/components/ui/CheckoutButton";
import Tabs from "@/components/checkout/Tabs";
import QRDisplay from "@/components/checkout/QRDisplay";
import CashCalculator from "@/components/checkout/CashCalculator";
import { createOrder } from "@/app/actions/order";
  import { toast } from "sonner";
import { useCartStore, useCartTotal } from "@/store/cart-store";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleCheckout = async () => {

    setIsLoading(true);


    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const formData = new FormData();
    
    // Map cart items to order items format (id -> menuItemId)
    const orderItems = items.map((item) => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    
    formData.append("items", JSON.stringify(orderItems));
    formData.append("subtotal", totalPrice.toString());
    formData.append("tax", "0"); // TODO: Get from settings
    formData.append("total", totalPrice.toString());
    formData.append("currency", "USD");
    formData.append("paymentStatus", "pending");
    
    
    try {
      await createOrder(formData);
      clearCart();
      toast.success("Order created successfully");
      router.push("/orders");
    } catch (error) {
      toast.error("Failed to create order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenterContentContainer className=" flex flex-col overflow-auto md:flex-row w-full gap-5.5 h-screen">
      <ContentWrapper className="flex-1 p-5  gap-5 flex flex-col ">
        <BackButton href="/menu" />
        <OrderList />
      </ContentWrapper>
      <ContentWrapper className="flex-1 p-5 flex flex-col">
        <h1 className="mb-5">Payment</h1>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs
            tabs={[
              { label: "QR", content: <QRDisplay /> },
              { label: "Cash", content: <CashCalculator /> },
            ]}
          />
        </div>
        <div className="mt-5">
          <CheckoutButton isLoading={isLoading} className="w-full" onClick={handleCheckout}  />
        </div>
      </ContentWrapper>
    </CenterContentContainer>
  );
};

export default CheckoutPage;
