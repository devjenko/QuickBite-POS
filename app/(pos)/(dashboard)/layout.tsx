"use client";
import CartSidebar from "@/components/sidebar/cart-sidebar";
import POSLayout from "@/components/layout/pos-layout";
import NavSidebar from "@/components/sidebar/nav-sidebar";
import CenterContentContainer from "@/components/shared/center-content-container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <POSLayout>
      <NavSidebar />
      <CenterContentContainer>
        <main className="flex-1 overflow-y-auto max-w-360 m-auto">
          {children}
        </main>
      </CenterContentContainer>
      <CartSidebar />
    </POSLayout>
  );
};

export default DashboardLayout;
