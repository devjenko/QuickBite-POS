"use client";
import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import MenuSidebar from "@/components/sidebar/MenuSidebar";
import CenterContentContainer from "@/components/ui/CenterContentContainer";
import AddItemModal from "@/components/menu-item/AddItemModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MenuLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <POSLayout>
      <MenuSidebar />
      <CenterContentContainer>{children}</CenterContentContainer>
      <CartSidebar />
    </POSLayout>
  );
};

export default MenuLayout;
