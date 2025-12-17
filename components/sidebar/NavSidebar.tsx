"use client";

import Link from "next/link";
import ContentWrapper from "../ui/ContentWrapper";
import SideBarNavLink from "../ui/SidebarNavLink";
import { signOut } from "next-auth/react";

const NavSidebar = () => {
  const SidebarNavLinks = [
    {
      name: "Dashboard",
      iconPath: "/icons/dashboard.svg",
      href: "/dashboard",
    },
    {
      name: "Menu",
      iconPath: "/icons/newOrder.svg",
      href: "/menu/meals",
    },

    {
      name: "Orders",
      iconPath: "/icons/online.svg",
      href: "/orders",
    },
    {
      name: "Settings",
      iconPath: "/icons/settings.svg",
      href: "/settings",
    },
  ];

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  return (
    <aside className="bg-[var(--LightGrey)] flex-shrink-0 sticky top-0  h-screen hidden md:flex  justify-center pl-10 pt-10">
      <ul className="flex flex-col gap-5 ">
        <Link href={"/dashboard"}>
          {/* Used regular img because next/image was causing blurryness due to performance optimization by the <Image /> component */}
          <img
            src="/logos/quickbite-logo.svg"
            alt="QuickBite logo"
            className="object-cover rounded-sm"
            width={125}
            height={125}
          />
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
        <button
          className="gap-2 px-4 py-8 flex flex-col justify-center items-center bg-[var(--White)] rounded-sm cursor-pointer"
          onClick={handleSignOut}
        >
          <img src="/icons/logout.svg" alt="Logout button icon" />
          <span>Logout</span>
        </button>
      </ul>
    </aside>
  );
};

export default NavSidebar;
