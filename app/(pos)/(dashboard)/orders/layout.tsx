"use client";
import POSLayout from "@/components/layout/POSLayout";
import NavSidebar from "@/components/sidebar/NavSidebar";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import OrdersSidebar from "@/components/sidebar/OrdersSidebar";

interface OrdersLayoutProps {
  children: React.ReactNode;
}

const OrdersLayout = ({ children }: OrdersLayoutProps) => {
  return (
    <POSLayout>
      <NavSidebar />
      <CenterContentContainer contained className="md:pl-50 md:pr-80">
        <main className="flex-1 overflow-y-auto m-auto">{children}</main>
      </CenterContentContainer>
      <OrdersSidebar />
    </POSLayout>
  );
};

export default OrdersLayout;
