"use client";

import Link from "next/link";
import ContentWrapper from "./ContentWrapper";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SideBarNavLinkProps {
  icon: string;
  name: string;
  href: string;
}

const SideBarNavLink = ({ icon, name, href }: SideBarNavLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Active if pathname matches
  const isActive = pathname === href || pathname.startsWith(href + "/");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <ContentWrapper
      onClick={handleClick}
      variant={(isActive && "dark") || undefined}
    >
      <Link
        href={href}
        className="gap-2 px-4 py-8 flex flex-col justify-center items-center"
      >
        <Image
          alt="Sidebar Icon"
          width={24}
          height={24}
          src={icon}
          className={(isActive && "brightness-0 invert") || undefined}
        />
        <span>{name}</span>
      </Link>
    </ContentWrapper>
  );
};

export default SideBarNavLink;
