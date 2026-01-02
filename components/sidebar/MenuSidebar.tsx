import MenuSidebarLinks from "@/components/sidebar/MenuSidebarLinks";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import AddItemModal from "@/components/menu/add-item/AddItemModal";
import { Session } from "next-auth";
import BackButton from "../shared/BackButton";

interface MenuSidebarProps {
  session: Session | null;
}

const MenuSidebar = ({ session }: MenuSidebarProps) => {
  return (
    <BaseSidebar>
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
        <BackButton href="/dashboard" />
        <AddItemModal />
        <MenuSidebarLinks session={session} />
      </ul>
    </BaseSidebar>
  );
};

export default MenuSidebar;
