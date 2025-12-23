import CartSidebar from "@/components/sidebar/cart-sidebar";
import POSLayout from "@/components/layout/pos-layout";
import MenuSidebar from "@/components/sidebar/menu-sidebar";
import CenterContentContainer from "@/components/shared/center-content-container";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MenuLayout = async ({ children }: DashboardLayoutProps) => {
  // redirect users that aren't authed
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <POSLayout>
      <MenuSidebar />
      <CenterContentContainer>{children}</CenterContentContainer>
      <CartSidebar />
    </POSLayout>
  );
};

export default MenuLayout;
