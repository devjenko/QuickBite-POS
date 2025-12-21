"use client";

import Link from "next/link";
import ContentWrapper from "./ContentWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SideBarNavLinkProps {
  icon: string;
  name: string;
  href: string;
}

const SideBarNavLink = ({ icon, name, href }: SideBarNavLinkProps) => {
  const pathname = usePathname();
  const [clickedActive, setClickedActive] = useState(false);

  // Active if either clicked OR pathname matches
  const isActive =
    clickedActive || pathname === href || pathname.startsWith(href + "/");

  const handleClick = () => {
    setClickedActive(true);

    setTimeout(() => setClickedActive(false), 100);
  };

  return (
    <ContentWrapper onClick={handleClick} variant={isActive ? "dark" : "light"}>
      <Link
        href={href}
        className="gap-2 px-4 py-8 flex flex-col justify-center items-center"
      >
        <Image
          alt="Sidebar Icon"
          width={24}
          height={24}
          src={icon}
          className={isActive ? "brightness-0 invert" : ""}
        />
        <span>{name}</span>
      </Link>
    </ContentWrapper>
  );
};

export default SideBarNavLink;
