"use client";

import Link from "next/link";
import SideBarNavLink from "@/components/sidebar/SidebarNavLinks";
import { signOut } from "next-auth/react";
import BaseSidebar from "@/components/sidebar/BaseSidebar";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";
import SettingsModal from "../settings/SettingsModal";
import ContentWrapper from "../shared/ContentWrapper";

const NavSidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutOut = async () => {
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
      name: "Inventory",
      iconPath: "/icons/inventory.svg",
      href: "/inventory",
    },
  ];

  return (
    <BaseSidebar>
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
        <Link href={"/dashboard"}>
          <Image
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

        {/* Settings button */}
        <SideBarNavLink
          name="Settings"
          icon="/icons/settings.svg"
          href="#"
          onClick={() => setIsOpen(true)}
        />

        <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Logout button */}

        {!isLoading ? (
          <>
            <SideBarNavLink
              name="Logout"
              icon="/icons/logout.svg"
              href={"/login"}
              onClick={handleLogoutOut}
            />
          </>
        ) : (
          <ContentWrapper className="px-4 py-8 gap-2 flex flex-col justify-center items-center">
            <Spinner className="size-6" color="black" />
            <span>Logging out</span>
          </ContentWrapper>
        )}
      </ul>
    </BaseSidebar>
  );
};

export default NavSidebar;
