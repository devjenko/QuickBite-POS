"use client";
import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import MenuSidebar from "@/components/sidebar/MenuSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MenuLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <POSLayout>
      <MenuSidebar />
      {children}
      <CartSidebar />
    </POSLayout>
  );
};

export default MenuLayout;
