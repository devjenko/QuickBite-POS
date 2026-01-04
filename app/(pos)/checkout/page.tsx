"use client";

import BackButton from "@/components/shared/BackButton";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import ContentWrapper from "@/components/shared/ContentWrapper";
import OrderList from "@/components/shared/OrderList";
import CheckoutButton from "@/components/ui/CheckoutButton";

const CheckoutPage = () => {
  return (
    <CenterContentContainer className="flex w-full gap-5.5 h-screen ">
      <ContentWrapper className="flex-1 p-5 overflow-hidden gap-5 flex flex-col">
        <BackButton href="/menu" />
        <OrderList />
      </ContentWrapper>
      <ContentWrapper className="flex-1 p-5  flex flex-col">
        <h1>Payment</h1>

        <div className="relative h-full">
          <CheckoutButton
            className="left-0 bottom-0  absolute w-full"
            href="/orders"
          />
        </div>
      </ContentWrapper>
    </CenterContentContainer>
  );
};

export default CheckoutPage;
