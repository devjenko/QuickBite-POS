import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import MenuSidebar from "@/components/sidebar/MenuSidebar";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import { auth } from "@/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MenuLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  return (
    <POSLayout>
      <MenuSidebar session={session} />
      <CenterContentContainer>{children}</CenterContentContainer>
      <CartSidebar />
    </POSLayout>
  );
};

export default MenuLayout;
