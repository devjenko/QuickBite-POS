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
import { SidebarNavLinks } from "@/consts/nav-sidebar";

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

  const handleOpenSettings = () => {
    setIsOpen(true);
  };

  return (
    <BaseSidebar>
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
        <Link href={"/dashboard"}>
          <Image
            src={"/logos/quickbite-logo.webp"}
            alt="QuickBite logo"
            className="object-cover rounded-sm"
            width={125}
            height={125}
            loading="eager"
            unoptimized
          />
        </Link>

        {SidebarNavLinks.map((link, index) => (
          <li key={index}>
            <SideBarNavLink
              name={link.name}
              icon={link.iconPath}
              href={link.href}
              prefetch={true}
            />
          </li>
        ))}

        {/* Settings button */}
        <li>
          <SideBarNavLink
            name="Settings"
            icon="/icons/settings.svg"
            onClick={handleOpenSettings}
            prefetch={false}
            activeHref="/settings"
          />
        </li>

        <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Logout button */}
        <li>
          {!isLoading ? (
            <>
              <SideBarNavLink
                name="Logout"
                icon="/icons/logout.svg"
                onClick={handleLogoutOut}
                prefetch={false}
              />
            </>
          ) : (
            <ContentWrapper className="px-4 py-8 gap-2 flex flex-col justify-center items-center">
              <Spinner className="size-6" color="black" />
              <span>Logging out</span>
            </ContentWrapper>
          )}
        </li>
      </ul>
    </BaseSidebar>
  );
};

export default NavSidebar;
