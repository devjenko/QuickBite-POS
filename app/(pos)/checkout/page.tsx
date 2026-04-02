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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotal();
  const [isLoading, setIsLoading] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.defaultTaxRate != null) {
          setTaxRate(Number(data.defaultTaxRate));
        }
      })
      .catch(() => {
        // Fall back to 0% tax if settings can't be loaded
      });
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);

    if (items.length === 0) {
      toast.error("Cart is empty");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    // Map cart items to order items format (id -> menuItemId)
    const orderItems = items.map((item) => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
    }));

    const tax = totalPrice * (taxRate / 100);
    const total = totalPrice + tax;

    const fields: Record<string, string> = {
      items: JSON.stringify(orderItems),
      subtotal: totalPrice.toString(),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      currency: "USD",
      paymentStatus: "pending",
      category: items[0].category,
    };

    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

    try {
      const result = await createOrder(formData);
      // Extract order ID from the result if available
      // For now, we'll use a generated ID that matches the order
      clearCart();
      toast.success("Order created successfully");
      router.push("/orders");
    } catch (error) {
      toast.error("Failed to create order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBakongPaymentSuccess = async () => {
    try {
      if (items.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const orderItems = items.map((item) => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
      }));

      const tax = totalPrice * (taxRate / 100);
      const total = totalPrice + tax;

      const formData = new FormData();
      const fields: Record<string, string> = {
        items: JSON.stringify(orderItems),
        subtotal: totalPrice.toString(),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        currency: "USD",
        paymentStatus: "pending",
        paidAt: new Date().toISOString(),
        category: items[0].category,
      };

      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

      await createOrder(formData);
      clearCart();
      toast.success("Payment confirmed! Order created.");
      router.push("/orders");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Payment processing failed";
      toast.error(errorMessage);
    }
  };

  return (
    <CenterContentContainer className=" flex flex-col overflow-auto md:flex-row w-full pb-16! md:pb-8!  h-screen">
      <ContentWrapper className="flex-1 p-5  gap-5 flex flex-col ">
        <BackButton href="/menu" />
        <OrderList />
      </ContentWrapper>
      <ContentWrapper className="flex-1 p-5 px-0  md:mb-0 flex flex-col ">
        <h1 className="mb-6 text-center">Payment</h1>
        <div className="flex-1 flex flex-col overflow-hidden ">
          <Tabs
            tabs={[
              {
                label: "QR",
                content: <QRDisplay onBakongPaymentSuccess={handleBakongPaymentSuccess} />,
              },
              { label: "Cash", content: <CashCalculator /> },
            ]}
          />
        </div>
        <div>
          <CheckoutButton
            isLoading={isLoading}
            className="w-full md:relative max-w-[90%] fixed bottom-1 left-1/2 -translate-x-1/2"
            onClick={handleCheckout}
          />
        </div>
      </ContentWrapper>
    </CenterContentContainer>
  );
};

export default CheckoutPage;
