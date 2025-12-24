"use client";

import Link from "next/link";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SideBarNavLinkProps {
  icon: string;
  name: string;
  href: string;
}

const SideBarNavLink = ({ icon, name, href }: SideBarNavLinkProps) => {
  const pathname = usePathname();

  // Active if pathname matches
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href}>
      <ContentWrapper variant={(isActive && "dark") || undefined}>
        <div className="gap-2 px-4 py-8 flex flex-col justify-center items-center">
          <Image
            alt="Sidebar Icon"
            width={24}
            height={24}
            src={icon}
            className={(isActive && "brightness-0 invert") || undefined}
          />
          <span>{name}</span>
        </div>
      </ContentWrapper>
    </Link>
  );
};

export default SideBarNavLink;
