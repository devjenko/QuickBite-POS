import Link from "next/link";
import MenuSidebarLinks from "./menu-sidebar-links";
import BaseSidebar from "./base-sidebar";
import AddItemModal from "../menu/add-item-modal/add-item-modal";

const MenuSidebar = () => {
  return (
    <BaseSidebar>
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
        <Link className="flex gap-2.5 " href={"/dashboard"}>
          <img src="/icons/arrow-left.svg" alt="left arrow icon" />
          <span>Back</span>
        </Link>
        <AddItemModal />
        <MenuSidebarLinks />
      </ul>
    </BaseSidebar>
  );
};

export default MenuSidebar;
