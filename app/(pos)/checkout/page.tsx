"use client";

import BackButton from "@/components/shared/BackButton";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import ContentWrapper from "@/components/shared/ContentWrapper";
import OrderList from "@/components/shared/OrderList";

const CheckoutPage = () => {
  return (
    <CenterContentContainer className="flex w-full gap-5.5">
      <ContentWrapper className="flex-1 p-5">
        <BackButton href="/menu" />
        <OrderList />
      </ContentWrapper>
      <ContentWrapper className="flex-1 p-5">payment form</ContentWrapper>
    </CenterContentContainer>
  );
};

export default CheckoutPage;
