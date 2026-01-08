"use client";

import BackButton from "@/components/shared/BackButton";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import ContentWrapper from "@/components/shared/ContentWrapper";
import OrderList from "@/components/shared/OrderList";
import CheckoutButton from "@/components/ui/CheckoutButton";
import PaymentTabs from "@/components/checkout/PaymentTabs";

const CheckoutPage = () => {
  return (
    <CenterContentContainer className=" flex flex-col overflow-auto md:flex-row w-full gap-5.5 h-screen">
      <ContentWrapper className="flex-1 p-5  gap-5 flex flex-col ">
        <BackButton href="/menu" />
        <OrderList />
      </ContentWrapper>
      <ContentWrapper className="flex-1 p-5 flex flex-col">
        <h1 className="mb-5">Payment</h1>
        <div className="flex-1 flex flex-col overflow-hidden">
          <PaymentTabs />
        </div>
        <div className="mt-5">
          <CheckoutButton className="w-full" href="/orders" />
        </div>
      </ContentWrapper>
    </CenterContentContainer>
  );
};

export default CheckoutPage;
