import Link from "next/link";
import SideBarNavLink from "../ui/SidebarNavLink";
import BaseSidebar from "./BaseSidebar";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import AddItemModal from "../ui/AddItemModal";
const MenuSidebar = () => {
  const SidebarNavLinks = [
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
        {SidebarNavLinks.map((link, index) => (
          <li key={index}>
            <SideBarNavLink
              name={link.name}
              icon={link.iconPath}
              href={link.href}
            />
          </li>
        ))}
      </ul>
    </BaseSidebar>
  );
};

export default MenuSidebar;
