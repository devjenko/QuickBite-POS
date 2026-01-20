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
      <CenterContentContainer sidebarLeft sidebarRight className="flex flex-col">
        <main className="flex-1 overflow-y-auto flex flex-col h-full w-full">{children}</main>
      </CenterContentContainer>
      <OrdersSidebar />
    </POSLayout>
  );
};

export default OrdersLayout;
