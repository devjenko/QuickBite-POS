"use client";

import SideBarNavLink from "../sidebar/SidebarNavLinks";
import { useState } from "react";
import SettingsModal from "../settings/SettingsModal";
const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const MobileSidebarNavLinks = [
    {
      name: "Dashboard",
      iconPath: "/icons/dashboard.svg",
      href: "/dashboard",
    },
    {
      name: "Orders",
      iconPath: "/icons/online.svg",
      href: "/orders",
    },
  ];
  return (
    <div className="w-full bg-[var(--White)] fixed bottom-0 z-10 xl:hidden px-4 flex justify-between">
      {MobileSidebarNavLinks.map((link) => (
        <SideBarNavLink
          key={link.name}
          activeHref="#"
          className="p-4!"
          wrapperClassName="shadow-none!"
          icon={link.iconPath}
          name={link.name}
          href={link.href}
        />
      ))}
      <SideBarNavLink
        wrapperClassName="shadow-none!"
        name="Settings"
        icon="/icons/settings.svg"
        onClick={() => setIsOpen(true)}
        prefetch={false}
        className="shadow-none! p-4!"
      />
      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileNavbar;
