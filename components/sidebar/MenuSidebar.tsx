import Link from "next/link";
import MenuSidebarLinks from "./MenuSidebarLinks";
import BaseSidebar from "./BaseSidebar";
import AddItemModal from "../menu-item/AddItemModal";
import { Suspense } from "react";
import { Spinner } from "../ui/spinner";

const MenuSidebar = () => {
  const MenuSidebarNavLinks = [
    {
      name: "Meals",
      iconPath: "/icons/meals.svg",
      href: "/menu/meals",
    },

    {
      name: "Burgers",
      iconPath: "/icons/burgers.svg",
      href: "/menu/burgers",
    },
    {
      name: "Sandwiches",
      iconPath: "/icons/sandwiches.svg",
      href: "/menu/sandwiches",
    },
    {
      name: "Sides",
      iconPath: "/icons/fries.svg",
      href: "/menu/sides",
    },
    {
      name: "Drinks",
      iconPath: "/icons/drinks.svg",
      href: "/menu/drinks",
    },
  ];

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
