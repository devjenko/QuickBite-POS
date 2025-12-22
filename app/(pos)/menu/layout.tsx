import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import MenuSidebar from "@/components/sidebar/MenuSidebar";
import CenterContentContainer from "@/components/ui/CenterContentContainer";
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
