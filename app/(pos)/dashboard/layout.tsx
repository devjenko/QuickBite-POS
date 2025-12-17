"use client";
import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import NavSidebar from "@/components/sidebar/NavSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <POSLayout>
      <NavSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <CartSidebar />
    </POSLayout>
  );
};

export default DashboardLayout;
