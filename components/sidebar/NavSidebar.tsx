import Link from "next/link";
import ContentWrapper from "../ui/ContentWrapper";
import SideBarNavLink from "../ui/SidebarNavLink";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const NavSidebar = () => {
  const SidebarNavLinks = [
    {
      name: "New Order",
      iconPath: "/icons/newOrder.svg",
      href: "/neworder",
    },
    {
      name: "Dashboard",
      iconPath: "/icons/dashboard.svg",
      href: "/dashboard",
    },
    {
      name: "Online Order",
      iconPath: "/icons/online.svg",
      href: "/onlineorder",
    },
    {
      name: "Settings",
      iconPath: "/icons/settings.svg",
      href: "/settings",
    },
  ];

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  return (
    <aside className="bg-[var(--LightGrey)] h-screen flex items-center justify-center p-10">
      <ul className="flex flex-col gap-5 ">
        <ContentWrapper className="w-[125px]">
          <Link href={"/dashboard"}>
            <img
              src="/logos/quickbite-logo.svg"
              alt="QuickBite logo"
              className="object-cover rounded-sm"
            />
          </Link>
        </ContentWrapper>
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
          className="gap-2 px-4 py-8 flex flex-col justify-center items-center bg-[var(--White)] rounded-sm cursor-pointer"
          onClick={handleSignOut}
        >
          <img src="/icons/logout.svg" alt="Logout button icon" />
          <span>Logout</span>
        </button>
      </ul>
    </aside>
  );
};

export default NavSidebar;
