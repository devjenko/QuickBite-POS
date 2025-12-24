"use client";

import Link from "next/link";
import SideBarNavLink from "@/components/sidebar/SidebarNavLinks";
import { signOut } from "next-auth/react";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";

const NavSidebar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  const SidebarNavLinks = [
    {
      name: "Dashboard",
      iconPath: "/icons/dashboard.svg",
      href: "/dashboard",
    },
    {
      name: "Menu",
      iconPath: "/icons/newOrder.svg",
      href: "/menu",
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

  return (
    <BaseSidebar>
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
        <Link href={"/dashboard"}>
          <Image
            unoptimized
            src={"/logos/quickbite-logo.svg"}
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
          className="gap-2 px-4 py-8 flex flex-col justify-center items-center bg-[var(--White)] rounded-sm shadow-sm cursor-pointer"
          onClick={handleSignOut}
        >
          {
            <span className="flex flex-col justify-center items-center gap-2">
              {!isLoading ? (
                <>
                  <img
                    width={24}
                    height={24}
                    src="/icons/logout.svg"
                    alt="Logout button icon"
                  />
                  Logout
                </>
              ) : (
                <>
                  <Spinner color="black" />
                  Logging Out
                </>
              )}
            </span>
          }
        </button>
      </ul>
    </BaseSidebar>
  );
};

export default NavSidebar;
