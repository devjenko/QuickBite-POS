import Link from "next/link";
import MenuSidebarLinks from "@/components/sidebar/MenuSidebarLinks";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import AddItemModal from "@/components/menu/add-item/AddItemModal";
import { Session } from "next-auth";

interface MenuSidebarProps {
  session: Session | null;
}

const MenuSidebar = ({ session }: MenuSidebarProps) => {
  return (
    <BaseSidebar>
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
        <Link className="flex gap-2.5 " href={"/dashboard"}>
          <img src="/icons/arrow-left.svg" alt="left arrow icon" />
          <span>Back</span>
        </Link>
        <AddItemModal />
        <MenuSidebarLinks session={session} />
      </ul>
    </BaseSidebar>
  );
};

export default MenuSidebar;
