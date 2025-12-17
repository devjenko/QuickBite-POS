import Link from "next/link";
import SideBarNavLink from "../ui/SidebarNavLink";
import ContentWrapper from "../ui/ContentWrapper";

const MenuSidebar = () => {
  const SidebarNavLinks = [
    {
      name: "Add Item",
      iconPath: "/icons/add.svg",
      href: "",
    },
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
    <aside className="bg-[var(--LightGrey)] h-screen hidden md:flex justify-center pl-10 pt-10 ">
      <ul className="flex flex-col gap-5">
        <Link className="flex gap-2.5 " href={"/dashboard"}>
          <img src="/icons/arrow-left.svg" alt="left arrow icon" />
          <span>Back</span>
        </Link>

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
    </aside>
  );
};

export default MenuSidebar;
