import MenuSidebarLinks from "@/components/sidebar/MenuSidebarLinks";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import AddItemModal from "@/components/menu/add-item/AddItemModal";
import { Session } from "next-auth";
import BackButton from "../shared/BackButton";
import { cn } from "@/lib/utils";

interface MenuSidebarProps {
  session: Session | null;
  className?: string;
  linksClassName?: string;
}

const MenuSidebar = ({ session, className, linksClassName }: MenuSidebarProps) => {
  return (
    <BaseSidebar>
      <ul className={cn("flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar", className)}>
        <BackButton href="/dashboard" />
        <AddItemModal />
        <MenuSidebarLinks linksClassName={linksClassName} session={session} />
      </ul>
    </BaseSidebar>
  );
};

export default MenuSidebar;
