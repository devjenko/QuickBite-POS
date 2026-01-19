"use client";

import Link from "next/link";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SideBarNavLinkProps {
  icon?: string;
  name?: string;
  href?: string;
  activeHref?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  iconSize?: number;
  prefetch?: boolean;
}

const SideBarNavLink = ({
  icon,
  name,
  href,
  activeHref,
  onClick,
  className,
  wrapperClassName,
  iconClassName,
  iconSize = 24,
  prefetch = true,
  children,
}: SideBarNavLinkProps) => {
  const pathname = usePathname();

  const checkPath = activeHref || href;

  // Active if pathname matches or the href is active
  const isActive = checkPath
    ? pathname === checkPath || pathname.startsWith(checkPath + "/")
    : false;

  return (
    <Link prefetch={prefetch} onClick={onClick} href={href || "#"}>
      <ContentWrapper variant={(isActive && "dark") || undefined} className={wrapperClassName}>
        <div
          className={`gap-2 px-4 py-8 flex flex-col justify-center items-center ${className}`}
        >
          <Image
            alt="Sidebar Icon"
            width={iconSize}
            height={iconSize}
            src={icon || ""}
            className={`${isActive ? "brightness-0 invert" : ""} ${iconClassName || ""}`}
          />
          {children}
          {name && <span>{name}</span>}
        </div>
      </ContentWrapper>
    </Link>
  );
};

export default SideBarNavLink;
