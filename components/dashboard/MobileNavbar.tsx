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
    <div className="w-[95%]  left-1/2 -translate-x-1/2  h-fit rounded-tl-sm rounded-tr-sm shadow-sm border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] bg-(--White) fixed bottom-0 z-10 xl:hidden p-2  flex justify-between">
      {MobileSidebarNavLinks.map((link) => (
        <SideBarNavLink
          key={link.name}
          activeHref="#"
          className="p-2!"
          wrapperClassName="shadow-none!"
          icon={link.iconPath}
          name={link.name}
          href={link.href}
        />
      ))}
      <SideBarNavLink
        wrapperClassName="shadow-none! "
        name="Settings"
        icon="/icons/settings.svg"
        onClick={() => setIsOpen(true)}
        prefetch={false}
        className="shadow-none! p-2!"
      />
      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileNavbar;
