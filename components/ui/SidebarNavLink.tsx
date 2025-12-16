"use client";

import Link from "next/link";
import ContentWrapper from "./ContentWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";
interface SideBarNavLinkProps {
  icon: string;
  name: string;
  href: string;
}

const SideBarNavLink = ({ icon, name, href }: SideBarNavLinkProps) => {
  // Use pathname custom hook to check current route
  const pathname = usePathname();
  const isActive = href && pathname === href;

  return (
    <ContentWrapper variant={isActive ? "dark" : "light"}>
      <Link
        href={href}
        className="gap-2 px-4 py-8 flex flex-col justify-center items-center"
      >
        <Image
          alt="Sidebar Icon"
          width={20}
          height={20}
          src={icon}
          className={isActive ? "brightness-0 invert" : ""}
        />
        <span>{name}</span>
      </Link>
    </ContentWrapper>
  );
};

export default SideBarNavLink;
