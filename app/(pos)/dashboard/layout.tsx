"use client";
import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import NavSidebar from "@/components/sidebar/NavSidebar";
import CenterContentContainer from "@/components/ui/CenterContentContainer";

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
