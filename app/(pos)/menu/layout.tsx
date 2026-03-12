import CartSidebar from "@/components/sidebar/CartSidebar";
import POSLayout from "@/components/layout/POSLayout";
import MenuSidebar from "@/components/sidebar/MenuSidebar";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import { auth } from "@/auth";
import SidebarScroll from "@/components/shared/SidebarScroll";
import MenuSidebarLinks from "@/components/sidebar/MenuSidebarLinks";
import BackButton from "@/components/shared/BackButton";
import AddItemModal from "@/components/menu/add-item/AddItemModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MenuLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  return (
    <POSLayout>
      <MenuSidebar session={session} />
      <CenterContentContainer sidebarLeft sidebarRight>
        <BackButton href="/dashboard" className="mb-4 w-fit xl:hidden" />
        <SidebarScroll>
          <div className="flex flex-row gap-4 items-center">
            <div className="xl:hidden shrink-0">
              <AddItemModal />
            </div>
            <MenuSidebarLinks
              linksClassName="p-4!"
              session={session}
              className="flex-row text-xxxsmall"
            />
          </div>
        </SidebarScroll>
        {children}
      </CenterContentContainer>
      <CartSidebar />
    </POSLayout>
  );
};

export default MenuLayout;
